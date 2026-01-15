/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      coraline: ['Coraline', 'sans-serif'], // 'Coraline'이 CSS의 font-family 이름과 같아야 함
    },
  },
},
  plugins: [],
}