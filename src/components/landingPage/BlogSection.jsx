import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
gsap.registerPlugin(ScrollTrigger);

const posts = [
  {
    date: "Oct 12, 2026",
    title: "Building reliable desktop automation",
    gradient: "linear-gradient(135deg, #1e1e1e, #3a3a3a)",
  },
  {
    date: "Sep 28, 2026",
    title: "Sandboxing desktop agents for secure enterprise use",
    gradient: "linear-gradient(135deg, #2d2a2a, #d10fb1)",
  },
  {
    date: "Sep 15, 2026",
    title: "Why the browser isn't enough",
    gradient: "linear-gradient(135deg, #0b0f19, #1c2742)",
  },
];

function BlogCard({ date, title, gradient }) {
  const cardRef = useRef(null);

  useGSAP(
    () => {
      const card = cardRef.current;
      if (card) {
        card.onmouseenter = (e) => {
          const card = cardRef.current;
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const xPct = (e.clientX - rect.left) / rect.width - 0.5;
          const yPct = (e.clientY - rect.top) / rect.height - 0.5;

          gsap.to(card, {
            rotateX: -yPct * 7,
            rotateY: xPct * 7,
            scale: 1.03,
            z: 15,
            duration: 0.4,
            ease: "power2.out",
            transformPerspective: 900,
          });
        };

        card.onmouseleave = () => {
          gsap.to(cardRef.current, {
            rotateX: 0,
            rotateY: 0,
            scale: 1,
            z: 0,
            duration: 0.9,
            ease: "elastic.out(1, 0.6)",
          });
          gsap.to(cardRef.current.querySelector(".blog-thumb"), {
            x: 0,
            y: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
          });
        };
      }
    },
    { scope: cardRef },
  );

  return (
    <a
      ref={cardRef}
      href="#"
      className="blog-card rounded-xl overflow-hidden border border-black/30 bg-black/5 h-full block"
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      <div
        className="blog-thumb h-50 w-full"
        style={{ background: gradient }}
      />
      <div className="p-6">
        <span className="block text-[0.85rem] text-muted mb-2">{date}</span>
        <h3 className="text-[1.25rem] font-semibold leading-snug text-foreground-dark">
          {title}
        </h3>
      </div>
    </a>
  );
}

function BlogSection() {
  const gridRef = useRef(null);
  const titleRef = useRef(null);

  useGSAP(
    (context) => {
      const cards = context.selector(".blog-card");
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 60,
        opacity: 0,
        scale: 0.94,
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
            toggleActions: "play none none reverse",
          },
        });
      }
    },
    { scope: titleRef },
  );

  return (
    <section className="py-30 bg-white">
      <div className="max-w-300 mx-auto px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-[2.5rem] font-semibold tracking-[-0.02em] text-black"
          >
            Latest from the blog
          </h2>
        </div>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{ perspective: "1000px" }}
        >
          {posts.map((post) => (
            <BlogCard key={post.title} {...post} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
