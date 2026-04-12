/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'aurebesh-gold': '#FFD700',
        'sith-red': '#CC0000',
        'space-dark': '#0a0a0f',
        'space-blue': '#1a1a2e',
      },
      fontFamily: {
        'star-wars': ['Aurebesh', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
