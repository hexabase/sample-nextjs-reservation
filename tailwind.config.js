/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

  ],
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
    extend: {
      colors: {
        mainColor:'#BA00FF',
        secondMainColor:'#00FFB0',
        gray:'#808080'
      }
    },
  },
  plugins: [],
}