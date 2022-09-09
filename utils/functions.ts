import { z } from "zod";
import { TCurrencies, TUserResponse } from "./types";

export const getCompareState = (value: number) => (value > 0 ? "up" : "down");

/**
 * Remove unwanted text from Firebase errors
 */
export const trimFirebaseErrorMessage = (errorMsg: string) =>
  errorMsg.replace(/^Firebase.*:\s/, "").replace(/\s\(.*\)\.$/, "");

/**
 * Provide an array of Zod errors or a trimmed firebase error for forms
 */
export const getFormErrorMessages = (error: unknown) =>
  error instanceof z.ZodError
    ? error.issues.map((issue) => issue.message)
    : trimFirebaseErrorMessage(getErrorMessage(error));

/**
 * Simplify typescript error.message access
 */
export const getErrorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

/**
 * Return a new object with properties which weren't empty
 */
export const composeObjFromNonEmptyKeys = (obj: { [key: string]: any }) => {
  const result = <typeof obj>{};
  Object.entries(obj).forEach(([key, value]) => {
    if (!!value || value === 0) return (result[key] = value);
  });
  return result;
};

export const getConvertedPrice = (
  price: number,
  currency: TCurrencies
): number => {
  if (price === 0) return 0;
  const converted =
    currency === "rub"
      ? price * 0.7
      : currency === "eur"
      ? price * 0.95
      : currency === "usd"
      ? price
      : null;
  if (!converted) throw new Error("An error occured while converting price");
  const result = Math.floor(converted);
  return result;
};

const getCurrencyFormat = (currency: TCurrencies): string => {
  const result =
    currency === "rub"
      ? "ru-RU"
      : currency === "eur"
      ? "de-DE"
      : currency === "usd"
      ? "us-US"
      : null;
  if (!result)
    throw new Error("An error occured while obtaining currency format");
  return result;
};

export const formatPriceByCurrency = (
  price: number,
  currency: TCurrencies,
  symbolOnly = false
): string => {
  const intlPriceFormat = new Intl.NumberFormat(getCurrencyFormat(currency), {
    style: "currency",
    currency: currency.toUpperCase(),
    currencyDisplay: "narrowSymbol",
    maximumFractionDigits: 0,
  });

  // Lazy return trimmed currency symbol only
  const getSymbol = () => intlPriceFormat.format(0).replace(/\d/g, "").trim();
  const getPrice = () =>
    intlPriceFormat.format(getConvertedPrice(price, currency));
  return symbolOnly ? getSymbol() : getPrice();
};
