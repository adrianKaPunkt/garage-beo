"use server";

import { site } from "@/app/site-config";

export type ContactField = "name" | "phone" | "email" | "topic" | "message";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<Record<ContactField, string>>;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;

const MAX_NAME_LENGTH = 100;
const MIN_MESSAGE_LENGTH = 10;
const MAX_MESSAGE_LENGTH = 2000;

async function sendEmail(values: Record<ContactField, string>) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL ?? site.email;

  if (!apiKey || !from) {
    console.error(
      "Kontaktformular: RESEND_API_KEY oder CONTACT_FROM_EMAIL fehlt.",
    );
    return false;
  }

  const name = values.name.replace(/\s+/g, " ");

  const text = [
    `Ime i prezime: ${name}`,
    `Telefon: ${values.phone}`,
    `E-mail: ${values.email || "-"}`,
    `Tema: ${values.topic}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Novi upit: ${values.topic} – ${name}`,
        text,
        ...(values.email && { reply_to: values.email }),
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      console.error("Kontaktformular: Resend-Fehler", response.status);
    }

    return response.ok;
  } catch (error) {
    console.error("Kontaktformular: Versand fehlgeschlagen", error);
    return false;
  }
}

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const read = (key: string) => String(formData.get(key) ?? "").trim();

  // Honeypot: Nur Bots füllen dieses versteckte Feld aus
  if (read("website")) {
    return { status: "success" };
  }

  const values: Record<ContactField, string> = {
    name: read("name"),
    phone: read("phone"),
    email: read("email"),
    topic: read("topic"),
    message: read("message"),
  };

  const errors: ContactFormState["errors"] = {};

  if (values.name.length < 2 || values.name.length > MAX_NAME_LENGTH) {
    errors.name = "Unesite ime i prezime.";
  }

  if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = "Unesite ispravan broj telefona.";
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "Unesite ispravnu e-mail adresu.";
  }

  if (!site.contactTopics.includes(values.topic)) {
    errors.topic = "Izaberite temu.";
  }

  if (values.message.length < MIN_MESSAGE_LENGTH) {
    errors.message = "Napišite poruku od najmanje 10 karaktera.";
  } else if (values.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "Poruka može imati najviše 2000 karaktera.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  const sent = await sendEmail(values);

  if (!sent) {
    return {
      status: "error",
      message: `Poruka nije poslata. Pokušajte ponovo ili nas pozovite: ${site.phone}.`,
      values,
    };
  }

  return {
    status: "success",
    message: "Hvala! Vaša poruka je poslata. Javićemo vam se uskoro.",
  };
}
