"use client";

import { services } from "@/constants/services";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Services = ({ ready }: { ready: boolean }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!ready) return;

    const timeout = setTimeout(() => {
      requestAnimationFrame(() => {
        const ctx = gsap.context(() => {
          ScrollTrigger.normalizeScroll(true); // ✅ Enable smoother native scroll

          const cards = gsap.utils.toArray<HTMLElement>(".service-card");

          cards.forEach((card, index) => {
            ScrollTrigger.create({
              trigger: card,
              start: "top top+=20%",
              end:
                index === cards.length - 1
                  ? "bottom bottom+=100"
                  : "bottom top+=100",
              pin: true,
              pinSpacing: false,
              scrub: true,
              markers: false,
              // ✅ Reduce strain on mobile
              anticipatePin: 1, // helps smooth transition
            });
          });

          ScrollTrigger.refresh();
        }, containerRef);

        return () => ctx.revert();
      });
    }, 100);

    return () => clearTimeout(timeout);
  }, [ready]);

  return (
    <div
      id="services"
      ref={containerRef}
      className="px-8 w-full flex flex-col bg-black rounded-3xl gap-20"
    >
      {/* HEADING */}
      <div className="flex flex-col gap-10 md:gap-16 w-full">
        <div className="py-4">
          <h1 className="text-[3rem] leading-none uppercase text-background font-mmedium font-semibold sm:text-7xl md:text-8xl">
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
            className="service-card relative flex flex-col items-center min-h-screen"
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
