import Image from "next/image";
import { useState } from "react";
import { toggleUserMinizeAllSubcategories } from "../../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../../utils/hooks";
import { IconContainer } from "../../IconContainer";
import { AddCatDropdown } from "../AddCatDropdown";
import { TableExpandButton } from "../TableExpandButton";
import { TableHeader } from "./HeaderRow";

export const CategoryCellHeader = ({
  openDropdown,
}: {
  openDropdown: () => void;
}) => {
  const dispatch = useAppDispatch();

  return (
    <TableHeader>
      Category
      <TableExpandButton
        onClick={() => dispatch(toggleUserMinizeAllSubcategories())}
      />
      <IconContainer
        id="table-header-add-category"
        onClick={(e) => {
          e.stopPropagation();
          openDropdown();
        }}
      >
        <Image
          src="/icons/add-circle-fill.svg"
          alt="Plus icon"
          width="15%"
          height="15%"
        />
      </IconContainer>
    </TableHeader>
  );
};
