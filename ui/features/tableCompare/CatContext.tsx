import { createContext } from "react";

export const CatContext = createContext({
  catId: "",
  spendings: -Infinity,
  minimize: false,
});
