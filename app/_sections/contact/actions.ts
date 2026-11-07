"use server";

import { getTranslations } from "next-intl/server";
import { contactTopics, site, type ContactTopic } from "@/app/site-config";
import {
  MAX_MESSAGE_LENGTH,
  MAX_NAME_LENGTH,
  MIN_MESSAGE_LENGTH,
} from "./limits";

export type ContactField = "name" | "phone" | "email" | "topic" | "message";

// Keys aus contact.errors im Dictionary: Das Formular zeigt sie in der
// Sprache des Besuchers an
export type ContactError =
  | "name"
  | "phone"
  | "email"
  | "topic"
  | "messageTooShort"
  | "messageTooLong";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: "sent" | "sendFailed";
  errors?: Partial<Record<ContactField, ContactError>>;
  values?: Partial<Record<ContactField, string>>;
};


const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()/-]{6,20}$/;


const isTopic = (value: string): value is ContactTopic =>
  (contactTopics as readonly string[]).includes(value);

async function sendEmail(
  values: Record<ContactField, string> & { topic: ContactTopic },
) {
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

  // Die E-Mail an die Garage ist immer auf Serbisch
  const t = await getTranslations({ locale: "sr-Latn", namespace: "contact" });
  const topic = t(`topics.${values.topic}`);

  const text = [
    `Ime i prezime: ${name}`,
    `Telefon: ${values.phone}`,
    `E-mail: ${values.email || "-"}`,
    `Tema: ${topic}`,
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
        subject: `Novi upit: ${topic} – ${name}`,
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
    errors.name = "name";
  }

  if (!PHONE_PATTERN.test(values.phone)) {
    errors.phone = "phone";
  }

  if (values.email && !EMAIL_PATTERN.test(values.email)) {
    errors.email = "email";
  }

  if (!isTopic(values.topic)) {
    errors.topic = "topic";
  }

  if (values.message.length < MIN_MESSAGE_LENGTH) {
    errors.message = "messageTooShort";
  } else if (values.message.length > MAX_MESSAGE_LENGTH) {
    errors.message = "messageTooLong";
  }

  if (Object.keys(errors).length > 0 || !isTopic(values.topic)) {
    return { status: "error", errors, values };
  }

  const sent = await sendEmail({ ...values, topic: values.topic });

  if (!sent) {
    return {
      status: "error",
      message: "sendFailed",
      values,
    };
  }

  return {
    status: "success",
    message: "sent",
  };
}
