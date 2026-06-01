import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* ── Semantic theme tokens (auto-swap dark/light) ── */
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
          3: "rgb(var(--surface-3) / <alpha-value>)",
          4: "rgb(var(--surface-4) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--text-primary) / <alpha-value>)",
          muted: "rgb(var(--text-secondary) / <alpha-value>)",
          subtle: "rgb(var(--text-tertiary) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          light: "rgb(var(--gold-light) / <alpha-value>)",
          dark: "rgb(var(--gold-dark) / <alpha-value>)",
        },

        /* ── Legacy aliases (kept for backwards compatibility
              with existing components — they still work and
              now auto-swap with theme) ── */
        silver: {
          DEFAULT: "rgb(var(--text-secondary) / <alpha-value>)",
          light: "rgb(var(--text-secondary) / <alpha-value>)",
          dark: "rgb(var(--text-tertiary) / <alpha-value>)",
        },
        dark: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          2: "rgb(var(--surface-2) / <alpha-value>)",
          3: "rgb(var(--surface-3) / <alpha-value>)",
          4: "rgb(var(--surface-4) / <alpha-value>)",
        },
        brand: {
          red: "rgb(var(--brand-red) / <alpha-value>)",
          "red-hover": "rgb(var(--brand-red-hover) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease-out forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-left": "slideLeft 0.5s ease-out forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideLeft: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(212,175,55,0.5)" },
          "50%": { boxShadow: "0 0 0 14px rgba(212,175,55,0)" },
        },
      },
      backgroundImage: {
        "gradient-gold":
          "linear-gradient(135deg, rgb(var(--gold)) 0%, rgb(var(--gold-light)) 50%, rgb(var(--gold)) 100%)",
        "gradient-dark":
          "linear-gradient(135deg, rgb(var(--surface)) 0%, rgb(var(--surface-2)) 50%, rgb(var(--surface)) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
