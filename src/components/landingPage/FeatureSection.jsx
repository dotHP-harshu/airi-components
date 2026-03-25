import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import FeatureMarquee from "./FeatureMarquee";
import FeatureCard from "./FeatureCard";
import { Monitor, Settings2, UserCheck, Cloud } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Monitor,
    title: "A complete computer",
    desc: "Our agents run in isolated sandbox environments with full access to browsers, terminals, and software just like a human.",
  },
  {
    icon: Settings2,
    title: "Fine-grained control",
    desc: "Define exactly what apps the agent can see and interact with, keeping your data secure and bounded.",
  },
  {
    icon: UserCheck,
    title: "Human-in-the-loop",
    desc: "Pause workflows automatically for manual human confirmation on destructive or sensitive actions.",
  },
  {
    icon: Cloud,
    title: "Cloud infrastructure",
    desc: "Scale from a single agent to thousands across our scalable cloud container infrastructure effortlessly.",
  },
];

function FeatureSection() {
  const gridRef = useRef(null);
  const titleRef = useRef(null);
  useGSAP(
    (context) => {
      const cards = context.selector(".feature-card");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 50%",
          toggleActions: "play none none reverse",
        },
        y: 70,
        opacity: 0,
        duration: 0.85,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: gridRef },
  );
  
  useGSAP(
    () => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    },
    { scope: titleRef },
  );
  return (
    <section className="py-30 bg-black text-white" id="features">
      <div className="max-w-300 mx-auto px-10">
        {/* Header */}
        <div className="mb-4 text-center">
          <h2
            ref={titleRef}
            className="text-5xl font-semibold tracking-[-0.02em] text-white/60"
          >
            Why a Desktop Agent
          </h2>
        </div>

        {/* Marquee */}
        <FeatureMarquee />

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4"
          style={{ perspective: "1200px" }}
        >
          {features.map((f) => (
            <FeatureCard key={f.title} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
