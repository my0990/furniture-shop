/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        wood: {
          50: "#FBF7F2",
          100: "#F3ECE1",
          200: "#E6D7C3",
          300: "#D6BE9C",
          400: "#C9A27E",
          500: "#B08968",
          600: "#8F6B4E",
          700: "#6B5C4F",
          800: "#4A3F37",
          900: "#3A2E27",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
