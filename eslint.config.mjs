import { defineConfig } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    // Keep new React Compiler diagnostics visible in the existing lesson players
    // and account action handler while preserving their current behavior.
    files: ["components/{english,malayalam}/**/*.{ts,tsx}", "app/__/auth/action/page.tsx"],
    rules: {
      "react-hooks/purity": "warn",
      "react-hooks/refs": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);
