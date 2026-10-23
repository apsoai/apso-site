export interface BlogFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  image?: string;
  tags?: string[];
}

export interface CompareFrontmatter {
  title: string;
  description: string;
  competitor: string;
  date: string;
  image?: string;
}

export interface UseCaseFrontmatter {
  title: string;
  description: string;
  /** Short name for the breadcrumb, such as "Multi-tenant SaaS". */
  breadcrumb?: string;
  date: string;
  image?: string;
}

export interface ContentItem<T> {
  slug: string;
  frontmatter: T;
  content: string;
}
