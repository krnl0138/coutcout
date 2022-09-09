import styled from "styled-components";
import { RegisterForm } from "../../registerForm/RegisterForm";

const SignUpSectionContainer = styled.section`
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SignUpSection = () => {
  return (
    <SignUpSectionContainer id="signup-section">
      <RegisterForm />
    </SignUpSectionContainer>
  );
};
