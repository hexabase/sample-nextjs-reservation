/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
  important: '#__next',
  theme: {
    container:{
      center:true
    },
    fontFamily: {
      sans: ['Noto Sans JP', 'sans-serif'],
      segoe: ['Segoe Script'],
    },
    colors:{
      'black-rgba': 'rgba(0,0,0,0.4)'
    },
    extend: {},
  },
  plugins: [],
}