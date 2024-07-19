/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/App.{ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBg: "#FEFAE0",
        darkBg: "#DDA15E",
        primary: "#D4A373",
        secondary: "#CCD5AE",
        lightText: "#E9EDC9",
        darkText: "#283618",
      },
    },
  },
  plugins: [],
};
