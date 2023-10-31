/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-carelulu": {
          backgroundColor: "rgba(35,170,170,1.00)",
        },
        ".bg-carelulu-btn": {
          backgroundColor: "#feb708",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
