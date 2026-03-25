import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const cases = [
  {
    badge: "Security",
    title: "Handling secure logins with 2FA",
    desc: "By visually observing the screen, Airi can navigate complex login flows, resolve captchas, and handle two-factor authentication just as a user would, without touching backend APIs.",
    image: "/use-case-login.png",
    alt: "2FA Login Flow",
    reverse: false,
  },
  {
    badge: "Development",
    title: "Automating development workflows",
    desc: "Assign tasks like running migrations, executing test suites in external environments, or deploying code. The agent types out commands and reads the output directly.",
    image: "/use-case-dev.png",
    alt: "Development Workflow",
    reverse: true,
  },
  {
    badge: "Research",
    title: "Technical research & data extraction",
    desc: "Have Airi open hundreds of browser tabs, read through technical documentation PDFs, and extract precise contextual information into structured formats.",
    image: "/use-case-research.png",
    alt: "Technical Research",
    reverse: false,
  },
];

function UseCaseRow({ badge, title, desc, image, alt, reverse }) {
  const rowRef = useRef(null);

  useGSAP(
    (context) => {
      const textEl = context.selector(".uc-text");
      const imgContainer = context.selector(".uc-visual");
      const imgEl = context.selector("img");

      // Text: slide in from side
      gsap.from(textEl, {
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 78%",
          toggleActions: "play none none reverse",
        },
        x: reverse ? 60 : -60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      // Image container: clip-path wipe reveal
      gsap.fromTo(
        imgContainer,
        { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.3,
          delay: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Inner image: parallax scrub (scale up for overflow space)
      if (imgEl) {
        gsap.set(imgEl, { scale: 1.15 });
        gsap.to(imgEl, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    },
    { scope: rowRef, dependencies: [reverse] },
  );

  return (
    <div
      ref={rowRef}
      className={`flex items-center gap-20 mb-40 last:mb-0 ${
        reverse
          ? "flex-col-reverse md:flex-row-reverse"
          : "flex-col md:flex-row"
      }`}
    >
      {/* Text */}
      <div className="uc-text flex-1">
        <div className="inline-block px-4 py-1.5 bg-black/6 rounded-full text-[0.85rem] font-semibold uppercase tracking-[0.05em] mb-6">
          {badge}
        </div>
        <h2 className="text-[2.5rem] font-semibold mb-6 leading-[1.1] tracking-[-0.02em] text-foreground-dark">
          {title}
        </h2>
        <p className="text-[1.15rem] text-muted mb-8 leading-relaxed">{desc}</p>
        <a
          href="#"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-black/20 text-black font-medium text-[0.95rem] transition-all duration-200 hover:bg-black hover:text-white"
        >
          Watch Demo
        </a>
      </div>

      {/* Image */}
      <div className="uc-visual flex-[1.2] rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.08)] border border-black/8">
        <img src={image} alt={alt} className="w-full block object-cover" />
      </div>
    </div>
  );
}

function UsecaseSection() {
  const usecaseSectionRef = useRef(null);

  useGSAP(
    (d) => {
      const titleSection =
        usecaseSectionRef.current.querySelector(".title-section");
      if (titleSection) {
        gsap.from(
          titleSection,
          {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleSection,
              start: "top 65%",
              end: "bottom top",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: usecaseSectionRef },
  );

  return (
    <section ref={usecaseSectionRef} className="py-10 bg-[#f1efee] text-black">
      <div className="title-section w-full max-w-300 mx-auto py-10 pb-20 mb-10">
        <h1 className="text-5xl font-semibold text-center ">Use Cases</h1>
        <p className="text-center text-lg">
          Explore how Airi can transform your workflow
        </p>
      </div>
      <div className="max-w-300 mx-auto px-10 mt-20">
        {cases.map((c, i) => (
          <UseCaseRow key={c.title} {...c} index={i} />
        ))}
      </div>
    </section>
  );
}

export default UsecaseSection;
