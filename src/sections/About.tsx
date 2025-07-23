import Image from "next/image";
import React from "react";

const About = () => {
  return (
    <div id="about" className="pb-20 lg:h-screen xl:h-full xl:py-12 xl:pb-48">
      <div className="px-6 md:px-12 flex flex-col gap-10 md:grid md:grid-cols-12 ">
        <div className="relative w-full h-[350px] md:h-full md:col-span-3 lg:h-full">
          <Image
            src="/images/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg"
            alt="Caspar_David_Friedrich"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-12 md:col-start-6 md:col-span-full xl:gap-20 ">
          <div className="lg:w-[90%]">
            <span className="text-background text-xl font-mmedium tracking-wide md:text-[1.3rem] lg:text-[3vw] lg:tracking-tight xl:text-[2vw]">
              I'm a web developer passionate about crafting smooth, modern
              experiences with code and creativity.
            </span>
          </div>
          <div className="flex flex-col gap-4 lg:flex-row lg:gap-10 xl:gap-16 xl:w-[80%]">
            <div className="lg:w-full lg:tracking-tighter">
              <p className="text-white-100 font-consola uppercase lg:text-[1rem] xl:text-[1.8rem]">
                (About me)
              </p>
            </div>
            <div className="flex flex-col gap-4 ">
              <div className="text-para  font-mmedium leading-snug tracking-wider text-[1rem] md:tracking-wider lg:text-[1.1rem] xl:text-[1.8rem]">
                <p>
                  I specialize in modern JavaScript ecosystems — working with
                  frameworks like Next.js, React, and Node.js, and styling with
                  Tailwind CSS and animation libraries like GSAP. I also explore
                  AI/ML, having built models and tools using TensorFlow, Python,
                  and Flask.
                </p>
              </div>

              <div className="text-para font-mmedium tracking-wider leading-snug text-[1rem] md:tracking-wider lg:text-[1.1rem] xl:text-[1.8rem]">
                <p>
                  Beyond code, I enjoy collaborating, learning from real-world
                  challenges, and contributing to projects that make a
                  difference — whether it's for a user, a team, or the tech
                  community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
