import { useState } from "react";
import { useSpring, animated, config } from "react-spring";
import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  display: flex;
  justify-content: flex-end;
  font-size: 48rem;
  font-weight: 900;
  z-index: 400;
  color: rgba(130, 128, 206, 0.06);
`;

export const AnimatedCurrency = () => {
  const [flip, set] = useState(false);
  const { number } = useSpring({
    reset: true,
    reverse: flip,
    from: { number: 0 },
    number: 99,
    delay: 400,
    config: { tension: 110, friction: 180 },
    onRest: () => set(!flip),
  });

  return (
    <Container>
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>$
    </Container>
  );
};
