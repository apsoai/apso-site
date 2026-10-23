import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Code2, GitBranch, Scale, Server } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PageHero } from "@/components/marketing/page-hero";
import { PageCta } from "@/components/marketing/page-cta";
import { HeroLedger } from "@/components/marketing/hero-ledger";
import { getAllContent } from "@/lib/content";
import type { CompareFrontmatter } from "@/types/content";

export const metadata: Metadata = {
  title: "Compare Apso to Backend Platforms",
  description: "Compare Apso with managed backend platforms, visual builders, and generated API products by ownership, runtime, and workflow.",
};

const competitorDetails: Record<string, { initial: string; category: string; color: string }> = {
  "Agent-written code": { initial: "AI", category: "Your coding agent, on its own", color: "bg-fg-2" },
  Appwrite: { initial: "A", category: "Open-source backend platform", color: "bg-[#f02e65]" },
  Convex: { initial: "C", category: "Reactive backend platform", color: "bg-[#ee342f]" },
  Firebase: { initial: "F", category: "Managed application platform", color: "bg-[#f59e0b]" },
  Hasura: { initial: "H", category: "GraphQL API platform", color: "bg-[#1eb4d4]" },
  Supabase: { initial: "S", category: "Managed Postgres platform", color: "bg-[#3ecf8e]" },
  Xano: { initial: "X", category: "Visual backend builder", color: "bg-[#753cff]" },
};

export default function CompareIndex() {
  const comparisons = getAllContent<CompareFrontmatter>("compare");

  return (
    <>
      <PageHero
        eyebrow="Compare"
        title="Choose the backend model, not only the feature list"
        description="Backend products can look similar in a checklist while leaving your team with very different code, operating boundaries, and exit paths. These guides make that tradeoff explicit."
        actions={
          <a href="#comparisons" className="inline-flex min-h-12 items-center justify-center rounded-sm bg-brand px-6 font-display text-[14px] font-semibold text-white hover:bg-brand-hover">
            Browse comparisons
          </a>
        }
        meta={["Practical tradeoffs", "Clear best-fit guidance", "Ownership explained"]}
        visual={
          <HeroLedger
            label="Evaluation model"
            rows={[
              { label: "Application layer", value: "Decide whether the API is platform behavior or code in your repository.", icon: Code2 },
              { label: "Runtime boundary", value: "Understand who controls deployment, infrastructure, and operations.", icon: Server },
              { label: "Exit path", value: "Know what keeps running when the vendor relationship changes.", icon: GitBranch },
            ]}
            footer="compare architecture before convenience"
          />
        }
      />

      <Section id="comparisons">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[320px_1fr] lg:gap-14">
            <div>
              <p className="font-mono text-[10px] uppercase text-brand">Platform guides</p>
              <h2 className="mt-3 font-display text-[30px] font-bold leading-tight text-fg-1">Find the model that fits your team</h2>
              <p className="mt-4 text-[14px] leading-6 text-fg-4">
                Each guide covers where the other product is strong, where Apso differs, and which team should choose each path.
              </p>
              <div className="mt-8 space-y-4 border-t border-line-1 pt-5">
                <DecisionItem icon={Boxes} label="Product surface" value="Hosted platform or generated service" />
                <DecisionItem icon={Scale} label="Primary tradeoff" value="Convenience, control, and portability" />
                <DecisionItem icon={GitBranch} label="Source of truth" value="Vendor configuration or your repository" />
              </div>
            </div>

            {comparisons.length === 0 ? (
              <p className="text-fg-4">Comparison pages are being prepared.</p>
            ) : (
              <div className="border-t border-line-1">
                {comparisons.map((item, index) => {
                  const details = competitorDetails[item.frontmatter.competitor] ?? {
                    initial: item.frontmatter.competitor.charAt(0),
                    category: "Backend platform",
                    color: "bg-fg-3",
                  };
                  return (
                    <Link
                      key={item.slug}
                      href={`/compare/${item.slug}`}
                      className="group grid gap-4 border-b border-line-1 py-6 transition-colors hover:bg-bg-1 sm:grid-cols-[48px_1fr_auto] sm:items-center sm:px-4"
                    >
                      <span className={`flex h-11 w-11 items-center justify-center rounded-sm font-display text-[18px] font-bold text-white ${details.color}`}>
                        {details.initial}
                      </span>
                      <span>
                        <span className="font-mono text-[9px] uppercase text-fg-5">0{index + 1} / {details.category}</span>
                        <span className="mt-1 block font-display text-[21px] font-bold text-fg-1">{item.frontmatter.title}</span>
                        <span className="mt-1 block max-w-[680px] text-[13px] leading-5 text-fg-4">{item.frontmatter.description}</span>
                      </span>
                      <span className="flex h-9 w-9 items-center justify-center rounded-sm border border-line-1 text-fg-3 transition-colors group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                        <ArrowRight aria-hidden="true" className="h-4 w-4" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </Container>
      </Section>

      <PageCta
        eyebrow="Evaluate the output"
        title="Compare a generated backend to the platform you use today"
        description="Bring a representative schema, review the service Apso produces, and make the ownership tradeoff concrete."
      />
    </>
  );
}

function DecisionItem({ icon: Icon, label, value }: { icon: typeof Boxes; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
      <div>
        <p className="font-display text-[13px] font-semibold text-fg-1">{label}</p>
        <p className="mt-0.5 text-[12px] leading-5 text-fg-5">{value}</p>
      </div>
    </div>
  );
}
