/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  important: true,
  theme: {
    extend: {
      colors: {
        'theme-dark-900': 'rgb(13, 13, 13)',
        'theme-red-900': '#ff4d4d',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'fade-out': 'fadeOut 1s ease-out',
        'slide-in': 'slideIn 0.5s ease-out',
        shake: 'shake 250ms ease-out',
        'text-flicker': 'text-flicker 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
        slideIn: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
        shake: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
          '25%': {
            transform: 'translateX(-5px)',
          },
          '50%': {
            transform: 'translateX(5px)',
          },
          '75%': {
            transform: 'translateX(-5px)',
          },
        },
        'text-flicker': {
          '0%': { opacity: 1 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
