import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vylith: {
          black: '#060608',
          void: '#0a0a0f',
          'purple-deep': '#1a0033',
          purple: '#7c3aed',
          'purple-glow': '#a855f7',
          'purple-light': '#d8b4fe',
          'blue-deep': '#0d1b3e',
          blue: '#1d4ed8',
          gold: '#c9a227',
          'gold-light': '#f0c040',
          white: '#f8f4ff',
          border: 'rgba(124, 58, 237, 0.18)',
        },
      },
      fontFamily: {
        serif: ['Canela', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'breathe': 'breathe 4s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
      },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
