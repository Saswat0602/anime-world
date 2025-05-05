/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(56, 189, 248)',  // --primary
          dark: 'rgb(14, 165, 233)',     // --primary-dark
          light: '#60a5fa',
        },
        secondary: {
          DEFAULT: 'rgb(236, 72, 153)',  // --secondary
          dark: '#db2777',
          light: '#f472b6',
        },
        accent: {
          DEFAULT: 'rgb(139, 92, 246)',  // --accent
          dark: '#7c3aed',
          light: '#a78bfa',
        },
        foreground: {
          DEFAULT: 'rgb(15, 23, 42)',    // --foreground-rgb
          muted: 'rgb(71, 85, 105)',     // --foreground-muted
        },
        background: {
          DEFAULT: 'rgb(255, 255, 255)', // --background-start-rgb
          end: 'rgb(248, 250, 252)',     // --background-end-rgb
        },
        card: {
          bg: 'rgb(255, 255, 255)',      // --card-bg
          border: 'rgb(226, 232, 240)',  // --card-border
          hover: 'rgb(241, 245, 249)',   // --card-hover
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-in-out',
        'slide-down': 'slideDown 0.5s ease-in-out',
        'scale-in': 'scaleIn 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      darkMode: {
        foreground: {
          DEFAULT: 'rgb(248, 250, 252)',   // dark --foreground-rgb
          muted: 'rgb(148, 163, 184)',     // dark --foreground-muted
        },
        background: {
          DEFAULT: 'rgb(15, 23, 42)',      // dark --background-start-rgb
          end: 'rgb(30, 41, 59)',          // dark --background-end-rgb
        },
        card: {
          bg: 'rgb(30, 41, 59)',           // dark --card-bg
          border: 'rgb(51, 65, 85)',       // dark --card-border
          hover: 'rgb(51, 65, 85)',        // dark --card-hover
        },
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        'body': {
          color: theme('colors.foreground.DEFAULT'),
          background: `linear-gradient(to bottom, transparent, ${theme('colors.background.end')}) ${theme('colors.background.DEFAULT')}`,
        },
        '.dark body': {
          color: theme('darkMode.foreground.DEFAULT'),
          background: 'linear-gradient(to bottom, #000000, #151514)',
        },
      });
    },
  ],
}