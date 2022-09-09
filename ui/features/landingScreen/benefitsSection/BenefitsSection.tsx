import styled from "styled-components";
import { AnimatedCurrency } from "./AnimatedCurrency";
import { BenefitsCard } from "./BenefitsCard";

const BenefitsSectionContainer = styled.section`
  position: relative;
  height: 120vh;
  background-color: rgb(180 229 254);
  &::before {
    content: "";
    display: block;
    height: 100%;
    margin-top: 10%;
    background-image: url("/collections.png");
    background-repeat: no-repeat;
    background-size: contain;
    filter: opacity(0.1);
  }
`;

export const BenefitsSection = () => {
  return (
    <BenefitsSectionContainer>
      <BenefitsCard
        title="Insights about other cultures"
        label="Average prices"
        icon="price-tag"
        variant="primary"
      />
      <BenefitsCard
        title="Search or compare"
        label="Two modes"
        icon="coins"
        variant="secondary"
      />
      <BenefitsCard
        title="Write down expenses"
        label="Easy to remember things"
        icon="booklet"
        variant="tertiary"
      />
      <AnimatedCurrency />
    </BenefitsSectionContainer>
  );
};
