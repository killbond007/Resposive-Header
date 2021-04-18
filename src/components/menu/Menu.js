import React, { useLayoutEffect, useRef, useState } from "react";

import PropTypes from "prop-types";

import * as Styled from "./__styles__/Menu.styles";

const Menu = ({ selectedKey, menuItems, onClick }) => {
  const menuRef = useRef(null);
  const menuItemsRef = useRef([]);

  const [visibleKeys, setVisibleKeys] = useState([]);

  useLayoutEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize, false);

    return () => {
      window.removeEventListener("resize", handleResize, false);
    };
  }, []);

  const handleResize = () => {
    let currentSumWidth, menuWidth;

    if (menuRef.current && menuRef.current.offsetWidth) {
      menuWidth = menuRef.current.offsetWidth;
      currentSumWidth =
        !!menuItems &&
        menuItems.reduce((acc, _, i) => {
          let width;
          const elem = menuItemsRef.current[i];

          if (elem) {
            const { marginLeft, marginRight } = getComputedStyle(elem);
            width =
              +marginLeft.replace("px", "") + +marginRight.replace("px", "");

            return acc + elem.offsetWidth + width;
          }
        }, 0);
      if (menuWidth < currentSumWidth) {
        let i = menuItems.length,
          keys = [];

        while (menuWidth < currentSumWidth && menuItemsRef.current[i - 1]) {
          currentSumWidth =
            currentSumWidth -
            menuItemsRef.current[i - 1].children[1].offsetWidth;

          keys.push((i - 1).toString());
          i--;
        }

        setVisibleKeys(keys);
      } else {
        let j = 0,
          keys = [];

        while (menuWidth > currentSumWidth + 120 && j < menuItems.length) {
          if (menuItemsRef.current[j].children[1].offsetWidth === 0) {
            keys.push(j.toString());
            currentSumWidth =
              currentSumWidth + menuItemsRef.current[j].children[1].offsetWidth;
            setVisibleKeys((prevState) =>
              prevState.filter((item) => item !== j.toString())
            );
          }
          j++;
        }
      }
    }
  };

  const _onMenuItemClick = (key) => () => onClick && onClick(key);

  return (
    <Styled.Root data-testid="__menu__" ref={menuRef}>
      {!!menuItems &&
        menuItems.map((item, i) => (
          <Styled.MenuItem
            data-testid="__menu-item__"
            key={item.key}
            $isSelected={selectedKey === item.key}
            ref={(ref) => (menuItemsRef.current[i] = ref)}
            onClick={_onMenuItemClick(item.key)}
          >
            {item.icon}
            <Styled.Title $isVisible={!visibleKeys.includes(i.toString())}>
              {item.title}
            </Styled.Title>
          </Styled.MenuItem>
        ))}
    </Styled.Root>
  );
};

Menu.propTypes = {
  /** key of currently selected menu items. */
  selectedKey: PropTypes.string,
  /** Array of MenuItems to appear in the menu. Each object is given as props to the MenuItem. */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      title: PropTypes.string,
      icon: PropTypes.node,
    })
  ),
  /** Called when a menu item is clicked	. */
  onClick: PropTypes.func,
};

Menu.defaultProps = {
  selectedKey: null,
  menuItems: null,
  onClick: null,
};

export default Menu;
