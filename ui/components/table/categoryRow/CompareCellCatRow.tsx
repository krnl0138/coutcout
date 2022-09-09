import { useContext } from "react";
import {
  selectCountryCategoriesSpendings,
  selectStatusCountrySpending,
} from "../../../../redux/slices/countriesSlice";
import {
  selectUserCurrency,
  selectUserPeriod,
} from "../../../../redux/slices/userSlice";
import {
  formatPriceByCurrency,
  getCompareState,
} from "../../../../utils/functions";
import { useAppSelector } from "../../../../utils/hooks";
import { CatContext } from "../../../features/tableCompare/CatContext";
import { TableDataCategory } from "../../../features/tableCompare/TableCompareCatRow";
import { Loader } from "../../Loader";
import { TableArrowStyled } from "../TableArrow";

export const CompareCellCatRow = () => {
  const { catId, spendings: userSpendings } = useContext(CatContext);
  const userCurrency = useAppSelector(selectUserCurrency);
  const statusCountrySpending = useAppSelector(selectStatusCountrySpending);
  const userPeriod = useAppSelector(selectUserPeriod);
  const countryCompareCategories = useAppSelector(
    selectCountryCategoriesSpendings
  );
  const countrySpending = countryCompareCategories[catId].spendings;
  const countrySpendings =
    userPeriod === "month" ? countrySpending : Math.floor(countrySpending * 12);
  const compare = userSpendings - countrySpendings;
  return (
    <TableDataCategory>
      {statusCountrySpending === "loading" ? (
        <Loader />
      ) : (
        <>
          <p>{formatPriceByCurrency(Math.abs(compare), userCurrency)}</p>
          <TableArrowStyled variant={getCompareState(compare)} />
        </>
      )}
    </TableDataCategory>
  );
};
