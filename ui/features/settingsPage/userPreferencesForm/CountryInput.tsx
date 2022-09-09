import { useState } from "react";
import styled from "styled-components";
import { selectCountriesList } from "../../../../redux/slices/countriesSlice";
import { useAppSelector } from "../../../../utils/hooks";
import { CountryDropdown } from "../../../components/menus/CountryDropdown";
import { TableExpandButton } from "../../../components/table/TableExpandButton";

const Container = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.8rem;
  p {
    text-transform: capitalize;
  }
`;

const Title = styled.p`
  font-size: 2.4rem;
  font-weight: 700;
`;

const Option = styled.p`
  font-size: 1.8rem;
  font-weight: 400;
`;

const WrapperDivRelative = styled.div`
  position: relative;
`;

type TCountryInput = { type: "filter" | "location"; countryId: string };
export const CountryInput = ({ type, countryId }: TCountryInput) => {
  const allCountries = useAppSelector(selectCountriesList);
  const countryName = allCountries[countryId];
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);
  return (
    <Container>
      <Title>
        {type === "filter" ? "Filter Country" : "Location Country"}:
      </Title>
      <Option>{countryName}</Option>
      <WrapperDivRelative>
        <TableExpandButton
          onClick={(e) => {
            // make non-clickable if dropdown is open
            e.stopPropagation();
            handleOpen();
          }}
        />
        {isOpen && (
          <CountryDropdown
            type={type}
            global={true}
            onCloseDropdown={handleOpen}
          />
        )}
      </WrapperDivRelative>
    </Container>
  );
};
