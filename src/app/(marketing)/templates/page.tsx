import type { Metadata } from "next";
import { TemplateLibrary } from "@/components/templates/template-library";

export const metadata: Metadata = {
  title: "Starter Backends",
  description: "Browse starter data models for SaaS, CRM, commerce, internal tools, and industry applications.",
};

export default function TemplatesPage() {
  return (
    <div className="mx-auto w-full max-w-[1264px] px-4 pb-16 pt-12 md:px-8 md:pb-[88px] md:pt-11 lg:pt-20">
      <h1 className="text-balance font-display text-[36px] font-extrabold leading-[1.05] text-fg-1 md:text-[48px] lg:text-[56px] lg:tracking-[-0.01em]">
        Start with a backend model your agent can adapt
      </h1>
      <p className="mt-4 max-w-[720px] pb-8 text-[17px] leading-[1.6] text-fg-4 md:mt-5 md:text-[18px]">
        Choose a proven product pattern, then let Claude or Codex shape it around your requirements. Apso turns that
        intent into consistent APIs, migrations, and infrastructure your team owns.
      </p>
      <TemplateLibrary />
    </div>
  );
}
