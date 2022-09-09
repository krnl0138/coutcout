import { HeaderRow } from "../../components/table/headerRow/HeaderRow";
import { TableAddRowIcon } from "../../components/table/TableAddRowIcon";

import styled from "styled-components";
import {
  selectUserCategoriesById,
  selectUserTableOptions,
} from "../../../redux/slices/userSlice";
import { colorWhitePrimary } from "../../../styles/colors";
import { useAppSelector } from "../../../utils/hooks";
import { Loader } from "../../components/Loader";
import { TableSettings } from "../../components/table/TableSettings";
import { CatContext } from "./CatContext";
import { TableCompareCategoryRow } from "./TableCompareCatRow";

interface ITable {
  numberCol: number;
}
const StyledTable = styled.table<ITable>`
  position: relative;
  width: 100%;
  max-height: 90%;
  overflow-y: scroll;
  box-shadow: 0px 4px 16px rgb(0, 0, 0, 0.05);
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);
  background-color: ${colorWhitePrimary};
  z-index: 1001;
  display: grid;
  border-collapse: collapse;

  /* stylelint-disable */
  grid-template-columns: ${({ numberCol }) =>
    `minmax(150px, 1.33fr) repeat(${numberCol - 1}, minmax(150px, 1fr))`};
  /* stylelint-enable */

  thead,
  tbody,
  tr {
    display: contents;
    text-transform: capitalize;
  }
  th,
  td {
    text-overflow: ellipsis;
    white-space: nowrap;
    text-transform: capitalize;
  }
`;

const StyledTableContainer = styled.div`
  position: relative;
  height: 90%;
  min-width: 75%;
  width: 75%;
  margin: 3rem auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;
  #table-settings-dropdown {
    opacity: 0;
  }
  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  :hover #table-settings-dropdown,
  :focus #table-settings-dropdown {
    opacity: 1;
    transition: opacity 0.1s ease-in;
  }
`;

export const TableCompare = () => {
  const userCategoriesById = useAppSelector(selectUserCategoriesById);
  const userTableOptions = useAppSelector(selectUserTableOptions);
  const userCategories = Object.entries(userCategoriesById);
  return (
    <StyledTableContainer>
      <StyledTable numberCol={userTableOptions.length}>
        <HeaderRow />
        {userCategories.length === 0 ? (
          <Loader withLabel />
        ) : (
          <tbody>
            {/* render user categories, which render their own subcategories */}
            {userCategories.map(([catId, { spendings, minimizedSubcats }]) => (
              <CatContext.Provider
                key={catId}
                value={{ catId, spendings, minimize: minimizedSubcats }}
              >
                <TableCompareCategoryRow />
              </CatContext.Provider>
            ))}
          </tbody>
        )}
      </StyledTable>
      <TableSettings />
      <TableAddRowIcon />
    </StyledTableContainer>
  );
};
