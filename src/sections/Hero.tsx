'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import SplitText from 'gsap/SplitText';
import Content from './Content';
import { personal } from '@/data';

gsap.registerPlugin(SplitText);

const Hero = ({ startAnimation }: { startAnimation: boolean }) => {
  const heroRef = useRef<HTMLHeadingElement>(null);
  const splitRef = useRef<InstanceType<typeof SplitText> | null>(null);

  // Split characters on initial mount in background
  useEffect(() => {
    if (!heroRef.current) return;

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const runSplit = () => {
      ctx = gsap.context(() => {
        if (splitRef.current) splitRef.current.revert();

        const split = new SplitText(heroRef.current, {
          type: 'chars',
          charsClass: 'char',
        });
        splitRef.current = split;

        // Wrap characters
        split.chars.forEach((char: Element) => {
          const wrapper = document.createElement('div');
          wrapper.style.overflow = 'hidden';
          wrapper.style.display = 'inline-block';
          wrapper.style.verticalAlign = 'bottom';
          wrapper.style.position = 'relative';
          char.parentNode?.insertBefore(wrapper, char);
          wrapper.appendChild(char);
        });

        // Pre-set character states to avoid any pop-in during load
        gsap.set(split.chars, { yPercent: 100, opacity: 0 });
        gsap.set(heroRef.current, { opacity: 1 });
      });
    };

    // Run synchronously if fonts already loaded, otherwise wait
    if (document.fonts && document.fonts.status === 'loaded') {
      runSplit();
    } else if (document.fonts) {
      document.fonts.ready.then(runSplit);
    } else {
      runSplit();
    }

    return () => {
      if (ctx) ctx.revert();
      if (splitRef.current) splitRef.current.revert();
    };
  }, []);

  // Run reveal animation when startAnimation is true
  useEffect(() => {
    if (!startAnimation) return;

    let ctx: ReturnType<typeof gsap.context> | undefined;

    const playReveal = () => {
      ctx = gsap.context(() => {
        if (!splitRef.current) {
          // Fallback split if not split yet
          const split = new SplitText(heroRef.current, {
            type: 'chars',
            charsClass: 'char',
          });
          splitRef.current = split;

          // Wrap characters
          split.chars.forEach((char: Element) => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'inline-block';
            wrapper.style.verticalAlign = 'bottom';
            wrapper.style.position = 'relative';
            char.parentNode?.insertBefore(wrapper, char);
            wrapper.appendChild(char);
          });
          gsap.set(split.chars, { yPercent: 100, opacity: 0 });
          gsap.set(heroRef.current, { opacity: 1 });
        }

        gsap.to(splitRef.current.chars, {
          yPercent: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: 'power4.out',
        });
      });
    };

    // Run when fonts are loaded
    if (document.fonts && document.fonts.status === 'loaded') {
      playReveal();
    } else if (document.fonts) {
      document.fonts.ready.then(playReveal);
    } else {
      playReveal();
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, [startAnimation]);

  return (
    <section className='flex flex-col pt-4 md:gap-10 xl:gap-4'>
      <div className='w-full'>
        <h1
          ref={heroRef}
          className='split px-7 opacity-0 font-mmedium
                text-6xl md:text-[12vw] xl:text-[12rem] md:text-center  text-black-100'
        >
          {personal.firstName} <br className='block md:hidden' />
          {personal.lastName}
        </h1>
      </div>
      {/* Content renders immediately and animates in parallel */}
      <div>
        <Content startAnimation={startAnimation} />
      </div>
    </section>
  );
};

export default Hero;
