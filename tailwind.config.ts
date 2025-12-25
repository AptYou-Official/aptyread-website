import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // AptyRead Brand Colors - EXACT COLORS
        'apty-coral': '#FF6B35',        // Primary brand color
        'apty-cyan': '#0099CC',         // Secondary brand color
        'apty-gold': '#FFB300',         // Accent color
        'apty-warm': '#FFF9F7',         // UNIQUE: 5% coral + white background
        'apty-dark': '#2D3748',         // Dark text
        'apty-gray': '#64748B',         // Gray text
        'apty-coral-accent': '#FFE5DD', // Soft coral for borders
        'apty-border': '#E2E8F0',       // Border gray
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;

