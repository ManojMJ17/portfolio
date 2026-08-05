"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { isValidElement, cloneElement } from "react";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

interface ScramblerProps {
  children: React.ReactElement<{ ref?: React.Ref<HTMLElement> }>;
}

const Scrambler = ({ children }: ScramblerProps) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const originalText = el.textContent || "";

    // Make sure the original text is set before animating
    el.textContent = originalText;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(el, {
      scrambleText: {
        text: originalText,
        chars: "upperCase",
        speed: 0.5,
      },
      duration: 1.5,
      ease: "power4.inOut",
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
