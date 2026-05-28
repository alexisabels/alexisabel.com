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

// La inyección de la API de @keystatic/astro no resuelve bien en este proyecto
// (devuelve 404 en /api/keystatic/*). Envolvemos la integración para saltarnos
// esa inyección y servir la API desde src/pages/api/keystatic/[...params].ts.
function keystaticUIOnly() {
  const base = keystatic();
  const originalSetup = base.hooks["astro:config:setup"];
  return {
    ...base,
    hooks: {
      ...base.hooks,
      "astro:config:setup": (params) => {
        const realInject = params.injectRoute;
        params.injectRoute = (route) => {
          if (route.pattern === "/api/keystatic/[...params]") return;
          return realInject(route);
        };
        return originalSetup(params);
      },
    },
  };
}

export default defineConfig({
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes("/keystatic"),
    }),
    mdx(),
    react(),
    ...(isDev || enableKeystaticInProd ? [keystaticUIOnly()] : []),
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
