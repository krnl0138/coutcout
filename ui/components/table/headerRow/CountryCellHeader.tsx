import { useState } from "react";
import styled from "styled-components";
import { CountryDropdown } from "../../menus/CountryDropdown";
import { TableExpandButton } from "../TableExpandButton";
import { TableHeader } from "./HeaderRow";

export const CountryCellHeader = ({
  toggleCountryDropdown,
}: {
  toggleCountryDropdown: () => void;
}) => {
  return (
    <TableHeader>
      Country
      <TableExpandButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          toggleCountryDropdown();
        }}
      />
    </TableHeader>
  );
};
