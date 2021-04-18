import React, { useState } from "react";

import Menu from "./components/menu/Menu";
import DeleteIcon from "./components/icon/DeleteIcon";

import * as Styled from "./__styles__/App.styles";

function App() {
  const [currentMenuItem, setCurrentMenuItem] = useState("navigation_2");

  const _onMenuItemClick = (key) => setCurrentMenuItem(key);

  return (
    <div>
      <Styled.Header>
        <Styled.Row>
          <div>logo</div>
          <Menu
            selectedKey={currentMenuItem}
            menuItems={[
              {
                key: "navigation_1",
                title: "Navigation One",
                icon: <DeleteIcon />,
              },
              {
                key: "navigation_2",
                title: "Navigation Two",
                icon: <DeleteIcon />,
              },
              {
                key: "navigation_3",
                title: "Navigation Three",
                icon: <DeleteIcon />,
              },
              {
                key: "navigation_4",
                title: "Navigation Four",
                icon: <DeleteIcon />,
              },
            ]}
            onClick={_onMenuItemClick}
          />
          <div>user</div>
        </Styled.Row>
      </Styled.Header>
    </div>
  );
}

export default App;
