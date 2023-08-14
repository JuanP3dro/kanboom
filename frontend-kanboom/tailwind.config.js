/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        blue1: '#0052CC', 
        blue2: '#4C9AFF', 
        gray1: '#5e6c84',
        gray2: '#CACFDA',
        gray3: '#757575',
        gray4: '#EEF3FE',
        gray5: '#282828',
        green1: '#3DDC97',
        red1: '#F71735',
        yellow1: '#F3CA40',
        purple1:'#6C63FF'
      }
    },
  },
  plugins: [],
}
