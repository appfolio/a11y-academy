import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen, cleanup, fireEvent, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import React from "react";
import App from "./App";

function renderWithRouter(ui: React.ReactElement, { route } = { route: "/" }) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("App", () => {
  afterEach(cleanup);

  describe("accessibility", () => {
    it("has no violations on the index page", async () => {
      const { container } = renderWithRouter(<App />);
      expect(container.innerHTML).toMatch("Today We Learned");
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the faqs page", async () => {
      const { container } = renderWithRouter(<App />, { route: "/faqs" });
      expect(container.innerHTML).toMatch("Frequently Asked Questions");
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the new entry page", async () => {
      const { container } = renderWithRouter(<App />, {
        route: "/entries/new",
      });
      expect(screen.getByRole("heading")).toHaveTextContent("New TWL Entry");
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the show page", async () => {
      const { container } = renderWithRouter(<App />, {
        route: "/entries/Risky%20Migrations",
      });
      expect(container.innerHTML).toMatch("Risky Migrations");
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });
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

    userEvent.type(getByLabelText("Title"), "Suh dude");
    expect(getByLabelText("Title")).toHaveValue("Suh dude");

    userEvent.type(getByLabelText("Body"), "Kiss me thru the phone");
    expect(getByLabelText("Body")).toHaveValue("Kiss me thru the phone");

    userEvent.click(getByLabelText("Green"));
    expect(getByLabelText("Green")).toBeChecked();

    fireEvent.click(getByText("Add New Entry"));

    const heading = await findByTestId("page-heading");
    expect(heading).toHaveTextContent("Today We Learned");

    expect(getByText("Successfully added new entry")).toBeVisible();
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
