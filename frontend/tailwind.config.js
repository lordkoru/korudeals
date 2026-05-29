/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta de KoruDeals — colores cálidos terracota inspirados en
        // el "koru" (espiral) maorí y el estilo casual de los tenis.
        koru: {
          50:  "#fdf6f0",
          100: "#faead9",
          200: "#f4d3b3",
          300: "#ecb583",
          400: "#e29055",
          500: "#d97338",
          600: "#c85b2c",
          700: "#a64525",
          800: "#853925",
          900: "#6b3022"
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
