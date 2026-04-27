/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: [
          '"Bricolage Grotesque"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        sans: [
          '"Bricolage Grotesque"',
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        "ink-muted": "rgb(var(--ink-muted) / <alpha-value>)",
        paper: "rgb(var(--paper) / <alpha-value>)",
        "paper-raised": "rgb(var(--paper-raised) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        hairline: "rgb(var(--ink) / 0.12)",
      },
      letterSpacing: {
        tight2: "-0.035em",
        label: "0.14em",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
