'use client';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

const SplitTextLink = ({
  text,
  href,
  color,
  classname,
  as,
}: {
  text: string;
  href?: string;
  color?: string;
  classname?: string;
  as?: 'a' | 'div';
}) => {
  const Component = as ?? 'a';
  const containerRef = useRef<any>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topSplit = useRef<any>(null);
  const bottomSplit = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (!topRef.current || !bottomRef.current) return;

    gsap.registerPlugin(SplitText);

    const runSplit = () => {
      topSplit.current = new SplitText(topRef.current, {
        type: 'words',
        wordsClass: 'word',
      });

      bottomSplit.current = new SplitText(bottomRef.current, {
        type: 'words',
        wordsClass: 'word',
      });
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(runSplit);
    } else {
      runSplit();
    }

    return () => {
      topSplit.current?.revert();
      bottomSplit.current?.revert();
    };
  }, []);

  const handleEnter = () => {
    if (!topSplit.current || !bottomSplit.current) return;

    gsap.to(topSplit.current.words, {
      yPercent: -100,
      ease: 'back.out',
      stagger: 0.05,
    });

    gsap.to(bottomSplit.current.words, {
      yPercent: -100,
      ease: 'back.out',
      stagger: 0.05,
    });
  };

  const handleLeave = () => {
    if (!topSplit.current || !bottomSplit.current) return;

    gsap.to([topSplit.current.words, bottomSplit.current.words], {
      yPercent: 0,
      ease: 'back.out',
      stagger: 0.05,
    });
  };

  return (
    <div className='h-[20px] md:h-[30px] overflow-hidden w-fit'>
      <Component
        ref={containerRef as any}
        href={Component === 'a' ? href : undefined}
        className={`relative block h-full cursor-pointer ${
          color ?? 'text-black-50'
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={(e) => {
          if (href) {
            if (href.startsWith('#')) {
              e.preventDefault();
              const ScrollSmoother = (window as any).ScrollSmoother || (gsap as any).ScrollSmoother;
              const smoother = ScrollSmoother?.get();
              if (smoother) {
                smoother.scrollTo(href, true);
              } else {
                const element = document.querySelector(href);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }
              window.history.pushState(null, '', href);
            } else {
              router.push(href);
            }
          }
        }}
      >
        <div
          ref={topRef}
          className={`top-0 left-0 w-full font-mmedium
                  text-[1rem] md:text-1xl lg:text-lg xl:text-xl flex items-center  ${classname}`}
        >
          {text}
        </div>
        <div
          ref={bottomRef}
          className={`top-full left-0 w-full font-mmedium
                  text-[1rem] md:text-1xl lg:text-lg xl:text-xl flex items-center ${classname}`}
        >
          {text}
        </div>
      </Component>
    </div>
  );
};

export default SplitTextLink;
