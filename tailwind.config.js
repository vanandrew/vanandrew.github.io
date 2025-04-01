/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          black: '#000000',
          darkgray: '#0f0f11',
          gray: '#86868b',
          lightgray: '#f5f5f7',
          blue: '#00c2ff',
          darkblue: '#0077ED',
          red: '#ff3b30',
          green: '#34c759',
          orange: '#ff9500',
          accent: '#00c2ff',
          secondary: '#ff3b30',
          tertiary: '#34c759',
        },
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Satoshi', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
