import Image from "next/image";
import { useContext } from "react";
import { dbInterface } from "../../../../lib/api/dbInterface";
import { useAppDispatch } from "../../../../utils/hooks";
import { CatContext } from "../../../features/tableCompare/CatContext";
import { IconContainer } from "../../IconContainer";

export const RemoveCat = () => {
  const dispatch = useAppDispatch();
  const { catId } = useContext(CatContext);
  const { dbDeleteCategorySpendingsThunk } = dbInterface();
  const deleteCategory = () =>
    dispatch(dbDeleteCategorySpendingsThunk({ catId }));

  return (
    <IconContainer id="table-remove-category" onClick={deleteCategory}>
      <Image
        src="/icons/close-circle-line.svg"
        alt="Plus icon"
        width="15%"
        height="15%"
      />
    </IconContainer>
  );
};
