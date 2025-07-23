import Button from "@/components/Button";
import { ArrowDownRight } from "@geist-ui/icons";
import gsap from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";

const Content = () => {
  const today = new Date();
  const day = today.getDate();
  const month = today
    .toLocaleString("default", { month: "short" })
    .toUpperCase(); // e.g. JUL
  const formattedDate = `${month}'${day}`; // e.g. JUL'23

  const wrapperRef = useRef<HTMLDivElement>(null);

  const iconRef = useRef(null); // for the icon
  const pRef = useRef<HTMLParagraphElement>(null); // for the paragraph
  const workRef = useRef<HTMLParagraphElement>(null);
  const imageRevealRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imageContentRef = useRef<HTMLDivElement>(null);

  const buttonRef = useRef<HTMLDivElement>(null);
  const julRef = useRef<HTMLHeadingElement>(null); // 👈 for JUL'29

  /// left arrow icon
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!iconRef.current) return;

      gsap.to(iconRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2",
        delay: 0.5,
      });

      return () => ctx.revert();
    });
  }, []);

  /// left para animation
  useEffect(() => {
    if (!pRef.current) return;

    // const split = new SplitType(pRef.current, { types: "lines" });
    // gsap.from([split.lines], {
    //   y: 20,
    //   opacity: 0,
    //   duration: 0.5,
    //   ease: "power2.inOut",
    //   stagger: 0.1,
    // });

    gsap.fromTo(
      pRef.current,
      {
        y: 20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2",
      }
    );
  }, []);

  /// Contact and Jul button animation
  useEffect(() => {
    if (!buttonRef.current) return;

    gsap.fromTo(
      [buttonRef.current, julRef.current],
      {
        yPercent: 100,

        clipPath: "inset(0% 0% 100% 0%)",
      },
      {
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1,

        ease: "power3",
      }
    );
  }, []);

  /// work ref
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!workRef.current) return;

      gsap.from(workRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2",
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const img = imageRevealRef.current;
    if (!img || !imageContainerRef.current || !imageContentRef.current) return;

    const handleImageLoad = () => {
      imageContainerRef.current!.style.visibility = "visible";

      const tl = gsap.timeline({
        defaults: { ease: "power3.out", duration: 1.6 },
        onComplete: () => {
          window.scrollTo({ top: 0, behavior: "instant" });
        },
      });

      tl.fromTo(
        imageContainerRef.current,
        { clipPath: "inset(0% 0% 100% 0%)" },
        { clipPath: "inset(0% 0% 0% 0%)" }
      );

      tl.fromTo(imageContentRef.current, { scale: 1.1 }, { scale: 1 }, "<");
    };

    // Image already cached
    if ((img as HTMLImageElement).complete) {
      handleImageLoad();
    } else {
      img.addEventListener("load", handleImageLoad);
    }

    return () => {
      img.removeEventListener("load", handleImageLoad);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="px-7 overflow-hidden">
      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-4
      "
      >
        <div className="col-span-2 md:col-span-1 md:flex md:flex-col md:justify-around xl:justify-start md:gap-6 lg:gap-8 xl:gap-6">
          <ArrowDownRight
            ref={iconRef}
            size={45}
            className="!text-white-200 hidden md:block xl:w-12 xl:h-16 z-20 opacity-0"
          />

          <div className="lg:pl-2 md:flex md:flex-col">
            <p
              ref={pRef}
              className="my-3 text-[1rem] font-mmedium w-[80%] sm:w-[70%] md:w-[100%] text-black-50 md:pl-3 md:text-[1.2rem] lg:text-xl  xl:text-[1.5rem] lg:leading-relaxed xl:leading-normal"
            >
              {/* Open to job opportunities worldwide. I love creating clean and
            simple websites that are easy to use and look beautiful. */}
              Open to job opportunities worldwide. Passionate about building
              polished, intuitive,and thoughtful digital{" "}
              <br className="hidden xl:block" />
              experiences that leave a mark.
            </p>
            <div ref={buttonRef} className="mt-4 md:pl-4 cursor-pointer">
              <Button title="Contact" href="#contact" />
            </div>
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-center md:col-span-1">
          <div
            ref={imageContainerRef}
            className="relative w-[80px] h-[110px] md:h-[350px] md:w-[300px] lg:h-[370px]  lg:w-[290px] xl:w-[300px] xl:h-[400px]"
          >
            <div
              ref={imageContentRef}
              className="relative w-full h-full overflow-hidden rounded-lg"
            >
              <Image
                src="/images/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg"
                alt="Wanderer"
                ref={imageRevealRef}
                fill
                className="grayscale object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 60vw"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end justify-end">
          <p
            ref={workRef}
            className="text-[1rem] md:text-[1rem] xl:text-[1rem] capitalize text-black-50 font-consola leading-none flex text-end"
          >
            AVAILABLE FOR <br className="block md:hidden" />
            WORK
          </p>
          <h1
            ref={julRef}
            className="text-4xl md:text-6xl lg:mr-2 lg:text-7xl xl:text-8xl text-black-200 font-mmedium font-semibold"
          >
            {formattedDate}
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Content;
