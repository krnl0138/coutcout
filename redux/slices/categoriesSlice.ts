import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { RootState } from "../store";

/** An action creator to make TS ok with `next-redux-wrapper`
 * types on server-side hydration */
const hydrate = createAction<RootState>(HYDRATE);

export type TCategories = {
  categories: {
    byId: Record<string, string>;
    allIds: number[];
  };
  subcategories: {
    byId: Record<string, string>;
    allIds: number[];
  };
  mappedSubcategories: Record<string, Record<string, number>>;
};

const initialState: TCategories = {
  categories: {
    byId: {},
    allIds: [],
  },
  subcategories: {
    byId: {},
    allIds: [],
  },
  mappedSubcategories: {},
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<TCategories>) => {
      return action.payload;
    },
    resetCategories: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(hydrate, (state, action) => {
      const nextState = {
        ...state, // use previous state
        ...action.payload.categories, // apply diff
      };
      // dummy check if the data already exists
      if (state.categories.allIds.length > 0) return state;
      return nextState;
    });
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const { setCategories, resetCategories } = categoriesSlice.actions;

export const selectCategories = (state: RootState) =>
  state.categories.categories.byId;
export const selectCategoriesIds = (state: RootState) =>
  state.categories.categories.allIds;
export const selectSubcategories = (state: RootState) =>
  state.categories.subcategories.byId;
export const selectSubcategoriesIds = (state: RootState) =>
  state.categories.subcategories.allIds;
export const selectMappedSubcategories = (state: RootState) =>
  state.categories.mappedSubcategories;
export const selectCategoryById = (state: RootState, id: string) =>
  state.categories.categories.byId[id];
export const selectSubcategoryById = (state: RootState, id: string) =>
  state.categories.subcategories.byId[id];
