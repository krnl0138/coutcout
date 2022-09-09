import { ChangeEvent, useMemo, useState } from "react";
import styled, { css } from "styled-components";
import {
  colorDarkPrimary,
  colorGreenPrimary,
  colorDarkSecondary,
  colorRedPrimary,
} from "../../../styles/colors";
import { REGEX_PASSWORD } from "../../../utils/constants";
import { Input } from "./Input";

/**
 * Conditionally apply 'valid'/'invalid' classes based on
 * test against incoming regex expression
 */
const StyledFormInputPassword = styled(Input)<{ styledValid: boolean }>`
  margin-bottom: 0.8rem;
  ${(props) =>
    props.styledValid
      ? css`
          &:focus:valid {
            outline: none;
            border: 2px solid ${colorDarkPrimary};
            border-bottom: 4px solid ${colorGreenPrimary};
          }
          & + p {
            color: ${colorGreenPrimary};
          }
        `
      : css`
          &:focus {
            outline: none;
            border: 2px solid ${colorDarkPrimary};
            border-bottom: 4px solid ${colorRedPrimary};
          }
          & + p {
            color: ${colorRedPrimary};
          }
        `}
  & + p {
    opacity: 0;
  }
  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  &:focus + p {
    opacity: 1;
    transition: opacity 0.1s ease-in;
  }
`;

const StyledFormHelperText = styled.p`
  font-size: 1rem;
  color: ${colorDarkSecondary};
`;

type TInputPassword = {
  required?: boolean;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  id: string;
  helperTextValid?: string;
  helperTextInvalid?: string;
  regex?: RegExp;
};
export const InputPassword = ({
  required = true,
  value,
  onChange,
  id,
  helperTextValid,
  helperTextInvalid = "* At least 6 characters long",
  regex = REGEX_PASSWORD,
}: TInputPassword) => {
  const memoValid = useMemo(() => regex.test(value), [regex, value]);
  return (
    <>
      <StyledFormInputPassword
        styledValid={memoValid}
        required={required}
        autoComplete="on"
        type="password"
        name="password-input"
        id={id}
        value={value}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
        maxLength={20}
      />
      <StyledFormHelperText>
        {memoValid ? helperTextValid : helperTextInvalid}
      </StyledFormHelperText>
    </>
  );
};
