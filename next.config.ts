import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // AVIF zuerst (deutlich kleiner), WebP für Browser ohne AVIF
    formats: ["image/avif", "image/webp"],
  },
};

export default withNextIntl(nextConfig);
