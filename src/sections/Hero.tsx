"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Content from "./Content";

gsap.registerPlugin(SplitText);

const Hero = () => {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<any>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!heroRef.current) return;

      document.fonts.ready.then(() => {
        if (splitRef.current) splitRef.current.revert();

        const split = new SplitText(heroRef.current, {
          type: "chars",
          charsClass: "char",
        });
        splitRef.current = split;

        // Wrap characters
        split.chars.forEach((char: HTMLElement) => {
          const wrapper = document.createElement("div");
          wrapper.style.overflow = "hidden";
          wrapper.style.display = "inline-block";
          wrapper.style.verticalAlign = "bottom";
          wrapper.style.position = "relative";
          char.parentNode?.insertBefore(wrapper, char);
          wrapper.appendChild(char);
        });

        gsap.set(heroRef.current, { opacity: 1 });

        gsap.from(split.chars, {
          yPercent: 100,
          stagger: 0.07,
          duration: 1,
          ease: "power4.out",
        });
      });
    });

    return () => {
      ctx.revert();
      if (splitRef.current) splitRef.current.revert();
    };
  }, []);

  return (
    <section className="flex flex-col pt-4 md:gap-10 xl:gap-4">
      <div className="w-full">
        <h1
          ref={heroRef}
          className="split px-7 opacity-0 font-semibold
                text-6xl md:text-[12vw] xl:text-[12rem] md:text-center  text-black-100"
        >
          MANOJ <br className="block md:hidden" />
          KUMAR
        </h1>
      </div>
      {/* Content renders immediately and animates in parallel */}
      <div>
        <Content />
      </div>
    </section>
  );
};

export default Hero;
