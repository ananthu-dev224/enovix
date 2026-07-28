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
        brand: {
          blue: '#1a6fc4',
          'blue-dark': '#155a9e',
          'blue-light': '#2889e8',
          'blue-bright': '#4dabff',
        },
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f9fb',
          border: '#e5e7eb',
        },
        ink: {
          DEFAULT: '#111827',
          muted: '#6b7280',
          faint: '#9ca3af',
        },
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dm: ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 1px 2px rgba(17, 24, 39, 0.04), 0 1px 3px rgba(17, 24, 39, 0.06)',
        card: '0 4px 16px rgba(17, 24, 39, 0.06), 0 2px 6px rgba(17, 24, 39, 0.04)',
        lift: '0 20px 48px rgba(17, 24, 39, 0.1), 0 8px 16px rgba(17, 24, 39, 0.06)',
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
  plugins: [],
};

export default config;
