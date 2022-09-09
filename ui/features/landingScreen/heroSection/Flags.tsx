import Image from "next/image";
import styled, { css, keyframes } from "styled-components";

const scaleWobble = keyframes`
  0% { transform: scale(1) }
  70% { transform: scale(1.3) }
  80% { transform: scale(1.2) }
  90% { transform: scale(1.22) }
  100% { transform: scale(1.2) }
`;

const FlagsContainer = styled.div`
  position: absolute;
  top: 9rem;
  right: 10%;
  width: 40rem;
  height: 40rem;
  z-index: 1000;
`;

type FlagWrapperProps = {
  variant: "primary" | "secondary" | "tertiary";
};
const FlagWrapper = styled.div<FlagWrapperProps>`
  position: absolute;
  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  &:hover,
  &:focus {
    animation: ${scaleWobble} 0.2s ease-in forwards;
    z-index: 10000;
  }

  ${(props) =>
    props.variant === "primary"
      ? css`
          top: 0;
          left: 0;
          z-index: 1000;
        `
      : props.variant === "secondary"
      ? css`
          top: 20%;
          right: 0;
          z-index: 900;
        `
      : props.variant === "tertiary"
      ? css`
          top: 50%;
          left: 0;
          z-index: 800;
        `
      : ""}
`;

const FlagImage = ({ country }: { country: string }) => {
  return (
    <Image
      src={`/flags_flat/SVG/${country}@2x.svg`}
      alt={`${country} flag`}
      width="250"
      height="120"
    />
  );
};

export const Flags = () => {
  return (
    <FlagsContainer>
      <FlagWrapper variant="primary">
        <FlagImage country="italy" />
      </FlagWrapper>
      <FlagWrapper variant="secondary">
        <FlagImage country="germany" />
      </FlagWrapper>
      <FlagWrapper variant="tertiary">
        <FlagImage country="israel" />
      </FlagWrapper>
    </FlagsContainer>
  );
};
