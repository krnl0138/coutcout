import { useContext } from "react";
import { selectCategories } from "../../../../redux/slices/categoriesSlice";
import {
  selectUnusedSubcatsIdsPerCat,
  toggleUserMinizeSubcategories,
} from "../../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { CatContext } from "../../../features/tableCompare/CatContext";
import { TableDataCategory } from "../../../features/tableCompare/TableCompareCatRow";
import { TableExpandButton } from "../TableExpandButton";
import { AddSubcat } from "./AddSubcat";
import { RemoveCat } from "./RemoveCat";

export const CategoryCellCatRow = () => {
  const dispatch = useAppDispatch();
  const { catId } = useContext(CatContext);
  const categoriesList = useAppSelector(selectCategories);
  const categoryName = categoriesList[catId];
  const unusedSubcatsPerCategory = useAppSelector((state) =>
    selectUnusedSubcatsIdsPerCat(state, catId)
  );

  return (
    <TableDataCategory>
      {categoryName}
      <TableExpandButton
        onClick={() => dispatch(toggleUserMinizeSubcategories({ id: catId }))}
      />

      {unusedSubcatsPerCategory.length > 0 && <AddSubcat />}
      <RemoveCat />
    </TableDataCategory>
  );
};
