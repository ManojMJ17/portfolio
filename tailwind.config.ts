/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // App Router (Next.js 13+)
    "./pages/**/*.{js,ts,jsx,tsx}", // Pages Router (legacy)
    "./components/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screen: {
        xs: "425px",
      },
      colors: {
        testcolor: "#ff00ff", // test this!
      },
    },
  },
  plugins: [],
};
