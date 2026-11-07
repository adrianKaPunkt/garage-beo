import type { MetadataRoute } from "next";
import { site } from "@/app/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, lastModified: new Date() }];
}
