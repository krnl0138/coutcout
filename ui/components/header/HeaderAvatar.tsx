import { useState } from "react";
import styled from "styled-components";
import { UserAvatar } from "../UserAvatar";
import { HeaderDropdown } from "./HeaderDropdown";

const HeaderAvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderAvatar = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const toggleDropdown = () => {
    setIsOpenDropdown(!isOpenDropdown);
  };
  return (
    <HeaderAvatarContainer>
      {/* Stop event propagation in order to handle outside clicks */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleDropdown();
        }}
      >
        <UserAvatar />
      </div>
      {isOpenDropdown && <HeaderDropdown closeDropdown={toggleDropdown} />}
    </HeaderAvatarContainer>
  );
};
