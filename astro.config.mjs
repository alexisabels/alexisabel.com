import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import keystatic from "@keystatic/astro";

import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkMermaid from "./src/lib/remark-mermaid.mjs";

const isDev = process.env.NODE_ENV !== "production";
const enableKeystaticInProd = process.env.KEYSTATIC_ENABLED === "true";

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/keystatic"),
    }),
    mdx(),
    react(),
    ...(isDev || enableKeystaticInProd ? [keystatic()] : []),
  ],
  site: "https://alexisabel.com",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  prefetch: { defaultStrategy: "hover" },
  markdown: {
    remarkPlugins: [remarkMermaid, remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
