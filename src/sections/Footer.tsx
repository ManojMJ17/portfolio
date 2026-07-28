import SplitTextLink from "@/components/SplitTextLink";
import { navLinks, socialLinks, footerHomeLink, footerContent } from "@/data";
import React, { useEffect, useState } from "react";

const Footer = () => {
  const [time, setTime] = useState<String>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formmated = now.toLocaleTimeString(footerContent.timeLocale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(formmated);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-8 flex flex-col gap-14">
      <div className="grid grid-cols-2 gap-4 ">
        <div className="menu flex flex-col gap-3 w-full">
          <h2 className="font-regular text-black-200 font-semibold flex flex-col gap-1 text-lg xl:text-2xl">
            {footerContent.menuLabel}
            <hr className="text-white-100" />
          </h2>
          <ul className="flex flex-col gap-1">
            <SplitTextLink text={footerHomeLink.name} href={footerHomeLink.link} />
            {navLinks.map((item, index) => (
              <SplitTextLink key={index} text={item.name} href={item.link} />
            ))}
          </ul>
        </div>

        <div className="socials flex flex-col gap-3 w-full">
          <h2 className="font-regular text-black-200 font-semibold flex flex-col gap-1 text-lg xl:text-2xl">
            {footerContent.socialsLabel}
            <hr className="text-white-100" />
          </h2>
          <ul className="flex flex-col gap-1">
            {socialLinks.map((item, index) => (
              <SplitTextLink key={index} text={item.name} href={item.link} />
            ))}
          </ul>
        </div>
      </div>

      <div className="time flex flex-col items-end w-full">
        <div className="">
          <div className="">
            <h2 className="text-lg text-black-200 font-regular font-semibold uppercase">
              {footerContent.localTimeLabel}
            </h2>
          </div>
          <div className="leading-none tracking-wide">
            <span className="text-black-50 font-consola uppercase">
              {time},
            </span>
            <span className="text-black-50 font-consola"> {footerContent.timezoneLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
