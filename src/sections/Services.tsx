'use client';

import { services } from '@/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Services = ({ ready }: { ready: boolean }) => {
  const stackRef = useRef<HTMLDivElement>(null);

  const splitRef = useRef<InstanceType<typeof SplitText> | null>(null);
  const headingRef = useRef(null);

  // Heading split text animation
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
          ease: 'power4',
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

  // stacking cards animation
  useEffect(() => {
    if (!ready) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>('.service-wrapper');
      const cards = gsap.utils.toArray<HTMLElement>('.service-card');

      wrappers.forEach((wrapper, index) => {
        gsap.to(cards[index], {
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: `top ${90 + index * 120}px`,
            endTrigger: stackRef.current,
            end: 'bottom bottom',
            pin: wrapper,
            pinSpacing: false,
            scrub: true,
            invalidateOnRefresh: true,
            // markers: true,
          },
        });
      });
    }, stackRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <div
      id='services'
      className='px-8 w-full flex flex-col bg-black rounded-3xl gap-20'
    >
      {/* HEADING */}
      <div className='flex flex-col gap-10 md:gap-16 w-full'>
        <div className='py-4'>
          <h1
            ref={headingRef}
            className='text-[3rem] leading-none uppercase text-background font-mmedium font-semibold sm:text-7xl md:text-8xl'
          >
            What <br className='sm:hidden' /> I do /
          </h1>
        </div>
        <div className='flex flex-col gap-4 sm:grid sm:grid-cols-12'>
          <p className='text-white-200 sm:col-start-6 sm:col-span-2 md:col-start-6 md:col-span-1 lg:text-xl col-start-6'>
            (SERVICES)
          </p>
          <p className='text-white-100 font-regular leading-snug tracking-widest md:tracking-wide w-[90%] text-[1rem] sm:col-start-8 sm:col-span-5 md:col-start-8 sm:text-[1.3rem]  xl:w-[90%] xl:col-start-7 col-start-8 '>
            Crafting fast, reliable, and expressive web experiences. I build
            full-stack applications that blend performance, design, and
            maintainability — handling frontend, backend, and deployment with a
            focus on user experience and quality.
          </p>
        </div>
      </div>

      {/* SERVICES */}
      <div ref={stackRef} className='relative flex flex-col space-y-20'>
        {services.map((service, index) => (
          <div key={index} className='service-wrapper w-full'>
            <div className='service-card overflow-hidden w-full bg-black'>
              <div className='service-card-inner relative flex flex-col items-center min-h-[50vh] md:min-h-0 h-fit pb-10 md:pb-16 bg-black'>
                <hr className='w-[96%] self-center text-black-50 mb-4' />
                <div className='flex flex-col gap-6 bg-black'>
                  <div className='flex flex-col gap-12'>
                    <div className='text-[2rem] flex gap-3 items-center leading-none md:grid md:grid-cols-12'>
                      <span className='font-mmedium font-semibold md:col-start-1 md:col-span-2 md:text-[2.4rem] lg:text-5xl xl:text-7xl'>
                        {service.sno}
                      </span>
                      <span className='font-mmedium font-semibold md:col-start-6 md:col-span-8 md:text-[2.4rem] lg:text-5xl xl:text-7xl'>
                        {service.title}
                      </span>
                    </div>
                  </div>

                  <div className='pt-4 flex flex-col gap-4 technologies md:grid md:grid-cols-12'>
                    <div className='md:col-start-6 md:col-span-8'>
                      <div className='flex flex-col gap-4 md:gap-8'>
                        <div className='description'>
                          <p className='text-white-100 tracking-tight md:col-span-8 lg:w-[70%] lg:text-lg xl:text-2xl xl:w-[50%]'>
                            {service.description}
                          </p>
                        </div>
                        <div>
                          {service.technologies.map((tech, index) => (
                            <div key={index} className='flex flex-col gap-6'>
                              <div className='flex items-center gap-4 xl:gap-10'>
                                <p className='text-white-200 font-consola md:text-xl xl:text-3xl'>
                                  {tech.sno}
                                </p>
                                <p className='font-regular text-[1.3rem] font-bold tracking-wide md:text-2xl xl:text-4xl'>
                                  {tech.stack}
                                </p>
                              </div>
                              <hr className='w-full pb-4 text-background' />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
