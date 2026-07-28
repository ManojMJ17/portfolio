import SplitTextLink from "@/components/SplitTextLink";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { navLinks, personal } from "@/data";

const Navbar = () => {
  const navbarRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      navbarRef.current,
      {
        y: -20,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        ease: "power3",
      }
    );
  }, []);

  return (
    <nav
      ref={navbarRef}
      className="flex py-7 px-6  md:py-8 lg:py-4 xl:pt-10 xl:px-8 z-10"
    >
      <div className="flex justify-between w-full">
        <h1 className=" font-mmedium leading-snug text-black-50 text-[clamp(1rem,3vw,2rem)] md:text-xl lg:text-lg xl:text-[1.3rem] ">
          {personal.roleLine1} <br className="md:hidden" />
          {personal.roleLine2}
        </h1>

        <ul className="flex flex-col md:flex-row gap-2 lg:gap-3 ">
          {navLinks.map((item, index) => (
            <SplitTextLink key={index} text={item.name} href={item.link} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
