import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import { site } from "@/lib/site-config";
import {
  htmlLang,
  localePath,
  ogLocale,
  routing,
  type Locale,
} from "@/i18n/routing";
import { DM_Sans, Manrope } from "next/font/google";
import { INTRO_GATE_SCRIPT } from "@/components/intro/introState";
import "../globals.css";

// Schriften über next/font: beim Build geladen, vom eigenen Server ausgeliefert
// und vorgeladen (vorher per @import von Google, das blockierte das erste Anzeigen).
// DM Sans gibt es bei Google nur für lateinische Schrift; kyrillischer Text
// fällt wie bisher auf Arial zurück. Manrope hat kyrillische Zeichen.
const dmSans = DM_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-dm-sans",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

// Alle vier Fassungen werden beim Build statisch erzeugt
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: Omit<Props, "children">): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const t = await getTranslations({ locale, namespace: "meta" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const title = t("title");
  const description = t("description", {
    street: tCommon("address.street"),
    phone: site.phone,
  });
  const url = localePath(locale);

  // hreflang: Google zeigt jedem Besucher die passende Fassung
  const languages = Object.fromEntries(
    routing.locales.map((entry) => [htmlLang[entry], localePath(entry)]),
  );

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...languages,
        "x-default": localePath(routing.defaultLocale),
      },
    },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url,
      siteName: site.name,
      title,
      description,
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // Ermöglicht statisches Rendern mit next-intl
  setRequestLocale(locale);

  return (
    // suppressHydrationWarning: das Intro-Skript setzt data-intro vor React
    <html
      lang={htmlLang[locale]}
      className={`${dmSans.variable} ${manrope.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Entscheidet vor dem ersten Zeichnen, ob das Intro läuft */}
        <script dangerouslySetInnerHTML={{ __html: INTRO_GATE_SCRIPT }} />
      </head>
      <body>
        <NextIntlClientProvider>
          <StructuredData />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
