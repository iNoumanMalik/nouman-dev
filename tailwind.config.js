/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'jost': ['Jost', 'sans-serif'],
        'silkscreen': ['Silkscreen', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
      colors: {
        'neon-blue': '#00ffff',
        'neon-green': '#00ff00',
        'neon-pink': '#ff0080',
        'neon-yellow': '#ffff00',
        'neon-indigo': '#8b5cf6',
        'neon-purple': '#bf00ff',
      },
      boxShadow: {
        'glow-blue': '0 0 10px #00ffff, 0 0 20px #00ffff',
        'glow-green': '0 0 10px #00ff00, 0 0 20px #00ff00',
        'glow-pink': '0 0 10px #ff0080, 0 0 20px #ff0080',
        'glow-yellow': '0 0 10px #ffff00, 0 0 20px #ffff00',
        'glow-indigo': '0 0 10px #8b5cf6, 0 0 20px #8b5cf6',
        'glow-purple': '0 0 10px #bf00ff, 0 0 20px #bf00ff',
      },
    },
  },
  plugins: [],
}
