import type { ReactNode } from "react";
import { site } from "@/app/site-config";

const { legal } = site;

// Fehlende Pflichtangaben fallen sichtbar auf, statt erfunden zu werden
function Value({ value, label }: { value: string; label: string }) {
  if (value) return <>{value}</>;

  return (
    <mark className="rounded bg-amber-200 px-1 font-semibold text-slate-900">
      [DOPUNITI: {label}]
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

function ExternalLink({ href, children }: { href: string; children: string }) {
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

function OperatorDetails() {
  return (
    <p>
      <Value value={legal.companyName} label="poslovno ime" />
      <br />
      {site.address}
      <br />
      Telefon: {site.phone}
      <br />
      E-mail: {site.email}
    </p>
  );
}

export function PrivacyPolicy() {
  return (
    <>
      <p className="text-sm text-slate-500">
        Poslednje ažuriranje: {legal.lastUpdated}
      </p>

      <Section title="1. Rukovalac podacima">
        <p>
          Rukovalac podacima o ličnosti u smislu Zakona o zaštiti podataka o
          ličnosti je:
        </p>
        <OperatorDetails />
      </Section>

      <Section title="2. Koje podatke obrađujemo">
        <p>
          <strong>Poseta sajtu.</strong> Prilikom posete sajtu server automatski
          beleži tehničke podatke: IP adresu, datum i vreme pristupa, vrstu
          pretraživača i operativnog sistema.
        </p>
        <p>
          <strong>Kontakt formular.</strong> Kada nam pošaljete poruku,
          obrađujemo podatke koje ste uneli: ime i prezime, broj telefona, temu,
          tekst poruke i, ako ste je naveli, e-mail adresu.
        </p>
        <p>
          <strong>Kontakt telefonom ili e-mailom.</strong> Ako nas kontaktirate
          direktno, obrađujemo podatke koje nam tom prilikom saopštite.
        </p>
      </Section>

      <Section title="3. Svrha i pravni osnov obrade">
        <List>
          <li>
            Tehnički podaci služe za bezbedan i stabilan rad sajta. Pravni osnov
            je naš legitimni interes.
          </li>
          <li>
            Podaci iz formulara i direktnog kontakta služe da odgovorimo na vaš
            upit. Pravni osnov je preduzimanje radnji na vaš zahtev pre
            zaključenja ugovora, odnosno naš legitimni interes da odgovorimo na
            upite.
          </li>
        </List>
      </Section>

      <Section title="4. Primaoci podataka i prenos u inostranstvo">
        <p>Vaše podatke ne prodajemo. Koristimo sledeće pružaoce usluga:</p>
        <List>
          <li>
            <strong>Hosting sajta:</strong>{" "}
            <Value value={legal.hostingProvider} label="pružalac hostinga" />,
            obrađuje tehničke podatke o poseti.
          </li>
          <li>
            <strong>Resend (SAD):</strong> dostavlja nam poruke iz kontakt
            formulara e-mailom.
          </li>
          <li>
            <strong>Google Fonts (Google):</strong> sajt učitava fontove sa
            Google servera, pri čemu se vaša IP adresa prenosi Google-u.
          </li>
        </List>
        <p>
          Ovi pružaoci mogu obrađivati podatke van Republike Srbije, uključujući
          SAD.
        </p>
      </Section>

      <Section title="5. Mapa i Google Maps">
        <p>
          Mapa na sajtu je slika koja se nalazi na našem serveru, zasnovana na
          podacima projekta OpenStreetMap, i pri njenom prikazu se podaci ne
          šalju trećim licima. Tek kada kliknete na mapu otvara se Google Maps u
          novom prozoru, a za tu obradu važe pravila privatnosti kompanije
          Google.
        </p>
      </Section>

      <Section title="6. Kolačići">
        <p>
          Ovaj sajt ne koristi kolačiće za praćenje i ne koristi alate za
          analitiku ili oglašavanje.
        </p>
      </Section>

      <Section title="7. Rok čuvanja">
        <p>
          Podatke iz upita čuvamo{" "}
          <Value value={legal.retentionPeriod} label="rok čuvanja" />, osim ako
          zakon nalaže duže čuvanje.
        </p>
      </Section>

      <Section title="8. Vaša prava">
        <p>U vezi sa svojim podacima imate pravo na:</p>
        <List>
          <li>pristup podacima i dobijanje kopije,</li>
          <li>ispravku netačnih podataka,</li>
          <li>brisanje podataka,</li>
          <li>ograničenje obrade,</li>
          <li>prenosivost podataka,</li>
          <li>prigovor na obradu.</li>
        </List>
        <p>
          Zahtev možete poslati na {site.email}. Takođe imate pravo da podnesete
          pritužbu Povereniku za informacije od javnog značaja i zaštitu
          podataka o ličnosti:{" "}
          <ExternalLink href="https://www.poverenik.rs">
            www.poverenik.rs
          </ExternalLink>
          .
        </p>
      </Section>

      <Section title="9. Izmene">
        <p className="mb-0">
          Ovu politiku možemo povremeno izmeniti. Važeća verzija uvek je
          objavljena na ovom sajtu.
        </p>
      </Section>
    </>
  );
}

export function LegalNotice() {
  return (
    <>
      <Section title="Podaci o privrednom subjektu">
        <dl className="m-0 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[auto_1fr]">
          {[
            ["Poslovno ime", legal.companyName, "poslovno ime"],
            ["Pravna forma", legal.legalForm, "pravna forma"],
            ["Zastupnik", legal.representative, "ime zastupnika"],
            ["PIB", legal.taxNumber, "PIB"],
            ["Matični broj", legal.registrationNumber, "matični broj"],
            ["Šifra delatnosti", legal.activityCode, "šifra delatnosti"],
          ].map(([term, value, label]) => (
            <div key={term} className="contents">
              <dt className="font-semibold text-slate-900">{term}</dt>
              <dd className="m-0 mb-2 sm:mb-0">
                <Value value={value} label={label} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Sedište i kontakt">
        <p className="mb-0">
          {site.address}
          <br />
          Telefon: {site.phone}
          <br />
          E-mail: {site.email}
        </p>
      </Section>

      <Section title="Registar">
        <p className="mb-0">
          Podaci o privrednom subjektu vode se u registru Agencije za privredne
          registre (APR):{" "}
          <ExternalLink href="https://www.apr.gov.rs">
            www.apr.gov.rs
          </ExternalLink>
          .
        </p>
      </Section>

      <Section title="Ovlašćenje za tehnički pregled">
        <p className="mb-0">
          <Value
            value={legal.inspectionLicense}
            label="broj i datum rešenja o ovlašćenju"
          />
        </p>
      </Section>

      <Section title="Autorska prava">
        <p>
          Sadržaj ovog sajta, uključujući tekstove, fotografije i ilustracije,
          zaštićen je autorskim pravom. Korišćenje bez saglasnosti nije
          dozvoljeno.
        </p>
        <p className="mb-0">
          Podaci za mapu: ©{" "}
          <ExternalLink href="https://www.openstreetmap.org/copyright">
            OpenStreetMap
          </ExternalLink>{" "}
          saradnici, licenca ODbL.
        </p>
      </Section>
    </>
  );
}
