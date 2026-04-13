/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#111111",
          gold: "#c8922a",
        },
      },
    },
  },
  plugins: [],
};
