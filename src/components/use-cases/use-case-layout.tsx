import Link from "next/link";
import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { APP_URL, DOCS_URL } from "@/lib/constants";
import { OnThisPage, type TocItem } from "./on-this-page";

export function headingId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

/** The `## ` headings of an MDX source, for the "On this page" list. */
export function tocFromMdx(source: string): TocItem[] {
  return [...source.matchAll(/^## (.+)$/gm)].map(([, label]) => ({ id: headingId(label.trim()), label: label.trim() }));
}

export const useCaseMdxComponents: MDXComponents = {
  h2: ({ children }) => (
    <h2
      id={typeof children === "string" ? headingId(children) : undefined}
      className="mb-4 mt-11 scroll-mt-24 font-display text-[24px] font-bold leading-[1.2] text-fg-1 first:mt-0 md:text-[30px]"
    >
      {children}
    </h2>
  ),
  p: (props) => <p className="mb-4 text-[16px] leading-[1.75] text-fg-3 md:text-[17px]" {...props} />,
  a: (props) => <a className="text-brand underline underline-offset-2 hover:text-brand-hover" {...props} />,
  ul: (props) => <ul className="mb-4 list-disc space-y-1.5 pl-6 text-[16px] leading-[1.75] text-fg-3 md:text-[17px]" {...props} />,
  ol: (props) => (
    <ol
      className="mb-4 flex flex-col gap-3 text-[16px] leading-[1.65] text-fg-3 [counter-reset:step] md:text-[17px] [&>li]:relative [&>li]:pl-[42px] [&>li]:[counter-increment:step] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:w-7 [&>li]:before:rounded-[14px] [&>li]:before:bg-brand-soft [&>li]:before:py-[3px] [&>li]:before:text-center [&>li]:before:text-[14px] [&>li]:before:font-semibold [&>li]:before:leading-[21px] [&>li]:before:text-brand [&>li]:before:content-[counter(step)]"
      {...props}
    />
  ),
  code: (props) => <code className="font-mono text-[0.9em] text-fg-1" {...props} />,
  pre: (props) => (
    <pre
      className="whitespace-pre-wrap break-words font-mono text-[13px] leading-[1.7] text-[#d6e4ff] [&_code]:text-[13px] [&_code]:text-inherit"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-fg-1" {...props} />,
  /** Dark code panel with a file label: <Code title=".apsorc"> + fenced block. */
  Code: ({ title, children }: { title: string; children: ReactNode }) => (
    <figure className="mb-4 rounded-[10px] bg-[#14171d] px-5 pb-[18px] pt-4">
      <figcaption className="mb-2.5 font-mono text-[12px] font-medium text-[#8a919c]">{title}</figcaption>
      {children}
    </figure>
  ),
  /** A directory and what it holds: <Dir path="src/autogen/">...</Dir>. */
  Dir: ({ path, children }: { path: string; children: ReactNode }) => (
    <div className="mb-3.5 border-l border-[#d1d5db] pl-3.5">
      <p className="font-mono text-[14px] font-medium text-fg-1">{path}</p>
      <div className="mt-1 text-[16px] leading-[1.65] text-fg-3 [&_p]:m-0 [&_p]:text-[16px] [&_p]:leading-[1.65]">{children}</div>
    </div>
  ),
};

interface UseCaseLayoutProps {
  title: string;
  description: string;
  breadcrumb: string;
  toc: TocItem[];
  children: ReactNode;
}

export function UseCaseLayout({ title, description, breadcrumb, toc, children }: UseCaseLayoutProps) {
  const wrap = "mx-auto w-full max-w-[1264px] px-4 md:px-8";

  return (
    <>
      <header className="border-b border-line-1">
        <div className={`${wrap} pb-8 pt-8 md:pb-10 md:pt-16`}>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[14px] font-medium text-fg-4">
              <li>
                <Link href="/use-cases" className="hover:text-fg-1">
                  Use cases
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{breadcrumb}</li>
            </ol>
          </nav>
          <h1 className="mt-3 max-w-[900px] text-balance font-display text-[32px] font-extrabold leading-[1.1] text-fg-1 md:mt-3.5 md:text-[48px]">
            {title}
          </h1>
          <p className="mt-3 max-w-[720px] text-[16px] leading-[1.6] text-fg-3 md:mt-3.5 md:text-[18px]">{description}</p>
        </div>
      </header>

      <div className={`${wrap} flex flex-col gap-7 pb-16 pt-4 lg:flex-row lg:items-start lg:gap-20 lg:pb-24 lg:pt-12`}>
        <OnThisPage items={toc} />
        <div className="min-w-0 max-w-[680px] flex-1">
          <article>{children}</article>

          <aside className="mt-11 rounded-[12px] bg-brand-soft p-6">
            <h2 className="font-display text-[24px] font-bold text-fg-1">Give your agent Apso&apos;s backend expertise</h2>
            <p className="mt-3.5 text-[15px] leading-[1.6] text-fg-3">
              Connect Apso to Claude or Codex, give the agent Apso&apos;s rules and workflows, and review a consistent
              backend your team can extend and deploy anywhere.
            </p>
            <div className="mt-3.5 flex flex-wrap gap-x-3 gap-y-2.5">
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
                className="inline-flex min-h-[47px] items-center rounded-[8px] border border-[#d1d5db] bg-bg-0 px-5 text-[15px] font-semibold text-fg-1 transition-colors hover:border-fg-5"
              >
                Read the docs
              </a>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
