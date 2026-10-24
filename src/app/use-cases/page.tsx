import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { APP_URL, DOCS_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Backend Use Cases",
  description: "See how agents and teams use Apso to build SaaS products, internal tools, client systems, and stable API foundations.",
};

const patterns = [
  {
    title: "Multi-tenant SaaS",
    body: "Workspaces, members, roles, billing boundaries, and tenant-scoped data.",
    link: { label: "Read the guide", href: "/use-cases/saas-backend" },
    note: "Starter: Multi-Tenant Workspaces",
  },
  {
    title: "Customer operations",
    body: "Contacts, companies, deals, tasks, audit history, and internal workflows.",
    link: { label: "See the CRM starter", href: "/templates#crm" },
  },
  {
    title: "Commerce systems",
    body: "Products, variants, inventory, carts, orders, and payment records.",
    link: { label: "See the e-commerce starter", href: "/templates#ecommerce" },
  },
  {
    title: "Agent-facing APIs",
    body: "Stable resources and permissions that give agents a consistent backend surface.",
    link: { label: "See the webhook starter", href: "/templates#webhooks-integrations" },
  },
];

const schema = `{
  "version": 2,
  "rootFolder": "src",
  "auth": { "provider": "better-auth" },
  "entities": [
    { "name": "Workspace", "fields": [ … ] },
    { "name": "Project",
      "scopeBy": "workspaceId",
      "fields": [ … ] }
  ],
  "relationships": [
    { "from": "Workspace", "to": "Project",
      "type": "OneToMany" }
  ]
}`;

const schemaExcerpt = `"auth": {
  "provider": "better-auth"
},
"entities": [
  { "name": "Project",
    "scopeBy": "workspaceId",
    "fields": [ … ] }
]`;

const boundaries = ["Workspace owns projects", "Members inherit roles", "Queries scope by tenant", "Migrations track changes"];

const wrap = "mx-auto w-full max-w-[1264px] px-4 md:px-8";

export default function UseCasesIndex() {
  return (
    <>
      <section className={`${wrap} grid items-center gap-8 pb-10 pt-8 lg:grid-cols-2 lg:gap-20 lg:py-[72px]`}>
        <div>
          <h1 className="font-display text-[36px] font-extrabold leading-[1.05] text-fg-1 md:text-[56px]">
            Build the foundation behind the product
          </h1>
          <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-fg-3 md:mt-5 md:text-[18px]">
            Use your existing coding agent to move from a product idea to a defined data model, consistent API,
            migrations, and infrastructure. Start with the pattern closest to what you are building.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:gap-3 md:mt-5">
            <a
              href="#patterns"
              className="inline-flex min-h-[47px] items-center justify-center rounded-[8px] bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover"
            >
              Explore product patterns
            </a>
            <Link
              href="/templates"
              className="inline-flex min-h-[47px] items-center justify-center rounded-[8px] border border-[#d1d5db] bg-bg-0 px-5 text-[15px] font-semibold text-fg-1 transition-colors hover:border-fg-5"
            >
              Browse starters
            </Link>
          </div>
        </div>

        <figure className="overflow-hidden rounded-[12px] bg-[#14171d]">
          <figcaption className="border-b border-[#262b33] px-5 py-3.5 font-mono text-[12px] font-medium text-[#8a919c]">
            saas-service.apsorc<span className="sm:hidden"> (excerpt)</span>
          </figcaption>
          <pre className="hidden overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.65] text-[#d6e4ff] sm:block">{schema}</pre>
          <pre className="overflow-x-auto px-5 py-4 font-mono text-[13px] leading-[1.65] text-[#d6e4ff] sm:hidden">{schemaExcerpt}</pre>
          <div className="bg-[#1b1f27] px-5 pb-5 pt-4">
            <p className="text-[13px] font-semibold text-white">4 boundaries represented in the generated service</p>
            <ul className="mt-2.5 flex flex-col gap-2.5">
              {boundaries.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-[14px] text-[#d1d5db]">
                  <span aria-hidden="true" className="h-2.5 w-1.5 shrink-0 rounded-[3px] bg-[#60a5fa]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </figure>
      </section>

      <section id="patterns" className={`${wrap} scroll-mt-20 pb-12 pt-4 md:pb-24 md:pt-6`}>
        <h2 className="font-display text-[26px] font-extrabold leading-tight text-fg-1 md:text-[36px]">
          Start closer to the product you are building
        </h2>
        <div className="mt-5 border-t border-line-1 md:mt-7">
          {patterns.map(({ title, body, link, note }) => (
            <div
              key={title}
              id={title.toLowerCase().replace(/[^a-z]+/g, "-")}
              className="scroll-mt-24 flex flex-col gap-2.5 border-b border-line-1 py-6 md:flex-row md:items-center md:justify-between md:gap-8 md:py-7"
            >
              <div className="max-w-[560px]">
                <h3 className="font-display text-[22px] font-bold text-fg-1 md:text-[26px]">{title}</h3>
                <p className="mt-1.5 text-[15px] leading-[1.6] text-fg-3 md:text-[16px]">{body}</p>
              </div>
              <div className="flex flex-col items-start md:items-end">
                <Link
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-[15px] font-semibold text-brand underline underline-offset-2 hover:text-brand-hover md:min-h-0"
                >
                  {link.label}
                </Link>
                {note && <p className="mt-1 text-[13px] text-fg-4">{note}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className={`${wrap} flex flex-col gap-10 py-10 md:flex-row md:items-center md:justify-between md:py-16`}>
          <div className="max-w-[620px]">
            <h2 className="font-display text-[28px] font-extrabold leading-tight md:text-[36px]">
              Give your agent a backend pattern it can build on
            </h2>
            <p className="mt-4 hidden max-w-[560px] text-[16px] leading-[1.6] text-[#d1d5db] sm:block">
              Choose the closest foundation, add your business rules, and review consistent service code in your
              repository.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[47px] items-center rounded-[8px] bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover"
              >
                Start building
              </a>
              <a
                href={DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[47px] items-center rounded-[8px] border border-fg-4 px-5 text-[15px] font-semibold text-white transition-colors hover:border-white"
              >
                Read the docs
              </a>
            </div>
          </div>
          <div aria-hidden="true" className="relative h-[105px] w-[266px] shrink-0 overflow-hidden md:h-[150px] md:w-[380px]">
            <Image
              src="/images/use-cases-dogs.svg"
              alt=""
              width={148}
              height={186}
              className="absolute left-[79px] top-4 h-[130px] w-[104px] md:left-[113px] md:top-[23px] md:h-[186px] md:w-[148px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
