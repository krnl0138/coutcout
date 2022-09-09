import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import { useAuth } from "../../../lib/api/authProvider";
import { selectUserUsername } from "../../../redux/slices/userSlice";
import { colorDarkPrimary, colorWhiteSecondary } from "../../../styles/colors";
import { HEADER_HEIGHT } from "../../../styles/constants";
import { PROJECT_NAME, URLS } from "../../../utils/constants";
import { useAppSelector } from "../../../utils/hooks";
import { ButtonStyled } from "../Button";
import { HeaderAvatar } from "./HeaderAvatar";

const HeaderContainer = styled.header`
  min-height: ${HEADER_HEIGHT};
  width: 100%;
  background-color: ${colorWhiteSecondary};
  z-index: 99999;
`;

const HeaderContentDiv = styled.div`
  margin: 0 10rem;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLogo = styled.p`
  color: ${colorDarkPrimary};
  font-size: 2.4rem;
  font-weight: bold;

  &:hover,
  &:focus {
    transform: scale(1.1);
  }
  transition: transform 0.1s ease;
`;

const HeaderNav = styled.nav`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  /* stylelint-disable-next-line a11y/media-prefers-reduced-motion */
  a {
    text-transform: capitalize;
    &:hover {
      transform: scale(1.1);
      text-decoration: underline;
    }
    &:focus {
      transform: scale(1);
    }
    transition: transform 0.1s ease;
  }
`;

const HeaderUsername = styled.p`
  font-weight: 700;
`;

export const Header = () => {
  const router = useRouter();
  const user = useAuth();
  const username = useAppSelector(selectUserUsername);
  const navPagesNonLoggedIn = ["about"];
  const navPagesLoggedIn = ["compare", "search", "about"];
  return (
    <HeaderContainer>
      <HeaderContentDiv>
        <HeaderLogo>
          <Link href={URLS.home}>
            <a>{PROJECT_NAME}</a>
          </Link>
        </HeaderLogo>
        <HeaderNav>
          {(user ? navPagesLoggedIn : navPagesNonLoggedIn).map((option) => (
            <Link href={`/${option}`} key={option}>
              <a>{option}</a>
            </Link>
          ))}
          {user.user?.uid ? (
            <>
              <HeaderUsername>{username}</HeaderUsername>
              <HeaderAvatar />
            </>
          ) : (
            <>
              <ButtonStyled
                variant="outlined"
                onClick={() => router.push(URLS.login)}
              >
                Login
              </ButtonStyled>
              <ButtonStyled
                variant="filled"
                onClick={() => router.push(URLS.register)}
              >
                Sign Up
              </ButtonStyled>
            </>
          )}
        </HeaderNav>
      </HeaderContentDiv>
    </HeaderContainer>
  );
};
