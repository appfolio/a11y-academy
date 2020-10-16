import {
  createHistory,
  createMemorySource,
  LocationProvider,
} from "@reach/router";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, fireEvent, render } from "@testing-library/react";
import axe from "axe-core";
import React from "react";
import App from "./App";

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(<LocationProvider history={history}>{ui}</LocationProvider>),
    history,
  };
}

describe("App", () => {
  afterEach(cleanup);

  it("doesnt have any accessibility violations on index", async () => {
    const { container } = renderWithRouter(<App />);
    const { violations } = await axe.run(container);
    expect(violations).toEqual([]);
  });

  it("doesnt have any accessibility violations on the faqs page", async () => {
    const { container } = renderWithRouter(<App />, { route: "/faqs" });
    const { violations } = await axe.run(container);
    expect(violations).toEqual([]);
  });

  it("doesnt have any accessibility violations on the new entry page", async () => {
    const { container } = renderWithRouter(<App />, { route: "/entries/new" });
    const { violations } = await axe.run(container);
    expect(violations).toEqual([]);
  });

  it("routes everywhere correctly", async () => {
    const {
      container,
      getByRole,
      history: { navigate },
    } = renderWithRouter(<App />);

    expect(container.innerHTML).toMatch("Today We Learned");

    await navigate("/faqs");
    expect(container.innerHTML).toMatch("Frequently Asked Questions");

    await navigate("/entries/new");
    expect(getByRole("heading")).toHaveTextContent("New TWL Entry");
  });

  it("shows error messages on the form", async () => {
    const { getByRole, getAllByText, getByText, findByText } = renderWithRouter(
      <App />,
      {
        route: "/entries/new",
      }
    );

    fireEvent.click(getByText("Add New Entry"));

    await findByText("There were 3 problems with your form:");

    expect(getByRole("heading")).toHaveTextContent("New TWL Entry");
    expect(getAllByText("You must enter a title").length).toEqual(2);
    expect(getAllByText("You must enter a body").length).toEqual(2);
    expect(getAllByText("You must enter a color").length).toEqual(2);
  });

  it("successfully adds a new entry", async () => {
    const { findByTestId, getByLabelText, getByText } = renderWithRouter(
      <App />,
      {
        route: "/entries/new",
      }
    );

    const titleInput = getByLabelText("Title");
    fireEvent.change(titleInput, { target: { value: "Suh dude" } });
    expect(titleInput.value).toBe("Suh dude");

    const bodyInput = getByLabelText("Body");
    fireEvent.change(bodyInput, {
      target: { value: "Kiss me thru the phone" },
    });
    expect(bodyInput.value).toBe("Kiss me thru the phone");

    const greenRadio = getByLabelText("Green");
    fireEvent.click(greenRadio);
    expect(greenRadio.checked).toBe(true);

    fireEvent.click(getByText("Add New Entry"));

    const heading = await findByTestId("page-heading");
    expect(heading).toHaveTextContent("Today We Learned");

    // TODO: test flash messages
    // https://github.com/reach/router/issues/225
  });

  it("has a share modal that works", async () => {
    const { getAllByText, getByLabelText, getByText } = renderWithRouter(
      <App />,
      {
        route: "/",
      }
    );

    const [shareButton] = getAllByText("Share");
    fireEvent.click(shareButton);

    expect(getByText("Share Today We Learned")).toBeVisible();

    // TODO: test tooltip
    expect(getByText("Share TWL Entry")).toBeDisabled();

    fireEvent.change(getByLabelText("Email"), {
      target: { value: "hello@example.com" },
    });
    expect(getByText("Share TWL Entry")).not.toBeDisabled();

    fireEvent.click(getByText("Share TWL Entry"));
    expect(
      getByText("Successfully shared article with hello@example.com")
    ).toBeVisible();
  });
});
