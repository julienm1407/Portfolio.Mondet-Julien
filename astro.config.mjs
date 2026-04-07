import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Barre flottante Astro (audit, menu dev) — désactivée pour un rendu « site seul » en local. */
export default defineConfig({
  srcDir: "./src",
  output: "server",
  adapter: node({ mode: "standalone" }),
  devToolbar: {
    enabled: false,
  },
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src"),
      },
    },
  },
});
