import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import StructuredData from "@/components/StructuredData";
import { site } from "@/app/site-config";
import {
  htmlLang,
  localePath,
  ogLocale,
  routing,
  type Locale,
} from "@/i18n/routing";
import "../globals.css";

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
    <html lang={htmlLang[locale]}>
      <body>
        <NextIntlClientProvider>
          <StructuredData />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
