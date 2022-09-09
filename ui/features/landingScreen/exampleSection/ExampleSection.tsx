import { useState } from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";
import { colorWhitePrimary } from "../../../../styles/colors";
import { BenefitsCard } from "../benefitsSection/BenefitsCard";
import { ExampleTableCompare } from "./ExampleTableCompare";
import { ExampleTableSearch } from "./ExampleTableSearch";

const ExampleSectionContainer = styled.section`
  position: relative;
  height: 100vh;
  background-color: ${colorWhitePrimary};
`;

const ExampleSectionContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
`;

const CenterContainer = styled.div`
  width: 70%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ExampleSectionSticker = styled(BenefitsCard)`
  position: absolute;
  top: 10%;
  right: 5%;
  transform: rotate(16deg);
  z-index: 10000;
  &:hover,
  &:focus {
    transform: rotate(16deg) scale(1.05);
    animation: none;
  }
  cursor: pointer;
`;

export const ExampleSection = () => {
  const [flipped, setFlipped] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });
  return (
    <ExampleSectionContainer>
      <ExampleSectionContent>
        <ExampleSectionSticker
          title="Two modes"
          label="Click to see more"
          onClick={() => setFlipped(!flipped)}
        />
        <CenterContainer>
          {/* animated.div comes from react-spring library */}
          <animated.div
            style={{
              /* stylelint-disable */
              opacity: opacity.to((o) => 1 - o),
              transform,
              /* stylelint-enable */
            }}
          >
            <ExampleTableCompare />
          </animated.div>
        </CenterContainer>

        <CenterContainer>
          <animated.div
            style={{
              /* stylelint-disable */
              opacity,
              transform,
              rotateX: "180deg",
              /* stylelint-enable */
            }}
          >
            <ExampleTableSearch />
          </animated.div>
        </CenterContainer>
      </ExampleSectionContent>
    </ExampleSectionContainer>
  );
};
