import Link from "next/link";
import styled from "styled-components";
import { useAuth } from "../../lib/api/authProvider";
import { colorDarkPrimary, colorWhiteSecondary } from "../../styles/colors";
import { FOOTER_HEIGHT } from "../../styles/constants";

const FooterContainer = styled.footer`
  width: 100%;
  min-height: ${FOOTER_HEIGHT};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: ${colorWhiteSecondary};
  z-index: 99999;
`;
const FooterContentDiv = styled.div`
  position: relative;
`;
const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 2.4rem;
  margin-bottom: 1.6rem;
  a {
    text-transform: capitalize;
  }
`;
const FooterLogo = styled.p`
  color: ${colorDarkPrimary};
  font-size: 1.6rem;
  text-align: center;
`;

export const Footer = () => {
  const { user } = useAuth();
  const navPagesNonLoggedIn = ["home", "about"];
  const navPagesLoggedIn = ["home", "compare", "search", "settings", "about"];

  return (
    <FooterContainer>
      <FooterContentDiv>
        <FooterNav>
          {(user ? navPagesLoggedIn : navPagesNonLoggedIn).map((option) => (
            <Link href={`/${option === "home" ? "" : option}`} key={option}>
              <a>{option}</a>
            </Link>
          ))}
        </FooterNav>
        <FooterLogo>© 2022 CoûtCoût</FooterLogo>
      </FooterContentDiv>
    </FooterContainer>
  );
};
