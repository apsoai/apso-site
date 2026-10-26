/* eslint-disable @next/next/no-img-element -- Company favicons come from the dynamic source used by Create Service. */
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import {
  FEATURED_STARTER_IDS,
  STARTER_BACKENDS,
} from "@/lib/starter-backends";

interface FeaturedStarterDetails {
  replaces: string[];
  savingsRange: string;
}

const featuredStarterDetails: Record<string, FeaturedStarterDetails> = {
  "multi-tenant-workspaces": {
    replaces: ["Custom Multi-tenancy"],
    savingsRange: "Weeks of dev time",
  },
  crm: {
    replaces: ["HubSpot", "Salesforce", "Pipedrive"],
    savingsRange: "$50-500/user",
  },
  ecommerce: {
    replaces: ["Shopify", "BigCommerce", "Saleor"],
    savingsRange: "$29-299/mo + fees",
  },
  "subscription-billing": {
    replaces: ["Stripe Billing", "Chargebee", "Recurly"],
    savingsRange: "$250-2000/mo",
  },
  "project-management": {
    replaces: ["Asana", "Monday.com", "ClickUp"],
    savingsRange: "$10-25/user",
  },
  "blog-cms": {
    replaces: ["WordPress", "Ghost", "Contentful"],
    savingsRange: "$5-100/mo",
  },
};

const companyDomains: Record<string, string> = {
  HubSpot: "hubspot.com",
  Salesforce: "salesforce.com",
  Pipedrive: "pipedrive.com",
  Shopify: "shopify.com",
  BigCommerce: "bigcommerce.com",
  Saleor: "saleor.io",
  "Stripe Billing": "stripe.com",
  Chargebee: "chargebee.com",
  Recurly: "recurly.com",
  Asana: "asana.com",
  "Monday.com": "monday.com",
  ClickUp: "clickup.com",
  WordPress: "wordpress.com",
  Ghost: "ghost.org",
  Contentful: "contentful.com",
};

function getLogoUrl(companyName: string) {
  const domain = companyDomains[companyName];
  return domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : null;
}

export function StarterBackends() {
  const featured = FEATURED_STARTER_IDS.map((id) =>
    STARTER_BACKENDS.find((starter) => starter.id === id)
  ).filter((starter): starter is (typeof STARTER_BACKENDS)[number] => Boolean(starter));

  return (
    <section id="starters" className="bg-bg-0 py-14 md:pb-28 md:pt-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <h2 className="font-display text-[52px] font-extrabold leading-[1.04] tracking-[-0.015em] text-fg-1">
              Start with the data model your product already needs
            </h2>
            <p className="mt-4 max-w-[680px] text-[17px] leading-[1.65] text-fg-3 md:text-[18px]">
              Each starter gives Apso a detailed schema brief for a real application pattern. Choose one, adjust the
              entities and relationships, then generate the backend in your preferred language.
            </p>
          </div>
          <Link
            href="/templates"
            className="inline-flex shrink-0 items-center gap-1.5 py-2.5 text-[16px] font-semibold text-brand hover:text-brand-hover"
          >
            Browse all {STARTER_BACKENDS.length} starters <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <ul className="mt-12 border-t border-[#e5e7eb]">
          {featured.map((starter) => {
            const details = featuredStarterDetails[starter.id];
            return (
              <li key={starter.id} className="border-b border-[#e5e7eb]">
                <Link
                  href={`/templates#${starter.id}`}
                  className="grid gap-3 py-6 transition-colors hover:bg-bg-1 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:gap-x-8 lg:grid-cols-[300px_230px_minmax(0,1fr)_144px] lg:gap-8 lg:py-[26px]"
                >
                  <span className="font-display text-[24px] font-bold leading-tight text-fg-1 lg:text-[26px]">{starter.title}</span>
                  <span className="flex items-center gap-2">
                    <span className="text-[12px] font-medium text-fg-5">Replaces</span>
                    {details.replaces.map((company) => {
                      const logoUrl = getLogoUrl(company);
                      return logoUrl ? (
                        <span
                          key={company}
                          className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-line-1 bg-white"
                          title={company}
                        >
                          <img src={logoUrl} alt={company} width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                        </span>
                      ) : (
                        <span key={company} className="rounded-[8px] bg-bg-2 px-2 py-1 text-[13px] leading-[15px] text-fg-4">
                          {company}
                        </span>
                      );
                    })}
                  </span>
                  <span className="max-w-[430px] text-[16px] leading-[1.55] text-fg-3">{starter.description}</span>
                  <span className="text-[15px] font-semibold text-[#15803d] md:text-right lg:text-left">Save {details.savingsRange}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
