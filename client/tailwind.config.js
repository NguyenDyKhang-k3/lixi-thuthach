/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'tet-red': '#E63946',
        'tet-gold': '#FFD60A',
        'tet-dark': '#1D3557',
      },
      fontFamily: {
        'vietnamese': ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [],
}
