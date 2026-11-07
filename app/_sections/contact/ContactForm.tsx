"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { CircleAlert, CircleCheck, Send } from "lucide-react";
import Button from "@/components/Button";
import { site } from "@/app/site-config";
import {
  sendContactMessage,
  type ContactField,
  type ContactFormState,
} from "./actions";

const initialState: ContactFormState = { status: "idle" };

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
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">
      {children}
      {optional && (
        <span className="font-normal text-slate-300"> (opciono)</span>
      )}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;

  return (
    <span id={id} className="mt-2 block text-sm font-semibold text-orange">
      {message}
    </span>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

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
        {pending ? "Slanje..." : "Pošaljite poruku"}
      </span>
    </Button>
  );
}

const ContactForm = () => {
  const [state, formAction] = useActionState(sendContactMessage, initialState);

  // Verbindet ein Feld mit seiner Fehlermeldung für Screenreader
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    defaultValue: state.values?.[field] ?? "",
    "aria-invalid": state.errors?.[field] ? true : undefined,
    "aria-describedby": state.errors?.[field]
      ? `contact-${field}-error`
      : undefined,
  });

  return (
    <div className="container relative z-10 mt-6" id="termin">
      <div className="rounded-2xl border border-white/15 bg-white/5 p-7 sm:p-9">
        <h3 className="m-0 mb-2 text-2xl font-bold">Pošaljite nam poruku</h3>
        <p className="mb-7 text-slate-200">
          Popunite formular i javićemo vam se u najkraćem roku.
        </p>

        <form action={formAction} noValidate>
          {/* Honeypot gegen Spam-Bots: für Besucher unsichtbar */}
          <div aria-hidden="true" className="absolute -left-[9999px]">
            <label htmlFor="contact-website">Website</label>
            <input
              id="contact-website"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <FieldLabel htmlFor="contact-name">Ime i prezime</FieldLabel>
              <input
                {...fieldProps("name")}
                type="text"
                autoComplete="name"
                maxLength={100}
                className={inputStyles}
              />
              <FieldError
                id="contact-name-error"
                message={state.errors?.name}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-phone">Telefon</FieldLabel>
              <input
                {...fieldProps("phone")}
                type="tel"
                autoComplete="tel"
                maxLength={20}
                className={inputStyles}
              />
              <FieldError
                id="contact-phone-error"
                message={state.errors?.phone}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-email" optional>
                E-mail
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
                message={state.errors?.email}
              />
            </div>

            <div>
              <FieldLabel htmlFor="contact-topic">Tema</FieldLabel>
              <select
                key={state.values?.topic ?? "empty"}
                {...fieldProps("topic")}
                className={`${inputStyles} cursor-pointer`}
              >
                <option value="" className="text-[#14332a]">
                  Izaberite temu
                </option>
                {site.contactTopics.map((topic) => (
                  <option key={topic} value={topic} className="text-[#14332a]">
                    {topic}
                  </option>
                ))}
              </select>
              <FieldError
                id="contact-topic-error"
                message={state.errors?.topic}
              />
            </div>

            <div className="md:col-span-2">
              <FieldLabel htmlFor="contact-message">Poruka</FieldLabel>
              <textarea
                {...fieldProps("message")}
                rows={5}
                maxLength={2000}
                className={`${inputStyles} resize-y`}
              />
              <FieldError
                id="contact-message-error"
                message={state.errors?.message}
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
                {state.message}
              </p>
            )}
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="mb-0 text-xs leading-relaxed text-slate-300 sm:max-w-md">
              Vaše podatke koristimo isključivo da bismo odgovorili na vaš upit.
              Više u{" "}
              <a
                href="#politika-privatnosti"
                className="text-inherit underline!"
              >
                politici privatnosti
              </a>
              .
            </p>
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
