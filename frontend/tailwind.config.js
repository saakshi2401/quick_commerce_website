/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        backgroundLight: '#f6f6f9', // Clean very light gray
        cardLight: '#ffffff',
        accentDark: '#3C1E5C', // Zepto Purple
        accentLight: '#4e287a',
        accentGlow: '#62329b', 
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
