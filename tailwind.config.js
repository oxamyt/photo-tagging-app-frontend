/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        lightBg: "#c9c8c5",
        darkBg: "#1c1f26",
      },
    },
  },
  plugins: [],
};
