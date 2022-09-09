import { useState } from "react";
import styled from "styled-components";
import { selectUserTableOptions } from "../../../../redux/slices/userSlice";
import { colorWhitePrimary } from "../../../../styles/colors";
import { useAppSelector } from "../../../../utils/hooks";
import { CountryDropdown } from "../../menus/CountryDropdown";
import { AddCatDropdown } from "../AddCatDropdown";
import { CategoryCellHeader } from "./CategoryCellHeader";
import { CountryCellHeader } from "./CountryCellHeader";
import { SpendingsCellHeader } from "./SpendingsCellHeader";

const HeaderHead = styled.thead`
  &:hover,
  &:focus {
    #table-settings-dropdown {
      display: block;
    }
  }
`;

// Common css styles for all header cells
export const TableHeader = styled.th`
  position: sticky;
  top: 0;
  display: flex;
  gap: 1rem;
  align-items: baseline;
  padding: 2.5rem 2.5rem 2rem;
  text-align: left;

  font-size: 2.4rem;
  font-weight: 900;
  background-color: ${colorWhitePrimary};
  z-index: 10000;
  & button {
    display: none;
  }

  &:hover,
  &:focus {
    button {
      display: block;
    }
    #table-header-add-category {
      display: flex;
    }
  }
`;

const CountryCellWrapper = styled.th`
  position: relative;
`;

const DropdownWrapper = styled.th`
  position: absolute;
`;

export const HeaderRow = () => {
  const userTableOptions = useAppSelector(selectUserTableOptions);

  const [isOpenAddCatDropdown, setIsOpenAddCatDropdown] = useState(false);
  const toggleAddCatDropdown = () =>
    setIsOpenAddCatDropdown(!isOpenAddCatDropdown);

  const [isOpenCountryDropdown, setIsOpenCountryDropdown] = useState(false);
  const toggleCountryDropdown = () =>
    setIsOpenCountryDropdown(!isOpenCountryDropdown);

  return (
    <HeaderHead>
      <tr>
        {userTableOptions.includes("category") && (
          <CategoryCellHeader openDropdown={toggleAddCatDropdown} />
        )}
        {userTableOptions.includes("spendings") && <SpendingsCellHeader />}
        <CountryCellWrapper>
          {userTableOptions.includes("country") && (
            <CountryCellHeader toggleCountryDropdown={toggleCountryDropdown} />
          )}
          {isOpenCountryDropdown && (
            <CountryDropdown onCloseDropdown={toggleCountryDropdown} />
          )}
        </CountryCellWrapper>
        {userTableOptions.includes("compare") && (
          <TableHeader>Compare</TableHeader>
        )}
        {isOpenAddCatDropdown && (
          <DropdownWrapper>
            <AddCatDropdown onCloseDropdown={toggleAddCatDropdown} />
          </DropdownWrapper>
        )}
      </tr>
    </HeaderHead>
  );
};
