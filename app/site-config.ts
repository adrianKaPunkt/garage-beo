/** ZENTRALE STELLE FÜR ALLE KONTAKTDATEN UND TEXTE. */
export const site = {
  name: 'Garage Beograd',
  subtitle: 'TEHNIČKI PREGLED',
  phone: '', // z.B. '+381...' (leer lassen, bis bestätigt)
  email: '', // echte Geschäftsadresse eintragen
  address: '', // echte Straßenadresse eintragen
  mapsUrl: '', // optional: Google-Maps-Link
  bookingUrl: '', // optional: externer Terminbuchungs-Link
  hours: [
    { day: 'Ponedeljak – Petak', time: '08:00 – 16:00' },
    { day: 'Subota', time: '09:00 – 15:00' },
    { day: 'Nedelja', time: 'Ne radimo' },
  ], // anhand der Firmenunterlagen vor Veröffentlichung prüfen
  intro: 'Tehnički pregled, registracija vozila, osiguranje i plaćanje računa – sve na jednom mestu.',
};
