/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*", "./views/*"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: "rgb(190 99 45)",

          secondary: "rgb(227 168 115)",

          accent: "#f4a4d8",

          neutral: "#23212C",

          "base-100": "rgb(125 53 25)",

          info: "#89BFEB",

          success: "#137144",

          warning: "#F4D371",

          error: "#FA0A32",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
