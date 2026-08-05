import { ArrowUpRight } from "@geist-ui/icons";
import React from "react";
import SplitTextLink from "./SplitTextLink";
import { scrollToHash } from "@/lib/scrollSmoother";

const Button = ({ title, href }: { title: string; href: string }) => {
  return (
    <div className="w-fit min-w-[8rem] md:min-w-[10rem] xl:min-w-[12rem]">
      <a
        href={href}
        className="group relative flex justify-center items-center whitespace-nowrap
              px-8 py-4  xl:px-7 xl:py-5 rounded-[4rem] text-white uppercase bg-black-200
             transition-colors duration-300 focus-visible:outline-2
             focus-visible:outline-offset-2 focus-visible:outline-black-200"
        onClick={(e) => {
          if (href && href.startsWith("#")) {
            e.preventDefault();
            scrollToHash(href);
          }
        }}
      >
        {/* Animated BG Layer */}
        <span className="absolute inset-0 overflow-hidden rounded-[4rem]">
          <span
            className="block h-full w-full translate-y-full rounded-t-[15rem] bg-black-50 
                    transition-all duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] 
                    group-hover:translate-y-0 group-hover:rounded-none"
          />
        </span>

        {/* Text */}
        <h1 className="relative z-20 flex item-center justify-center font-regular font-semibold">
          <SplitTextLink
            text={title}
            color="text-white"
            href={href}
            as="div"
            classname="md:h-[30px] md:text-[1.3rem] xl:text-3xl"
          />

          <ArrowUpRight size={20} className="relative z-20 size-5" />
        </h1>

        {/* Icon */}
      </a>
    </div>
  );
};

export default Button;
