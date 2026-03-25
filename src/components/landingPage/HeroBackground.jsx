import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";

function HeroBackground() {
  const [totalBoxes, setTotalBoxes] = useState(0);
  const bgRef = useRef(null);

  useEffect(() => {
    const calculate = () => {
      const rows = Math.ceil(window.innerHeight / 20); // 20px
      const cols = Math.ceil(window.innerWidth / 20); // 20px
      setTotalBoxes(cols * rows);
    };
    calculate();
    window.addEventListener("resize", calculate);

    return () => {
      window.removeEventListener("resize", calculate);
    };
  }, []);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray(".boxes");
      boxes.forEach((box) => {
        box.onmouseenter = () => {
          gsap.to(box, {
            backgroundColor: "#000",
            duration: 0.1,
            ease: "power2.inOut",
          });
        };
        box.onmouseleave = () => {
          gsap.to(box, {
            backgroundColor: "transparent",
            duration: 1,
            ease: "power2.inOut",
          });
        };
      });
    },
    { scope: bgRef, dependencies: [totalBoxes] },
  );

  return (
    <div
      ref={bgRef}
      className="grid grid-cols-[repeat(auto-fill,20px)] absolute inset-0"
    >
      {totalBoxes > 0 &&
        Array.from({ length: totalBoxes }).map((_, i) => (
          <div
            key={i}
            className="boxes w-5 h-5 border border-border-default"
          ></div>
        ))}
    </div>
  );
}

export default HeroBackground;
