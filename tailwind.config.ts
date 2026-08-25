import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#050506',
          900: '#08080A',
          850: '#0D0D10',
          800: '#121215',
          700: '#18181D',
          600: '#222228',
        },
        gold: {
          light: '#ECC880',
          primary: '#C5A880',
          dark: '#9E7432',
          champagne: '#E6D5B8',
        },
        luxury: {
          white: '#F9F8F6',
          subtle: '#A3A3AC',
          muted: '#6E6E78',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #ECC880 0%, #C5A880 50%, #9E7432 100%)',
        'gold-gradient-soft': 'linear-gradient(135deg, rgba(236,200,128,0.15) 0%, rgba(197,168,128,0.05) 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(197,168,128,0.12) 0%, rgba(8,8,10,0) 70%)',
      },
      boxShadow: {
        'luxury-card': '0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)',
        'gold-glow': '0 0 25px -5px rgba(197, 168, 128, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
