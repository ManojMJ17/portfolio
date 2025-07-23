import ScrambledSplitText from "@/components/ScrambledSplitText";
import { skills } from "@/constants/skillls";

const Skills = () => {
  return (
    <div className="px-4 flex flex-col-reverse md:grid md:grid-cols-12 md:gap-y-28 lg:grid-cols-12 lg:justify-items-center xl:h-screen xl:items-center">
      {/* Left Side (Heading) */}
      <div className="mt-16 ml-4 md:row-start-1 lg:col-start-1 lg:col-span-6">
        <div className="lg:col-span-6 xl:col-span-full">
          <h1 className="text-[12vw] tracking-tighter font-mmedium uppercase leading-none md:text-[10vw] lg:text-[9vw] lg:break-words xl:text-[7vw]">
            Developer
          </h1>
        </div>

        {/* "designer creator/" spans 8 columns */}
        <div className="lg:col-span-7 xl:col-span-full">
          <h1 className="text-[12vw] tracking-tighter font-mmedium uppercase leading-none md:text-[10vw] lg:text-[9vw] xl:text-[7vw]">
            designer creator/
          </h1>
        </div>
      </div>

      {/* Right Side (Skills) */}
      <div className="md:row-start-2 md:col-span-full md:space-y-12 md:px-6 lg:col-start-7 lg:col-span-7 lg:row-start-1 lg:justify-items-center">
        <div className="flex justify-center mb-8">
          <h2 className="text-[12vw] tracking-tighter font-mmedium md:text-[10vw] lg:text-[9vw] xl:text-[6vw]">
            Skills
          </h2>
        </div>

        <div className="grid grid-cols-3  gap-4 md:px-6">
          <div className="col-start-1 space-y-1 md:-space-y-1 xl:space-y-3 justify-items-start">
            <h3 className="hidden md:block text-xl font-mmedium font-semibold mb-2 xl:mb-4 xl:text-2xl">
              Language & Tools
            </h3>
            {skills.languagesAndTools.map((lan, index) => (
              <div key={index}>
                <ScrambledSplitText
                  text={lan}
                  classname="text-white-100 h-[20px] md:h-[26px] lg:h-[32px] text-[4vw] font-consola lg:text-[1.1rem] md:text-[1rem] xl:text-3xl"
                />
              </div>
            ))}
          </div>
          <div className="col-start-2 space-y-1 md:-space-y-1 xl:space-y-3 justify-items-start">
            <h3 className="hidden md:block text-xl font-mmedium font-semibold mb-2 xl:mb-4 xl:text-2xl">
              Frameworks & Libraries
            </h3>
            {skills.frameworksAndLibraries.map((fl, index) => (
              <div key={index}>
                <ScrambledSplitText
                  text={fl}
                  classname="text-white-100 h-[20px] md:h-[26px] lg:h-[32px] text-[4vw] font-consola lg:text-[1.1rem] md:text-[1rem] xl:text-3xl"
                />
              </div>
            ))}
          </div>
          <div className="col-start-3 space-y-1  md:-space-y-1 xl:space-y-3 justify-items-start">
            <h3 className="hidden md:block text-xl font-mmedium font-semibold mb-2  xl:mb-4 xl:text-2xl">
              Core CS Concepts
            </h3>
            {skills.coreCSConcepts.map((cs, index) => (
              <div key={index}>
                <ScrambledSplitText
                  text={cs}
                  classname="text-white-100 h-[20px] md:h-[26px] lg:h-[32px] text-[4vw] font-consola lg:text-[1.1rem] md:text-[1rem] xl:text-3xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
