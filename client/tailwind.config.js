// tailwind.config.js
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    theme: {
      extend: {
        backgroundSize: {
          '200%': '200% 200%',
        },
        animation: {
          shimmer: 'shimmer 3s ease-in-out infinite',
        },
        keyframes: {
          shimmer: {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '100% 50%' },
          },
        },
      },
    },
    plugins: [],
  };
  