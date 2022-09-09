import styled, { css, keyframes } from "styled-components";
import Image from "next/image";
import { colorWhitePrimary, colorDarkPrimary } from "../../../../styles/colors";

const scaleWobble = keyframes`
  0% {
    transform: scale(1);
  }
  80% {
    transform: scale(1.15);
  }
  90% {
    transform: scale(1.1);
  }
  95% {
    transform: scale(1.12);
  }
  100% {
    transform: scale(1.1);
  }
`;

const BenefitCardContainer = styled.div<{
  variant?: "primary" | "secondary" | "tertiary";
}>`
  position: absolute;
  display: flex;
  flex-direction: column;
  border-radius: 2.2rem;
  padding: 4.2rem 4rem;
  box-shadow: 0px 4px 16px rgb(0, 0, 0, 0.05);
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);

  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  &:hover,
  &:focus {
    animation: ${scaleWobble} 0.2s ease-in-out forwards;
  }

  ${(props) =>
    props.variant === "primary"
      ? css`
          top: 24%;
          left: 13%;
          max-width: 50rem;
          background-color: rgb(255, 242, 226);
        `
      : props.variant === "secondary"
      ? css`
          top: 31%;
          left: 56%;
          max-width: 58rem;
          background-color: rgb(130, 128, 206);
        `
      : props.variant === "tertiary"
      ? css`
          top: 50%;
          left: 33%;
          max-width: 65rem;
          background-color: ${colorWhitePrimary};
        `
      : css`
          max-width: 50rem;
          background-color: rgb(255, 242, 226);
        `}
`;

const BenefitCardTitle = styled.p`
  color: ${colorDarkPrimary};
  font-weight: 900;
  font-size: 3.6rem;
  text-transform: capitalize;
`;
const BenefitCardLabel = styled.p`
  display: flex;
  gap: 1rem;
  color: ${colorDarkPrimary};
  font-weight: 700;
  font-size: 2rem;
`;
const BenefitCardIcon = styled.p`
  color: ${colorDarkPrimary};
  font-weight: 700;
  font-size: 2.4rem;
`;

export const BenefitsCard = ({
  title,
  label,
  variant,
  className,
  icon,
  onClick,
}: {
  title: string;
  label?: string;
  variant?: "primary" | "secondary" | "tertiary";
  icon?: string;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <BenefitCardContainer
      onClick={onClick}
      variant={variant}
      className={className}
    >
      <BenefitCardTitle>{title}</BenefitCardTitle>
      <BenefitCardLabel>
        {icon && (
          <Image
            src={`/icons/${icon}.svg`}
            alt={`${icon} icon`}
            width="20"
            height="20"
          />
        )}
        {label}
      </BenefitCardLabel>
    </BenefitCardContainer>
  );
};
