import {
  AnyAction,
  configureStore,
  PreloadedState,
  ThunkAction,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

export const makeMockStore = (preloadedState: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    preloadedState,
  });

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      process.env.NODE_ENV !== "production"
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware(),
  });

// // cookieMiddleware ontop of redux-wrapper
// // On each SSR request for HYDRATE a cookie with
// // a subtree available for the store to keep client
// // and server in sync
// const makeStore = wrapMakeStore(() =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware().prepend(
//         nextReduxCookieMiddleware({
//           subtrees: ["my.subtree"],
//         })
//       ),
//   })
// );

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = ReturnType<typeof makeStore>["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

export const wrapper = createWrapper<AppStore>(makeStore);
