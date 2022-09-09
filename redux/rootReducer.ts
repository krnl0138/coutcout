import { combineReducers } from "@reduxjs/toolkit";
import { categoriesReducer } from "./slices/categoriesSlice";
import { countriesReducer } from "./slices/countriesSlice";
import { userReducer } from "./slices/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  countries: countriesReducer,
  categories: categoriesReducer,
});

export default rootReducer;
