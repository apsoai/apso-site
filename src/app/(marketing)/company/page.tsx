import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/marketing/page-hero";
import { ClosingBand } from "@/components/content/closing-band";
import { APP_URL, BOOKING_URL, DOCS_URL, GITHUB_URL } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: "/company" },
  title: "Company",
  description: "Why Apso was built: an owned, consistent backend foundation for AI-built software.",
};

const people = [
  { initials: "MC", name: "Matt Cullerton", role: "Founder", linkedin: "https://www.linkedin.com/in/mattcullerton/" },
];

const linkClass = "font-medium text-brand hover:text-brand-hover hover:underline";

export default function CompanyPage() {
  return (
    <>
      <PageHero
        title="We built Apso to get the backend foundation right"
        description="Apso comes from years of building software for clients. We kept seeing the same service work repeated by hand, then reproduced inconsistently by coding agents. We built a more dependable path from product intent to owned backend code."
      />

      <section className="bg-bg-1 py-10 md:pb-12 md:pt-8">
        <Container>
          <h2 className="font-display text-[28px] font-extrabold text-fg-1 md:text-[32px]">Founder</h2>
          <div className="mt-7 grid max-w-[420px] gap-6">
            {people.map(({ initials, name, role, linkedin }) => (
              <article key={name} className="flex items-center gap-4 rounded-[12px] border border-line-1 bg-bg-0 p-6">
                <span aria-hidden="true" className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-[18px] font-bold text-brand">
                  {initials}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-[20px] font-bold text-fg-1">{name}</h3>
                  <p className="mt-1 text-[14px] text-fg-4">{role}</p>
                  {linkedin && (
                    <a href={linkedin} target="_blank" rel="noopener noreferrer" className={`mt-1 inline-flex items-center gap-1.5 text-[14px] ${linkClass}`}>
                      LinkedIn <ExternalLink aria-hidden="true" className="h-[13px] w-[13px]" />
                      <span className="sr-only">profile for {name} (opens in a new tab)</span>
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-0 py-12">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
            <div>
              <h2 className="font-display text-[28px] font-extrabold leading-tight text-fg-1 md:text-[32px]">The repeated work was predictable. The output was not.</h2>
              <div className="mt-4 space-y-7 text-[17px] leading-[1.65] text-fg-3">
                <p>
                  Client and product backends repeatedly need entities, relationships, permissions, API contracts, migrations, and deployment configuration. Teams still spend meaningful engineering time rebuilding that foundation for every product.
                </p>
                <p>
                  Coding agents make the first draft faster, but a prompt alone does not create a durable engineering standard. Structure and security decisions can change between services because the model, context, and instructions change.
                </p>
                <p>
                  Apso puts the repeatable decisions into the generation system. The agent can explore the idea and shape the model. The generator produces the consistent service structure. The team reviews and owns the result.
                </p>
              </div>
            </div>

            <dl className="divide-y divide-line-1 rounded-[12px] border border-line-1 text-[14px]">
              <Fact label="Code">
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>github.com/apsoai</a>
              </Fact>
              <Fact label="License">
                <span className="font-medium text-fg-1">Apache-2.0 for the CLI, SDK, and templates</span>
              </Fact>
              <Fact label="Contact">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>Book a call</a>
                <span aria-hidden="true" className="mx-2 text-fg-4">·</span>
                <a href="/contact" className={linkClass}>Send a message</a>
              </Fact>
            </dl>
          </div>
        </Container>
      </section>

      <ClosingBand
        title="Put a real product idea through the Apso workflow"
        description="Use your coding agent to define the service, then review the consistent backend Apso generates for your team."
        primary={{ label: "Start building", href: APP_URL }}
        secondary={{ label: "Read the docs", href: DOCS_URL }}
      />
    </>
  );
}

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4 px-5 py-3.5">
      <dt className="w-[90px] shrink-0 text-fg-4">{label}</dt>
      <dd className="min-w-0 flex-1">{children}</dd>
    </div>
  );
}
