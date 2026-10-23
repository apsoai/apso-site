import type { Metadata } from "next";
import { PageHero } from "@/components/marketing/page-hero";
import { ContactForm } from "@/components/marketing/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Apso team about product fit, deployment, enterprise requirements, support, or partnerships.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Bring us the backend question"
        description="Tell us what you are building, how your team works, and where you need the backend to run. We will route the conversation to the right person."
      />
      <ContactForm />
    </>
  );
}
