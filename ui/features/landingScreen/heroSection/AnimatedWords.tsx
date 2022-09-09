import { useState } from "react";
import { useSpring, animated, easings } from "react-spring";

export const AnimatedWords = () => {
  const [flip, set] = useState(false);
  const words = [
    "restaurants",
    "insurance",
    "clothing",
    "education",
    "travelling",
    "heath",
    "investments",
    "obligations",
    "transport",
  ];

  const { scroll } = useSpring({
    scroll: (words.length - 1) * 80,
    from: { scroll: 0 },
    reset: true,
    reverse: flip,
    delay: 300,
    config: {
      mass: 15,
      tension: 140,
      friction: 45,
      easing: easings.easeInOutQuart,
    },
    onRest: () => set(!flip),
  });
  return (
    <animated.div
      style={{
        position: "relative",
        width: "100%",
        height: "7rem",
        overflow: "hidden",
        fontSize: "4.8rem",
      }}
      scrollTop={scroll}
    >
      {words.map((word, i) => (
        <div
          key={`${word}_${i}`}
          style={{ width: "100%", textAlign: "center" }}
        >
          {word}
        </div>
      ))}
    </animated.div>
  );
};
