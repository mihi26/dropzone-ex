/* eslint-env node */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        default: "842px",
        secondary: "244px",
      },
      height: {
        default: "232px",
        secondary: "48px",
      },
      colors: {
        "light-blue": "#F8F8F8",
        "light-grey": "#DCDCDC",
        "red-error": "#ED5D5D",
        "blue-hover": "#185ABD",
      },
      fontFamily: {
        primary: '"Noto Sans"',
      },
      fontSize: {
        xxs: "8px",
      },
      lineHeight: {
        5.5: "22px",
      },
    },
  },
  plugins: [],
};
