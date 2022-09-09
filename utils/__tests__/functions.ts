import cases from "jest-in-case";
import {
  composeObjFromNonEmptyKeys,
  getConvertedPrice,
  formatPriceByCurrency,
  trimFirebaseErrorMessage,
} from "../functions";

cases(
  "trim firebase error messages",
  (opts) => {
    expect(trimFirebaseErrorMessage(opts.initial)).toEqual(opts.result);
  },
  {
    "code: auth/user-not-found": {
      initial:
        "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).",
      result:
        "There is no user record corresponding to this identifier. The user may have been deleted.",
    },
    "no-start code: auth/user-not-found": {
      initial:
        "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).",
      result:
        "There is no user record corresponding to this identifier. The user may have been deleted.",
    },
    "no-end code: auth/user-not-found": {
      initial:
        "FirebaseError: Firebase: There is no user record corresponding to this identifier. The user may have been deleted.",
      result:
        "There is no user record corresponding to this identifier. The user may have been deleted.",
    },
  }
);

cases(
  "check composeObjFromNonEmptyKeys function",
  (opts) => {
    expect(composeObjFromNonEmptyKeys(opts.initial)).toStrictEqual(opts.result);
  },
  {
    "all empty": { initial: {}, result: {} },
    "zero empty": {
      initial: { a: "123", b: "123", c: "123" },
      result: { a: "123", b: "123", c: "123" },
    },
    "some empty": {
      initial: { a: "123", b: "", c: "123", d: null },
      result: { a: "123", c: "123" },
    },
    "0 as a property": {
      initial: { a: 0, b: "", c: "123" },
      result: { a: 0, c: "123" },
    },
  }
);

cases(
  "check getConvertedPrice function",
  (opts) => {
    expect(getConvertedPrice(opts.price, opts.currency)).toStrictEqual(
      opts.result
    );
  },
  {
    "default usd": { price: 100, currency: "usd" as const, result: 100 },
    eur: { price: 100, currency: "eur" as const, result: 100 * 0.95 },
    rub: { price: 100, currency: "rub" as const, result: 100 * 0.7 },
    "price is 0": { price: 0, currency: "usd" as const, result: 0 },
    "price is 0 in non-usd": { price: 0, currency: "eur" as const, result: 0 },
    "price is decimal": {
      price: 100.42,
      currency: "usd" as const,
      result: 100,
    },
  }
);

cases(
  "check formatPriceByCurrency function",
  (opts) => {
    expect(
      formatPriceByCurrency(opts.price, opts.currency, opts.symbolOnly)
    ).toStrictEqual(opts.result);
  },
  {
    "default usd": {
      price: 100,
      currency: "usd" as const,
      symbolOnly: false,
      result: "$100",
    },
    "default eur": {
      price: 100,
      currency: "eur" as const,
      symbolOnly: false,
      result: "95\xa0€",
    },
    "default rub": {
      price: 100,
      currency: "rub" as const,
      symbolOnly: false,
      result: "70\xa0₽",
    },
    "default usd symbolOnly": {
      price: 100,
      currency: "usd" as const,
      symbolOnly: true,
      result: "$",
    },
    "default eur symbolOnly": {
      price: 100,
      currency: "eur" as const,
      symbolOnly: true,
      result: "€",
    },
    "default rub symbolOnly": {
      price: 100,
      currency: "rub" as const,
      symbolOnly: true,
      result: "₽",
    },
    "price 0": {
      price: 0,
      currency: "rub" as const,
      symbolOnly: false,
      result: "0\xa0₽",
    },
    "price 0 symbolOnly": {
      price: 0,
      currency: "rub" as const,
      symbolOnly: true,
      result: "₽",
    },
  }
);
