export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        coal: '#111113',
        graphite: '#1B1B1E',
        bone: '#F2EEE7',
        sand: '#E7E1D6',
        champagne: '#C9B58C',
        volt: '#6FD8F2',
      },
      fontFamily: {
        display: ['"Inter Tight"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
    },
  },
};
