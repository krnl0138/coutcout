import styled, { css } from "styled-components";
import { dbInterface } from "../../../lib/api/dbInterface";
import { selectCategories } from "../../../redux/slices/categoriesSlice";
import { selectUnusedCatsIds } from "../../../redux/slices/userSlice";
import { colorWhitePrimary } from "../../../styles/colors";
import {
  useAppDispatch,
  useAppSelector,
  useOutsideClick,
} from "../../../utils/hooks";

type TCatDropdown = { bottom: boolean };
const CategoryDropdownContainer = styled.div<TCatDropdown>`
  position: absolute;
  display: inline-block;
  ${({ bottom }) =>
    bottom
      ? css`
          top: 100%;
          left: 100%;
        `
      : css`
          top: 6rem;
          left: 16rem;
        `}
  max-width: 20rem;
  max-height: 15rem;
  overflow-y: scroll;
  border: 1px solid black;
  background-color: ${colorWhitePrimary};
  z-index: 20000;
`;

const CategoryDropdownListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: 400;
  font-size: 1.5rem;
  list-style: none;
  cursor: pointer;
`;

export const AddCatDropdown = ({
  bottom = false,
  onCloseDropdown,
}: {
  bottom?: boolean;
  onCloseDropdown: () => void;
}) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const refOutsideClick = useOutsideClick(onCloseDropdown);
  const unusedCatsIds = useAppSelector(selectUnusedCatsIds);
  const { dbUpdateCategorySpendingsThunk } = dbInterface();
  const handleOnClick = (id: string) => {
    dispatch(dbUpdateCategorySpendingsThunk({ id, spendings: 0 }));
    onCloseDropdown();
  };

  return (
    <CategoryDropdownContainer bottom={bottom} ref={refOutsideClick}>
      <ul>
        {unusedCatsIds.map((catId) => (
          <CategoryDropdownListItem
            key={catId}
            onClick={() => handleOnClick(catId.toString())}
          >
            {categories[catId]}
          </CategoryDropdownListItem>
        ))}
      </ul>
    </CategoryDropdownContainer>
  );
};
