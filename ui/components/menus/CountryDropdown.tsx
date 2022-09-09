import styled from "styled-components";
import { selectCountriesList } from "../../../redux/slices/countriesSlice";
import { setFilterCountry } from "../../../redux/slices/userSlice";
import { getCountrySpendings } from "../../../redux/thunks/countriesThunks";
import { userUpdateData } from "../../../redux/thunks/userThunks";
import { colorWhitePrimary } from "../../../styles/colors";
import {
  useAppDispatch,
  useAppSelector,
  useOutsideClick,
} from "../../../utils/hooks";
import { FlagImage } from "../FlagImage";

const CountryDropdownContainer = styled.div`
  position: absolute;
  top: 80%;
  left: 35%;
  max-width: 20rem;
  max-height: 15rem;
  overflow-y: scroll;
  border: 1px solid black;
  background-color: ${colorWhitePrimary};
  z-index: 30000;
  cursor: pointer;
`;
const CountryDropdownListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  font-weight: 400;
  font-size: 1.6rem;
  list-style: none;
  text-transform: capitalize;
`;

export const CountryDropdown = ({
  onCloseDropdown,
  global,
  type = "location",
}: {
  onCloseDropdown: () => void;
  global?: boolean;
  type?: "filter" | "location";
}) => {
  const dispatch = useAppDispatch();
  const countriesList = useAppSelector(selectCountriesList);
  const countriesListEntries = Object.entries(countriesList);
  const refOutsideClick = useOutsideClick(onCloseDropdown);

  /** Update filter country in the database or on the client view */
  const handleOnClick = (countryId: string) => {
    onCloseDropdown();
    dispatch(getCountrySpendings(countryId));
    global
      ? dispatch(
          userUpdateData({
            [type === "location" ? "country" : "countryFilter"]: countryId,
          })
        )
      : dispatch(setFilterCountry(countryId));
  };

  return (
    <CountryDropdownContainer ref={refOutsideClick}>
      <ul>
        {countriesListEntries.map(([countryId, countryName]) => (
          <CountryDropdownListItem
            key={`${countryId}_${countryName}`}
            onClick={() => handleOnClick(countryId)}
          >
            <FlagImage countryName={countryName} />
            {countryName}
          </CountryDropdownListItem>
        ))}
      </ul>
    </CountryDropdownContainer>
  );
};
