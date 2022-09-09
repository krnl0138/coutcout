import styled, { css } from "styled-components";
import {
  colorGreenPrimary,
  colorGreenSecondary,
  colorWhitePrimary,
} from "../../styles/colors";

type TButtonStyled = {
  variant: "outlined" | "filled";
};
export const ButtonStyled = styled.button<TButtonStyled>`
  border: none;
  background-color: ${colorGreenPrimary};
  color: ${colorWhitePrimary};
  font-size: 1.6rem;
  font-weight: 400;
  padding: 0.8rem 1.6rem;
  border-radius: 0.4rem;
  cursor: pointer;
  &:hover {
    background-color: ${colorGreenSecondary};
  }
  &:focus {
    background-color: ${colorGreenPrimary};
  }
  &:active {
    outline: 3px solid rgb(0, 0, 0);
  }

  ${(props) =>
    props.variant === "outlined" &&
    css`
      border: 2px solid ${colorGreenPrimary};
      background-color: transparent;
      color: ${colorGreenPrimary};
      /* stylelint-disable-next-line no-duplicate-selectors */
      &:hover {
        border: 2px solid ${colorGreenPrimary};
        background-color: ${colorGreenSecondary};
        color: ${colorWhitePrimary};
      }
      /* stylelint-disable-next-line no-duplicate-selectors */
      &:focus {
        background-color: transparent;
        color: ${colorGreenPrimary};
      }
    `}
`;
