import type { MetadataRoute } from "next";
import { site } from "@/lib/site-config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      // In /images/car und /images/services liegen nur Einzelteile der
      // Maskottchen-Animationen (z. B. Karosserie ohne Arm, Oberteil ohne Räder,
      // Kennzeichen). Abgeschnitten wirken sie in der Bildersuche falsch, deshalb
      // nur dort ausgeschlossen. Die vollständigen Maskottchen liegen als
      // garage-beograd-maskota-*.webp in /images.
      {
        userAgent: "Googlebot-Image",
        disallow: ["/images/car/", "/images/services/"],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
