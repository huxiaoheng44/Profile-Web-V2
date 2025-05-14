module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        vsblack: "#242424",
      },
      keyframes: {
        bounceY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
      },
      animation: {
        bounceY: "bounceY 0.2s ease-out ",
        once: "bounce 1s ease-in-out",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-primary": {
          borderWidth: "2px",
          borderColor: "#525252", // Zinc-600
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
