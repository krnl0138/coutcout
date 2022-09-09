import styled from "styled-components";
import { selectUserTableOptions } from "../../../redux/slices/userSlice";
import { useAppSelector } from "../../../utils/hooks";
import { CategoryCellSubRow } from "../../components/table/subcategoryRow/CategoryCellSubRow";
import { CompareCellSubRow } from "../../components/table/subcategoryRow/CompareCellSubRow";
import { SpendingsCellSubRow } from "../../components/table/subcategoryRow/SpendingsCellSubRow";

// shared styles for all cells
export const TableDataSubCategory = styled.td`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  &:first-of-type {
    padding: 1rem 3.5rem;
  }
  padding: 1rem 2.5rem;

  & #table-remove-subcategory {
    display: none;
  }
  &:hover,
  &:focus {
    #table-remove-subcategory {
      display: flex;
    }
  }
`;

export const TableCompareSubcatRow = () => {
  const userOptions = useAppSelector(selectUserTableOptions);
  return (
    <tr>
      {userOptions.includes("category") && <CategoryCellSubRow />}
      {userOptions.includes("spendings") && <SpendingsCellSubRow />}
      {userOptions.includes("country") && <TableDataSubCategory />}
      {userOptions.includes("compare") && <CompareCellSubRow />}
    </tr>
  );
};
