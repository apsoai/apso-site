import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ClosingBand } from "@/components/content/closing-band";

export const metadata: Metadata = {
  title: "Who Apso Is For",
  description: "See how founders, delivery teams, and platform teams use Apso to generate consistent backend services they own.",
};

const teams = [
  {
    title: "Founder-led product teams",
    body: "Move from product requirements to a credible backend before hiring a full infrastructure function. Keep code that the next engineer can inherit.",
    outcome: "A backend the company can grow into",
  },
  {
    title: "Consultancies and delivery teams",
    body: "Start client services from the same reviewed patterns, then adapt the schema and business logic to each engagement.",
    outcome: "Consistent delivery without generic output",
  },
  {
    title: "Platform and engineering teams",
    body: "Give product teams an approved path to create services while keeping architecture, permissions, and deployment behavior legible.",
    outcome: "A repeatable service standard",
  },
];

export default function WhoItsForPage() {
  return (
    <>
      <section className="bg-bg-0 pb-8 pt-12 md:pt-20">
        <Container>
          <h1 className="max-w-[1200px] font-display text-[40px] font-extrabold leading-[1.05] text-fg-1 md:text-[56px]">
            For teams that need speed and a backend they can inherit
          </h1>
          <p className="mt-4 max-w-[760px] text-[17px] leading-[1.6] text-fg-4 md:text-[19px]">
            Apso gives agents, developers, and delivery teams one way to turn product intent into consistent service code without creating a new platform dependency.
          </p>
        </Container>
      </section>

      <section className="bg-bg-0 pb-12 pt-4">
        <Container>
          <div className="grid items-start gap-6 lg:grid-cols-3">
            {teams.map(({ title, body, outcome }) => (
              <article key={title} className="flex flex-col gap-3 rounded-[12px] border border-line-1 p-7">
                <h2 className="font-display text-[22px] font-bold leading-tight text-fg-1">{title}</h2>
                <p className="text-[15px] leading-[1.6] text-fg-4">{body}</p>
                <div className="pt-3">
                  <p className="text-[13px] font-medium text-fg-4">Desired outcome</p>
                  <p className="mt-1 text-[16px] font-semibold text-fg-1">{outcome}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <ClosingBand
        title="Bring your team and a representative backend idea"
        description="We will help you map the service boundary, ownership requirements, and deployment model before you commit."
        primary={{ label: "Talk to the team", href: "/contact" }}
        secondary={{ label: "Explore use cases", href: "/use-cases" }}
      />
    </>
  );
}
