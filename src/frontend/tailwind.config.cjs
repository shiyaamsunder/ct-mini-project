/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#2C2C2C",
        'bg-accent': "#313131",
        'inactive': '#C1C1C1',
        'active': 'white',
        'primary': '#097ED4'

      }
    },
  },
  fontFamily: {
    sans: ['Work Sans'],
  },
  plugins: [],
}
