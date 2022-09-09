import { selectCountriesList } from "../../../../redux/slices/countriesSlice";
import { useAppSelector } from "../../../../utils/hooks";
import { TableDataCategory } from "../../../features/tableCompare/TableCompareCatRow";
import { FlagImage } from "../../FlagImage";

export const CountryCellCatRow = ({
  filterCountry,
}: {
  filterCountry: string;
}) => {
  const countriesList = useAppSelector(selectCountriesList);
  const countryName = countriesList[filterCountry];
  return (
    <TableDataCategory>
      <FlagImage countryName={countryName} />
    </TableDataCategory>
  );
};
