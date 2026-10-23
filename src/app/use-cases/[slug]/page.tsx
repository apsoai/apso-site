import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { UseCaseLayout, tocFromMdx, useCaseMdxComponents } from "@/components/use-cases/use-case-layout";
import type { UseCaseFrontmatter } from "@/types/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getContentSlugs("use-cases").map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getContentBySlug<UseCaseFrontmatter>("use-cases", slug);
  if (!item) return {};
  return {
    title: item.frontmatter.title,
    description: item.frontmatter.description,
  };
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = getContentBySlug<UseCaseFrontmatter>("use-cases", slug);
  if (!item) notFound();

  return (
    <UseCaseLayout
      title={item.frontmatter.title}
      description={item.frontmatter.description}
      breadcrumb={item.frontmatter.breadcrumb ?? item.frontmatter.title}
      toc={tocFromMdx(item.content)}
    >
      <MDXRemote
        source={item.content}
        components={useCaseMdxComponents}
        options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
      />
    </UseCaseLayout>
  );
}
