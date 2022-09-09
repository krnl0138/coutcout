import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchDelayedCountrySpendings } from "../../lib/api/fetchDelayedCountrySpendings";
import { getErrorMessage } from "../../utils/functions";

export const getCountrySpendings = createAsyncThunk(
  "countries/getCountrySpendings",
  async (userFilterCountry: string) => {
    try {
      const spendings = await fetchDelayedCountrySpendings(userFilterCountry);
      return spendings;
    } catch (error) {
      throw new Error(
        `Couldnt fetch country spendings. Try again. ${getErrorMessage(error)}`
      );
    }
  }
);
