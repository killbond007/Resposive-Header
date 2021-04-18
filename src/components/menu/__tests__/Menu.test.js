import { fireEvent, render } from "@testing-library/react";
import React from "react";
import "jest-styled-components";

import Menu from "../Menu";
import DeleteIcon from "../../icon/DeleteIcon";

const getInstance = (props = {}, children = null) => (
  <Menu {...props}>{children}</Menu>
);

describe("Menu", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(getInstance());
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders Menu Items", () => {
    const { getByText } = render(
      getInstance({
        menuItems: [
          { key: "foo", title: "Foo", icon: <DeleteIcon /> },
          { key: "bar", title: "Bar", icon: <DeleteIcon /> },
        ],
      })
    );
    expect(getByText("Bar")).toBeInTheDocument();
    expect(getByText("Foo")).toBeInTheDocument();
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
