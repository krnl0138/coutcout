import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";
import { colorWhitePrimary } from "../../../styles/colors";
import { AddCatDropdown } from "./AddCatDropdown";
import { IconContainer } from "../IconContainer";

const AddContainer = styled.div`
  position: relative;
  width: 3rem;
  height: 3rem;
  /* background-color: ${colorWhitePrimary}; */
  border-radius: 50%;
  border: 2px solid black;
  z-index: 10000;
`;

export const TableAddRowIcon = ({ className }: { className?: string }) => {
  const [isOpenAddCatDropdown, setIsOpenAddCatDropdown] = useState(false);
  const toggleAddCatDropdown = () =>
    setIsOpenAddCatDropdown(!isOpenAddCatDropdown);

  return (
    <AddContainer
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        toggleAddCatDropdown();
      }}
    >
      <IconContainer>
        <Image src="/icons/add.svg" alt="Plus icon" width="25" height="25" />
      </IconContainer>
      {isOpenAddCatDropdown && (
        <AddCatDropdown bottom={true} onCloseDropdown={toggleAddCatDropdown} />
      )}
    </AddContainer>
  );
};
