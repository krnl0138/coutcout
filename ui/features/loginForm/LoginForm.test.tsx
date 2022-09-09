import { screen, fireEvent, render } from "@testing-library/react";
import { setupServer } from "msw/lib/node";
import { handlers } from "../../../tests/mocks/handlers";
import { renderWithProviders } from "../../../tests/test-utils";
import { LoginForm } from "./LoginForm";
import "jest-styled-components";
import "@testing-library/jest-dom";

describe("Test LoginForm component", () => {
  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  it("should render the form", async () => {
    renderWithProviders(<LoginForm />);

    const loginForm = screen.getByRole("form", { name: "login-form" });
    expect(loginForm).toBeInTheDocument();
  });

  it.only("should enter 6 characters into the password input", () => {
    const tree = renderWithProviders(<LoginForm />);

    // const passwordInput = tree.getByRole("textbox", { name: "password-input" });
    const passwordInput = screen.getByLabelText("Password:", {
      selector: "input",
    });

    const passwordHelperText = tree.getByText(/At least 6 characters/);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordHelperText).not.toBeVisible();
    expect(passwordInput).toHaveStyleRule("border", "2px solid #000");
    fireEvent.click(passwordInput);
    expect(passwordHelperText).toBeVisible();

    fireEvent.change(passwordInput, { target: { value: 23 } });
    expect(passwordInput).toHaveDisplayValue("23");
    expect(passwordInput).toHaveValue("23");
    expect(passwordInput).toHaveStyleRule(
      "border-bottom",
      "4px solid rgb(199,25,25)"
    );
  });
});
