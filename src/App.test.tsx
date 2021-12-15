import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import React from "react";
import App from "./App";

function renderWithRouter(ui: React.ReactElement, { route } = { route: "/" }) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("App", () => {
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
    renderWithRouter(<App />, { route: "/entries/new" });

    userEvent.click(screen.getByText("Add New Entry"));

    await screen.findByText("There were 3 problems with your form:");

    expect(screen.getByRole("heading")).toHaveTextContent("New TWL Entry");
    expect(screen.getAllByText("You must enter a title").length).toEqual(2);
    expect(screen.getAllByText("You must enter a body").length).toEqual(2);
    expect(screen.getAllByText("You must enter a color").length).toEqual(2);
  });

  it("successfully adds a new entry", async () => {
    renderWithRouter(<App />, { route: "/entries/new" });

    userEvent.type(screen.getByLabelText("Title"), "Suh dude");
    expect(screen.getByLabelText("Title")).toHaveValue("Suh dude");

    userEvent.type(screen.getByLabelText("Body"), "Kiss me thru the phone");
    expect(screen.getByLabelText("Body")).toHaveValue("Kiss me thru the phone");

    userEvent.click(screen.getByLabelText("Green"));
    expect(screen.getByLabelText("Green")).toBeChecked();

    userEvent.click(screen.getByText("Add New Entry"));

    const heading = await screen.findByTestId("page-heading");
    expect(heading).toHaveTextContent("Today We Learned");

    expect(screen.getByText("Successfully added new entry")).toBeVisible();
  });

  it("has a share modal that works", async () => {
    renderWithRouter(<App />, { route: "/" });

    const [shareButton] = screen.getAllByText("Share");
    userEvent.click(shareButton);

    expect(screen.getByText("Share Today We Learned")).toBeVisible();

    // TODO: test tooltip
    expect(screen.getByText("Share TWL Entry")).toBeDisabled();

    userEvent.type(screen.getByLabelText("Email"), "hello@example.com");
    expect(screen.getByText("Share TWL Entry")).not.toBeDisabled();

    userEvent.click(screen.getByText("Share TWL Entry"));
    expect(
      screen.getByText("Successfully shared article with hello@example.com")
    ).toBeVisible();
  });
});
