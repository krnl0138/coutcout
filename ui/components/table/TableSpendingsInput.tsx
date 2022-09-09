import React, { useRef, useState } from "react";
import styled, { css } from "styled-components";
import {
  selectUserCurrency,
  updateUserCategory,
} from "../../../redux/slices/userSlice";
import { updateSubcategorySpendings } from "../../../redux/thunks/userThunks";
import { colorDarkPrimary, colorWhitePrimary } from "../../../styles/colors";
import { formatPriceByCurrency } from "../../../utils/functions";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";

const SpendingsForm = styled.form`
  display: flex;
  align-items: center;
`;

const SpendingsSubmitButton = styled.button`
  opacity: 0;
  margin-left: 1rem;
  padding: 0 1rem;
  border: 1px solid ${colorDarkPrimary};
  color: ${colorDarkPrimary};
  background-color: ${colorWhitePrimary};
`;

const SpendingsInput = styled.input.attrs(() => ({
  maxLength: 6,
  pattern: "[0-9]+",
}))<{ customType: "category" | "subcategory" }>`
  border: none;
  font-size: 1.6rem;
  ${(props) =>
    props.customType === "category" &&
    css`
      font-weight: 700;
    `}
  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  &:focus,
  &:active {
    outline: 1px solid black;
    transition: outline ease-in 0.1s;
    /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
    & ~ button {
      opacity: 1;
      transition: opacity ease-in 0.1s;
    }
  }
`;

type TTableSpendingsInput = {
  id: string;
  spendings: number;
  type: "subcategory" | "category";
};
export const TableSpendingsInput = ({
  id,
  spendings,
  type,
}: TTableSpendingsInput) => {
  const dispatch = useAppDispatch();
  const userCurrency = useAppSelector(selectUserCurrency);
  const inputRef = useRef<null | HTMLInputElement>(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState<"" | number>(spendings);
  const inputSize = inputValue.toString().length;

  const updateSpendings = () => {
    if (!inputValue || inputValue === spendings) return;
    type === "category"
      ? dispatch(updateUserCategory({ id, spendings: inputValue }))
      : dispatch(
          updateSubcategorySpendings({
            subcategoryId: id,
            spendings: inputValue,
          })
        );
  };

  const onInputChange = (e: React.ChangeEvent) => {
    const regex = /^[0-9]+$/;
    const v = (e.target as HTMLInputElement).value;
    v.length === 0
      ? setInputValue("")
      : regex.test(v) && setInputValue(Number(v));
  };

  const onInputFocus = () => setIsInputFocused(!isInputFocused);

  const onInputBlur = () => {
    updateSpendings();
    setIsInputFocused(!isInputFocused);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Update logic is handled in a 'onInputBlur' function
    // to allow update values on click outside the input
    e.preventDefault();
    if (!inputRef.current) return;
    inputRef.current.blur();
  };

  const currencySymbol = formatPriceByCurrency(0, userCurrency, true);

  return (
    <SpendingsForm onSubmit={onSubmit}>
      <SpendingsInput
        ref={inputRef}
        size={inputSize ? inputSize : 1}
        value={inputValue}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
        onChange={onInputChange}
        customType={type}
      />
      <span>{currencySymbol}</span>
      {isInputFocused && (
        <SpendingsSubmitButton type="submit">Save</SpendingsSubmitButton>
      )}
    </SpendingsForm>
  );
};
