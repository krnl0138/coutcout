import Link from "next/link";
import styled from "styled-components";
import { colorWhitePrimary } from "../styles/colors";
import { Blob404Page } from "../ui/components/Blobs";

const StyledBlob500Page = styled(Blob404Page)`
  position: absolute;
`;

const StyledCustom500Heading = styled.div`
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

const StyledCustom500Link = styled.a`
  text-decoration: underline;
`;

const Custom500 = () => {
  return (
    <>
      <StyledBlob500Page />
      <StyledCustom500Heading>
        <h1>
          Internal Server Error occured.. Something is really wrong.
          <Link href="/">
            <StyledCustom500Link>Home</StyledCustom500Link>
          </Link>{" "}
          is a safe spot..
        </h1>
      </StyledCustom500Heading>
    </>
  );
};
export default Custom500;
