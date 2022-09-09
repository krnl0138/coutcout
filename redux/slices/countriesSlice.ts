import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import {
  TCategorySpendingsResponse,
  TCountriesResponse,
  TSubcategorySpendingsResponse,
} from "../../utils/types";
import { RootState } from "../store";
import { getCountrySpendings } from "../thunks/countriesThunks";

type TCountry = {
  categoriesSpendings: TCategorySpendingsResponse;
  subcategoriesSpendings: TSubcategorySpendingsResponse;
  statusCountrySpendings: "idle" | "loading" | "error";
  countriesList: TCountriesResponse;
};

const initialState: TCountry = {
  categoriesSpendings: {},
  subcategoriesSpendings: {},
  statusCountrySpendings: "idle",
  countriesList: {},
};

/** An action creator to make TS ok with `next-redux-wrapper`
 * types on server-side hydration */
const hydrate = createAction<RootState>(HYDRATE);

export const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setCountriesList: (state, action: PayloadAction<TCountriesResponse>) => {
      state.countriesList = action.payload;
    },
    setCountryCategoriesSpendings: (
      state,
      action: PayloadAction<TCategorySpendingsResponse>
    ) => {
      state.categoriesSpendings = action.payload;
    },
    setCountrySubcategoriesSpendings: (
      state,
      action: PayloadAction<TSubcategorySpendingsResponse>
    ) => {
      state.subcategoriesSpendings = action.payload;
    },
    resetUser: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        const nextState = {
          ...state, // use previous state
          ...action.payload.countries, // apply diff
        };
        // dummy check if the data already exists
        if (Object.keys(state.countriesList).length > 0) return state;
        return nextState;
      })
      .addCase(getCountrySpendings.pending, (state) => {
        state.statusCountrySpendings = "loading";
      })
      .addCase(getCountrySpendings.rejected, (state) => {
        state.statusCountrySpendings = "error";
      })
      .addCase(getCountrySpendings.fulfilled, (state, action) => {
        state.statusCountrySpendings = "idle";
        const [categoriesSpendings, subcategoriesSpendings] = action.payload;
        state.categoriesSpendings = categoriesSpendings;
        state.subcategoriesSpendings = subcategoriesSpendings;
      });
  },
});

export const countriesReducer = countriesSlice.reducer;
export const {
  resetUser,
  setCountriesList,
  setCountryCategoriesSpendings,
  setCountrySubcategoriesSpendings,
} = countriesSlice.actions;

export const selectCountryCategoriesSpendings = (state: RootState) =>
  state.countries.categoriesSpendings;
export const selectCountrySubcategoriesSpendings = (state: RootState) =>
  state.countries.subcategoriesSpendings;
export const selectCountriesList = (state: RootState) =>
  state.countries.countriesList;
export const selectStatusCountrySpending = (state: RootState) =>
  state.countries.statusCountrySpendings;
