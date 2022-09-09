import Image from "next/image";
import styled from "styled-components";

const CountryFlagContainer = styled.div`
  position: relative;
  display: grid;
  flex-direction: column;
  width: 4.2rem;
  height: 3rem;
  border: 2px solid black;
  border-radius: 6px;
`;

export const FlagImage = ({ countryName }: { countryName: string }) => {
  console.log(countryName);
  return (
    <CountryFlagContainer>
      <Image
        src={`/flags_flat/SVG/${countryName}@2x.svg`}
        alt={`${countryName} flag`}
        width="100%"
        height="100%"
        layout="responsive"
      />
    </CountryFlagContainer>
  );
};
