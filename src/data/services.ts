import type { SectionIntro, Service } from "./types";

export const servicesIntro: SectionIntro = {
  label: "(SERVICES)",
  headingLine1: "What",
  headingLine2: "I build /",
  description:
    "I build scalable software solutions across the full stack—from robust backend systems to responsive frontend applications. My focus is on clean architecture, performance, and delivering reliable user experiences.",
};

export const services: Service[] = [
  {
    sno: "(01)",
    title: "Full-Stack Development",
    description: `Building scalable end-to-end applications with modern frontend and backend technologies, emphasizing clean architecture, performance, and intuitive user experiences.`,
    technologies: [
      { sno: "01", stack: "Java, Spring Boot, React, Next.js" },
      { sno: "02", stack: "Node.js, Express, TypeScript" },
      { sno: "03", stack: "PostgreSQL, MongoDB, REST APIs" },
    ],
  },
  {
    sno: "(02)",
    title: "Backend Systems",
    description:
      "Designing secure, scalable backend systems using microservices, caching, service discovery, and containerized deployments.",
    technologies: [
      { sno: "01", stack: "Java, Spring Boot, Spring Security" },
      { sno: "02", stack: "Microservices, OpenFeign, Eureka" },
      { sno: "03", stack: "Redis, Docker, API Gateway, Load Balancing" },
    ],
  },
  {
    sno: "(03)",
    title: "Software Engineering",
    description: `Applying strong computer science fundamentals to build reliable, maintainable, and production-ready software.`,
    technologies: [
      { sno: "01", stack: "Java, Data Structures & Algorithms" },
      { sno: "02", stack: "OOP, DBMS, Operating Systems" },
      { sno: "03", stack: "Git, GitHub, Postman" },
    ],
  },
];