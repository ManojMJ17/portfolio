import type { SkillCategory } from "./types";

// Big stacked headline rendered above the skills grid ("Developer" / "designer creator/").
export const skillsHeadingLine1 = "Developer";
export const skillsHeadingLine2 = "designer creator/";
export const skillsSectionTitle = "Skills";

export const skillCategories: SkillCategory[] = [
  {
    id: "languagesAndTools",
    label: "Language & Tools",
    items: [
      "Python",
      "SQL",
      "C++",
      "Java",
      "Typescript",
      "JavaScript",
      "Git",
      "Postman",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    id: "frameworksAndLibraries",
    label: "Frameworks & Libraries",
    items: [
      "React",
      "Node.js",
      "Express.js",
      "Bootstrap",
      "jQuery",
      "TailwindCSS",
      "GSAP",
    ],
  },
  {
    id: "coreCSConcepts",
    label: "Core CS Concepts",
    items: ["DSA", "DBMS", "OOP", "Operating Systems"],
  },
];
