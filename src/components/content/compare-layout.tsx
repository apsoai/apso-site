import Link from "next/link";
import { Check } from "lucide-react";
import type { MDXComponents } from "mdx/types";
import { PageCta } from "@/components/marketing/page-cta";

// 1200px content width at x=120 on a 1440 viewport, matching the Figma compare frames.
const WRAP = "mx-auto w-full max-w-[1248px] px-6";

interface CompareLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  competitor: string;
  date: string;
}

export function CompareLayout({ children, title, description, competitor, date }: CompareLayoutProps) {
  return (
    <>
      <section className="bg-bg-0">
        <div className={`${WRAP} pb-8 pt-12 md:pt-[72px]`}>
          <nav aria-label="Breadcrumb" className="text-[14px] font-medium text-fg-4">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/compare" className="transition-colors hover:text-fg-1">
                  Compare
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{competitor}</li>
            </ol>
          </nav>
          <h1 className="mt-4 text-balance font-display text-[40px] font-extrabold leading-[1.05] text-fg-1 md:text-[56px]">
            {title}
          </h1>
          <p className="mt-4 max-w-[780px] text-[17px] leading-[1.6] text-fg-4 md:text-[19px]">{description}</p>
          <p className="mt-4 text-[14px] text-fg-4">Last reviewed {formatDate(date)}</p>
        </div>
      </section>

      <div className="overflow-x-clip">
        <article className={`${WRAP} flex flex-col gap-7 pb-12 pt-2 [&>*]:max-w-[780px] [&>h2]:max-w-none`}>{children}</article>
      </div>

      <PageCta />
    </>
  );
}

function ShortAnswer({ children }: { children: React.ReactNode }) {
  return (
    <section className="mt-9 grid items-start gap-6 !max-w-none md:grid-cols-2">
      <h2 className="sr-only">The short answer</h2>
      {children}
    </section>
  );
}

function Choice({ title, highlight = false, children }: { title: string; highlight?: boolean; children: React.ReactNode }) {
  return (
    <div className={`rounded-[12px] p-7 ${highlight ? "bg-brand-soft" : "bg-bg-1"}`}>
      <h3 className="font-display text-[22px] font-bold text-fg-1">{title}</h3>
      <p className="mt-3.5 flex gap-2.5 text-[16px] leading-[1.5] text-fg-3">
        <Check aria-hidden="true" className={`mt-[3px] h-[18px] w-[18px] shrink-0 ${highlight ? "text-brand" : "text-fg-3"}`} />
        <span>{children}</span>
      </p>
    </div>
  );
}

function KeepBand({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative left-1/2 -ml-[50vw] mt-5 w-screen !max-w-none bg-bg-1 pb-12 pt-8 [&+h2]:mt-5">
      <div className={`${WRAP} flex flex-col gap-7 [&>*]:max-w-[780px] [&>h2]:mt-0 [&>h2]:max-w-none`}>{children}</div>
    </section>
  );
}

export const compareMdxComponents: MDXComponents = {
  ShortAnswer,
  Choice,
  KeepBand,
  h2: (props) => (
    <h2 className="mt-12 font-display text-[28px] font-extrabold leading-tight text-fg-1 md:mt-[68px] md:text-[32px]" {...props} />
  ),
  h3: (props) => <h3 className="mt-4 font-display text-[22px] font-bold text-fg-1" {...props} />,
  p: (props) => <p className="text-[17px] leading-[1.5] text-fg-4" {...props} />,
  a: (props) => (
    <a className="underline decoration-line-2 underline-offset-2 transition-colors hover:text-brand hover:decoration-brand" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-fg-1" {...props} />,
  // Figma sets inline code in the running text font; code blocks inherit the mono font from <pre>.
  code: (props) => <code className="font-[inherit] text-[length:inherit]" {...props} />,
  pre: (props) => (
    <pre
      className="overflow-x-auto rounded-[10px] bg-navy px-6 py-5 font-mono text-[14px] leading-[22px] text-[#E5E7EB]"
      {...props}
    />
  ),
  ul: (props) => <ul className="flex flex-col gap-2.5" {...props} />,
  ol: (props) => (
    <ol
      className="flex flex-col gap-2.5 [counter-reset:step] [&>li>svg]:hidden [&>li]:[counter-increment:step] [&>li]:before:w-[18px] [&>li]:before:shrink-0 [&>li]:before:font-medium [&>li]:before:text-brand [&>li]:before:content-[counter(step)_'.']"
      {...props}
    />
  ),
  li: ({ children, ...props }) => (
    <li className="flex gap-2.5 text-[16px] leading-[1.5] text-fg-3" {...props}>
      <Check aria-hidden="true" className="mt-[3px] h-[18px] w-[18px] shrink-0 text-fg-3" />
      <span>{children}</span>
    </li>
  ),
  table: (props) => (
    <div className="mt-1 !max-w-none overflow-hidden rounded-[12px] border border-line-1">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-left text-[15px] leading-[1.5]" {...props} />
      </div>
    </div>
  ),
  th: (props) => <th className="bg-bg-1 px-4 py-4 align-top font-semibold text-fg-3 md:px-6 md:first:w-[244px]" {...props} />,
  td: (props) => (
    <td className="border-t border-line-1 px-4 py-4 align-top md:px-6 text-fg-3 first:font-medium first:text-fg-1" {...props} />
  ),
};

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
