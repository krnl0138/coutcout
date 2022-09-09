import styled from "styled-components";
import {
  colorBluePrimary,
  colorDarkPrimary,
  colorGreenPrimary,
  colorRedPrimary,
  colorWhitePrimary,
} from "../../../styles/colors";

export const Input = styled.input`
  min-height: 4rem;
  border: 2px solid ${colorDarkPrimary};
  background-color: ${colorWhitePrimary};
  padding: 0 1rem;
  margin-bottom: 1.6rem;

  &:focus,
  &:active {
    outline: none;
    border: 2px solid ${colorDarkPrimary};
    border-bottom: 4px solid ${colorBluePrimary};
    &:invalid {
      outline: none;
      border: 2px solid ${colorDarkPrimary};
      border-bottom: 4px solid ${colorRedPrimary};
    }
    &:valid {
      outline: none;
      border: 2px solid ${colorDarkPrimary};
      border-bottom: 4px solid ${colorGreenPrimary};
    }
  }
`;
