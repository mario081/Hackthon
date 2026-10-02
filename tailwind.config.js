/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        navy: {
          950: '#030b1f',
          900: '#061430',
          850: '#08193b',
          800: '#0b2047',
          700: '#122d5e',
          600: '#1b3f7d',
          500: '#2a5aa8',
        },
        accent: {
          DEFAULT: '#22d3ee',
          strong: '#06b6d4',
          soft: '#67e8f9',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(34,211,238,.35), 0 8px 30px -8px rgba(34,211,238,.45)',
      },
    },
  },
  plugins: [],
}
