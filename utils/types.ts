import { z } from "zod";
import { TUser } from "../redux/slices/userSlice";

export type TCountry = Record<string, string>;

export type TCategorySpendings = z.infer<typeof categorySpendingsSchema>;
export const categorySpendingsSchema = z.record(
  z.object({ spendings: z.number(), minimizedSubcats: z.boolean() })
);

export type TSubcategorySpendings = z.infer<typeof subcategorySpendingsSchema>;
export const subcategorySpendingsSchema = z.record(
  z.object({ spendings: z.number() })
);

export type TPeriods = z.infer<typeof periodsSchema>;
export const periodsSchema = z.enum(["month", "year"]);

export type TCurrencies = z.infer<typeof currenciesSchema>;
export const currenciesSchema = z.enum(["usd", "eur", "rub"]);

export type TTableOptions = z.infer<typeof tableOptionsSchema>;
export const tableOptionsSchema = z.enum([
  "category",
  "spendings",
  "country",
  "compare",
]);

export type TStateStatuses = z.infer<typeof stateStatusesSchema>;
export const stateStatusesSchema = z.enum(["idle", "loading", "error"]);

export type TCountriesResponse = Record<string, string>;

export type TCategorySpendingsResponse = Record<string, { spendings: number }>;
export type TSubcategorySpendingsResponse = Record<
  string,
  { spendings: number }
>;

export type TCountrySpendingsResponse = {
  compareCategories: TCategorySpendingsResponse;
  compareSubcategories: TSubcategorySpendingsResponse;
};

export type TCategoriesResponse = {
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

export type TUserResponse = Omit<
  TUser,
  "tableOptions" | "userStatus" | "avatarStatus"
>;

export type TUserResponseMock = {
  uid: string;
  username: string;
  email: string;
  avatar: string;
  categories: { byId: {}; allIds: number[] };
  subcategories: { byId: {}; allIds: number[] };
  country: string;
  countryFilter: string;
  sort: string;
  period: string;
  currency: string;
};
