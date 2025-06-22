import type { Config } from 'tailwindcss';
const figmaTheme = require('./figma/tailwind.theme.json');

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        ...figmaTheme.colors,
        ...figmaTheme.fontSize,
        background: 'var(--background)',
        foreground: 'var(--foreground)'
      },
      keyframes: {
        skeleton: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        }
      },
      animation: {
        skeleton: 'skeleton 1.5s ease-in-out infinite'
      },
      backgroundImage: {
        skeleton: 'linear-gradient(90deg, #f3f3f3 25%, #e2e2e2 50%, #f3f3f3 75%)'
      },
      backgroundSize: {
        skeleton: '400% 100%'
      }
    }
  },
  plugins: []
} satisfies Config;
