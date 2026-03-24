import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#010b18',
          900: '#020d1f',
          800: '#041428',
          700: '#071e3d',
          600: '#0b2a57',
        },
        blue: {
          accent: '#1a6fc4',
          glow: '#2889e8',
          bright: '#4dabff',
        },
        cyan: {
          pop: '#00d4ff',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;