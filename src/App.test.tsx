import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axe from "axe-core";
import App from "./App";

function renderWithRouter(ui: React.ReactElement, { route } = { route: "/" }) {
  return render(<MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>);
}

describe("App", () => {
  describe("accessibility", () => {
    it("has no violations on the index page", async () => {
      const { container } = renderWithRouter(<App />);
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Today We Learned"
      );
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the faqs page", async () => {
      const { container } = renderWithRouter(<App />, { route: "/faqs" });
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Frequently Asked Questions"
      );
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the new entry page", async () => {
      const { container } = renderWithRouter(<App />, {
        route: "/entries/new",
      });
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "New TWL Entry"
      );
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });

    it("has no violations on the show page", async () => {
      const { container } = renderWithRouter(<App />, {
        route: "/entries/Risky%20Migrations",
      });
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Risky Migrations"
      );
      const { violations } = await axe.run(container);
      expect(violations).toEqual([]);
    });
  });

  it("shows error messages on the form", async () => {
    renderWithRouter(<App />, { route: "/entries/new" });

    userEvent.click(screen.getByRole("button", { name: "Add New Entry" }));

    await screen.findByText("There were 3 problems with your form:");

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      "New TWL Entry"
    );
    expect(screen.getAllByText("You must enter a title").length).toEqual(2);
    expect(screen.getAllByText("You must enter a body").length).toEqual(2);
    expect(screen.getAllByText("You must enter a color").length).toEqual(2);
  });

  it("successfully adds a new entry", async () => {
    renderWithRouter(<App />, { route: "/entries/new" });

    userEvent.type(screen.getByRole("textbox", { name: "Title" }), "Suh dude");
    expect(screen.getByRole("textbox", { name: "Title" })).toHaveValue(
      "Suh dude"
    );

    userEvent.type(screen.getByLabelText("Body"), "Kiss me thru the phone");
    expect(screen.getByLabelText("Body")).toHaveValue("Kiss me thru the phone");

    userEvent.click(screen.getByRole("radio", { name: "Green" }));
    expect(screen.getByLabelText("Green")).toBeChecked();

    userEvent.click(screen.getByRole("button", { name: "Add New Entry" }));

    expect(await screen.findByRole("heading", { level: 1 })).toHaveTextContent(
      "Today We Learned"
    );

    expect(screen.getByText("Successfully added new entry")).toBeVisible();
  });

  it("has a share modal that works", async () => {
    renderWithRouter(<App />, { route: "/" });

    const [shareButton] = screen.getAllByRole("button", { name: "Share" });
    userEvent.click(shareButton);

    const getModalButton = () =>
      screen.getByRole("button", { name: "Share TWL Entry" });

    expect(
      screen.getByRole("heading", { name: "Share Today We Learned" })
    ).toBeVisible();

    expect(getModalButton()).toBeDisabled();

    expect(
      screen.queryByText(/You must enter a valid email address/i)
    ).not.toBeInTheDocument();

    userEvent.hover(screen.getByTestId("button-with-tooltip-target"));
    expect(
      await screen.findByText(/You must enter a valid email address/i)
    ).toBeVisible();

    userEvent.type(
      screen.getByRole("textbox", { name: "Email" }),
      "hello@example.com"
    );
    expect(getModalButton()).not.toBeDisabled();
    userEvent.click(getModalButton());

    expect(
      screen.getByText("Successfully shared article with hello@example.com")
    ).toBeVisible();
  });
});
