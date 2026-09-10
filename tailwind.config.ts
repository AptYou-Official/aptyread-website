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
        // AptyRead Brand Colors — calm indigo + cyan (no coral)
        "apty-indigo": "#173A8A", // Headings, nav, important text
        "apty-cyan": {
          DEFAULT: "#00B8D9", // CTA / links / active
          dark: "#0099B8", // CTA hover
          accent: "#E6F6FB", // Soft sky wash (alias)
        },
        "apty-sky": "#E6F6FB", // Soft sections / light fills
        "apty-cream": "#FAFAF7", // Main page background
        "apty-dark": "#173A8A", // Primary text (deep indigo)
        "apty-gray": "#5B6B7C", // Secondary text
        "apty-border": "#D7E3EC", // Quiet borders
        "apty-page": "#FAFAF7", // Page canvas
        // Legacy aliases → new system (so existing classes keep working)
        "apty-coral": "#00B8D9",
        "apty-coral-accent": "#E6F6FB",
        "apty-warm": "#E6F6FB",
        "apty-gold": "#00B8D9",
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
