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
        // Dream Cheesers brand colors based on the logo
        'dream-navy': '#002546',      // Main background navy
        'dream-pink': '#FF4081',      // Main pink/coral from logo text
        'dream-orange': '#FF9800',    // Cheese orange
        'dream-yellow': '#FFC107',    // Cheese highlight yellow
        'dream-teal': '#26C6DA',      // Accent teal
        'dream-light-teal': '#80DEEA', // Light teal for accents
        'dream-cream': '#FFF8E1',     // Light cream for backgrounds
        'dream-light-pink': '#FCE4EC', // Light pink for backgrounds
        'dream-dark': '#001122',      // Even darker navy for text
        'dream-gray': '#455A64',      // Muted gray for secondary text
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [],
}