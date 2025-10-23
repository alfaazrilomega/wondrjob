/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "neon-purple": "#ff00ff",
        "neon-blue": "#00ffff",
        "neon-pink": "#ff0080",
        "dark-bg": "#0a0a0f",
        "dark-card": "#1a1a2e",
        "dark-border": "#2d2d44",
        "text-neon": "#ffffff",
        "text-glow": "#e0e0ff",
        "text-dim": "#a0a0c0",
      },
      fontFamily: {
        sans: ["Exo 2", "sans-serif"],
        orbitron: ["Orbitron", "monospace"],
      },
    },
  },
  plugins: [],
};
