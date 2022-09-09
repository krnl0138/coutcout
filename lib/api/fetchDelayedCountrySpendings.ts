import { SERVER_URL } from "../../utils/constants";
import { TCountrySpendingsResponse } from "../../utils/types";

export const fetchDelayedCountrySpendings = async (country: string) => {
  const data: TCountrySpendingsResponse = await new Promise((resolve) => {
    setTimeout(async () => {
      const res = await fetch(
        `${SERVER_URL}/countries/${country}/spendings.json`
      );
      if (!res.ok) {
        throw new Error(
          `An error occured: ${fetchDelayedCountrySpendings.name} couldn't load data for country: ${country}`
        );
      }
      const countrySpendings = await res.json();
      resolve(countrySpendings);
    }, 2000);
  });

  return [data.compareCategories, data.compareSubcategories];
};
