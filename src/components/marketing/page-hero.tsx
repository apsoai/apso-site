import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

interface PageHeroProps {
  /** @deprecated The redesign drops eyebrow labels (#22). Kept so existing callers compile. */
  eyebrow?: string;
  title: string;
  description: string;
  visual?: ReactNode;
  top?: ReactNode;
  actions?: ReactNode;
  meta?: string[];
}

export function PageHero({ title, description, visual, top, actions, meta }: PageHeroProps) {
  return (
    <section className="border-b border-line-1 bg-bg-0">
      <Container>
        <div className={`grid gap-12 py-16 md:py-20 ${visual ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] lg:items-center" : ""}`}>
          <div className="min-w-0">
            {top && <div className="mb-6">{top}</div>}
            <h1 className="max-w-[900px] text-balance font-display text-[40px] font-extrabold leading-[1.05] text-fg-1 md:text-[56px]">
              {title}
            </h1>
            <p className="mt-5 max-w-[780px] text-[17px] leading-[1.6] text-fg-4 md:text-[19px]">{description}</p>
            {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
            {meta && meta.length > 0 && <p className="mt-6 text-[14px] text-fg-4">{meta.join(" · ")}</p>}
          </div>
          {visual && <div className="min-w-0">{visual}</div>}
        </div>
      </Container>
    </section>
  );
}
