import "@testing-library/jest-dom";
import "jest-styled-components";
import fetch from "node-fetch";

import { fireEvent, render, screen } from "@testing-library/react";
import { setupServer } from "msw/node";
import { renderWithProviders } from "../tests/test-utils";

import { handlers } from "../tests/mocks/handlers";

import Compare from "../pages/compare";
import { SERVER_URL } from "../utils/constants";

jest.mock("../../pages/compare", () => {
  return {
    getServerSideProps: jest.fn(async () => {
      return 42;
      // const resCountriesList = await fetch(
      //   `${SERVER_URL}/countries/countriesList.json`
      // );
      // const countriesList = await resCountriesList.json();
      // const resUser = await fetch(`${SERVER_URL}/user.json`);
      // const user = await resUser.json();
      // const resCountrySpendings = await fetch(
      //   `${SERVER_URL}/countries/austria/spendings.json`
      // );
      // const { compareCategories, compareSubcategories } =
      //   await resCountrySpendings.json();
      // const resCategories = await fetch(`${SERVER_URL}/categories.json`);
      // const categories = await resCategories.json();
    }),
  };
});

describe("testing /compare page", () => {
  const server = setupServer(...handlers);

  // Enable API mocking before tests.
  beforeAll(() => server.listen());

  // Reset any runtime request handlers we may add during the tests.
  afterEach(() => server.resetHandlers());

  // Disable API mocking after the tests are done.
  afterAll(() => server.close());

  test("open and close table settings dropdown by clicking on icon", async () => {
    // mimic next js getServerSideProps behaviour to hydrate the state
    // const resCountriesList = await fetch(
    //   `${SERVER_URL}/countries/countriesList.json`
    // );
    // const countriesList = await resCountriesList.json();
    // const resUser = await fetch(`${SERVER_URL}/user.json`);
    // const user = await resUser.json();
    // const resCountrySpendings = await fetch(
    //   `${SERVER_URL}/countries/austria/spendings.json`
    // );
    // const { compareCategories, compareSubcategories } =
    //   await resCountrySpendings.json();
    // const resCategories = await fetch(`${SERVER_URL}/categories.json`);
    // const categories = await resCategories.json();
    // const preloadedState = {
    //   ...user,
    //   ...countriesList,
    //   ...compareCategories,
    //   ...compareSubcategories,
    //   ...categories,
    // };

    // Generate a new store
    // renderWithProviders(<Compare />, {});
    render(<Compare />);

    // should be able to see 'Country' in the table header
    expect(screen.getByText(/Country/i)).toBeInTheDocument();

    // after clicking the 'Settings' icon, it should now show the settings dropdown
    fireEvent.click(
      screen.getByRole("button", { name: /table-settings-icon/i })
    );
    // should open dropdown and 2 'Country' can be found on the screen
    expect(screen.getAllByText(/Country/i).length === 2).toBe(true);

    // after clicking the 'Settings' icon, it should now show the settings dropdown
    fireEvent.click(
      screen.getByRole("button", { name: /table-settings-icon/i })
    );
    // should close dropdown and 1 'Country' can be found on the screen
    expect(screen.getAllByText(/Country/i).length === 1).toBe(true);
  });

  // test("remove a column after click on 'country' checkbox in the table settings dropdown", async () => {
  //   // mimic next js getServerSideProps behaviour to hydrate the state
  //   const resCountriesList = await fetch(
  //     `${SERVER_URL}/countries/countriesList.json`
  //   );
  //   const countriesList = await resCountriesList.json();
  //   const resUser = await fetch(`${SERVER_URL}/user.json`);
  //   const user = await resUser.json();
  //   const resCountrySpendings = await fetch(
  //     `${SERVER_URL}/countries/austria/spendings.json`
  //   );
  //   const { compareCategories, compareSubcategories } =
  //     await resCountrySpendings.json();
  //   const resCategories = await fetch(`${SERVER_URL}/categories.json`);
  //   const categories = await resCategories.json();

  //   // Generate a new store
  //   renderWithProviders(<Compare />, {});

  //   // should be able to see 'Country' in the table header
  //   expect(screen.getByText(/Country/i)).toBeInTheDocument();

  //   // after clicking the 'Settings' icon, it should now show the settings dropdown
  //   fireEvent.click(
  //     screen.getByRole("button", { name: /table-settings-icon/i })
  //   );
  //   // should open dropdown and 2 'Country' can be found on the screen
  //   expect(screen.getAllByText(/Country/i).length === 2).toBe(true);

  //   const countryCheckbox: HTMLInputElement = screen.getByRole("checkbox", {
  //     name: /country/i,
  //   });

  //   // should be checked
  //   expect(countryCheckbox.checked).toBe(true);
  //   // should click on 'country' checkbox inside the 'settings' dropdown
  //   fireEvent.click(countryCheckbox);
  //   // should be unchecked
  //   expect(countryCheckbox.checked).toBe(false);
  //   // should now see only 1 'Country' from the dropdown, because the column was removed
  //   expect(screen.getAllByText(/Country/i).length === 1).toBe(true);
  // });
});
