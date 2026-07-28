import type { PersonalInfo } from "./types";

export const personal: PersonalInfo = {
  firstName: "MANOJ",
  lastName: "KUMAR",
  fullName: "Manoj Kumar",

  // Rendered as two lines in the Navbar brand mark (line break is responsive).
  roleLine1: "Web Developer",
  roleLine2: "& Designer",

  tagline:
    "I'm a web developer passionate about crafting smooth, modern experiences with code and creativity.",
  aboutLabel: "(About me)",
  bioParagraphs: [
    "I specialize in modern JavaScript ecosystems — working with frameworks like Next.js, React, and Node.js, and styling with Tailwind CSS and animation libraries like GSAP. I also explore AI/ML, having built models and tools using TensorFlow, Python, and Flask.",
    "Beyond code, I enjoy collaborating, learning from real-world challenges, and contributing to projects that make a difference — whether it's for a user, a team, or the tech community.",
  ],

  // "AVAILABLE FOR" / "WORK" — split across two lines in the hero content block.
  availabilityLine1: "AVAILABLE FOR",
  availabilityLine2: "WORK",

  // Hero intro paragraph, split at the point where the design forces a line break on xl screens.
  heroDescriptionLine1:
    "Open to job opportunities worldwide. Passionate about building polished, intuitive,and thoughtful digital",
  heroDescriptionLine2: "experiences that leave a mark.",

  profileImage: {
    src: "/images/Caspar_David_Friedrich_-_Wanderer_above_the_Sea_of_Fog.jpeg",
    aboutAlt: "Caspar_David_Friedrich",
    heroAlt: "Wanderer",
  },
};
