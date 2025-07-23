"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { isValidElement, cloneElement } from "react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

interface ScramblerProps {
  children: React.ReactElement;
}

const Scrambler = ({ children }: ScramblerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const originalText = el.textContent || "";

    // Make sure the original text is set before animating
    el.textContent = originalText;

    gsap.to(el, {
      scrambleText: {
        text: originalText,
        chars: "upperCase",
        speed: 0.3,
      },
      duration: 1.8,
      ease: "expo",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        once: true,
      },
    });
  }, []);

  return isValidElement(children) ? cloneElement(children, { ref }) : null;
};

export default Scrambler;
