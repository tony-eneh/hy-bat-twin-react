/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        highlight: '#5d8dd1',
        sidebarBg: '#2a465e',
      },
    },
  },
  plugins: [],
};
