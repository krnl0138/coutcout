import { useContext } from "react";
import styled from "styled-components";
import {
  selectUserFilterCountry,
  selectUserSubcatsPerCat,
  selectUserTableOptions,
} from "../../../redux/slices/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { CategoryCellCatRow } from "../../components/table/categoryRow/CategoryCellCatRow";
import { CompareCellCatRow } from "../../components/table/categoryRow/CompareCellCatRow";
import { CountryCellCatRow } from "../../components/table/categoryRow/CountryCellCatRow";
import { SpendingsCellCatRow } from "../../components/table/categoryRow/SpendingsCellCatRow";
import { CatContext } from "./CatContext";
import { SubcatContext } from "./SubcatContext";
import { TableCompareSubcatRow } from "./TableCompareSubcatRow";

// shared styles between the cells
export const TableDataCategory = styled.td`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 2rem 2.5rem 0.5rem;
  font-weight: 700;

  & button,
  & #table-add-subcategory,
  & #table-remove-category {
    display: none;
  }
  &:hover,
  &:focus {
    button {
      display: block;
    }
    #table-add-subcategory,
    #table-remove-category {
      display: flex;
    }
  }
`;

export const TableCompareCategoryRow = () => {
  const userOptions = useAppSelector(selectUserTableOptions);
  const filterCountry = useAppSelector(selectUserFilterCountry);
  const { catId, minimize } = useContext(CatContext);
  const userSubcatsPerCat = useAppSelector((state) =>
    selectUserSubcatsPerCat(state, catId)
  );
  return (
    <>
      <tr>
        {userOptions.includes("category") && <CategoryCellCatRow />}
        {userOptions.includes("spendings") && (
          <SpendingsCellCatRow userSubcatsPerCat={userSubcatsPerCat} />
        )}
        {userOptions.includes("country") && (
          <CountryCellCatRow filterCountry={filterCountry} />
        )}
        {userOptions.includes("compare") && <CompareCellCatRow />}
      </tr>

      {!minimize &&
        userSubcatsPerCat.map(([subcatId, { spendings }]) => (
          <SubcatContext.Provider
            key={subcatId}
            value={{ subcatId, spendings }}
          >
            <TableCompareSubcatRow />
          </SubcatContext.Provider>
        ))}
    </>
  );
};
