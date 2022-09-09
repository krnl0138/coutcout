import styled, { keyframes } from "styled-components";
import { PageHeading } from "../../components/PageHeading";
import { UpdateUserForm } from "./updateUserForm/UpdateUserForm";
import { UserPreferencesForm } from "./userPreferencesForm/UserPreferencesForm";
import { SettingsUserInfo } from "./SettingsUserInfo";
import { StyledBlobSettings } from "../../components/Blobs";

const SettingsPageContainer = styled.div`
  position: relative;
  margin: 6.4rem 10% 0;
  padding-bottom: 16rem;
  display: grid;
  column-gap: 5%;
  row-gap: 10%;
  grid-template-areas:
    "A B"
    "C D";
  @media (max-width: 900px) {
    place-items: center;
    grid-template-areas:
      "A"
      "B"
      "C"
      "D";
  }
  z-index: 1000;
  overflow: hidden;
`;

const GridPageHeading = styled(PageHeading)`
  grid-area: A;
`;

const GridSettingsUserInfo = styled(SettingsUserInfo)`
  grid-area: B;
`;

const GridUserPreferencesForm = styled(UserPreferencesForm)`
  grid-area: C;
  place-self: flex-start;
  margin-top: -15rem;
  @media (max-width: 900px) {
    place-self: center;
    margin-top: 0;
  }
`;

const GridUpdateUserForm = styled(UpdateUserForm)`
  grid-area: D;
  place-self: center;
`;

const rotate = keyframes`
  from {
    transform: translate(0,0) rotate(0deg);
  }
  to {
    transform: translate(250%,-250%) rotate(360deg);
  }
`;

export const SettingsPage = () => {
  return (
    <SettingsPageContainer>
      <GridPageHeading>Settings</GridPageHeading>
      <GridSettingsUserInfo />
      <GridUserPreferencesForm />
      <GridUpdateUserForm />
      <StyledBlobSettings />
    </SettingsPageContainer>
  );
};
