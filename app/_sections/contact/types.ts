export type ContactField = "name" | "phone" | "email" | "topic" | "message";

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
