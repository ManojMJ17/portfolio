"use client";

import { services } from "@/constants/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = ({ ready }: { ready: boolean }) => {
  const containerRef = useRef(null);

  const splitRef = useRef<any>(null);
  const headingRef = useRef(null);

  // Scroll trigger animation
  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 769px)", () => {
          ScrollTrigger.normalizeScroll(true); // ✅ Enable smoother native scroll

          const cards = gsap.utils.toArray<HTMLElement>(".service-card");
          if (cards.length >= 3) {
            let tl: gsap.core.Timeline | null = null;

            const setup = () => {
              // 1. Kill previous timeline and ScrollTrigger if they exist
              if (tl) {
                if (tl.scrollTrigger) tl.scrollTrigger.kill();
                tl.kill();
                tl = null;
              }

              // 2. Clear all inline styles to measure true natural layout
              gsap.set(containerRef.current, { clearProps: "height" });
              gsap.set(cards, { clearProps: "height,paddingTop,paddingBottom,marginTop,overflow,opacity,y" });

              // 3. Measure natural values before collapsing
              const card2Height = cards[1].offsetHeight;
              const card3Height = cards[2].offsetHeight;

              const card2Style = window.getComputedStyle(cards[1]);
              const card3Style = window.getComputedStyle(cards[2]);

              const card2MarginTop = card2Style.marginTop;
              const card2PaddingTop = card2Style.paddingTop;
              const card2PaddingBottom = card2Style.paddingBottom;

              const card3MarginTop = card3Style.marginTop;
              const card3PaddingTop = card3Style.paddingTop;
              const card3PaddingBottom = card3Style.paddingBottom;

              const finalServicesHeight = containerRef.current.offsetHeight;

              // 4. Lock container height to prevent layout shrinking
              gsap.set(containerRef.current, { height: finalServicesHeight });

              // 5. Collapse Card 2 and Card 3 dynamically
              gsap.set(cards[1], {
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                opacity: 0,
                overflow: "hidden",
              });
              gsap.set(cards[2], {
                height: 0,
                paddingTop: 0,
                paddingBottom: 0,
                marginTop: 0,
                opacity: 0,
                overflow: "hidden",
              });

              // 6. Create a single timeline for pinning the entire section
              const pinStartOffset = "10%"; // Easy to adjust: "8%", "10%", "12%", etc.
              tl = gsap.timeline({
                scrollTrigger: {
                  trigger: cards[0],
                  start: `top top+=${pinStartOffset}`,
                  end: () => `+=${finalServicesHeight - window.innerHeight}`,
                  pin: containerRef.current,
                  pinSpacing: true,
                  scrub: true,
                  anticipatePin: 1,
                }
              });

              // Stage 2: Card 2 height and margins expand naturally below Card 1
              tl.to(cards[1], {
                height: card2Height,
                paddingTop: card2PaddingTop,
                paddingBottom: card2PaddingBottom,
                marginTop: card2MarginTop,
                opacity: 1,
                duration: 1,
                ease: "none"
              });

              // Stage 3: Card 3 height and margins expand naturally below Card 2
              tl.to(cards[2], {
                height: card3Height,
                paddingTop: card3PaddingTop,
                paddingBottom: card3PaddingBottom,
                marginTop: card3MarginTop,
                opacity: 1,
                duration: 1,
                ease: "none"
              });

              // Stage 4: Holding stage to keep the complete stack visible before unpinning
              tl.to({}, { duration: 0.5 });

              // Force ScrollTrigger to refresh coordinates and sync with ScrollSmoother height
              ScrollTrigger.refresh();

              // Temporary runtime inspection variables
              (window as any).debugScrollTrigger = tl.scrollTrigger;
              (window as any).debugTimeline = tl;
              console.log("DEBUG_INITIALIZED", {
                trigger: tl.scrollTrigger?.trigger,
                pin: tl.scrollTrigger?.pin,
                start: tl.scrollTrigger?.start,
                end: tl.scrollTrigger?.end,
              });
            };

            // Run initial setup
            setup();

            // Rebuild the timeline and measurements on window resize
            window.addEventListener("resize", setup);

            return () => {
              window.removeEventListener("resize", setup);
              if (tl) {
                if (tl.scrollTrigger) tl.scrollTrigger.kill();
                tl.kill();
              }
            };
          }
        });

        // Mobile screens: no pinning or stack translations
        mm.add("(max-width: 768px)", () => {
          // Cards will layout and scroll naturally
        });

        return () => mm.revert();
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [ready]);

  // heading animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      document.fonts.ready.then(() => {
        const split = new SplitText(headingRef.current, {
          type: "chars",
          charsClass: "char",
        });
        splitRef.current = split;

        gsap.set(headingRef.current, { autoAlpha: 1 });

        gsap.from(split.chars, {
          opacity: 0,
          yPercent: 100,
          stagger: 0.03,
          duration: 0.5,
          ease: "power4",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, headingRef);

    return () => {
      ctx.revert();
      splitRef.current?.revert();
    };
  }, []);

  return (
    <div
      id="services"
      ref={containerRef}
      className="px-8 w-full flex flex-col bg-black rounded-3xl gap-20"
    >
      {/* HEADING */}
      <div className="flex flex-col gap-10 md:gap-16 w-full">
        <div className="py-4">
          <h1
            ref={headingRef}
            className="text-[3rem] leading-none uppercase text-background font-mmedium font-semibold sm:text-7xl md:text-8xl"
          >
            What <br className="sm:hidden" /> I do /
          </h1>
        </div>
        <div className="flex flex-col gap-4 sm:grid sm:grid-cols-12">
          <p className="text-white-200 sm:col-start-6 sm:col-span-2 md:col-start-6 md:col-span-1 lg:text-xl col-start-6">
            (SERVICES)
          </p>
          <p className="text-white-100 font-regular leading-snug tracking-widest md:tracking-wide w-[90%] text-[1rem] sm:col-start-8 sm:col-span-5 md:col-start-8 sm:text-[1.3rem]  xl:w-[90%] xl:col-start-7 col-start-8 ">
            Crafting fast, reliable, and expressive web experiences. I build
            full-stack applications that blend performance, design, and
            maintainability — handling frontend, backend, and deployment with a
            focus on user experience and quality.
          </p>
        </div>
      </div>

      {/* SERVICES */}
      <div className="relative flex flex-col space-y-20">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card relative flex flex-col items-center min-h-[50vh] md:min-h-0 h-fit py-10 md:py-16 bg-black"
          >
            <hr className="w-[96%] self-center text-black-50 mb-4" />
            <div className="flex flex-col gap-6 bg-black">
              <div className="flex flex-col gap-12">
                <div className="text-[2rem] flex gap-3 items-center leading-none md:grid md:grid-cols-12">
                  <span className="font-mmedium font-semibold md:col-start-1 md:col-span-2 md:text-[2.4rem] lg:text-5xl xl:text-7xl">
                    {service.sno}
                  </span>
                  <span className="font-mmedium font-semibold md:col-start-6 md:col-span-8 md:text-[2.4rem] lg:text-5xl xl:text-7xl">
                    {service.title}
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-4 technologies md:grid md:grid-cols-12">
                <div className="md:col-start-6 md:col-span-8">
                  <div className="flex flex-col gap-4 md:gap-8">
                    <div className="description">
                      <p className="text-white-100 tracking-tight md:col-span-8 lg:w-[70%] lg:text-lg xl:text-2xl xl:w-[50%]">
                        {service.description}
                      </p>
                    </div>
                    <div>
                      {service.technologies.map((tech, index) => (
                        <div key={index} className="flex flex-col gap-6">
                          <div className="flex items-center gap-4 xl:gap-10">
                            <p className="text-white-200 font-consola md:text-xl xl:text-3xl">
                              {tech.sno}
                            </p>
                            <p className="font-regular text-[1.3rem] font-bold tracking-wide md:text-2xl xl:text-4xl">
                              {tech.stack}
                            </p>
                          </div>
                          <hr className="w-full pb-4 text-background" />
                        </div>
                      ))}
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
