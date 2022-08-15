import { Layout } from "../components/Layout";
import { BenefitsSection } from "../features/benefitsSection/BenefitsSection";
import { HeroSection } from "../features/heroSection/HeroSection";
import { SignUpSection } from "../features/signUpSection/SignUpSection";

const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <BenefitsSection />
      <SignUpSection />
    </Layout>
  );
};

export default Home;
