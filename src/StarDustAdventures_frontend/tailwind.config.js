/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        btnLight:'rgb(123,0,255)',
        secondary : 'rgba(225, 24, 51, 1)',
        'transparent-white':'rgba(255, 255, 255, 0.41)'
      },
      fontFamily:{
        'silkscreen': ['Silkscreen', 'cursive'],
        'pixelify-sans': ['Pixelify Sans', 'sans-serif'],
        'sf-pro-display': ['SF Pro Display', 'sans-serif'],
        'coin':['Coin Ding Dong', 'cursive']
      }
    },
    screens:{
      xs:'420px',
      ...defaultTheme.screens
    }
  },
  plugins: [],
}