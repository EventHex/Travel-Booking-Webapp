/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        fontFamily: {
          dmSans: ["DM Sans", "sans-serif"],
          inter: ["Inter", "sans-serif"],
          manrope: ["Manrope", "sans-serif"],
          playfair: ["Playfair Display", "serif"],
          robotoMono: ["Roboto Mono", "monospace"],
          titillium: ["Titillium Web", "sans-serif"],
        },
      },
    },
    plugins: [],
  };
  