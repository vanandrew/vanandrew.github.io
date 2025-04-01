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
        mono: {
          black: '#000000',
          darkgray: '#303030',
          gray: '#909090',
          lightgray: '#E0E0E0',
          offwhite: '#F5F5F5',
          white: '#FFFFFF',
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
