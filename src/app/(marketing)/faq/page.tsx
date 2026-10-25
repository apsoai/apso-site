import type { Metadata } from "next";
import { ChevronDown } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ReadHeader } from "@/components/content/read-header";
import { OnThisPage } from "@/components/content/on-this-page";
import { ClosingBand } from "@/components/content/closing-band";
import { DOCS_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/faq" },
  title: "Frequently Asked Questions",
  description: "Answers about Apso generation, agent workflows, backend ownership, deployment, languages, authentication, and pricing.",
};

const generalQuestions = [
  {
    question: "What is Apso?",
    answer: "Apso is the backend foundation for AI-built software. Your agent helps define the product and data model. Apso turns that intent into consistent APIs, migrations, infrastructure, and normal TypeScript, Python, or Go code in your repository.",
  },
  {
    question: "How is Apso different from Firebase or Supabase?",
    answer: "Firebase and Supabase provide hosted backend capabilities through their platform model. Apso generates the application service itself as code your team can inspect, modify, test, and operate. The important distinction is where the backend logic lives and what your team can take with it.",
  },
  {
    question: "How is Apso different from asking an agent to write the backend?",
    answer: "An agent is excellent at turning product intent into a proposed system. Apso gives that agent a repeatable generation boundary, so APIs created at different times follow the same service structure and security patterns. The agent shapes what you need, and Apso keeps the resulting foundation consistent.",
  },
  {
    question: "Which programming languages are supported?",
    answer: "Apso generates TypeScript with NestJS, Python with FastAPI, and Go with Gin. The output follows each framework's normal project structure and tooling.",
  },
  {
    question: "Do we own the code?",
    answer: "Yes. The generated backend lives in your repository. Your team can extend it, run it without Apso, and move it to another infrastructure provider. There is no proprietary Apso runtime required by the generated service.",
  },
];

const technicalQuestions = [
  {
    question: "How does an agent work with Apso?",
    answer: "Apso turns Claude, Codex, or another compatible coding agent into an Apso specialist. Rules teach the agent Apso's architecture and guardrails. Task skills teach workflows such as schema design, auth, migrations, and feature development. MCP tools ground that expertise in the current project and let the agent inspect, validate, generate, and test without making you translate the work into CLI commands.",
  },
  {
    question: "Which database does Apso use?",
    answer: "Generated services use PostgreSQL. TypeScript services use TypeORM, Python services use SQLAlchemy, and Go services use GORM. Deployment configuration depends on the infrastructure model you choose.",
  },
  {
    question: "How does authentication work?",
    answer: 'Authentication is opt-in. Add an auth block to your schema, for example "auth": { "provider": "better-auth" }, and Apso generates session auth with BetterAuth, or with sessions stored in your own database. Without an auth block the service has no generated auth, and you can put your own in front of it.',
  },
  {
    question: "Can we customize generated code?",
    answer: "Yes. The service is normal framework code. Generated areas and extension points are separated so your team can add business logic while continuing to evolve the underlying schema and generated resources.",
  },
  {
    question: "How does multi-tenancy work?",
    answer: "Tenant boundaries are represented in the schema and enforced in the generated application layer. Resources can be scoped to a workspace or tenant so list, read, create, update, and delete behavior applies the same boundary.",
  },
];

const pricingQuestions = [
  {
    question: "How much does Apso cost?",
    answer: "Pricing has two parts. The workspace plan is Free at $0, Team at $99 per month flat, or Business, which is priced with sales. Each deployed service has its own tier, bought separately on any plan: one Free service per workspace, then Small at $25. Medium and Large are coming soon.",
  },
  {
    question: "Does Apso charge per seat?",
    answer: "No. Every workspace plan, including Free, includes unlimited members. Services are billed separately by tier.",
  },
  {
    question: "Is there vendor lock-in?",
    answer: "The generated service has no required Apso runtime. The code remains in your repository and can continue running if you stop using Apso. Managed infrastructure and automation are separate from your ownership of the backend code.",
  },
  {
    question: "Can we deploy into our own cloud?",
    answer: "Two ways. You can export the generated code and run it anywhere, free. Or, on Business, Apso runs the DevOps for your workspace inside your own cloud account. You pay your cloud provider directly.",
  },
];

const groups = [
  { id: "product", label: "Product and ownership", items: generalQuestions },
  { id: "technical", label: "Agents, generation, and services", items: technicalQuestions },
  { id: "pricing", label: "Pricing and deployment", items: pricingQuestions },
];

const topics = groups.map(({ id, label, items }) => ({ id, label, count: items.length }));

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqPageSchema(groups.flatMap((g) => g.items))} />
      <ReadHeader title="Clear answers about the backend foundation">
        Understand what Apso generates, how it works with your coding agent, where the service runs, and what your team owns.
      </ReadHeader>

      <section className="bg-bg-0 pb-14 pt-2 lg:pb-24 lg:pt-12">
        <Container>
          <nav aria-label="FAQ topics" className="flex flex-wrap gap-2 pb-2 pt-4 lg:hidden">
            {topics.map(({ id, label }) => (
              <a key={id} href={`#${id}`} className="rounded-full bg-bg-2 px-3.5 py-3 text-[13px] font-medium text-fg-3 hover:bg-brand-soft hover:text-brand">
                {label}
              </a>
            ))}
          </nav>
          <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,760px)] lg:gap-20">
            <aside className="hidden lg:block">
              <OnThisPage label="FAQ topics" items={topics} />
            </aside>
            <div className="space-y-12 pt-4 lg:pt-0">
              {groups.map(({ id, label, items }) => (
                <section key={id} id={id} className="scroll-mt-28">
                  <h2 className="font-display text-[22px] font-bold text-fg-1 md:text-[26px]">{label}</h2>
                  <div className="mt-2.5">
                    {items.map(({ question, answer }, i) => (
                      <details key={question} open={id === "product" && i === 0} className="group border-b border-line-1 py-5">
                        <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-[16px] font-medium text-fg-1 md:text-[17px] [&::-webkit-details-marker]:hidden">
                          {question}
                          <ChevronDown aria-hidden="true" className="h-5 w-5 shrink-0 text-fg-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                        </summary>
                        <p className="mt-3 max-w-[720px] pr-10 text-[16px] leading-[1.7] text-fg-3">{answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ClosingBand
        title="Bring us the backend decision you are working through"
        description="Share your product, deployment boundary, or current stack and we will help you evaluate whether Apso fits."
        primary={{ label: "Contact the team", href: "/contact" }}
        secondary={{ label: "Read the docs", href: DOCS_URL }}
        secondaryStyle="outline"
      />
    </>
  );
}
