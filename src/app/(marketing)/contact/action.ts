"use server";

import { z } from "zod";
import { CONTACT_TOPICS } from "./topics";
import { CONTACT_TO_EMAIL, deliverContact } from "@/lib/contact-delivery";

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
  /** Set when GoHighLevel and the email fallback both failed: the address to email instead. */
  unreachableEmail?: string;
  /** Echoed back on success so the confirmation can address the sender. */
  name?: string;
  email?: string;
  fieldErrors?: Record<string, string>;
  /** Echoed back on failure so the form keeps what the visitor typed. */
  values?: Record<string, string>;
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
    return { success: false, fieldErrors, values: raw };
  }

  const delivered = await deliverContact(result.data);
  if (delivered === "failed") return { success: false, unreachableEmail: CONTACT_TO_EMAIL, values: raw };
  return { success: true, name: result.data.name, email: result.data.email };
}
