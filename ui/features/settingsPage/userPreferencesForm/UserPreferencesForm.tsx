import styled from "styled-components";
import {
  selectUserCountry,
  selectUserFilterCountry,
} from "../../../../redux/slices/userSlice";
import {
  colorWhitePrimary,
  colorWhiteSecondary,
} from "../../../../styles/colors";
import { useAppSelector } from "../../../../utils/hooks";
import { CountryInput } from "./CountryInput";
import { CurrencyInput } from "./CurrencyInput";
import { PeriodInput } from "./PeriodInput";

const UserPreferencesContainer = styled.div`
  padding: 4rem 12rem 4rem 4rem;
  position: relative;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  max-width: 50rem;
  gap: 0.8rem;
  background-color: ${colorWhitePrimary};
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);

  &:hover,
  &:focus {
    background-color: ${colorWhiteSecondary};
    box-shadow: rgb(0 0 0 / 24%) 0px 3px 8px;
  }
  transition: background-color 0.1s, box-shadow 0.1s;
`;

const Heading = styled.h2`
  font-size: 3.2rem;
  font-weight: 900;
  margin-bottom: 3.6rem;
`;

const PreferencesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

type TUserPreferencesForm = { className?: string };
export const UserPreferencesForm = ({ className }: TUserPreferencesForm) => {
  const filterCountryId = useAppSelector(selectUserFilterCountry);
  const locationCountryId = useAppSelector(selectUserCountry);

  return (
    <UserPreferencesContainer className={className}>
      <Heading>Preferences</Heading>
      <PreferencesContainer>
        <CountryInput type="filter" countryId={filterCountryId} />
        <CountryInput type="location" countryId={locationCountryId} />
        <CurrencyInput />
        <PeriodInput />
      </PreferencesContainer>
    </UserPreferencesContainer>
  );
};
