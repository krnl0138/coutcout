import { rest } from "msw";
import { SERVER_URL } from "../../utils/constants";
import {
  TCountriesResponse,
  TUserResponse,
  TCountrySpendingsResponse,
  TCategoriesResponse,
  TUserResponseMock,
} from "../../utils/types";
import categories from "../../server/categories.json";
import countrySpendings from "../../server/countries/austria/spendings.json";
import countriesList from "../../server/countries/countriesList.json";
import { userUID } from "../../server/user.json";

const requestDelay = 0;

export const handlers = [
  rest.get(
    "https://identitytoolkit.googleapis.com/*",
    async (req, res, ctx) => {
      const { username, email, password } = await req.json();
      if (!username || !email || !password)
        return res(ctx.status(400, "No credentials were provided"));
      return res(ctx.status(200), ctx.json({ username, email, password }));
    }
  ),

  rest.get(`${SERVER_URL}/countries/countriesList.json`, (req, res, ctx) => {
    return res(
      ctx.json<TCountriesResponse>(countriesList.countriesList.countries),
      ctx.delay(requestDelay)
    );
  }),

  rest.get(`${SERVER_URL}/user.json`, (req, res, ctx) => {
    return res(ctx.json<TUserResponseMock>(userUID), ctx.delay(requestDelay));
  }),

  rest.get(
    `${SERVER_URL}/countries/austria/spendings.json`,
    (req, res, ctx) => {
      return res(
        ctx.json<TCountrySpendingsResponse>(countrySpendings),
        ctx.delay(requestDelay)
      );
    }
  ),

  rest.get(`${SERVER_URL}/categories.json`, (req, res, ctx) => {
    return res(
      ctx.json<TCategoriesResponse>(categories),
      ctx.delay(requestDelay)
    );
  }),
];
