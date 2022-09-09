import styled from "styled-components";

const Heading = styled.h1`
  position: relative;
  font-size: 4.8rem;
  font-weight: 900;
  text-transform: capitalize;
`;

type TPageHeading = {
  children: string;
  className?: string;
};
export const PageHeading = ({ children, className }: TPageHeading) => {
  return <Heading className={className}>{children}</Heading>;
};
