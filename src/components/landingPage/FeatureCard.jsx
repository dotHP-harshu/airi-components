import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React, { useRef } from "react";

function FeatureCard({ icon: Icon, title, desc }) {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (card) {
          
          card.onmouseenter = (e) => {
              const rect = card.getBoundingClientRect();
              const xPct = (e.clientX - rect.left) / rect.width - 0.5;
              const yPct = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(card, {
            rotateX: -yPct * 12,
            rotateY: xPct * 12,
            scale: 1.025,
            z: 20,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };
      }


      card.onmouseleave = () => {
        gsap.to(cardRef.current, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          z: 0,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
        });
      };
    },
    { scope: cardRef },
  );


  return (
    <div
      ref={cardRef}
      className="feature-card bg-white/[0.03] border border-white/[0.08] rounded-2xl p-12 hover:bg-white/[0.06] hover:border-white/[0.14] transition-[background-color,border-color] duration-300 cursor-default"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div className="w-12 h-12 rounded-xl bg-white/10 text-white flex items-center justify-center mb-6">
        <Icon size={22} />
      </div>
      <h3 className="text-[1.5rem] font-semibold mb-4 text-white">{title}</h3>
      <p className="text-[1.05rem] text-white/70 leading-relaxed">{desc}</p>
    </div>
  );
}

export default FeatureCard;
