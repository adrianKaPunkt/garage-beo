import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Bilder direkt aus /public ausliefern (/images/name.webp) statt über
    // /_next/image?url=…: Auf Cloudflare verkleinert der Optimierer nichts,
    // versteckt aber den Dateinamen (wichtig für die Google-Bildersuche).
    // Die Dateien sind deshalb selbst schon als WebP in passender Größe abgelegt.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
