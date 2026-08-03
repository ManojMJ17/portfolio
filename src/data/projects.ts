import type { Project, SectionIntro } from "./types";

export const projectsIntro: SectionIntro = {
  label: "(PROJECTS)",
  headingLine1: "Selected",
  headingLine2: "Works /",
  description:
    "A collection of purposeful digital builds — blending performance, clarity, and user experience into clean, reliable tools and platforms.",
};

// Badge shown on every project card; all current projects share the same category.
export const projectCategoryLabel = "DEVELOPMENT";

export const projects: Project[] = [
  {
    id: "01",
    title: "QuizSphere",
    subtitle: "Java Microservices Quiz Platform",
    year: "2026",
    href: "https://github.com/ManojMJ17/QuestionQuiz",
    img: "/images/quiz.jpeg",
    video: "/videos/quizsphere_demo.mp4",
  },
  {
    id: "02",
    title: "clix",
    subtitle: "Linux Command Helper",
    year: "2025",
    href: "https://github.com/ManojMJ17/clix",
    img: "/images/linux2.jpeg",
    video: "/videos/clix-demo.mp4",
  },
  {
    id: "03",
    title: "Music App",
    subtitle: "Offline Music Player",
    year: "2026",
    href: "https://github.com/ManojMJ17/MusicPlayer",
    img: "/images/music.jpeg",
    video: "/videos/music_app_demo.mp4",
    type: "mobile",
  },
  {
    id: "04",
    title: "Noiz",
    subtitle: "Real-Time Chat Platform",
    year: "2026",
    href: "https://github.com/ManojMJ17/noiz",
    img: "/images/noiz-bg.jpeg",
    video: "/videos/noiz_demo.mp4",
  },
  {
    id: "05",
    title: "RhythmBox",
    subtitle: "Spotify clone",
    year: "2023",
    href: "https://spotify-clone-gules-alpha.vercel.app/",
    img: "/images/spotify-musicl-bg.jpeg",
    video: "/videos/Spotify_project.mp4",
  },
  {
    id: "06",
    title: "Socially",
    subtitle: "Social Networking Platform",
    year: "2024",
    href: "https://socially-sable.vercel.app/",
    img: "/images/socially.jpeg",
    video: "/videos/Socially_project.mp4",
  },
  // {
  //   id: "06",
  //   title: "Awwward Winning Website",
  //   subtitle: "Gaming Website",
  //   year: "2024",
  //   href: "https://gaming-website-with-gsap.vercel.app/",
  //   img: "/images/Website.jpeg",
  //   video: "/videos/awward_winning_website_project.mp4",
  // },
  // {
  //   id: "07",
  //   title: "Digital Library",
  //   subtitle: "University Library System",
  //   year: "2024",
  //   href: "https://university-library-lime.vercel.app/",
  //   img: "/images/library-bg.jpeg",
  //   video: "/videos/BookWise_project.mp4",
  // },
  // {
  //   id: "08",
  //   title: "PrepMate",
  //   subtitle: "Exam Preparation Assistance",
  //   year: "2025",
  //   href: "https://interview-prep-tau-azure.vercel.app/",
  //   img: "/images/exam-bg.jpeg",
  //   video: "/videos/prepmate_project.mp4",
  // },
];
