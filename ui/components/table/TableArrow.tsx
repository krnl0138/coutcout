import styled, { css } from "styled-components";

const TableArrow = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="10"
    height="10"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.21115 1.57771C3.94819 0.103611 6.05181 0.103612 6.78885 1.57771L9.55279 7.10557C10.2177 8.43538 9.2507 10 7.76393 10H2.23607C0.749304 10 -0.217687 8.43537 0.447214 7.10557L3.21115 1.57771Z"
      fill="#72D869"
    />
  </svg>
);

type TTableArrowStyled = {
  variant?: "up" | "down" | "expand";
};
export const TableArrowStyled = styled(TableArrow)<TTableArrowStyled>`
  ${({ variant }) =>
    variant === "down"
      ? css`
          transform: rotate(180deg);
          path {
            fill: red;
          }
        `
      : variant === "expand"
      ? css`
          transform: rotate(180deg);
          /* stylelint-disable-next-line no-duplicate-selectors */
          path {
            fill: black;
          }
        `
      : ""}
`;
