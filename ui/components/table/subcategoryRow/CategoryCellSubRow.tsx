import Image from "next/image";
import { useContext } from "react";
import { dbInterface } from "../../../../lib/api/dbInterface";
import { selectSubcategories } from "../../../../redux/slices/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";
import { SubcatContext } from "../../../features/tableCompare/SubcatContext";
import { TableDataSubCategory } from "../../../features/tableCompare/TableCompareSubcatRow";
import { IconContainer } from "../../IconContainer";

export const CategoryCellSubRow = () => {
  const dispatch = useAppDispatch();
  const { subcatId } = useContext(SubcatContext);
  const subcategories = useAppSelector(selectSubcategories);
  const subcatName = subcategories[subcatId];
  const { dbDeleteSubcategorySpendingsThunk } = dbInterface();
  const removeSubcategory = () =>
    dispatch(dbDeleteSubcategorySpendingsThunk({ subcatId }));
  return (
    <TableDataSubCategory>
      {subcatName}
      <IconContainer id="table-remove-subcategory" onClick={removeSubcategory}>
        <Image
          src="/icons/close-circle-line.svg"
          alt="Plus icon"
          width="15%"
          height="15%"
        />
      </IconContainer>
    </TableDataSubCategory>
  );
};
