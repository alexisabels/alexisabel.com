import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  site: "https://www.alexisabel.com",
  output: "hybrid",
  adapter: vercel({
    webAnalytics: { enabled: true },
  }),
  i18n: {
    defaultLocale: "es", 
    locales: ["es", "en"],

  },
});
