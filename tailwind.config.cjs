/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        accent: '#FFF6E5',
        mint: '#B8F0DA',
        paper: '#FFFDF8',
        scribble: '#F2D8C6',
      },
      fontFamily: {
        handwritten: ['var(--font-handwritten)', 'ui-sans-serif', 'system-ui'],
        sans: ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'hand': '6px 6px 0 rgba(0,0,0,0.06), -3px -3px 0 rgba(255,255,255,0.6)'
      },
      keyframes: {  
        draw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
          '100%': { transform: 'translateY(0px)' },
        }
      },
      animation: {
        'draw': 'draw 1s ease-out forwards',
        'float-slow': 'float 4s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
