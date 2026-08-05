'use client';

import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import Button from '@/components/Button';
import GhostButton from '@/components/GhostButton';
import Scrambler from '@/components/Scrambler';
import NotFoundBackground from '@/components/NotFoundBackground';
import { useReducedMotion } from '@/lib/useReducedMotion';

const NotFound = () => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Entrance: fade + rise the content in, staggered, skipped entirely under reduced motion
  useEffect(() => {
    if (!contentRef.current) return;

    if (prefersReducedMotion) {
      gsap.set(contentRef.current.children, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current!.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.12,
          delay: 0.15,
        },
      );
    }, contentRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Barely-there parallax on the background layers, desktop pointer only
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handlePointerMove = (event: PointerEvent) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;
      wrapper.style.setProperty('--nf-mx', x.toFixed(3));
      wrapper.style.setProperty('--nf-my', y.toFixed(3));
    };

    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, [prefersReducedMotion]);

  const handleGoBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <main
      ref={wrapperRef}
      className='relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-background px-6'
    >
      <NotFoundBackground />

      <div
        ref={contentRef}
        className='relative z-10 flex max-w-xl flex-col items-center gap-6 text-center'
      >
        <p
          aria-hidden='true'
          className='inline-flex items-end font-consola leading-none tracking-tight text-black-100
            text-[5.5rem] sm:text-[7rem] md:text-[9rem] xl:text-[11rem]'
        >
          404
          <span
            className='animate-nf-blink mb-[0.14em] ml-2 inline-block h-[4px] w-[0.55em] rounded-full
              bg-black sm:h-[5px] md:ml-3 md:h-[6px] xl:h-[7px]'
          />
        </p>

        <Scrambler>
          <h1 className='font-mmedium font-semibold text-black-100 text-2xl sm:text-3xl md:text-4xl'>
            Page Not Found
          </h1>
        </Scrambler>

        <p className='max-w-md font-mmedium text-[1rem] leading-relaxed text-black-50 md:text-[1.1rem]'>
          The page you&apos;re looking for doesn&apos;t exist, or it may have
          been moved.
        </p>

        <div className='mt-4 flex flex-col items-center gap-4 sm:flex-row'>
          <Button title='Back Home' href='/' />
          <GhostButton label='Go Back' onClick={handleGoBack} />
        </div>
      </div>
    </main>
  );
};

export default NotFound;
