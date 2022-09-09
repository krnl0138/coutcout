import { ReactNode } from "react";
import styled from "styled-components";
import { FOOTER_HEIGHT, HEADER_HEIGHT } from "../../styles/constants";
import { Footer } from "./Footer";
import { Header } from "./header/Header";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  /* Provide scroll snap functionality */
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  & section {
    scroll-snap-align: center;
  }
  & #hero-section {
    /* make sure the header stays visible on the page */
    scroll-margin-top: calc(2 * ${HEADER_HEIGHT});
  }
  & #signup-section {
    /* make sure the footer stays visible on the page */
    scroll-margin-bottom: calc(2 * ${FOOTER_HEIGHT});
  }
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </Container>
  );
};
