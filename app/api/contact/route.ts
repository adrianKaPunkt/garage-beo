import { sendContactMessage } from "@/app/_sections/contact/actions";

// Kontaktformular: prüft die Eingaben und verschickt die E-Mail über Resend.
// 400 = Eingaben ungültig (das Formular zeigt die Fehler an den Feldern),
// 502 = Versand fehlgeschlagen.
export async function POST(request: Request) {
  let formData: FormData;

  try {
    formData = await request.formData();
  } catch {
    return Response.json(
      { status: "error", message: "sendFailed" },
      { status: 400 },
    );
  }

  const result = await sendContactMessage({ status: "idle" }, formData);

  const status =
    result.status === "success" ? 200 : result.errors ? 400 : 502;

  return Response.json(result, { status });
}
