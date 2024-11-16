/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-red': '#fe0000',
        'primary-purple': '#f7f8fd',
      },
      width: {
        '1/6-gap-5': 'calc(16.666667% - 20px)',
        '1/4-gap-5': 'calc(25% - 20px)',
        '1/3-gap-5': 'calc(33.33333% - 20px)',
        '1/2-gap-5': 'calc(50% - 10px)',
        '1/3-gap-7': 'calc(33.3% - 28px)',
        '1/2-gap-7': 'calc(50% - 28px)',
        '1/5-gap-4': 'calc(20% - 13px)',
      },
    },
  },
  plugins: [],
}
