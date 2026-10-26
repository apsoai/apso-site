import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/marketing/page-hero";
import { PricingPlans } from "@/components/marketing/pricing-plans";
import { SittingDogs } from "@/components/marketing/sitting-dogs";

export const metadata: Metadata = {
  alternates: { canonical: "/pricing" },
  title: "Pricing",
  description: "Generate backend code for free. Add team controls with a workspace plan, choose a tier for each service, or have Apso run DevOps in your own cloud on Business.",
};

const btn = "inline-flex min-h-12 w-full items-center justify-center rounded-[8px] px-5 text-[15px] font-medium transition-colors sm:w-auto";

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="Pay for the automation you need. Keep the backend you build."
        description="Generate and inspect your backend before you commit to infrastructure. Bring your whole team for free, add team controls when you need them, or have Apso run operations in your own cloud without changing the ownership model."
        actions={
          <>
            <a href="#plans" className={`${btn} bg-brand text-white hover:bg-brand-hover`}>
              Compare plans
            </a>
            <a href="/contact" className={`${btn} border border-line-1 bg-bg-0 text-fg-1 hover:border-fg-5`}>
              Talk to us
            </a>
          </>
        }
      />

      <PricingPlans />

      <section className="bg-navy py-16 text-white">
        <Container>
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex-1">
              <h2 className="max-w-[740px] font-display text-[30px] font-extrabold leading-[1.1] md:text-[36px]">
                Review the backend before you choose how to run it
              </h2>
              <p className="mt-4 max-w-[740px] text-[16px] leading-[1.6] text-[#D1D5DB]">
                Build the schema with your agent, inspect the generated service, and select the operating model that fits your team.
              </p>
              <a
                href="/contact"
                className="mt-4 inline-flex min-h-12 items-center justify-center rounded-[8px] bg-bg-0 px-5 text-[15px] font-medium text-fg-1 transition-colors hover:bg-bg-2"
              >
                Ask a pricing question
              </a>
            </div>
            <SittingDogs width={168} className="shrink-0 self-center md:mr-6 lg:mr-[135px]" />
          </div>
        </Container>
      </section>
    </>
  );
}
