import type { Metadata } from "next";
// @ts-expect-error Next.js handles CSS side-effect imports at build time.
import "./globals.css";

export const metadata: Metadata = {
  title: "Garage Beograd | Tehnički pregled",
  description:
    "Tehnički pregled, registracija vozila, osiguranje i plaćanje računa na jednom mestu.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sr">
      <body>{children}</body>
    </html>
  );
}
