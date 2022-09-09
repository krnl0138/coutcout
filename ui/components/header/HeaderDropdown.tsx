import styled from "styled-components";
import Link from "next/link";
import { colorWhitePrimary } from "../../../styles/colors";
import { useOutsideClick } from "../../../utils/hooks";

const DropdownContainer = styled.div`
  position: absolute;
  top: 8.5rem;
  border: 1px solid black;
  background-color: ${colorWhitePrimary};
  z-index: 20000;
`;

const DropdownList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DropdownListItem = styled.li`
  width: 100%;
  padding: 1.5rem;
  font-weight: 400;
  font-size: 1.5rem;
  list-style: none;
  text-transform: capitalize;
  text-align: center;
`;

export const HeaderDropdown = ({
  closeDropdown,
}: {
  closeDropdown: () => void;
}) => {
  console.log("I render");
  const options = ["settings", "logout"];
  const refOutsideClick = useOutsideClick(closeDropdown);
  return (
    <DropdownContainer ref={refOutsideClick}>
      <DropdownList>
        {options.map((option) => (
          <DropdownListItem key={option} onClick={closeDropdown}>
            <Link href={`/${option}`}>
              <a>{option}</a>
            </Link>
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};
