/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        modal: "rgb(0, 0, 0, 0.7)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
