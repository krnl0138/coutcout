import { useContext } from "react";
import { SubcatContext } from "../../../features/tableCompare/SubcatContext";
import { TableDataSubCategory } from "../../../features/tableCompare/TableCompareSubcatRow";
import { TableSpendingsInput } from "../TableSpendingsInput";

export const SpendingsCellSubRow = () => {
  const { subcatId, spendings } = useContext(SubcatContext);
  return (
    <TableDataSubCategory>
      <TableSpendingsInput
        id={subcatId}
        spendings={spendings}
        type="subcategory"
      />
    </TableDataSubCategory>
  );
};
