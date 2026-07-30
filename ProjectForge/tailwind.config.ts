import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        paper: {
          50: "#faf8f5",
          100: "#f3efe8",
          200: "#e8e0d5",
          300: "#d4c9b8",
          400: "#b8a98a",
          500: "#9a856a",
          600: "#7d6b52",
          700: "#5e4f3d",
          800: "#3f3428",
          900: "#2a2018",
        },
        parchment: {
          DEFAULT: "#fdf8f0",
          dark: "#f5efe6",
        },
        accent: {
          DEFAULT: "#5a7d5e",
          light: "#7a9d7e",
          dark: "#3f5d42",
        },
        slate: {
          accent: "#5a6577",
        },
      },
    },
  },
  plugins: [],
};

export default config;