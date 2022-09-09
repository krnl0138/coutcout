import { useRef } from "react";
import styled from "styled-components";
import { dbInterface } from "../../../lib/api/dbInterface";
import { selectUserUsername } from "../../../redux/slices/userSlice";
import { userUploadAvatar } from "../../../redux/thunks/userThunks";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import { UserAvatar } from "../../components/UserAvatar";

const UserInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoUsername = styled.p`
  font-weight: 700;
  font-size: 2.4rem;
`;

export const SettingsUserInfo = ({ className }: { className?: string }) => {
  const dispatch = useAppDispatch();
  const username = useAppSelector(selectUserUsername);
  const inputFile = useRef<HTMLInputElement>(null);
  // Triggers 'click' event on hidden input
  // to mock avatar container as an file input
  const onImageClick = () => {
    if (!inputFile.current) return;
    inputFile.current.click();
  };

  const handleInputChange = () => {
    if (!inputFile.current) return;
    const file = inputFile.current.files?.[0];
    if (!file) return;
    dispatch(userUploadAvatar({ file }));
  };

  return (
    <UserInfoContainer className={className}>
      <div onClick={onImageClick}>
        <UserAvatar size="big" />
      </div>
      <UserInfoUsername>{username}</UserInfoUsername>
      <p>(click on avatar to change)</p>
      {/* hidden input used to store and upload new images */}
      <input
        type="file"
        id="user-avatar-file"
        ref={inputFile}
        style={{ display: "none" }}
        onChange={handleInputChange}
      />
    </UserInfoContainer>
  );
};
