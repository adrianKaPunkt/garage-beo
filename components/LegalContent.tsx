import type { ReactNode } from "react";
import { useFormatter, useTranslations } from "next-intl";
import { site } from "@/app/site-config";

const { legal } = site;

type Field = keyof Omit<typeof legal, "lastUpdated">;

// Fehlende Pflichtangaben fallen sichtbar auf, statt erfunden zu werden
function Value({ field }: { field: Field }) {
  const t = useTranslations("legal");
  const value = legal[field];

  if (value) return <>{value}</>;

  return (
    <mark className="rounded bg-amber-200 px-1 font-semibold text-slate-900">
      {t("missing", { label: t(`fields.${field}`) })}
    </mark>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-6">
      <h3 className="m-0 mb-2 text-lg font-bold text-slate-900">{title}</h3>
      {children}
    </section>
  );
}

function List({ children }: { children: ReactNode }) {
  return <ul className="mb-3 list-disc space-y-1 pl-5">{children}</ul>;
}

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-darkgreen underline!"
    >
      {children}
    </a>
  );
}

// Formatierung für Texte mit <strong> aus dem Dictionary
const strong = (chunks: ReactNode) => <strong>{chunks}</strong>;

function ContactDetails() {
  const t = useTranslations("legal");
  const tCommon = useTranslations("common.address");

  return (
    <>
      {tCommon("street")}, {tCommon("cityLine")}
      <br />
      {t("phone")}: {site.phone}
      <br />
      {t("email")}: {site.email}
    </>
  );
}

export function PrivacyPolicy() {
  const t = useTranslations("legal.privacy");
  const format = useFormatter();

  return (
    <>
      <p className="text-sm text-slate-500">
        {t("lastUpdated", {
          date: format.dateTime(new Date(legal.lastUpdated), {
            dateStyle: "long",
          }),
        })}
      </p>

      <Section title={t("controller.title")}>
        <p>{t("controller.text")}</p>
        <p>
          <Value field="companyName" />
          <br />
          <ContactDetails />
        </p>
      </Section>

      <Section title={t("data.title")}>
        <p>{t.rich("data.visit", { strong })}</p>
        <p>{t.rich("data.form", { strong })}</p>
        <p>{t.rich("data.direct", { strong })}</p>
      </Section>

      <Section title={t("purpose.title")}>
        <List>
          <li>{t("purpose.technical")}</li>
          <li>{t("purpose.inquiries")}</li>
        </List>
      </Section>

      <Section title={t("recipients.title")}>
        <p>{t("recipients.intro")}</p>
        <List>
          <li>
            {t.rich("recipients.hosting", {
              strong,
              provider: () => <Value field="hostingProvider" />,
            })}
          </li>
          <li>{t.rich("recipients.resend", { strong })}</li>
          <li>{t.rich("recipients.fonts", { strong })}</li>
        </List>
        <p>{t("recipients.abroad")}</p>
      </Section>

      <Section title={t("map.title")}>
        <p>{t("map.text")}</p>
      </Section>

      <Section title={t("cookies.title")}>
        <p>{t("cookies.text")}</p>
      </Section>

      <Section title={t("retention.title")}>
        <p>
          {t.rich("retention.text", {
            period: () => <Value field="retentionPeriod" />,
          })}
        </p>
      </Section>

      <Section title={t("rights.title")}>
        <p>{t("rights.intro")}</p>
        <List>
          <li>{t("rights.access")}</li>
          <li>{t("rights.rectification")}</li>
          <li>{t("rights.erasure")}</li>
          <li>{t("rights.restriction")}</li>
          <li>{t("rights.portability")}</li>
          <li>{t("rights.objection")}</li>
        </List>
        <p>
          {t.rich("rights.text", {
            email: site.email,
            link: (chunks) => (
              <ExternalLink href="https://www.poverenik.rs">{chunks}</ExternalLink>
            ),
          })}
        </p>
      </Section>

      <Section title={t("changes.title")}>
        <p className="mb-0">{t("changes.text")}</p>
      </Section>
    </>
  );
}

const companyFields: Field[] = [
  "companyName",
  "legalForm",
  "representative",
  "taxNumber",
  "registrationNumber",
  "activityCode",
];

export function LegalNotice() {
  const t = useTranslations("legal");

  return (
    <>
      <Section title={t("imprint.company")}>
        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
          {companyFields.map((field) => (
            <div key={field} className="contents">
              <dt className="font-semibold text-slate-900">
                {t(`fields.${field}`)}
              </dt>
              <dd className="m-0 mb-2 sm:mb-0">
                <Value field={field} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title={t("imprint.seat")}>
        <p className="mb-0">
          <ContactDetails />
        </p>
      </Section>

      <Section title={t("imprint.register.title")}>
        <p className="mb-0">
          {t.rich("imprint.register.text", {
            link: (chunks) => (
              <ExternalLink href="https://www.apr.gov.rs">{chunks}</ExternalLink>
            ),
          })}
        </p>
      </Section>

      <Section title={t("imprint.license")}>
        <p className="mb-0">
          <Value field="inspectionLicense" />
        </p>
      </Section>

      <Section title={t("imprint.copyright.title")}>
        <p>{t("imprint.copyright.text")}</p>
        <p className="mb-0">
          {t.rich("imprint.copyright.map", {
            link: (chunks) => (
              <ExternalLink href="https://www.openstreetmap.org/copyright">
                {chunks}
              </ExternalLink>
            ),
          })}
        </p>
      </Section>
    </>
  );
}
