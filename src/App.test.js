import { render } from "@testing-library/react";
import React from "react";

import App from "./App";

describe("App", () => {
  it("matches snapshot", () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
});
