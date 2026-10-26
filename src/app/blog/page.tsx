import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ReadHeader } from "@/components/content/read-header";
import { ClosingBand } from "@/components/content/closing-band";
import { getAllContent } from "@/lib/content";
import { formatDate } from "@/lib/format-date";
import { APP_URL, DOCS_URL } from "@/lib/constants";
import type { BlogFrontmatter } from "@/types/content";

export const metadata: Metadata = {
  alternates: { canonical: "/blog" },
  title: "Blog",
  description: "Product notes and technical guides about agent-driven backend generation, code ownership, and backend architecture.",
};

export default function BlogIndex() {
  const posts = getAllContent<BlogFrontmatter>("blog");

  return (
    <>
      <ReadHeader title="Notes on building backends with agents">
        Product decisions, architecture guides, and practical comparisons for teams that want AI-assisted development with a backend they can inspect and own.
      </ReadHeader>

      <section className="bg-bg-0 pb-10 pt-7 md:pb-24 md:pt-12">
        <Container>
          {posts.length > 0 ? (
            <ul className="max-w-[760px]">
              {posts.map((post) => (
                <li key={post.slug} className="border-b border-line-1 py-7 first:pt-0 last:border-b-0 md:py-9 md:first:pt-0">
                  <article className="flex flex-col gap-2.5">
                    <p className="text-[14px] font-medium text-fg-4">{formatDate(post.frontmatter.date)}</p>
                    <h2 className="font-display text-[24px] font-bold leading-[1.2] text-fg-1 md:text-[30px]">
                      <Link href={`/blog/${post.slug}`} className="hover:text-brand">{post.frontmatter.title}</Link>
                    </h2>
                    <p className="text-[16px] leading-[1.65] text-fg-3 md:text-[17px]">{post.frontmatter.description}</p>
                    <Link
                      href={`/blog/${post.slug}`}
                      aria-label={`Read article: ${post.frontmatter.title}`}
                      className="inline-flex min-h-11 items-center self-start text-[15px] font-semibold text-brand underline hover:text-brand-hover md:min-h-0"
                    >
                      Read article
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-fg-4">The first article is being prepared.</p>
          )}
        </Container>
      </section>

      <ClosingBand
        title="Turn the architecture into a backend you can inspect"
        primary={{ label: "Start building", href: APP_URL }}
        secondary={{ label: "Read the docs", href: DOCS_URL }}
        secondaryStyle="outline"
      />
    </>
  );
}
