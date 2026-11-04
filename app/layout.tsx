import type { Metadata } from "next";
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
