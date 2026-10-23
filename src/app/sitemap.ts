import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getContentSlugs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/pricing",
    "/templates",
    "/company",
    "/who-its-for",
    "/contact",
    "/faq",
    "/privacy-policy",
    "/blog",
    "/compare",
    "/use-cases",
  ];

  const blogSlugs = getContentSlugs("blog");
  const compareSlugs = getContentSlugs("compare");
  const useCaseSlugs = getContentSlugs("use-cases");

  const entries: MetadataRoute.Sitemap = [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...compareSlugs.map((slug) => ({
      url: `${SITE_URL}/compare/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...useCaseSlugs.map((slug) => ({
      url: `${SITE_URL}/use-cases/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return entries;
}
