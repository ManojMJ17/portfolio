import ScrambledSplitText from "@/components/ScrambledSplitText";
import {
  skillCategories,
  skillsHeadingLine1,
  skillsHeadingLine2,
  skillsSectionTitle,
} from "@/data";

// Written as static literals (not template strings) so Tailwind's class scanner can find them.
const SKILL_COLUMN_CLASSES = [
  "col-start-1 space-y-1 md:-space-y-1 xl:space-y-3 justify-items-start",
  "col-start-2 space-y-1 md:-space-y-1 xl:space-y-3 justify-items-start",
  "col-start-3 space-y-1  md:-space-y-1 xl:space-y-3 justify-items-start",
];

const Skills = () => {
  return (
    <div className="px-4 flex flex-col-reverse md:grid md:grid-cols-12 md:gap-y-28 lg:grid-cols-12 lg:justify-items-center xl:h-screen xl:items-center">
      {/* Left Side (Heading) */}
      <div className="mt-16 ml-4 md:row-start-1 lg:col-start-1 lg:col-span-6">
        <div className="lg:col-span-6 xl:col-span-full">
          <h1 className="text-[12vw] tracking-tighter font-mmedium uppercase leading-none md:text-[10vw] lg:text-[9vw] lg:break-words xl:text-[7vw]">
            {skillsHeadingLine1}
          </h1>
        </div>

        {/* "designer creator/" spans 8 columns */}
        <div className="lg:col-span-7 xl:col-span-full">
          <h1 className="text-[12vw] tracking-tighter font-mmedium uppercase leading-none md:text-[10vw] lg:text-[9vw] xl:text-[7vw]">
            {skillsHeadingLine2}
          </h1>
        </div>
      </div>

      {/* Right Side (Skills) */}
      <div className="md:row-start-2 md:col-span-full md:space-y-12 md:px-6 lg:col-start-7 lg:col-span-7 lg:row-start-1 lg:justify-items-center">
        <div className="flex justify-center mb-8">
          <h2 className="text-[12vw] tracking-tighter font-mmedium md:text-[10vw] lg:text-[9vw] xl:text-[6vw]">
            {skillsSectionTitle}
          </h2>
        </div>

        <div className="grid grid-cols-3  gap-4 md:px-6">
          {skillCategories.map((category, colIndex) => (
            <div key={category.id} className={SKILL_COLUMN_CLASSES[colIndex]}>
              <h3 className="hidden md:block text-xl font-mmedium font-semibold mb-2 xl:mb-4 xl:text-2xl">
                {category.label}
              </h3>
              {category.items.map((item, index) => (
                <div key={index}>
                  <ScrambledSplitText
                    text={item}
                    classname="text-white-100 h-[20px] md:h-[26px] lg:h-[32px] text-[4vw] font-mono-custom lg:text-[1.1rem] md:text-[1rem] xl:text-3xl"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
