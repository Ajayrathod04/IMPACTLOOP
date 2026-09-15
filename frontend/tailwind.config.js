/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        // Warm B2B Charcoal & Ivory palette
        surface: {
          950: '#07080c',
          900: '#0d0f14',
          850: '#14161f',
          800: '#1c1f2b',
          700: '#272b3c',
          600: '#383e54',
        },
        ivory: {
          50: '#fcfcf9',
          100: '#f5f4ef',
          200: '#e5e3d7',
          300: '#d1cebf',
          400: '#a3a08f',
        },
        brand: {
          50: '#fffbeb',
          100: '#fef3c7',
          400: '#fbbf24',
          500: '#f59e0b', // Amber primary
          600: '#d97706',
          700: '#b45309',
        },
        warmOrange: {
          500: '#f97316',
          600: '#ea580c',
        },
        coral: {
          500: '#ef4444',
          600: '#dc2626',
        }
      },
    },
  },
  plugins: [],
}
