// Shared TypeScript interfaces for the centralized content/data layer.

export interface NavLink {
  name: string;
  link: string;
}

export interface SocialLink {
  name: string;
  link: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  items: string[];
}

export interface ServiceTechnology {
  sno: string;
  stack: string;
}

export interface Service {
  sno: string;
  title: string;
  description: string;
  technologies: ServiceTechnology[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  href: string;
  img: string;
  video: string;
  /** Demo video format. "web" (default) renders landscape 16:9; "mobile" renders portrait 9:16. */
  type?: 'web' | 'mobile';
}

export interface ProfileImage {
  src: string;
  aboutAlt: string;
  heroAlt: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  roleLine1: string;
  roleLine2: string;
  tagline: string;
  bioParagraphs: string[];
  aboutLabel: string;
  availabilityLine1: string;
  availabilityLine2: string;
  heroDescriptionLine1: string;
  heroDescriptionLine2: string;
  profileImage: ProfileImage;
}

export interface SectionIntro {
  label: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
}

export interface ContactFormPlaceholders {
  name: string;
  email: string;
  message: string;
}

export interface ContactToastMessages {
  successTitle: string;
  successDescription: string;
  error: string;
}

export interface ContactContent {
  heading: string;
  subheading: string;
  formPlaceholders: ContactFormPlaceholders;
  submitLabel: string;
  toast: ContactToastMessages;
}

export interface FooterContent {
  menuLabel: string;
  socialsLabel: string;
  localTimeLabel: string;
  timeLocale: string;
  timezoneLabel: string;
}

export interface SiteConfig {
  title: string;
  description: string;
}
