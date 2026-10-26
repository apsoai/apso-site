import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";

// Header for read pages (blog index, FAQ, privacy): smaller than PageHero and closed by a rule.
export function ReadHeader({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-b border-line-1 bg-bg-0">
      <Container>
        <div className="pb-6 pt-8 md:pb-10 md:pt-16">
          <h1 className="max-w-[960px] text-balance font-display text-[32px] font-extrabold leading-[1.1] text-fg-1 md:text-[48px]">{title}</h1>
          <p className="mt-2.5 max-w-[720px] text-[16px] leading-[1.6] text-fg-3 md:mt-3.5 md:text-[18px]">{children}</p>
        </div>
      </Container>
    </section>
  );
}
