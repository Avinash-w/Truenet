/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        'water-flow': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        shine: {
          '0%': { left: '-50%' },
          '100%': { left: '120%' },
        },
      },
      animation: {
        'water-flow': 'water-flow 6s ease-in-out infinite',
        shine: 'shine 3s infinite',
      },
    },
  },
  plugins: [],
};
