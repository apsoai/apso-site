import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { CompareLayout, compareMdxComponents } from "@/components/content/compare-layout";
import type { CompareFrontmatter } from "@/types/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getContentSlugs("compare").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug<CompareFrontmatter>("compare", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentBySlug<CompareFrontmatter>("compare", slug);
  if (!item) notFound();

  return (
    <CompareLayout
      title={item.frontmatter.title}
      description={item.frontmatter.description}
      competitor={item.frontmatter.competitor}
      date={item.frontmatter.date}
    >
      <MDXRemote
        source={item.content}
        components={compareMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </CompareLayout>
  );
}
