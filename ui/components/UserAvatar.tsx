import Image from "next/image";
import styled from "styled-components";
import {
  selectUserAvatar,
  selectUserAvatarStatus,
} from "../../redux/slices/userSlice";
import { useAppSelector } from "../../utils/hooks";
import { Loader } from "./Loader";

const UserAvatarContainer = styled.div`
  position: relative;
  span {
    border-radius: 50%;
  }
`;

type TUserAvatar = {
  onClick?: () => void;
  size?: "small" | "big";
};
export const UserAvatar = ({ onClick, size }: TUserAvatar) => {
  const userAvatar = useAppSelector(selectUserAvatar);
  const avatarStatus = useAppSelector(selectUserAvatarStatus);
  return userAvatar ? (
    <UserAvatarContainer onClick={onClick}>
      {avatarStatus === "loading" ? (
        <Loader />
      ) : (
        <Image
          src={userAvatar}
          alt="User avatar"
          height={size === "big" ? "200px" : "55px"}
          width={size === "big" ? "200px" : "55px"}
        />
      )}
    </UserAvatarContainer>
  ) : null;
};
