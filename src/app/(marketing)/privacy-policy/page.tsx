import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ReadHeader } from "@/components/content/read-header";
import { OnThisPage } from "@/components/content/on-this-page";
import * as v1 from "./policy-v1";
import * as v2 from "./policy-v2";

export interface PolicySection {
  id: string;
  title: string;
  body: ReactNode;
}

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Mavric Technology collects, uses, shares, and protects information when you use Apso.",
};

// The rewritten policy waits on counsel review. Until then the live text is served.
const policy = process.env.NEXT_PUBLIC_PRIVACY_V2 === "1" ? v2 : v1;

export default function PrivacyPolicyPage() {
  const nav = policy.sections.map(({ id, title }) => ({ id, label: title }));

  return (
    <>
      <ReadHeader title="Privacy Policy">
        Last updated {policy.updated}
        <span aria-hidden="true" className="mx-2">·</span>
        Questions: privacy@mavric.tech
      </ReadHeader>

      <section className="bg-bg-0 pb-14 pt-4 lg:pb-24 lg:pt-12">
        <Container>
          <details className="group mb-6 rounded-[8px] border border-line-1 lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3.5 text-[14px] font-medium text-fg-1 [&::-webkit-details-marker]:hidden">
              On this page: {nav.length} sections
              <ChevronDown aria-hidden="true" className="h-5 w-5 text-fg-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
            </summary>
            <ul className="border-t border-line-1 px-1 py-2">
              {nav.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} className="block rounded-[6px] px-3 py-2.5 text-[14px] font-medium text-fg-3 hover:bg-bg-1 hover:text-fg-1">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,680px)] lg:gap-20">
            <aside className="hidden lg:block">
              <OnThisPage label="Privacy policy sections" items={nav} />
            </aside>
            <article className="space-y-10 text-[17px] leading-[1.75] text-fg-3 [&_a]:text-brand [&_a]:underline hover:[&_a]:text-brand-hover">
              {policy.intro}
              {policy.sections.map(({ id, title, body }) => (
                <section key={id} id={id} className="scroll-mt-28 space-y-3.5">
                  <h2 className="font-display text-[22px] font-bold leading-tight text-fg-1 md:text-[26px]">{title}</h2>
                  {body}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </section>
    </>
  );
}
