import OutsideClickHandler from "react-outside-click-handler";
import styled from "styled-components";
import { selectSubcategories } from "../../../../redux/slices/categoriesSlice";
import {
  addUserSubcategory,
  selectUnusedSubcatsIdsPerCat,
} from "../../../../redux/slices/userSlice";
import { updateCategorySpendings } from "../../../../redux/thunks/userThunks";
import { colorWhitePrimary } from "../../../../styles/colors";
import { useAppDispatch, useAppSelector } from "../../../../utils/hooks";

const AddSubcatDropdownContainer = styled.div`
  position: absolute;
  max-width: 20rem;
  max-height: 15rem;
  overflow-y: scroll;
  border: 1px solid black;
  background-color: ${colorWhitePrimary};
  z-index: 20000;
`;
const AddSubcatDropdownListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  list-style: none;
  cursor: pointer;
`;

type TAddSubcatDropdown = {
  catId: string;
  toggleAddSubcatDropdown: () => void;
};
export const AddSubcatDropdown = ({
  catId,
  toggleAddSubcatDropdown,
}: TAddSubcatDropdown) => {
  const dispatch = useAppDispatch();
  const subcategories = useAppSelector(selectSubcategories);
  const unusedSubcatsIdsPerCat = useAppSelector((state) =>
    selectUnusedSubcatsIdsPerCat(state, catId)
  );

  return (
    <OutsideClickHandler onOutsideClick={toggleAddSubcatDropdown}>
      <AddSubcatDropdownContainer>
        <ul>
          {unusedSubcatsIdsPerCat.map((subcatId) => (
            <AddSubcatDropdownListItem
              key={subcatId}
              onClick={() => {
                toggleAddSubcatDropdown();
                dispatch(
                  updateCategorySpendings({ categoryId: catId, spendings: 0 })
                );
                dispatch(
                  addUserSubcategory({ id: subcatId.toString(), spendings: 0 })
                );
              }}
            >
              {subcategories[subcatId]}
            </AddSubcatDropdownListItem>
          ))}
        </ul>
      </AddSubcatDropdownContainer>
    </OutsideClickHandler>
  );
};
