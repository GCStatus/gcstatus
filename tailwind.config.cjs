/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: '#root',
  theme: {
    extend: {
      colors: {
        'theme-dark-900': 'rgb(13, 13, 13)',
        'theme-red-900': '#ff4d4d',
      },
    },
  },
  plugins: [],
}
