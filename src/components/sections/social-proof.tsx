import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DOCS_URL } from "@/lib/constants";

const LAYERS = [
  ["Data layer", ["ORM models", "relationships", "constraints", "migrations"]],
  ["API layer", ["REST controllers", "validation DTOs", "filters", "OpenAPI"]],
  ["Application layer", ["services", "auth guards", "tenant context", "extension hooks"]],
  ["Operations", ["local database", "tests", "Docker", "deployment config"]],
] as const;

const Tag = ({ children, tone }: { children: string; tone: "blue" | "green" }) => (
  <span
    className={`rounded-full sm:whitespace-nowrap px-2.5 py-[3px] font-body text-[12px] font-medium leading-[18px] ${
      tone === "green" ? "bg-[#052e16] text-[#86efac]" : "bg-[#172554] text-[#93c5fd]"
    }`}
  >
    {children}
  </span>
);

/** "Inspect the output": the generated repository, with what Apso rewrites and what your team owns. */
export function SocialProof() {
  return (
    <section className="bg-[#f6f8fb] py-14 md:pb-[120px] md:pt-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-[760px]">
            <h2 className="font-display text-[52px] font-extrabold leading-[1.04] tracking-[-0.015em] text-fg-1">
              A backend repository your team can read and change
            </h2>
            <p className="mt-4 max-w-[700px] text-[17px] leading-[1.65] text-fg-3 md:text-[18px]">
              The generator writes ordinary framework code and keeps custom application logic in a separate directory.
              Review the files, run the tests, and use the same deployment tools you use for other services.
            </p>
          </div>
          <a
            href={`${DOCS_URL}/architecture/generated-code`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 py-2.5 text-[16px] font-semibold text-brand hover:text-brand-hover"
          >
            Explore generated code <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </div>

        <div className="mt-12 overflow-hidden rounded-[18px] bg-[#0b1220] text-[#e5e7eb] shadow-[0_30px_60px_-24px_rgba(15,23,42,0.35)]">
          <div className="flex items-center gap-2 border-b border-[#1e293b] px-6 py-4 font-mono text-[13px] font-medium text-[#9ca3af]">
            <span className="mr-1.5 flex gap-2" aria-hidden="true">
              <i className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" />
              <i className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
            </span>
            generated service
          </div>
          <div className="grid lg:grid-cols-[560px_minmax(0,1fr)]">
            <div className="min-w-0 border-b border-[#1e293b] px-8 py-7 font-mono text-[15px] leading-[28px] lg:border-b-0 lg:border-r">
              <p className="text-white">project-api/</p>
              <p className="flex flex-wrap items-center gap-x-3 pl-5"><span className="text-[#bfdbfe]">.apsorc</span><Tag tone="blue">source of truth</Tag></p>
              <p className="pl-5">src/</p>
              <p className="flex flex-wrap items-center gap-x-3 pl-10"><span className="text-[#93c5fd]">autogen/</span><Tag tone="blue">Rewritten by Apso</Tag></p>
              <p className="pl-[60px] text-[#9ca3af]">Project/</p>
              <p className="pl-[60px] text-[#9ca3af]">Task/</p>
              <p className="flex flex-wrap items-center gap-x-3 pl-10"><span className="text-[#86efac]">extensions/</span><Tag tone="green">Owned by your team · preserved across generation</Tag></p>
              <p className="pl-[60px] text-[#86efac]">+ your product logic</p>
              <p className="pl-5">migrations/</p>
              <p className="pl-5">test/</p>
              <p className="pl-5">docker-compose.yml</p>
            </div>
            <div className="grid sm:grid-cols-2">
              {LAYERS.map(([title, items], i) => (
                <div key={title} className={`border-[#1e293b] p-7 ${i % 2 === 0 ? "sm:border-r" : ""} ${i < 2 ? "border-b" : i === 2 ? "border-b sm:border-b-0" : ""}`}>
                  <h3 className="font-display text-[20px] font-bold text-white">{title}</h3>
                  <ul className="mt-2.5 grid gap-2.5">
                    {items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-[15px] text-[#cbd5e1]">
                        <Check aria-hidden="true" size={15} className="shrink-0 text-[#60a5fa]" strokeWidth={2.2} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
