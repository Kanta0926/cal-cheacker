/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        gothic: ["var(--font-gothicA1)"],
        zenMaruGothic: ["var(--font-zenMaruGothic)"],
      },
    },
  },
  plugins: [],
};
