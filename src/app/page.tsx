"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/sections/Hero";
import Navbar from "@/components/Navbar";
import Services from "@/sections/Services";
import Works from "@/sections/Works";
import Skills from "@/sections/Skills";
import About from "@/sections/About";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
const Page = () => {
  const [showHero, setShowHero] = useState(false);
  const [readyForScroll, setReadyForScroll] = useState(false);

  // Animate background fill
  useEffect(() => {
    const path = document.getElementById("fill-path");
    const bg = document.getElementById("bg-curve");

    if (!path || !bg) return;

    bg.style.backgroundColor = "#000";
    gsap.set(path, { yPercent: 100 });

    gsap.to(path, {
      duration: 1.5,
      yPercent: 0,
      ease: "none",
      onComplete: () => {
        gsap.to(bg, {
          backgroundColor: "#e8e8e3",
          duration: 0.2,
          ease: "power2",
          onComplete: () => {
            if (typeof window !== "undefined") {
              window.scrollTo(0, 0);
            }
            setShowHero(true);
            gsap.set("#content", {
              opacity: 1,
              autoAlpha: 1,
            });
          },
        });
      },
    });
  }, []);

  // Init ScrollSmoother after Hero
  useEffect(() => {
    if (!showHero) return;

    const loadSmoother = async () => {
      if (typeof window === "undefined") return;

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // console.log("Mobile detected, skipping ScrollSmoother");
        setReadyForScroll(true);
        return;
      }

      const { ScrollSmoother } = await import("gsap/ScrollSmoother");
      gsap.registerPlugin(ScrollSmoother);
      if (typeof window !== "undefined") {
        (window as any).ScrollSmoother = ScrollSmoother;
      }

      ScrollSmoother.create({
        wrapper: "#wrapper",
        content: "#content",
        smooth: 2,
        effects: true,
      });

      setReadyForScroll(true);
    };

    loadSmoother();
  }, [showHero]);

  // Scroll animation
  useEffect(() => {
    if (!readyForScroll) return;

    const ctx = gsap.context(() => {
      gsap.to(".navbar", {
        y: -50,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#section-2",
          start: "top bottom",
          end: "top 40%",
          scrub: true,
        },
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#section-2",
          start: "top bottom",
          end: "top top",
          scrub: true,
          pin: "#hero-wrapper",
          pinSpacing: false,
        },
      });

      tl.to("#hero-wrapper", {
        scale: 0.95,
        opacity: 0,
        ease: "power2.out",
      });
    });

    // Refresh ScrollTrigger to calculate correct offsets for all components
    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, [readyForScroll]);

  // Scroll out animation
  useEffect(() => {
    if (!readyForScroll) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // 🚫 skip scroll-out on mobile

    const ctx = gsap.context(() => {
      gsap.to("#section-2", {
        scale: 0.95,
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: "#section-2",
          start: "90% bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [readyForScroll]);

  return (
    <div id="wrapper" className="relative overflow-hidden">
      {/* Background fill animation */}
      <div
        id="bg-curve"
        className="fixed top-0 left-0 w-full h-screen z-1 pointer-events-none"
      >
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            id="fill-path"
            fill="#e8e8e3"
            d="M0,0 C25,-10 75,-10 100,0 L100,100 L0,100 Z"
          />
        </svg>
      </div>

      {/* Actual content */}
      <div
        id="content"
        className="relative z-10 opacity-0"
        style={{ visibility: "hidden" }}
      >
        {/* NAVBAR + HERO combined */}

        <div className="h-screen relative space-y-10">
          <div className="navbar z-30 relative">
            <Navbar />
          </div>
          <div
            id="hero-wrapper"
            className="relative inset-0 w-full z-20 pointer-events-none"
          >
            <section
              id="hero-section"
              className="w-full h-full flex justify-center"
            >
              <Hero startAnimation={showHero} />
            </section>
          </div>
        </div>

        {/* SERVICES SECTION */}
        <section
          id="section-2"
          className="relative z-30 text-[#d1d1c7] bg-black rounded-3xl pt-16 space-y-16"
        >
          <Services ready={readyForScroll} />
          <Works />
          <Skills />
          <About />
        </section>

        {/* CONTACT */}
        <section className="relative space-y-32">
          <Contact />
          <Footer />
        </section>
      </div>
    </div>
  );
};

export default Page;
