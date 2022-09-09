import styled from "styled-components";
import { TableArrowStyled } from "./TableArrow";

const StyledExpandButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

type TTableExpandButton = {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};
export const TableExpandButton = ({ onClick }: TTableExpandButton) => {
  return (
    <StyledExpandButton onClick={onClick}>
      <TableArrowStyled variant="expand" />
    </StyledExpandButton>
  );
};
