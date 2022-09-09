import styled from "styled-components";
import { PageHeading } from "../ui/components/PageHeading";

const AboutContainer = styled.div`
  padding: 8rem;
`;

const AboutContent = styled.div`
  margin-top: 3.2rem;
`;

const AboutSubheading = styled.h2`
  margin-bottom: 2.4rem;
`;

const About = () => {
  return (
    <AboutContainer>
      <PageHeading>About</PageHeading>
      <AboutContent>
        <AboutSubheading>Description</AboutSubheading>
        <p>
          I created CoûtCoût as a pet project to practice server-side rendering
          concepts. In its core it shows you how people in different cultures
          manage their money. At the same time it may be a simple notebook to
          track down your expenses.
          <br />
          <br />
          There are 9 main categories with 23 subcategories: from transport and
          health to educational courses and retirement plans.
          <br />
          <br />
          At this moment the data is randomly generated and sit in Google&apos;s
          Firebase mocking real-world API-requests. I would like to buy an
          access to <a href="https://www.numbeo.com">Numbeo</a> API in the
          future to provide real prices.
          <br />
          <br />I have built design mockups in Figma for this project and
          provided basic SSR-based NextJS solution on JWT-tokens with Redux as a
          state management, the stack is of course totally unoptimized for the
          tasks as well as the core architectural concept of server routing. It
          was used for education purposes in the first place.
        </p>
      </AboutContent>
    </AboutContainer>
  );
};
export default About;
