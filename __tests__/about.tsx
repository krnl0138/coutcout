import "@testing-library/jest-dom";
import "jest-styled-components";
import { screen } from "@testing-library/react";
import { renderWithProviders } from "../tests/test-utils";
import About from "../pages/about";

describe("Tests for /about page", () => {
  it("renders the page", () => {
    renderWithProviders(<About />);
    expect(screen.getByRole("heading", { name: /About/i })).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /Description/ })
    ).toBeInTheDocument();
  });
});
