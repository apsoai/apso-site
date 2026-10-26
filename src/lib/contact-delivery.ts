// Delivers a /contact submission: GoHighLevel first, Resend email as the fallback.
// Kept free of path aliases so scripts/test-contact-delivery.ts can import it with plain Node.

export const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "matt@apso.ai";
export const CONTACT_TAG = "website-contact";

const GHL_API = "https://services.leadconnectorhq.com";

// Custom field ids in the Apso GoHighLevel sub-account (contact.topic, contact.role, contact.message).
const GHL_FIELDS = {
  topic: "9IaiffHVHN3yi0qSQgQk",
  role: "SXH8pN0xVs48PPbUF6qX",
  message: "G7Wn7S8bwH7usAKupXK7",
};

export type ContactSubmission = {
  name: string;
  email: string;
  topic: string;
  company?: string;
  jobTitle?: string;
  message: string;
};

export type DeliveryResult = "ghl" | "email" | "failed";

function summary(s: ContactSubmission) {
  return [
    `Name: ${s.name}`,
    `Email: ${s.email}`,
    `Topic: ${s.topic}`,
    s.company ? `Company: ${s.company}` : null,
    s.jobTitle ? `Role: ${s.jobTitle}` : null,
    "",
    s.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}

async function ghl(path: string, method: string, body: unknown) {
  const res = await fetch(`${GHL_API}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.GHL_API_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`GHL ${method} ${path} returned ${res.status}: ${(await res.text()).slice(0, 300)}`);
  return res.json().catch(() => ({}));
}

async function sendToGhl(s: ContactSubmission) {
  const { contact } = await ghl("/contacts/upsert", "POST", {
    locationId: process.env.GHL_LOCATION_ID,
    name: s.name,
    email: s.email,
    companyName: s.company || undefined,
    source: "apso.ai contact form",
    customFields: [
      { id: GHL_FIELDS.topic, field_value: s.topic },
      { id: GHL_FIELDS.role, field_value: s.jobTitle || "" },
      { id: GHL_FIELDS.message, field_value: s.message },
    ],
  });
  if (!contact?.id) throw new Error("GHL upsert returned no contact id");
  await ghl(`/contacts/${contact.id}/notes`, "POST", { body: `Website contact form\n\n${summary(s)}` });
  // Remove then add the tag so a repeat sender still fires the "tag added" workflow trigger.
  await ghl(`/contacts/${contact.id}/tags`, "DELETE", { tags: [CONTACT_TAG] });
  await ghl(`/contacts/${contact.id}/tags`, "POST", { tags: [CONTACT_TAG] });
}

async function sendEmail(s: ContactSubmission) {
  const { Resend } = await import("resend");
  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: "Apso Contact Form <noreply@apso.ai>",
    to: CONTACT_TO_EMAIL,
    replyTo: s.email,
    subject: `Contact form: ${s.name}${s.company ? ` (${s.company})` : ""}`,
    text: summary(s),
  });
  if (error) throw new Error(`Resend: ${error.message}`);
}

export async function deliverContact(s: ContactSubmission): Promise<DeliveryResult> {
  if (process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID) {
    try {
      await sendToGhl(s);
      return "ghl";
    } catch (err) {
      console.error("Contact form: GoHighLevel failed, falling back to email:", err);
    }
  } else {
    console.error("Contact form: GHL_API_TOKEN or GHL_LOCATION_ID not set, falling back to email");
  }

  if (process.env.RESEND_API_KEY) {
    try {
      await sendEmail(s);
      return "email";
    } catch (err) {
      console.error("Contact form: email fallback failed:", err);
    }
  } else {
    console.error("Contact form: RESEND_API_KEY not set");
  }
  return "failed";
}
