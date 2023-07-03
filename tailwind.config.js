/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '25r': '25rem',
        '27r': '27rem',
        '36r': '36rem',
        '1/10': '10%',
        '7/10': '70%',
        '7/9': '77.77%',
        '3/20': '15%',
        '3/25': '12%',
        '17/25': '68%'
      },
      borderRadius: {
        '65': '65px',
        '42': '42px',
      },
      boxShadow: {
        'custom': '0px 10px 100px 0px rgba(0, 0, 0, 0.10)',
      },
      flex: {
        '1-0-50': '1 0 50%',
      },
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '4rem',
          xl: '5rem',
          '2xl': '6rem',
        },
    },
    },
  },
  plugins: [],
}

