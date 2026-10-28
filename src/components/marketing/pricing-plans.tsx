import { CalendarDays, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { APP_URL } from "@/lib/constants";
import { JsonLd } from "@/components/seo/json-ld";
import { faqPageSchema } from "@/lib/schema";

type Plan = {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  href: string;
};

type ServiceTier = {
  name: string;
  price: string;
  period: string;
  description: string;
  badge?: string;
  cta?: string;
  primary?: boolean;
};

export const workspacePlans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    period: "per workspace",
    description: "Bring the whole team. Everyone in the workspace can build and deploy. Roles are not managed on Free.",
    features: ["Unlimited members", "Everyone can build and deploy", "One free hosted service"],
    cta: "Start building",
    href: APP_URL,
  },
  {
    name: "Team",
    price: "$99",
    period: "per month, flat",
    description: "Control who can do what once the team grows. No per-seat charge.",
    features: ["Everything in Free", "Roles and permissions"],
    cta: "Start a team",
    href: APP_URL,
  },
];

export const businessPlan: Plan = {
  name: "Business",
  price: "Talk to sales",
  period: "",
  description:
    "DevOps as a service. Our team sets up and runs Apso in Apso's cloud or your own cloud account, with professional services available.",
  features: [
    "Everything in Team",
    "DevOps as a service",
    "Run in Apso's cloud or your own",
    "Professional services available",
  ],
  cta: "Talk to sales",
  href: "/contact",
};

export const serviceTiers: ServiceTier[] = [
  {
    name: "Free",
    price: "$0",
    period: "one per workspace",
    description: "Deploy a backend to try it out. Not for commercial use.",
    cta: "Deploy for free",
  },
  {
    name: "Small",
    price: "$25",
    period: "per service / month",
    description: "Run a production service with the operational basics handled by Apso.",
    badge: "Production default",
    cta: "Build a production service",
    primary: true,
  },
  {
    name: "Medium",
    price: "$49",
    period: "per service / month",
    description: "Medium gives a service more resources than Small.",
    cta: "Scale a service",
  },
  {
    name: "Large",
    price: "$99",
    period: "per service / month",
    description: "Large gives a service the most resources Apso offers.",
    cta: "Scale a service",
  },
];

const faqItems = [
  {
    question: "How do workspace plans and service tiers fit together?",
    answer:
      "A workspace plan sets team controls and who runs operations. A service tier sets the compute for one deployed service. You buy them separately. Any workspace plan, including Free, can add Small, Medium, or Large services.",
  },
  {
    question: "What is a service for billing?",
    answer:
      "A service is one deployable backend with its own deployment target, domain, scaling configuration, and catalog entry. Each service has its own tier and can be operated independently.",
  },
  {
    question: "Does Apso charge per seat?",
    answer:
      "No. Every workspace plan includes unlimited members. Team is a flat $99 per month for the workspace. Services are billed separately by tier.",
  },
  {
    question: "Do we own the generated code?",
    answer:
      "Yes. Apso generates normal TypeScript, Python, or Go backend code in your repository. Your team can inspect it, change it, run it without Apso, and deploy it elsewhere. Export gives you the application code. Infrastructure automation is the paid layer.",
  },
  {
    question: "Can we deploy into our own cloud account?",
    answer:
      "Two ways. You can export the generated code and run it anywhere, free. Or, on Business, Apso runs the DevOps for your workspace inside your own cloud account. You pay your cloud provider directly.",
  },
];

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] px-5 text-[15px] font-medium transition-colors";
const btnPrimary = `${btn} bg-brand text-white hover:bg-brand-hover`;
const btnOutline = `${btn} border border-line-1 bg-bg-0 text-fg-1 hover:border-fg-5`;

function external(href: string) {
  return href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function PricingPlans() {
  return (
    <>
      <JsonLd data={faqPageSchema(faqItems)} />
      <section id="plans" className="scroll-mt-20 bg-bg-0 pb-[72px] pt-10">
        <Container>
          <h2 className="font-display text-[28px] font-bold text-fg-1 md:text-[32px]">Workspace plans</h2>
          <p className="mt-7 text-[16px] leading-[1.6] text-fg-4">One plan per workspace. Every plan includes unlimited members.</p>
          <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {workspacePlans.map((plan, i) => (
              <PlanCard key={plan.name} plan={plan} primary={i === 1} />
            ))}
            <PlanCard plan={businessPlan} dark />
          </div>
        </Container>
      </section>

      <section className="bg-bg-1 py-[72px]">
        <Container>
          <h2 className="font-display text-[28px] font-bold text-fg-1 md:text-[32px]">Service tiers</h2>
          <p className="mt-7 text-[16px] leading-[1.6] text-fg-4">
            You choose a tier for each service, on any workspace plan.
          </p>
          <div className="mt-7 grid overflow-hidden rounded-[12px] border border-line-1 bg-bg-0 md:grid-cols-2 lg:grid-cols-1">
            {serviceTiers.map((tier, i) => (
              <TierRow key={tier.name} tier={tier} index={i} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bg-0 pb-[72px] pt-10">
        <Container>
          <h2 className="font-display text-[28px] font-bold text-fg-1 md:text-[32px]">The operating details, plainly stated</h2>
          <dl className="mt-7">
            {faqItems.map(({ question, answer }) => (
              <div key={question} className="border-t border-line-1 py-5">
                <dt className="text-[17px] font-semibold text-fg-1">{question}</dt>
                <dd className="mt-2 text-[15px] leading-[1.6] text-fg-4">{answer}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>
    </>
  );
}

function PlanCard({ plan, primary, dark }: { plan: Plan; primary?: boolean; dark?: boolean }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-[12px] p-7 ${
        dark ? "bg-navy text-white md:col-span-2 lg:col-span-1" : "border border-line-1 bg-bg-0 text-fg-1"
      }`}
    >
      <h3 className="font-display text-[20px] font-bold">{plan.name}</h3>
      <p className="flex flex-wrap items-baseline gap-x-2">
        <span className="font-display text-[44px] font-extrabold leading-none">{plan.price}</span>
        <span className={`text-[14px] ${dark ? "text-[#D1D5DB]" : "text-fg-4"}`}>{plan.period}</span>
      </p>
      <p className={`text-[15px] leading-[1.6] ${dark ? "text-[#D1D5DB]" : "text-fg-4"}`}>{plan.description}</p>
      <hr className={dark ? "border-fg-3" : "border-line-1"} />
      <ul className="flex flex-1 flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-[15px]">
            <Check aria-hidden="true" className={`h-[18px] w-[18px] shrink-0 ${dark ? "text-[#93C5FD]" : "text-brand"}`} />
            {feature}
          </li>
        ))}
      </ul>
      <a
        href={plan.href}
        {...external(plan.href)}
        className={`mt-2 w-full ${
          dark ? `${btn} bg-bg-0 text-fg-1 hover:bg-bg-2` : primary ? btnPrimary : btnOutline
        }`}
      >
        {dark && <CalendarDays aria-hidden="true" className="h-4 w-4" />}
        {plan.cta}
      </a>
    </article>
  );
}

function TierRow({ tier, index }: { tier: ServiceTier; index: number }) {
  return (
    <div
      className={`flex flex-col gap-3 px-6 py-[22px] lg:flex-row lg:items-center lg:gap-6 ${
        index > 0 ? "border-t border-line-1" : ""
      } ${index === 1 ? "md:border-t-0 md:border-l lg:border-l-0 lg:border-t" : ""} ${
        index === 3 ? "md:border-l lg:border-l-0" : ""
      }`}
    >
      <div className="flex shrink-0 flex-col gap-1 lg:w-[200px]">
        <div className="flex items-center gap-2">
          <h3 className="font-display text-[18px] font-bold text-fg-1">{tier.name}</h3>
          {tier.badge && (
            <span className="rounded-full bg-brand-soft px-2 py-0.5 text-[12px] font-medium text-brand">{tier.badge}</span>
          )}
        </div>
        <p className="flex items-baseline gap-1.5 text-fg-1">
          <span className="font-display text-[24px] font-extrabold">{tier.price}</span>
          <span className="text-[13px] text-fg-4">{tier.period}</span>
        </p>
      </div>
      <p className="flex-1 text-[15px] leading-[1.6] text-fg-3">{tier.description}</p>
      {tier.cta ? (
        <a href={APP_URL} {...external(APP_URL)} className={`w-full lg:w-auto ${tier.primary ? btnPrimary : btnOutline}`}>
          {tier.cta}
        </a>
      ) : (
        <span aria-hidden="true" className="hidden lg:block lg:w-[170px]" />
      )}
    </div>
  );
}
