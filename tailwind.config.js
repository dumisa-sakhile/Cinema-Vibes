/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        modal: "rgb(0, 0, 0, 0.8)",
        popup: "rgb(255, 255, 255, 0.8)",
        customGray: "rgb(60, 60, 60)",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar")({ nocompatible: true }),
    require("tailwind-scrollbar-hide"),
  ],
};
