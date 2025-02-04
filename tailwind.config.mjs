/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],

  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        "light-gradient": "#ffff",
        "dark-gradient": "#161616)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
