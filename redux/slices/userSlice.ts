import {
  createAction,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { z } from "zod";
import {
  categorySpendingsSchema,
  currenciesSchema,
  periodsSchema,
  stateStatusesSchema,
  subcategorySpendingsSchema,
  tableOptionsSchema,
  TCategorySpendings,
  TCurrencies,
  TSubcategorySpendings,
  TTableOptions,
} from "../../utils/types";
import { RootState } from "../store";
import { userUploadAvatar } from "../thunks/userThunks";
import {
  selectCategoriesIds,
  selectMappedSubcategories,
} from "./categoriesSlice";

// An action creator to make TS ok with
// `next-redux-wrapper` types on server-side hydration
const hydrate = createAction<RootState>(HYDRATE);

export type TUser = z.infer<typeof userSchema>;
export const userSchema = z.object({
  uid: z.string(),
  username: z.string(),
  email: z.string(),
  avatar: z.string(),
  avatarStatus: stateStatusesSchema,
  categories: z.object({
    byId: categorySpendingsSchema,
    allIds: z.array(z.number()),
  }),
  subcategories: z.object({
    byId: subcategorySpendingsSchema,
    allIds: z.array(z.number()),
  }),
  country: z.string(),
  countryFilter: z.string(),
  sort: z.enum(["asc", "dsc"]),
  period: periodsSchema,
  currency: currenciesSchema,
  tableOptions: z.array(tableOptionsSchema),
  userStatus: stateStatusesSchema,
});

export const initialState: TUser = {
  uid: "",
  username: "",
  email: "",
  avatar: "",
  avatarStatus: "idle",
  categories: { byId: {}, allIds: [] },
  subcategories: { byId: {}, allIds: [] },
  country: "",
  countryFilter: "",
  sort: "asc",
  period: "month",
  currency: "usd",
  tableOptions: ["category", "spendings", "country", "compare"],
  userStatus: "idle",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      const user = action.payload;
      return user;
    },
    setUserCategories: (
      state,
      action: PayloadAction<{ byId: TCategorySpendings; allIds: number[] }>
    ) => {
      state.categories.byId = action.payload.byId;
      state.categories.allIds = action.payload.allIds;
    },
    addUserCategory: (
      state,
      action: PayloadAction<{ id: string; spendings: number }>
    ) => {
      const { id, spendings } = action.payload;
      state.categories.byId[id] = {
        spendings: spendings,
        minimizedSubcats: false,
      };
      state.categories.allIds.push(Number(id));
    },
    removeUserCategory: (state, action: PayloadAction<{ catId: string }>) => {
      const { catId } = action.payload;
      delete state.categories.byId[catId];
      state.categories.allIds = state.categories.allIds.filter(
        (i) => i !== Number(catId)
      );
    },
    updateUserCategory: (
      state,
      action: PayloadAction<{ id: string; spendings: number }>
    ) => {
      const { id, spendings } = action.payload;
      state.categories.byId[id].spendings = spendings;
    },
    setUserSubcategories: (
      state,
      action: PayloadAction<{ byId: TSubcategorySpendings; allIds: number[] }>
    ) => {
      state.subcategories.byId = action.payload.byId;
      state.subcategories.allIds = action.payload.allIds;
    },
    addUserSubcategory: (
      state,
      action: PayloadAction<{ id: string; spendings: number }>
    ) => {
      const { id, spendings } = action.payload;
      state.subcategories.byId[id] = { spendings: spendings };
      state.subcategories.allIds.push(Number(id));
    },
    updateUserSubcategory: (
      state,
      action: PayloadAction<{ id: string; spendings: number }>
    ) => {
      const { id, spendings } = action.payload;
      state.subcategories.byId[id].spendings = spendings;
    },
    removeUserSubcategory: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      delete state.subcategories.byId[id];
      state.subcategories.allIds = state.subcategories.allIds.filter(
        (i) => i !== Number(id)
      );
    },
    setFilterCountry: (state, action: PayloadAction<string>) => {
      const countryId = action.payload;
      state.countryFilter = countryId;
    },
    toggleUserMinizeSubcategories: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload;
      state.categories.byId[id].minimizedSubcats =
        !state.categories.byId[id].minimizedSubcats;
    },
    toggleUserMinizeAllSubcategories: (state) => {
      Object.entries(state.categories.byId).forEach(([id]) => {
        state.categories.byId[id].minimizedSubcats =
          !state.categories.byId[id].minimizedSubcats;
      });
    },
    toggleUserPeriod: (state) => {
      state.period = state.period === "year" ? "month" : "year";
    },
    setUserAvatar: (state, action: PayloadAction<{ avatar: string }>) => {
      const { avatar } = action.payload;
      state.avatar = avatar;
    },
    setUserCurrency: (
      state,
      action: PayloadAction<{ currency: TCurrencies }>
    ) => {
      const { currency } = action.payload;
      state.currency = currency;
    },
    toggleUserTableOption: (state, action: PayloadAction<TTableOptions>) => {
      const option = action.payload;
      // filter an option out or add it back
      state.tableOptions.includes(option)
        ? (state.tableOptions = state.tableOptions.filter(
            (opt) => opt !== option
          ))
        : state.tableOptions.push(option);
    },
    resetUser: () => {
      return initialState;
    },
  },
  // 'Hydrate' action fires on each SSR
  // request via `nextjs-redux-wrapper`
  // `action.payload` contains the store from the server
  extraReducers: (builder) => {
    builder
      .addCase(hydrate, (state, action) => {
        console.log("HYDRATE FROM USER SLICE", action.payload);
        const nextState = {
          ...state, // use previous state
          ...action.payload.user, // apply diff
        };
        // dummy check if the data already exists
        if (state.username) return state;
        return nextState;
      })
      .addCase(userUploadAvatar.pending, (state) => {
        state.avatarStatus = "loading";
      })
      .addCase(userUploadAvatar.rejected, (state) => {
        state.avatarStatus = "error";
      })
      .addCase(userUploadAvatar.fulfilled, (state) => {
        state.avatarStatus = "idle";
        // all reducer logic is executed inside the thunk
      });
  },
});

export const userReducer = userSlice.reducer;
export const {
  setUser,
  resetUser,
  setUserCategories,
  addUserCategory,
  updateUserCategory,
  removeUserCategory,
  setUserSubcategories,
  addUserSubcategory,
  updateUserSubcategory,
  removeUserSubcategory,
  setFilterCountry,
  toggleUserMinizeSubcategories,
  toggleUserMinizeAllSubcategories,
  toggleUserPeriod,
  toggleUserTableOption,
  setUserCurrency,
  setUserAvatar,
} = userSlice.actions;

export const selectUserUsername = (state: RootState) => state.user.username;
export const selectUserEmail = (state: RootState) => state.user.email;
export const selectUserAvatar = (state: RootState) => state.user.avatar;
export const selectUserAvatarStatus = (state: RootState) =>
  state.user.avatarStatus;
export const selectUserTableOptions = (state: RootState) =>
  state.user.tableOptions;
export const selectUserCurrency = (state: RootState) => state.user.currency;
export const selectUserPeriod = (state: RootState) => state.user.period;
export const selectUserCountry = (state: RootState) => state.user.country;
export const selectUserFilterCountry = (state: RootState) =>
  state.user.countryFilter;
export const selectUserCategoriesById = (state: RootState) =>
  state.user.categories.byId;
export const selectUserCategoriesAllIds = (state: RootState) =>
  state.user.categories.allIds;
export const selectUserSubcategoriesById = (state: RootState) =>
  state.user.subcategories.byId;
export const selectUserSubcategoriesAllIds = (state: RootState) =>
  state.user.subcategories.allIds;

export const selectUnusedCatsIds = createSelector(
  [selectCategoriesIds, selectUserCategoriesAllIds],
  (categoriesIds, userCategoriesIds) =>
    categoriesIds.filter((catId) => !userCategoriesIds.includes(catId))
);

export const selectSubcatsIdsPerCat = createSelector(
  [selectMappedSubcategories, (_, categoryId) => categoryId],
  (mappedSubcats, catId) => Object.values(mappedSubcats[catId])
);

export const selectUserSubcatsPerCat = createSelector(
  [
    selectUserSubcategoriesById,
    (state, categoryId) => selectSubcatsIdsPerCat(state, categoryId),
  ],
  (userSubcats, subcatsIdsPerCat) =>
    Object.entries(userSubcats).filter(([id]) =>
      subcatsIdsPerCat.includes(Number(id))
    )
);

export const selectUnusedSubcatsIdsPerCat = createSelector(
  [
    selectUserSubcategoriesAllIds,
    (state, categoryId) => selectSubcatsIdsPerCat(state, categoryId),
  ],
  (userSubcatsIds, subcatsIdsPerCat) =>
    subcatsIdsPerCat.filter((subcatId) => !userSubcatsIds.includes(subcatId))
);
