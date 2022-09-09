import Image from "next/image";
import { useContext, useState } from "react";
import { CatContext } from "../../../features/tableCompare/CatContext";
import { IconContainer } from "../../IconContainer";
import { AddSubcatDropdown } from "./AddSubcatDropdown";

export const AddSubcat = () => {
  const { catId } = useContext(CatContext);
  const [isOpenSubDropdown, setIsOpenSubDropdown] = useState(false);
  const toggleSubcatsDropdown = () => setIsOpenSubDropdown(!isOpenSubDropdown);
  return (
    <>
      <IconContainer id="table-add-subcategory" onClick={toggleSubcatsDropdown}>
        <Image
          src="/icons/add-circle-fill.svg"
          alt="Plus icon"
          width="15%"
          height="15%"
        />
      </IconContainer>
      {isOpenSubDropdown && (
        <AddSubcatDropdown
          catId={catId}
          toggleAddSubcatDropdown={toggleSubcatsDropdown}
        />
      )}
    </>
  );
};
