import React from "react";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const footerLinks = [
  {
    heading: "Product",
    links: ["Features", "Use Cases", "Pricing"],
  },
  {
    heading: "Resources",
    links: ["Documentation", "API Reference", "Blog"],
  },
  {
    heading: "Company",
    links: ["About", "Careers", "Twitter"],
  },
];

function FooterSection() {
  const footerRef = useRef(null);

  useGSAP(
    (context) => {
      const heading = context.selector("h2");
      const btn = context.selector(".cta-btn");
      if (heading && btn) {
        gsap.from([heading, btn], {
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 50%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
      }
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef} className="bg-black text-white/80 pt-25 pb-10">
      <div className="max-w-300 mx-auto px-10">
        {/* CTA block */}
        <div className="text-center pb-25 border-b border-white/10 mb-16">
          <span className="block w-fit h-fit overflow-hidden mx-auto">
            <h2 className="cta-heading text-[3.5rem] font-semibold tracking-[-0.02em] mb-10 leading-tight text-center">
              Ready to hire your first desktop agent?
            </h2>
          </span>
          <button className="cta-btn outline-none w-fit mx-auto flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-medium text-[0.95rem] hover:scale-[1.02] hover:shadow-lg transition-all duration-200">
            Get Started ↗
          </button>
        </div>

        {/* Copyright */}
        <div className="pt-6  text-[0.85rem] text-white/40 flex justify-center items-center ">
          <p>© 2026 Airi All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default FooterSection;
