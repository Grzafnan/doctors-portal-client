/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        doctorstheme: {
          "primary": '#0FCFEC',
          "secondary": "#19D3AE",
          "base-100": "#FAF9FA",
          "accent": "#3A4256",
          "neutral": "#161221",
          "info": "#2D65F0",
          "warning": "#F6CF09",
          "error": "#E12D3F",
        }
      }
    ]
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
