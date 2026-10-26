import { getAllContent } from "@/lib/content";
import { APP_URL, DOCS_URL, GITHUB_URL, SITE_DESCRIPTION, SITE_URL } from "@/lib/constants";
import { businessPlan, serviceTiers, workspacePlans } from "@/components/marketing/pricing-plans";

// Built from the same data the pages render, so pricing and the page list cannot drift.
export const dynamic = "force-static";

type Entry = { title: string; description: string };

const links = (category: string) =>
  getAllContent<Entry>(category)
    .map(({ slug, frontmatter: f }) => `- [${f.title}](${SITE_URL}/${category}/${slug}): ${f.description}`)
    .join("\n");

export function GET() {
  const plans = [...workspacePlans, businessPlan]
    .map((p) => `- ${p.name}: ${[p.price, p.period].filter(Boolean).join(" ")}. ${p.description}`)
    .join("\n");
  const tiers = serviceTiers
    .map((t) => `- ${t.name}: ${t.price} ${t.period}${t.comingSoon ? " (coming soon)" : ""}. ${t.description}`)
    .join("\n");

  const body = `# Apso

> ${SITE_DESCRIPTION}

Apso generates TypeScript with NestJS, Python with FastAPI, and Go with Gin from one schema file (.apsorc). The generated backend lives in your repository and needs no Apso runtime. Generated services use PostgreSQL.

## Pages

- [Pricing](${SITE_URL}/pricing): Workspace plans and per-service tiers
- [FAQ](${SITE_URL}/faq): Generation, agent workflows, ownership, deployment, auth, pricing
- [Use cases](${SITE_URL}/use-cases)
- [Comparisons](${SITE_URL}/compare)
- [Contact](${SITE_URL}/contact): Talk to sales or book a demo

## Comparisons

${links("compare")}

## Use cases

${links("use-cases")}

## Blog

${links("blog")}

## Pricing

Workspace plans (one per workspace, unlimited members on every plan):
${plans}

Service tiers (bought per deployed service, on any workspace plan):
${tiers}

Self-hosting: export the generated code and run it anywhere, free.

## Links

- App: ${APP_URL}
- Docs: ${DOCS_URL}
- GitHub: ${GITHUB_URL}
- CLI: npm install -g @apso/cli
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
