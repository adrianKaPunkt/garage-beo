"use client";

import { useState, type FormEvent } from "react";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import { useTranslations } from "next-intl";

import Button from "@/components/Button";
import { contactTopics, site } from "@/lib/site-config";
import { MAX_MESSAGE_LENGTH, MIN_MESSAGE_LENGTH } from "./limits";

import type { ContactError, ContactField, ContactFormState } from "./types";

const initialState: ContactFormState = {
  status: "idle",
};

const inputStyles = `
  w-full rounded-xl
  border border-white/20 bg-white/10
  px-4 py-3
  font-[inherit] text-base text-white
  placeholder:text-slate-300
  transition-colors
  hover:border-white/35
  focus-visible:outline-2
  focus-visible:outline-offset-2
  focus-visible:outline-lime-300
  aria-invalid:border-orange
`;

function FieldLabel({
  htmlFor,
  optional,
  children,
}: {
  htmlFor: string;
  optional?: boolean;
  children: string;
}) {
  const t = useTranslations("contact.form");

  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
      {children}
      {optional && (
        <span className="font-normal text-slate-300"> {t("optional")}</span>
      )}
    </label>
  );
}

function FieldError({ id, error }: { id: string; error?: ContactError }) {
  const t = useTranslations("contact.errors");

  if (!error) return null;

  return (
    <span id={id} className="mt-2 block text-sm font-semibold text-orange">
      {t(error, {
        min: MIN_MESSAGE_LENGTH,
        max: MAX_MESSAGE_LENGTH,
      })}
    </span>
  );
}

function SubmitButton({ pending }: { pending: boolean }) {
  const t = useTranslations("contact.form");

  return (
    <Button
      type="submit"
      variant="primary"
      size="large"
      disabled={pending}
      className="w-full cursor-pointer disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      <span className="flex items-center gap-2 font-extrabold">
        <Send size={18} aria-hidden="true" />
        {pending ? t("sending") : t("submit")}
      </span>
    </Button>
  );
}

const ContactForm = () => {
  const t = useTranslations("contact");

  // Formularstatus ohne Next.js Server Actions
  const [state, setState] = useState<ContactFormState>(initialState);

  const [pending, setPending] = useState(false);

  // Versand über Cloudflare Pages Function
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (pending) return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setPending(true);
    setState(initialState);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!response.ok && response.status !== 400) {
        throw new Error("Contact request failed");
      }

      const result: ContactFormState = await response.json();

      if (result.status !== "success" && result.status !== "error") {
        throw new Error("Invalid contact response");
      }

      setState(result);

      if (result.status === "success") {
        form.reset();
      }
    } catch (error) {
      console.error("Kontaktformular: Versand fehlgeschlagen", error);

      setState({
        status: "error",
        message: "sendFailed",
      });
    } finally {
      setPending(false);
    }
  }

  // Verbindet ein Feld mit seiner Fehlermeldung
  // für Screenreader
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    "aria-invalid": state.errors?.[field] ? (true as const) : undefined,
    "aria-describedby": state.errors?.[field]
      ? `contact-${field}-error`
      : undefined,
  });

  return (
    <div className="container relative z-10 mt-6" id="termin">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-7 sm:p-9">
        <h3 className="m-0 mb-2 text-2xl font-bold">{t("form.title")}</h3>

        <p className="mb-7 text-slate-200">{t("form.intro")}</p>

        <form onSubmit={handleSubmit} noValidate>
          {/* Honeypot gegen Spam-Bots. Bewusst ohne Namen wie "website" oder
              "url": Browser-Autofill und Passwortmanager füllen solche Felder
              sonst aus, und echte Anfragen würden still verworfen. */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="contact-hp">Leave empty</label>

            <input
              id="contact-hp"
              type="text"
              name="hp_check"
              tabIndex={-1}
              autoComplete="off"
              data-1p-ignore
              data-lpignore="true"
              data-bwignore
              data-form-type="other"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Name */}
            <div>
              <FieldLabel htmlFor="contact-name">{t("form.name")}</FieldLabel>

              <input
                {...fieldProps("name")}
                type="text"
                autoComplete="name"
                maxLength={100}
                className={inputStyles}
              />

              <FieldError id="contact-name-error" error={state.errors?.name} />
            </div>

            {/* Telefonnummer */}
            <div>
              <FieldLabel htmlFor="contact-phone">{t("form.phone")}</FieldLabel>

              <input
                {...fieldProps("phone")}
                type="tel"
                autoComplete="tel"
                maxLength={20}
                className={inputStyles}
              />

              <FieldError
                id="contact-phone-error"
                error={state.errors?.phone}
              />
            </div>

            {/* E-Mail */}
            <div>
              <FieldLabel htmlFor="contact-email" optional>
                {t("form.email")}
              </FieldLabel>

              <input
                {...fieldProps("email")}
                type="email"
                autoComplete="email"
                maxLength={150}
                className={inputStyles}
              />

              <FieldError
                id="contact-email-error"
                error={state.errors?.email}
              />
            </div>

            {/* Anliegen */}
            <div>
              <FieldLabel htmlFor="contact-topic">{t("form.topic")}</FieldLabel>

              <select
                {...fieldProps("topic")}
                className={`${inputStyles} cursor-pointer`}
              >
                <option value="" className="text-[#14332a]">
                  {t("form.chooseTopic")}
                </option>

                {contactTopics.map((topic) => (
                  <option key={topic} value={topic} className="text-[#14332a]">
                    {t(`topics.${topic}`)}
                  </option>
                ))}
              </select>

              <FieldError
                id="contact-topic-error"
                error={state.errors?.topic}
              />
            </div>

            {/* Nachricht */}
            <div className="md:col-span-2">
              <FieldLabel htmlFor="contact-message">
                {t("form.message")}
              </FieldLabel>

              <textarea
                {...fieldProps("message")}
                rows={5}
                maxLength={MAX_MESSAGE_LENGTH}
                className={`${inputStyles} resize-y`}
              />

              <FieldError
                id="contact-message-error"
                error={state.errors?.message}
              />
            </div>
          </div>

          {/* Rückmeldung nach dem Absenden */}
          <div aria-live="polite" className="mt-5 empty:mt-0">
            {state.message && (
              <p
                className={[
                  "mb-0 flex items-start gap-3 rounded-xl border px-4 py-3 font-semibold",
                  state.status === "success"
                    ? "border-lime-300/40 bg-lime-300/10 text-lime-300"
                    : "border-orange/50 bg-orange/10 text-orange",
                ].join(" ")}
              >
                {state.status === "success" ? (
                  <CircleCheck
                    size={22}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                ) : (
                  <CircleAlert
                    size={22}
                    className="shrink-0"
                    aria-hidden="true"
                  />
                )}

                {t(`errors.${state.message}`, {
                  phone: site.phone,
                })}
              </p>
            )}
          </div>

          {/* Datenschutz und Senden */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="mb-0 text-xs leading-relaxed text-slate-300 sm:max-w-md">
              {t.rich("form.privacy", {
                link: (chunks) => (
                  <a
                    href="#politika-privatnosti"
                    className="text-inherit underline!"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>

            <SubmitButton pending={pending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
