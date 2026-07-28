// Central barrel — all portfolio content flows through this file.
// Components should import content exclusively from "@/data" rather than
// reaching into individual data modules.

export * from "./types";

export { personal } from "./personal";
export { socialLinks } from "./socials";
export { navLinks, contactLink, footerHomeLink } from "./navigation";
export {
  skillCategories,
  skillsHeadingLine1,
  skillsHeadingLine2,
  skillsSectionTitle,
} from "./skills";
export { services, servicesIntro } from "./services";
export { projects, projectsIntro, projectCategoryLabel } from "./projects";
export { contact } from "./contact";
export { footerContent } from "./footer";
export { siteConfig } from "./site";
