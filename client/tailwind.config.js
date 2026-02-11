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
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        firework: {
          '0%': { transform: 'scale(0) translate(0,0)', opacity: '1' },
          '100%': { transform: 'scale(3) translate(var(--tx), var(--ty))', opacity: '0' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s linear infinite',
        float: 'float 3s ease-in-out infinite',
        firework: 'firework 1s ease-out forwards',
        shimmer: 'shimmer 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
