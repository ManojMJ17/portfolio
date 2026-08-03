"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { SplitText } from "gsap/SplitText";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin, SplitText);

const ScrambledSplitText = ({
  text,
  href,
  color,
  classname,
}: {
  text: string;
  href?: string;
  color?: string;
  classname?: string;
}) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topSplit = useRef<any>(null);
  const bottomSplit = useRef<any>(null);
  const router = useRouter();

  // === Scramble on Scroll ===
  useEffect(() => {
    const el = topRef.current;
    if (!el) return;

    const originalText = text;

    // gsap.set(el, { textContent: "" });

    gsap.to(el, {
      scrambleText: {
        text: originalText,
        chars: "upperCase",
        speed: 0.7,
      },
      duration: 2,
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top bottom",
        once: true,
      },
      onComplete: () => {
        topSplit.current = new SplitText(topRef.current, {
          type: "words",
          wordsClass: "word",
        });

        bottomSplit.current = new SplitText(bottomRef.current, {
          type: "words",
          wordsClass: "word",
        });
      },
    });

    return () => {
      topSplit.current?.revert();
      bottomSplit.current?.revert();
    };
  }, []);

  const handleEnter = () => {
    if (!topSplit.current || !bottomSplit.current) return;

    gsap.to(topSplit.current.words, {
      yPercent: -100,
      ease: "back.out",
      stagger: 0.05,
    });

    gsap.to(bottomSplit.current.words, {
      yPercent: -100,
      ease: "back.out",
      stagger: 0.05,
    });
  };

  const handleLeave = () => {
    if (!topSplit.current || !bottomSplit.current) return;

    gsap.to([topSplit.current.words, bottomSplit.current.words], {
      yPercent: 0,
      ease: "back.out",
      stagger: 0.05,
    });
  };

  return (
    <div className="h-[20px] md:h-[30px] lg:h-[32px] xl:h-[34px] overflow-hidden">
      <div
        className={`relative block h-full cursor-pointer ${color ?? "text-black-50"
          }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={() => {
          if (href) router.push(href);
        }}
      >
        <div ref={topRef} className={`top-0 w-full ${classname}`}>
          {text}
        </div>
        <div ref={bottomRef} className={`top-full w-full ${classname}`}>
          {text}
        </div>
      </div>
    </div>
  );
};

export default ScrambledSplitText;
