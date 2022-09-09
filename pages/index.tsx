import { BenefitsSection } from "../ui/features/landingScreen/benefitsSection/BenefitsSection";
import { ExampleSection } from "../ui/features/landingScreen/exampleSection/ExampleSection";
import { HeroSection } from "../ui/features/landingScreen/heroSection/HeroSection";
import { SignUpSection } from "../ui/features/landingScreen/signUpSection/SignUpSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ExampleSection />
      <SignUpSection />
    </>
  );
};

export default Home;
