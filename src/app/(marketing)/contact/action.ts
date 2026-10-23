"use server";

import { z } from "zod";
import { CONTACT_TOPICS } from "./topics";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  topic: z.enum(CONTACT_TOPICS, { message: "Choose a topic" }),
  company: z.string().optional(),
  jobTitle: z.string().optional(),
  message: z.string().min(1, "Message is required"),
});

export type ContactState = {
  success: boolean;
  error?: string;
  /** Echoed back on success so the confirmation can address the sender. */
  name?: string;
  email?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    topic: formData.get("topic") as string,
    company: formData.get("company") as string,
    jobTitle: formData.get("jobTitle") as string,
    message: formData.get("message") as string,
  };

  const result = contactSchema.safeParse(raw);
  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of result.error.issues) {
      if (issue.path[0]) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
    }
    return { success: false, fieldErrors };
  }

  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY not set");
      return { success: false, error: "Server configuration error. Please try again later." };
    }

    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: "Apso Contact Form <noreply@apso.ai>",
      to: "sales@mavric.tech",
      replyTo: result.data.email,
      subject: `Contact form: ${result.data.name}${result.data.company ? ` (${result.data.company})` : ""}`,
      text: [
        `Name: ${result.data.name}`,
        `Email: ${result.data.email}`,
        `Topic: ${result.data.topic}`,
        result.data.company ? `Company: ${result.data.company}` : null,
        result.data.jobTitle ? `Job Title: ${result.data.jobTitle}` : null,
        "",
        result.data.message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    return { success: true, name: result.data.name, email: result.data.email };
  } catch (err) {
    console.error("Contact form error:", err);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
