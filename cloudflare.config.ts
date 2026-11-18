import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    // Name des Workers in Cloudflare (so erwartet ihn das Git-Deployment)
    name: "garagebeograd",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-17",
    // Stellt process.env bereit: Das Kontaktformular liest daraus die Werte unten
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      // Kontaktformular. Die Adressen stehen hier und nicht im Dashboard:
      // Text-Variablen nur im Dashboard bringen das Deployment zum Abbruch.
      CONTACT_FROM_EMAIL: bindings.text("info@garagebeograd.rs"),
      CONTACT_TO_EMAIL: bindings.text("info@garagebeograd.rs"),
      // Der Schlüssel bleibt ein Secret im Cloudflare-Dashboard
      RESEND_API_KEY: bindings.secret(),
    },
  }),
});
