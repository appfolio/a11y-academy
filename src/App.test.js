import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import {
  createHistory,
  createMemorySource,
  LocationProvider
} from "@reach/router";
import axe from "axe-core";
import React from "react";
import App from "./App";

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history
  };
}

describe("App", () => {
  afterEach(cleanup);

  it("doesnt have any accessibility violations", async () => {
    const { container } = render(<App />);
    const { violations } = await axe.run(container);
    expect(violations).toEqual([]);
  });

  it("routes everywhere correctly", async () => {
    const {
      container,
      getByRole,
      history: { navigate }
    } = renderWithRouter(<App />);

    await navigate("/");
    expect(container.innerHTML).toMatch("Today We Learned");

    await navigate("/faqs");
    expect(container.innerHTML).toMatch("Frequently Asked Questions");

    await navigate("/entries/new");
    expect(getByRole("heading")).toHaveTextContent("New TWL Entry");
  });
});
