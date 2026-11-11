# Garaža Beograd – Next.js Website

Responsive Website auf Basis des gemeinsam erarbeiteten Entwurfs. **Alle Fotos der Prüfstelle stammen aus den von dir hochgeladenen Originalbildern.**

## Lokal starten

1. Dieses ZIP entpacken und den Ordner in **VS Code** öffnen.
2. Terminal im Projektordner öffnen.
3. `npm install`
4. `npm run dev`
5. Browser öffnen: http://localhost:3000

## Das kannst du selbst ändern

- **Texte, Kontakt, Öffnungszeiten, Buchungslink:** `lib/site-config.ts` und `app/page.tsx`
- **Farben, Abstände, Layout, Mobilansicht:** `app/globals.css`
- **Menü:** `components/Header.tsx`
- **Bilder:** `public/images/`
- **SEO-Titel/Beschreibung:** `app/layout.tsx`

## WICHTIG vor Veröffentlichung

- Die **Telefonnummer, E-Mail, Anschrift und der Buchungslink sind nicht hinterlegt** – in `lib/site-config.ts` echte Angaben einsetzen. Bis dahin führen die Buchungs-Buttons zum Kontaktbereich.
- **Öffnungszeiten sind unbestätigt** und müssen mit dem Betreiber abgeglichen werden.
- Die Texte zu den Leistungen sind beispielhaft und dürfen erst nach sachlicher Freigabe veröffentlicht werden.
- Die Website zeigt absichtlich **keine erfundenen Kundenzahlen, Zertifikate oder Bewertungen**.
- Impressum/Datenschutz sowie ggf. Cookie-Einwilligung vor dem öffentlichen Betrieb ergänzen. Fonts werden derzeit von Google Fonts per CSS geladen; für produktiven Einsatz in Deutschland sollten sie vorzugsweise lokal gehostet werden.
- Das grüne Maskottchen in `public/images/mascot.webp` stammt aus dem zur Verfügung gestellten Design.

## Technischer Aufbau

- Next.js (App Router), TypeScript, React, CSS, lucide-react Icons
- Keine Datenbank / kein Server-Backend notwendig für die Infoseite
- Die Schaltfläche „Zakažite termin“ ist **noch keine aktive Terminbuchung**, sondern ein Link zum Kontaktabschnitt beziehungsweise zu einem später konfigurierten Buchungssystem.

## Produktions-Build

`npm run build` und `npm start`
