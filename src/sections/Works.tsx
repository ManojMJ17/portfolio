'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, projectsIntro, projectCategoryLabel } from '@/data';
import SplitText from 'gsap/SplitText';
import Scrambler from '@/components/Scrambler';

gsap.registerPlugin(ScrollTrigger);

// Video frame styles keyed by orientation. Landscape fills the frame edge-to-edge
// (matches web-app recordings); portrait is inset and letterboxed so a 9:16 phone
// recording never stretches or gets cropped to fit a widescreen frame.
//
// The landscape frame sizes itself off the video's own 16:9 ratio below md, so on
// phones the card hugs the video instead of leaving tall bars of background above
// and below it; from md up it keeps the original fixed-height desktop treatment.
// Soft ambient glow around the video frame, brightening on card hover.
const glowBorder =
  'shadow-[0_0_0_1px_rgba(255,255,255,0.14),0_0_25px_rgba(255,255,255,0.1)] transition-shadow duration-500 ease-out group-hover:shadow-[0_0_0_1px_rgba(255,255,255,0.35),0_0_45px_8px_rgba(255,255,255,0.25)]';

const videoFrameStyles: Record<
  'landscape' | 'portrait',
  { container: string; wrapper: string; video: string }
> = {
  landscape: {
    container:
      'img group relative flex justify-center items-center w-full aspect-video md:aspect-auto md:h-[400px] xl:h-screen rounded-lg overflow-hidden',
    wrapper: `video relative w-[92%] sm:w-[90%] aspect-video mx-auto rounded-xl ${glowBorder}`,
    video: 'w-full h-full object-cover rounded-xl',
  },
  portrait: {
    container:
      'img group relative flex justify-center items-center w-full h-[400px] xl:h-screen rounded-lg overflow-hidden',
    wrapper: `video relative h-[85%] xl:h-[90%] aspect-[9/16] mx-auto rounded-xl overflow-hidden ${glowBorder}`,
    video: 'h-full w-full object-contain rounded-xl',
  },
};

const getVideoOrientation = (type?: 'web' | 'mobile') =>
  type === 'mobile' ? 'portrait' : 'landscape';

const Works = () => {
  if (typeof window !== 'undefined') {
    gsap.registerPlugin(SplitText);
  }
  const container = useRef(null);
  const digitContainerRef = useRef(null);
  const digitRef = useRef<HTMLDivElement>(null);

  const headingRef = useRef(null);
  const splitRef = useRef<any>(null);

  const headerBelowRef = useRef(null);
  const projectsLabelRef = useRef<HTMLParagraphElement | null>(null);
  const paraRef = useRef<HTMLParagraphElement | null>(null);

  ///// heading animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current, {
          type: 'chars',
          charsClass: 'char',
        });
        splitRef.current = split;

        gsap.set(headingRef.current, { autoAlpha: 1 });

        gsap.from(split.chars, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.03,
          duration: 0.5,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, headingRef);

    return () => {
      ctx.revert();
      splitRef.current?.revert();
    };
  }, []);

  // HEADER BELOW ANIMATION — FIXED
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        // Split paragraph into lines after fonts load
        const split = new SplitText(paraRef.current, {
          type: 'lines',
          linesClass: 'line overflow-hidden block',
        });
        splitRef.current = split;

        // Animate (PROJECTS) label
        gsap.fromTo(
          projectsLabelRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: headerBelowRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        );

        // Animate paragraph lines
        gsap.fromTo(
          split.lines,
          { opacity: 0, yPercent: 100 },
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: paraRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });
    }, headerBelowRef);

    return () => {
      ctx.revert();
      splitRef.current?.revert();
    };
  }, []);

  //// project animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const digitHeight = 22; // in vw

      projects.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.project-${i}`,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => {
            gsap.to(digitRef.current, {
              y: `-${i * digitHeight}vw`,
              duration: 1.5,
              ease: 'power1',
            });
          },
          onEnterBack: () => {
            gsap.to(digitRef.current, {
              y: `-${i * digitHeight}vw`,
              duration: 1.5,
              ease: 'power1',
            });
          },
        });
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: digitContainerRef.current,
        pinSpacing: false,
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div id='works' className='mt-80 w-full flex flex-col gap-20 px-6'>
      {/* HEADING */}
      <div className='w-full space-y-10 lg:space-y-20'>
        <div className=''>
          <h1
            ref={headingRef}
            className='invinsible text-[15vw] leading-none uppercase
         text-background font-mmedium font-semibold md:text-[9vw] md:pl-4 lg:text-[7vw]'
          >
            <span className=''>{projectsIntro.headingLine1}</span>
            <br className='md:hidden' />
            <span className='pl-3'>{projectsIntro.headingLine2}</span>
          </h1>
        </div>

        <div
          ref={headerBelowRef}
          className='flex flex-col gap-4 sm:grid sm:grid-cols-12'
        >
          <p
            ref={(el) => {
              projectsLabelRef.current = el;
            }}
            className='text-white-200 sm:col-start-6 sm:col-span-2 md:col-start-6 md:col-span-1 lg:text-xl col-start-6'
          >
            {projectsIntro.label}
          </p>

          <p
            ref={(el) => {
              paraRef.current = el;
            }}
            className='text-white-100 font-mmedium leading-tight tracking-widest md:tracking-normal w-[90%] text-[1rem] sm:col-start-8 sm:col-span-5 md:col-start-8 sm:text-[1.3rem] lg:text-[1.5rem] xl:w-[60%] xl:text-[2rem] xl:col-start-8 col-start-8'
          >
            {projectsIntro.description}
          </p>
        </div>
      </div>

      {/* Projects Section */}
      <div ref={container} className='relative flex flex-col gap-16'>
        {/* === DIGITS COLUMN === */}
        <div
          ref={digitContainerRef}
          className='hidden md:block absolute top-0 left-0 w-[15%] z-10'
        >
          <div className='h-full flex items-start pt-20'>
            <div className='flex text-[22vw] text-white-200 font-consola leading-none'>
              <span>0</span>
              <div className='relative h-[22vw] overflow-hidden w-[1ch]'>
                <div ref={digitRef}>
                  {projects.map((_, i) => (
                    <div key={i} className='h-[22vw] leading-none'>
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === PROJECTS SECTION === */}
        <div
          // ref={projectRef}

          className='md:grid md:grid-cols-12 w-full'
        >
          <div className='md:col-start-6 md:col-span-6 flex flex-col gap-20'>
            {projects.map((project, index) => {
              const frame =
                videoFrameStyles[getVideoOrientation(project.type)];

              return (
                <div
                  key={index}
                  className={`space-y-4 mb-14 sm:mb-16 lg:mb-20 project-${index}`}
                >
                  <a
                    href={project.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={frame.container}
                  >
                    <div
                      className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30'
                      style={{ backgroundImage: `url(${project.img})` }}
                    />
                    <div className={frame.wrapper}>
                      <video
                        src={project.video}
                        className={frame.video}
                        autoPlay
                        loop
                        muted
                        playsInline
                      />
                    </div>
                  </a>

                  <div className='bio flex flex-col gap-3 sm:gap-4 lg:flex-row lg:justify-between'>
                    <div className='title flex flex-col gap-1'>
                      <p className='font-consola text-white-100 text-sm sm:text-base xl:text-[1.5rem]'>
                        <Scrambler>
                          <span>{project.title}</span>
                        </Scrambler>
                      </p>
                      <Scrambler>
                        <h1 className='font-azeretMono-r text-[1.1rem] sm:text-[1.2rem] lg:text-[1.5rem] font-bold uppercase tracking-tight xl:text-[2rem]'>
                          {project.subtitle}
                        </h1>
                      </Scrambler>
                    </div>
                    <div className='tech flex flex-wrap gap-2 sm:gap-3 sm:space-x-0 lg:self-end'>
                      <button className='border border-background rounded-xl px-3 py-1.5 xl:px-3 xl:py-1 xl:rounded-3xl'>
                        <span className='text-xs sm:text-sm xl:text-[1.2rem]'>
                          {projectCategoryLabel}
                        </span>
                      </button>
                      <button className='border border-background bg-white-100 rounded-3xl px-3 py-1.5 xl:px-3 xl:py-1'>
                        <span className='text-xs sm:text-sm text-black xl:text-[1.2rem]'>
                          {project.year}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
