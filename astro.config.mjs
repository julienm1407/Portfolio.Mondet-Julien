import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Build GitHub Pages (branche main, dossier /docs) : PUBLIC_GITHUB_PAGES=1 npm run build */
const githubPages = process.env.PUBLIC_GITHUB_PAGES === "1";
const repoBase = "/Portfolio.Mondet-Julien/";

/** Barre flottante Astro (audit, menu dev) — désactivée pour un rendu « site seul » en local. */
export default defineConfig({
  srcDir: "./src",
  output: "static",
  site: githubPages ? "https://julienm1407.github.io" : undefined,
  base: githubPages ? repoBase : "/",
  outDir: githubPages ? "docs" : "dist",
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
