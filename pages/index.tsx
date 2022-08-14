import styled from "styled-components";
import { Layout } from "../components/Layout";
import { SignUpForm } from "../features/loginForm/SignUpForm";

const HeroSection = styled.section`
  height: 80vh;
  background-color: pink;
`;

const BenefitsSection = styled.section`
  height: 80vh;
  background-color: papayawhip;
`;

const SignUpSection = styled.section`
  height: 80vh;
  background-color: olive;
`;

const Home = () => {
  return (
    <Layout>
      <HeroSection>
        <p>Hello</p>
      </HeroSection>
      <BenefitsSection>
        <p>World</p>
      </BenefitsSection>
      <SignUpSection>
        <SignUpForm />
      </SignUpSection>
    </Layout>
  );
};

export default Home;
