import { useContext } from "react";
import {
  selectSubcatsIdsPerCat,
  selectUserCurrency,
} from "../../../../redux/slices/userSlice";
import { formatPriceByCurrency } from "../../../../utils/functions";
import { useAppSelector } from "../../../../utils/hooks";
import { CatContext } from "../../../features/tableCompare/CatContext";
import { TableDataCategory } from "../../../features/tableCompare/TableCompareCatRow";
import { TableSpendingsInput } from "../TableSpendingsInput";

export const SpendingsCellCatRow = ({
  userSubcatsPerCat,
}: {
  userSubcatsPerCat: Array<[string, { spendings: number }]>;
}) => {
  const { catId, spendings } = useContext(CatContext);
  const userCurrency = useAppSelector(selectUserCurrency);
  const subcatsPerCat = useAppSelector((state) =>
    selectSubcatsIdsPerCat(state, catId)
  );
  const getSumSubcatsSpendings = () =>
    userSubcatsPerCat.reduce((acc, [_, { spendings }]) => acc + spendings, 0);
  return (
    <TableDataCategory>
      {/* If this is a category wo/ subcategories allow to use the 
      field as an input otherwise just print a formatted value */}
      {subcatsPerCat.length === 0 ? (
        <TableSpendingsInput id={catId} spendings={spendings} type="category" />
      ) : (
        <p>{formatPriceByCurrency(getSumSubcatsSpendings(), userCurrency)}</p>
      )}
    </TableDataCategory>
  );
};
