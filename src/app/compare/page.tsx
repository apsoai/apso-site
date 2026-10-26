import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllContent } from "@/lib/content";
import type { CompareFrontmatter } from "@/types/content";

export const metadata: Metadata = {
  alternates: { canonical: "/compare" },
  title: "Compare Apso to Backend Platforms",
  description: "Compare Apso with managed backend platforms, visual builders, and generated API products by ownership, runtime, and workflow.",
};

export default function CompareIndex() {
  const comparisons = getAllContent<CompareFrontmatter>("compare").sort(
    (a, b) => (a.frontmatter.order ?? Infinity) - (b.frontmatter.order ?? Infinity)
  );

  return (
    <div className="mx-auto w-full max-w-[1248px] px-6">
      <section className="pb-6 pt-12 md:pt-20">
        <h1 className="text-balance font-display text-[40px] font-extrabold leading-[1.05] text-fg-1 md:text-[52px]">
          Choose the backend model, not only the feature list
        </h1>
        <p className="mt-7 max-w-[720px] text-[17px] leading-[1.6] text-fg-4 md:text-[19px]">
          Backend products can look similar in a checklist while leaving your team with very different code, operating
          boundaries, and exit paths. These guides make that tradeoff explicit.
        </p>
      </section>

      <ul className="flex flex-col gap-7 pb-16 pt-4">
        {comparisons.map((item) => {
          const isAgent = item.slug === "agent-written-backend";
          return (
            <li key={item.slug}>
              <Link
                href={`/compare/${item.slug}`}
                className="group flex items-center gap-4 border-t border-line-1 py-6 sm:gap-5"
              >
                <span
                  aria-hidden="true"
                  className={`flex h-11 w-11 shrink-0 items-center justify-center self-start rounded-[10px] border border-line-1 font-display text-[18px] font-bold sm:self-center ${
                    isAgent ? "bg-navy text-white" : "bg-bg-1 text-fg-3"
                  }`}
                >
                  {isAgent ? "AI" : item.frontmatter.competitor.charAt(0)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-[22px] font-bold leading-tight text-fg-1 transition-colors group-hover:text-brand">
                    {item.frontmatter.title}
                  </span>
                  <span className="mt-1 block text-[15px] leading-[1.55] text-fg-4">{item.frontmatter.description}</span>
                </span>
                <ArrowRight
                  aria-hidden="true"
                  className="hidden h-5 w-5 shrink-0 text-fg-1 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none sm:block"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
