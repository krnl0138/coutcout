import Image from "next/image";
import styled from "styled-components";
import { BlobWatermark } from "../../../components/Blobs";
import { AnimatedWords } from "./AnimatedWords";
import { Flags } from "./Flags";

const CoinWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, 60%);
  z-index: 1200;
`;

const Coin = () => {
  return (
    <CoinWrapper>
      <Image src="/coin/coin.png" alt="Coin image" width="50" height="50" />
    </CoinWrapper>
  );
};

const HeroSectionContainer = styled.section`
  margin-top: 5vh;
  position: relative;
  height: 90vh;
`;

const HeroSectionBackgroundWrapper = styled.div`
  position: absolute;
  top: 25rem;
  left: 0;
  max-height: 34rem;
  min-height: 34rem;
  width: 100%;
  background-color: rgb(250, 250, 250, 1);
  z-index: 1;
`;

const BoyImageWrapper = styled.div`
  position: absolute;
  top: 7rem;
  left: 10%;
  z-index: 1000;
`;
const BoyImage = () => {
  return (
    <BoyImageWrapper>
      <Image
        src="/person.png"
        alt="Person illustration"
        width="300"
        height="500"
      />
    </BoyImageWrapper>
  );
};

const PlantImageWrapper = styled.div`
  position: absolute;
  top: 38rem;
  left: 28%;
  z-index: 900;
`;

const PlantImage = () => {
  return (
    <PlantImageWrapper>
      <Image
        src="/fiddle_leaf.png"
        alt="Plant illustration"
        width="100"
        height="160"
      />
    </PlantImageWrapper>
  );
};

const BlobWatermarkContainer = styled.div`
  position: absolute;
  top: 4.5rem;
  left: 14%;
  z-index: 800;
  display: inline-block;
`;

const MainText = styled.p`
  position: absolute;
  top: 30%;
  left: 30%;
  font-weight: 900;
  font-size: 3.6rem;
  z-index: 1100;
`;

const AccentText = styled.div`
  position: absolute;
  padding: 0 1rem;
  top: 24rem;
  left: 35.5%;
  background-color: rgb(130, 128, 206);
  transform: rotate(-2deg);
  font-weight: 900;
  z-index: 1100;
  text-align: center;
`;

const SubAccentText = styled.p`
  position: absolute;
  left: 55%;
  top: 31rem;
  text-decoration: underline;
  font-weight: 900;
  font-size: 4rem;
  z-index: 1100;
`;

const HugeText = styled.p`
  position: absolute;
  overflow: hidden;
  top: 5%;
  font-size: 28rem;
  font-weight: 100;
  color: rgba(255, 255, 255, 0.1803921568627451);
`;

export const HeroSection = () => {
  return (
    <HeroSectionContainer id="hero-section">
      <HeroSectionBackgroundWrapper />
      <BoyImage />
      <PlantImage />
      <BlobWatermarkContainer>
        <BlobWatermark />
        <MainText>
          I wonder if I spent <br /> more on
        </MainText>
        <HugeText>Coût</HugeText>
      </BlobWatermarkContainer>
      <AccentText>
        <AnimatedWords />
        <Coin />
      </AccentText>
      <SubAccentText>than</SubAccentText>
      <Flags />
    </HeroSectionContainer>
  );
};
