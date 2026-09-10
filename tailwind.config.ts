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
        // AptyRead Brand Colors
        'apty-coral': '#FF6B35',        // Primary brand color / CTAs
        'apty-cyan': {
          DEFAULT: '#0099CC',           // Path / structure
          dark: '#007399',              // Soft emphasis (hero accents)
          accent: '#E6F5FA',            // Soft cyan wash
        },
        'apty-gold': '#FFB300',         // Accent color
        'apty-warm': '#FFF7F4',         // Soft coral tint for alternating sections
        'apty-dark': '#2D3748',         // Dark text
        'apty-gray': '#64748B',         // Gray text
        'apty-coral-accent': '#FFE8E0', // Soft coral for borders
        'apty-border': '#E2E8F0',       // Border gray
        'apty-page': '#FFFFFF',         // Dominant page white
      },
      fontFamily: {
        sans: ['var(--font-nunito-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;



