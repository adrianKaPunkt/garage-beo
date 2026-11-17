import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "garage-beograd-website",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-17",
    // Stellt process.env bereit: Kontaktformular liest RESEND_API_KEY usw.
    // aus den Variablen/Secrets des Workers (Cloudflare-Dashboard)
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
    },
  }),
});
