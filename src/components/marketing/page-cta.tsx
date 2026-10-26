import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { APP_URL, DOCS_URL } from "@/lib/constants";

interface PageCtaProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export function PageCta({
  title = "Give your agent Apso's backend expertise",
  description = "Connect Apso to Claude or Codex, give the agent Apso's rules and workflows, and review a consistent backend your team can extend and deploy anywhere.",
  primaryLabel = "Start building",
  primaryHref = APP_URL,
  secondaryLabel = "Read the docs",
  secondaryHref = DOCS_URL,
}: PageCtaProps) {
  const primaryExternal = primaryHref.startsWith("http");
  const secondaryExternal = secondaryHref.startsWith("http");

  return (
    <section className="border-y border-white/10 bg-navy py-14 text-white md:py-18">
      <Container>
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-[780px]">
            <h2 className="font-display text-[32px] font-extrabold leading-tight text-white md:text-[40px]">
              {title}
            </h2>
            <p className="mt-4 max-w-[680px] text-[17px] leading-7 text-white/75">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={primaryHref}
              target={primaryExternal ? "_blank" : undefined}
              rel={primaryExternal ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-brand px-6 text-[15px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              {primaryLabel}
            </a>
            <a
              href={secondaryHref}
              target={secondaryExternal ? "_blank" : undefined}
              rel={secondaryExternal ? "noopener noreferrer" : undefined}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] bg-white px-6 text-[15px] font-medium text-fg-1 transition-colors hover:bg-bg-2"
            >
              {secondaryLabel}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
