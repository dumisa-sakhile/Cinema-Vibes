/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        modal: "rgb(0, 0, 0, 0.9)",
        popup: "rgb(255, 255, 255, 0.9)",
        customGray: "rgb(60, 60, 60)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwind-scrollbar-hide"),
  ],
};
