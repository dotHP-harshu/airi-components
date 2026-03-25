import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);


const faqs = [
  {
    question: "How does Airi differ from RPA tools?",
    answer:
      'Traditional RPA relies on fragile DOM selectors and API integrations. Airi uses advanced vision models to "see" the screen exactly like a human does, making it incredibly resilient to UI changes and capable of using any software, even legacy desktop apps.',
  },
  {
    question: "Is my data secure in the agent's environment?",
    answer:
      "Yes. Every agent session runs in a distinct, ephemeral, completely sandboxed virtual instance. All data is wiped the moment the workflow finishes. You can encrypt sensitive inputs using our secure vault.",
  },
  {
    question: "Can Airi solve captchas?",
    answer:
      "Absolutely. Because Airi interacts with the screen visually, it can solve visual puzzles and standard captchas using its built-in vision-language models, overcoming common anti-bot measures effortlessly.",
  },
];

function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);
  const answerRefs = useRef([]);
  const listRef = useRef(null);
  const titleRef = useRef(null)

  const{contextSafe} = useGSAP(
    (context) => {
      const items = context.selector(".faq-item");
      gsap.from(items, {
        scrollTrigger: {
          trigger: listRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
      });
    },
    { scope: listRef },
  );


  const toggle =contextSafe( (index) => {
    const answer = answerRefs.current[index];
    if (!answer) return;

    if (openIndex === index) {
      // Close
      gsap.to(answer, {
        height: 0,
        duration: 0.35,
        ease: "power2.inOut",
      });
      setOpenIndex(null);
    } else {
      // Close previously open
      if (openIndex !== null && answerRefs.current[openIndex]) {
        gsap.to(answerRefs.current[openIndex], {
          height: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
      // Open new
      gsap.set(answer, { height: "auto" });
      const fullHeight = answer.scrollHeight;
      gsap.from(answer, {
        height: 0,
        duration: 0.4,
        ease: "power2.out",
      });
      setOpenIndex(index);
    }
  })

  useGSAP(()=>{
    if(titleRef.current){
        gsap.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration:  0.8,
        delay: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }

  }, {scope: titleRef});

  return (
    <section className="pt-30 pb-30 bg-[#F1EFEE]" >
      <div className="max-w-300 mx-auto px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="text-[2.5rem] font-semibold tracking-[-0.02em] text-foreground-dark"
          >
            Frequently asked questions
          </h2>
        </div>

        {/* FAQ List */}
        <div ref={listRef} className="max-w-200 mx-auto">
          {faqs.map(({ question, answer }, i) => (
            <div key={question} className="faq-item border-b border-black/10">
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-8 text-left cursor-pointer bg-transparent border-none"
              >
                <h3 className="text-[1.25rem] font-medium text-foreground-dark pr-6">
                  {question}
                </h3>
                <div className="shrink-0 w-6 h-6 flex items-center justify-center">
                  {openIndex === i ? (
                    <Minus size={18} className="text-foreground-dark" />
                  ) : (
                    <Plus size={18} className="text-foreground-dark" />
                  )}
                </div>
              </button>

              {/* Answer — always in DOM, GSAP controls height */}
              <div
                ref={(el) => (answerRefs.current[i] = el)}
                style={{ height: 0, overflow: "hidden" }}
              >
                <p className="text-[1.05rem] text-muted pb-8 leading-relaxed">
                  {answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FAQs;
