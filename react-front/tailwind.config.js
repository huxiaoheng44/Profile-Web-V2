/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vsblack: '#242424',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.border-primary': {
          borderWidth: '2px',
          borderColor: '#525252', // Zinc-600 
        },
      };
      addUtilities(newUtilities);
    }
  ],
}