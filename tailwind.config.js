/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E50914',
        secondary: '#141414',
        dark: '#000000',
        light: '#FFFFFF',
      },
    },
  },
  plugins: [],
} 