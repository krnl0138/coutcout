import styled, { keyframes } from "styled-components";
import { colorWhitePrimary } from "../../styles/colors";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledLoader = styled.div`
  display: inline-block;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  box-shadow: 4px -10px 10px 1px rgb(26, 117, 206) inset;
  background: linear-gradient(to right, rgb(22, 113, 202) 50%, transparent 50%);
  animation: ${spin} 1.1s infinite linear;
  &:before {
    display: block;
    content: "";
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: ${colorWhitePrimary};
    border-radius: 50%;
  }
`;

export const Loader = ({ withLabel }: { withLabel?: boolean }) => {
  return (
    <Container>
      <StyledLoader />
      {withLabel && <p>Loading..</p>}
    </Container>
  );
};
