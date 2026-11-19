/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { '3xl': '1700px' },
      colors: {
        brand: {
          blue: '#004AAD',
          navy: '#043679',
          yellow: '#F8EA2B',
          green: '#75CB31',
          cream: '#FDF9EF',
          ice: '#F8FBFF',
        },
      },
    },
  },
  plugins: [],
}
