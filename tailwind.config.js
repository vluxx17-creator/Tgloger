/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tgBlue: '#0088cc',
        tgDark: '#1c1c1d',
        premium: {
          start: '#6a5af9',
          end: '#d662ff'
        }
      }
    },
  },
  plugins: [],
}
