/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FCE7F3",
        petal: "#F9A8D4",
        rose: "#E879A9",
        gold: "#C9828D",
        ink: "#241F21",
        muted: "#777174",
        line: "#F3D5E1",
        deep: "#A2506B", // darker rose for small text (accessible contrast on white)
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "Georgia", "serif"],
        sans: ["Manrope", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
