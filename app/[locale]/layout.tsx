import type { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { site } from "@/app/site-config";
import "./globals.css";

const title = "Tehnički pregled Beograd | Garage Beograd";
const description = `Tehnički pregled vozila u Beogradu, registracija, osiguranje i plaćanje računa na jednom mestu. ${site.addressParts.street}. Pozovite ${site.phone}.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "sr_RS",
    url: "/",
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Stanica za tehnički pregled Garage Beograd",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr">
      <body>
        <StructuredData />
        {children}
      </body>
    </html>
  );
}
