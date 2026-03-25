import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import HeroBackground from "./HeroBackground";

function HeroSection() {
  const heroRef = useRef(null);
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-title", { y: 100, opacity: 0, duration: 1, delay: 0.5 })
        .from(".subtitle", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".cta", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4");
    },
    { scope: heroRef },
  );
  return (
    <section
      ref={heroRef}
      className="min-h-screen pt-40 pb-20 px-5 flex flex-col items-center text-center bg-white relative overflow-hidden"
    >
      <HeroBackground />
      {/* Title */}
      <div className="w-fit h-fit overflow-hidden">
        <h1 className="hero-title text-6xl font-semibold max-w-4xl mb-6 text-[#2D2A2A] relative">
          Desktop agents that use computers
          <span className="block bg-linear-to-t from-[#D10FB1] via-[#5C004C] to-[#2D2A2A] bg-clip-text text-transparent">
            like a human — at cloud scale.
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p className="subtitle text-[1.25rem] text-muted max-w-175 mb-10 leading-relaxed">
        Describe a task and have our agents automate across multiple apps by
        looking at the screen, then clicking and typing through the UI. Scale
        from one to hundreds of agents in seconds.
      </p>

      {/* CTA */}
      <div className="cta">
        <a
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-black text-white font-medium text-[0.95rem] hover:scale-[1.02] hover:shadow-lg transition-all duration-200"
        >
          Get Started ↗
        </a>
      </div>
    </section>
  );
}

export default HeroSection;
