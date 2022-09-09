import styled from "styled-components";
import {
  colorDarkPrimary,
  colorWhitePrimary,
  colorWhiteSecondary,
} from "../../../styles/colors";

export const FormContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  padding: 4.8rem 4.8rem 6.4rem;
  border-radius: 1.8rem;
  display: flex;
  gap: 2.4rem;
  flex-direction: column;
  max-width: 45rem;
  background-color: ${colorWhitePrimary};
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);
  z-index: 1000;

  a {
    color: rgb(18, 149, 236);
  }
  a:hover,
  a:focus {
    color: rgb(19, 115, 180);
    text-decoration: underline;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & label {
    margin-bottom: 0.8rem;
  }
`;

export const FormHeading = styled.div`
  position: relative;
`;

export const FormSubTitle = styled.div`
  color: ${colorDarkPrimary};
  font-size: 1.2rem;
`;

export const FormTitle = styled.div`
  color: ${colorDarkPrimary};
  font-size: 3.2rem;
  font-weight: 900;
`;
