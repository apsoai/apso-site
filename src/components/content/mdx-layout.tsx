import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { ClosingBand } from "@/components/content/closing-band";
import { APP_URL, DOCS_URL } from "@/lib/constants";
import { formatDate } from "@/lib/format-date";
import { Breadcrumbs } from "./breadcrumbs";

interface MdxLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  date?: string;
  author?: string;
  readingMinutes?: number;
  breadcrumbs: { label: string; href?: string }[];
  next?: { title: string; href: string };
}

// Article typography from the redesign: 18px body, 28px section headings, 20px rhythm between blocks.
const articleClass = [
  "min-w-0 text-[17px] leading-[1.7] text-fg-3 md:text-[18px]",
  "[&_p]:mb-5 [&_p]:text-[length:inherit] [&_p]:leading-[1.7] [&_p]:text-fg-3",
  "[&_h2]:mb-5 [&_h2]:mt-5 [&_h2]:font-display [&_h2]:text-[24px] [&_h2]:font-bold [&_h2]:leading-[1.2] [&_h2]:text-fg-1 md:[&_h2]:text-[28px]",
  "[&_h3]:mb-4 [&_h3]:mt-8 [&_h3]:font-display [&_h3]:text-[22px] [&_h3]:font-bold [&_h3]:text-fg-1",
  "[&_pre]:mb-5 [&_pre]:rounded-[10px] [&_pre]:bg-[#14171D] [&_pre]:p-5 [&_pre]:text-[13px] [&_pre]:leading-[1.7] [&_pre]:text-[#D6DAE1]",
  "[&_a]:text-brand [&_a]:underline hover:[&_a]:text-brand-hover",
  "[&_strong]:font-semibold [&_strong]:text-fg-1",
].join(" ");

export function MdxLayout({ children, title, description, date, author, readingMinutes, breadcrumbs, next }: MdxLayoutProps) {
  const byline = [date ? formatDate(date) : null, readingMinutes ? `${readingMinutes} min read` : null].filter(Boolean).join(" · ");

  return (
    <>
      <section className="bg-bg-0 pb-10 pt-10 md:pb-8 md:pt-[72px]">
        <Container>
          <div className="mx-auto max-w-[640px]">
            <Breadcrumbs items={breadcrumbs} />
            <h1 className="mt-5 text-balance font-display text-[34px] font-extrabold leading-[1.08] text-fg-1 md:text-[48px]">{title}</h1>
            {!author && description && <p className="mt-5 text-[18px] leading-[1.6] text-fg-4">{description}</p>}
            {author ? (
              <div className="mt-5 flex items-center gap-3">
                <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-soft font-display text-[16px] font-bold text-brand">
                  {author.charAt(0)}
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-fg-1">{author}</p>
                  {byline && <p className="mt-0.5 text-[14px] text-fg-4">{byline}</p>}
                </div>
              </div>
            ) : (
              byline && <p className="mt-5 text-[14px] text-fg-4">{byline}</p>
            )}
            <hr className="mb-5 mt-5 border-line-1" />

            <article className={articleClass}>{children}</article>

            {next && (
              <Link href={next.href} className="group mt-6 flex flex-col items-end gap-1.5 rounded-[12px] border border-line-1 p-5 text-right hover:border-brand">
                <span className="flex items-center gap-1.5 text-[13px] font-medium text-fg-4">
                  Next <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                </span>
                <span className="text-[16px] font-semibold leading-[1.4] text-fg-1 group-hover:text-brand">{next.title}</span>
              </Link>
            )}
          </div>
        </Container>
      </section>

      <ClosingBand
        title="Give your agent Apso's backend expertise"
        description="Connect Apso to Claude or Codex, give the agent Apso's rules and workflows, and review a consistent backend your team can extend and deploy anywhere."
        primary={{ label: "Start building", href: APP_URL }}
        secondary={{ label: "Read the docs", href: DOCS_URL }}
      />
    </>
  );
}
