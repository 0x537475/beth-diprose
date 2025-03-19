/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f9f1',
          100: '#e7f3e3',
          200: '#cfe7c7',
          300: '#afd69c',  // Base color
          400: '#94c57e',
          500: '#7ab461',
          600: '#619049',
          700: '#4d723a',
          800: '#405b30',
          900: '#354b28',
        },
        secondary: {
          50: '#f6faf4',
          100: '#e8f2e4',
          200: '#d1e5ca',
          300: '#afd69c',  // Using base as an accent
          400: '#8bc076',
          500: '#6ca654',
          600: '#548442',
          700: '#436935',
          800: '#37552c',
          900: '#2e4625',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};