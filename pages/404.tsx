import Link from "next/link";
import styled from "styled-components";
import { colorWhitePrimary } from "../styles/colors";
import { Blob404Page } from "../ui/components/Blobs";

const StyledBlob404Page = styled(Blob404Page)`
  position: absolute;
`;

const StyledCustom404Heading = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  padding: 5rem;
  border-radius: 2rem;
  background-color: ${colorWhitePrimary};
  box-shadow: 0px 4px 16px rgb(0, 0, 0, 0.05);
  box-shadow: 0px 3px 8px rgb(0, 0, 0, 0.2);
  h1 {
    font-weight: 900;
  }
`;

const StyledCustom404Link = styled.a`
  text-decoration: underline;
`;

const Custom404 = () => {
  return (
    <>
      <StyledBlob404Page />
      <StyledCustom404Heading>
        <h1>
          You have found 404 page.
          <br /> Maybe it is better to go{" "}
          <Link href="/">
            <StyledCustom404Link>home</StyledCustom404Link>
          </Link>
          .
        </h1>
      </StyledCustom404Heading>
    </>
  );
};
export default Custom404;
