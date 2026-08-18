'use client';

import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { scrollToHash } from '@/lib/scrollSmoother';

const SplitTextLink = ({
  text,
  href,
  color,
  classname,
  as,
  newTab,
}: {
  text: string;
  href?: string;
  color?: string;
  classname?: string;
  as?: 'a' | 'div';
  newTab?: boolean;
}) => {
  const Component = as ?? 'a';
  const containerRef = useRef<HTMLAnchorElement | HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const topSplit = useRef<InstanceType<typeof SplitText> | null>(null);
  const bottomSplit = useRef<InstanceType<typeof SplitText> | null>(null);
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
        ref={(node: HTMLAnchorElement | HTMLDivElement | null) => {
          containerRef.current = node;
        }}
        href={Component === 'a' ? href : undefined}
        target={Component === 'a' && newTab ? '_blank' : undefined}
        rel={Component === 'a' && newTab ? 'noopener noreferrer' : undefined}
        className={`relative block h-full cursor-pointer ${
          color ?? 'text-black-50'
        }`}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onClick={(e) => {
          if (href && !newTab) {
            if (href.startsWith('#')) {
              e.preventDefault();
              scrollToHash(href);
            } else {
              router.push(href);
            }
          }
        }}
      >
        <div
          ref={topRef}
          className={`top-0 left-0 w-full font-mmedium font-medium
                  text-[1rem] md:text-1xl lg:text-lg xl:text-xl flex items-center gap-x-[0.25em]  ${classname}`}
        >
          {text}
        </div>
        <div
          ref={bottomRef}
          aria-hidden='true'
          className={`top-full left-0 w-full font-mmedium font-semibold
                  text-[1rem] md:text-1xl lg:text-lg xl:text-xl flex items-center gap-x-[0.25em] ${classname}`}
        >
          {text}
        </div>
      </Component>
    </div>
  );
};

export default SplitTextLink;
