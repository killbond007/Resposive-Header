import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "jest-styled-components";

import Menu from "../Menu";
import DeleteIcon from "../../icon/DeleteIcon";

const getInstance = (props = {}, children = null) => (
  <Menu {...props}>{children}</Menu>
);

describe("Menu", () => {
  const menuItems = [
    { key: "navigation_1", title: "navigation_1", icon: <DeleteIcon /> },
    { key: "navigation_2", title: "navigation_2", icon: <DeleteIcon /> },
    { key: "navigation_3", title: "navigation_3", icon: <DeleteIcon /> },
    { key: "navigation_4", title: "navigation_4", icon: <DeleteIcon /> },
  ];

  describe("matches snapshot", () => {
    const data = [
      { title: "with no data" },
      { title: "with menuItems", props: { menuItems } },
    ];

    data.forEach(({ title, props }) => {
      it(title, () => {
        const { asFragment } = render(getInstance(props));
        expect(asFragment()).toMatchSnapshot();
      });
    });
  });

  it("renders order menu items", () => {
    const { getAllByRole } = render(getInstance({ menuItems }));
    menuItems.map((item, i) => {
      expect(getAllByRole("listitem")[i]).toHaveTextContent(item.title);
    });
  });

  it("renders selected menu item", () => {
    const { getAllByTestId } = render(
      getInstance({
        selectedKey: "bar",
        menuItems: [
          { key: "foo", title: "Foo", icon: <DeleteIcon /> },
          { key: "bar", title: "Bar", icon: <DeleteIcon /> },
        ],
      })
    );
    expect(getAllByTestId("__menu-item__")[0]).toHaveStyleRule(
      "color",
      "#000000d9"
    );
    expect(getAllByTestId("__menu-item__")[1]).toHaveStyleRule(
      "color",
      "#1890ff"
    );
  });

  it("triggers onClick handler when clicking on menu item", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      getInstance({
        onClick,
        menuItems: [
          { key: "foo", title: "Foo", icon: <DeleteIcon /> },
          { key: "bar", title: "Bar", icon: <DeleteIcon /> },
        ],
      })
    );
    fireEvent.click(getByText("Foo"));
    expect(onClick).toHaveBeenCalledWith("foo");
  });
});
