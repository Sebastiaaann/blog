/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#14140d',
        'custom-light': '#B8B3AF',
      },
      fontFamily: {
        serif: ['Times New Roman', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#14140d',
            maxWidth: '65ch',
            h1: {
              color: '#14140d',
              fontWeight: '300',
            },
            h2: {
              color: '#14140d',
              fontWeight: '300',
            },
            h3: {
              color: '#14140d',
              fontWeight: '300',
            },
            strong: {
              color: '#14140d',
              fontWeight: '500',
            },
            a: {
              color: '#B8B3AF',
              '&:hover': {
                color: '#ffffff',
              },
            },
            blockquote: {
              borderLeftColor: '#B8B3AF',
              color: '#B8B3AF',
            },
            code: {
              color: '#B8B3AF',
              backgroundColor: '#1F2937',
            },
            pre: {
              backgroundColor: '#1F2937',
              code: {
                backgroundColor: 'transparent',
              },
            },
            ul: {
              li: {
                color: '#14140d',
                '&::marker': {
                  color: '#B8B3AF',
                },
              },
            },
            ol: {
              li: {
                color: '#14140d',
                '&::marker': {
                  color: '#B8B3AF',
                },
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 