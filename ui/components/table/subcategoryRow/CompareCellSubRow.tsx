import { useContext } from "react";
import {
  selectCountrySubcategoriesSpendings,
  selectStatusCountrySpending,
} from "../../../../redux/slices/countriesSlice";
import {
  selectUserCurrency,
  selectUserFilterCountry,
  selectUserPeriod,
} from "../../../../redux/slices/userSlice";
import {
  formatPriceByCurrency,
  getCompareState,
} from "../../../../utils/functions";
import { useAppSelector } from "../../../../utils/hooks";
import { SubcatContext } from "../../../features/tableCompare/SubcatContext";
import { TableDataSubCategory } from "../../../features/tableCompare/TableCompareSubcatRow";
import { Loader } from "../../Loader";
import { TableArrowStyled } from "../TableArrow";

export const CompareCellSubRow = () => {
  const { spendings: userSpendings } = useContext(SubcatContext);
  const userCurrency = useAppSelector(selectUserCurrency);
  const statusCountrySpending = useAppSelector(selectStatusCountrySpending);
  const userPeriod = useAppSelector(selectUserPeriod);
  const countryCompareSubcategories = useAppSelector(
    selectCountrySubcategoriesSpendings
  );
  const userFilterCountry = useAppSelector(selectUserFilterCountry);
  const countrySpendings =
    countryCompareSubcategories[userFilterCountry].spendings;
  const countrySpendingsPerPeriod =
    userPeriod === "month" ? countrySpendings : countrySpendings * 12;
  const compareSpendings = userSpendings - countrySpendingsPerPeriod;

  return (
    <TableDataSubCategory>
      {statusCountrySpending === "loading" ? (
        <Loader />
      ) : (
        <>
          <p>
            {formatPriceByCurrency(Math.abs(compareSpendings), userCurrency)}
          </p>
          <TableArrowStyled variant={getCompareState(compareSpendings)} />
        </>
      )}
    </TableDataSubCategory>
  );
};
