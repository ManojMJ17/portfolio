import Image from "next/image";
import React from "react";
import { personal } from "@/data";

const About = () => {
  return (
    <div id="about" className="pb-20 lg:h-screen xl:h-full xl:py-12 xl:pb-48">
      <div className="px-6 md:px-12 flex flex-col gap-10 md:grid md:grid-cols-12 ">
        <div className="relative w-full h-[350px] md:h-full md:col-span-3 lg:h-full">
          <Image
            src={personal.profileImage.src}
            alt={personal.profileImage.aboutAlt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-12 md:col-start-6 md:col-span-full xl:gap-20 ">
          <div className="lg:w-[90%]">
            <span className="text-background text-xl font-mmedium tracking-wide md:text-[1.3rem] lg:text-[3vw] lg:tracking-tight xl:text-[2vw]">
              {personal.tagline}
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 xl:gap-16 xl:w-[80%]">
            <div className="lg:w-full lg:tracking-tighter">
              <p className="text-white-100 font-consola uppercase lg:text-[1rem] xl:text-[1.8rem]">
                {personal.aboutLabel}
              </p>
            </div>
            <div className="flex flex-col gap-4 ">
              {personal.bioParagraphs.map((paragraph, index) => (
                <div
                  key={index}
                  className="text-para  font-mmedium leading-snug tracking-wider text-[1rem] md:tracking-wider lg:text-[1.1rem] xl:text-[1.8rem]"
                >
                  <p>{paragraph}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
