import { TUser } from "../redux/slices/userSlice";

export const SERVER_URL = "http://127.0.0.1:8080";
export const PROJECT_NAME = "CoûtCoût";

export const URLS = {
  home: "/",
  settings: "/settings",
  profile: "/profile",
  about: "/about",
  login: "/login",
  register: "/register",
  compare: "/compare",
  search: "/search",
};

export const CURRENCIES_LIST = ["usd", "eur", "rub"] as const;
export const TABLE_OPTIONS_LIST = [
  "category",
  "spendings",
  "country",
  "compare",
] as const;

export const REGEX_EMAIL = new RegExp(
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export const REGEX_PASSWORD = new RegExp(/\S{6,}/i);

export const DEFAULT_USER: TUser = {
  uid: "",
  email: "",
  username: "",
  avatar:
    "https://firebasestorage.googleapis.com/v0/b/coutcout-a3079.appspot.com/o/avatars%2Fdefault_avatar.jpeg?alt=media&token=68374342-fa64-4dde-a73e-f9371e9f2a5d",
  avatarStatus: "idle",
  country: "5",
  countryFilter: "9",
  currency: "usd",
  tableOptions: ["category", "spendings", "country", "compare"],
  period: "month",
  sort: "dsc",
  categories: {
    byId: { "0": { spendings: 0, minimizedSubcats: false } },
    allIds: [0],
  },
  subcategories: {
    byId: { "0": { spendings: 1000 } },
    allIds: [0],
  },
  userStatus: "idle",
};
