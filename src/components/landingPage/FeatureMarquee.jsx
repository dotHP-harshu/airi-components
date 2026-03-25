import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

const MARQUEE_TAGS = [
  "Vision AI",
  "Screen Reader",
  "Cloud Scale",
  "Sandboxed Agents",
  "Multi-Agent",
  "100ms Latency",
  "Enterprise Ready",
  "CAPTCHA Solver",
  "2FA Support",
  "Human-in-the-Loop",
  "Desktop Automation",
  "Open Source",
];

function FeatureMarquee() {
  const trackRef = useRef(null);

  useGSAP(
    () => {
      if (trackRef.current) {
        gsap.to(trackRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 28,
          repeat: -1,
        });
      }
    },
    { scope: trackRef },
  );


  const doubled = [...MARQUEE_TAGS, ...MARQUEE_TAGS];

  return (
    <div className="overflow-hidden my-10 py-5 border-y border-white/[0.07]">
      <div ref={trackRef} className="flex w-max">
        {doubled.map((tag, i) => (
          <span key={i} className="inline-flex items-center shrink-0">
            <span className="text-[0.75rem] text-white/35 uppercase tracking-[0.12em] font-medium px-5">
              {tag}
            </span>
            <span className="text-accent/40 text-xs">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default FeatureMarquee;
