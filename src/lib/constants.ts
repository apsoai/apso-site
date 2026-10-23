export const SITE_NAME = "Apso";
export const SITE_DESCRIPTION =
  "Apso gives developers, product teams, and AI agents a deterministic path from product model to scalable backend. Consistently generate code, APIs, migrations, and infrastructure you own.";
export const SITE_URL = "https://apso.ai";
export const APP_URL = "https://app.apso.cloud";
export const DOCS_URL = "https://docs.apso.dev";
export const GITHUB_URL = "https://github.com/apsoai";
export const CONTACT_EMAIL = "sales@mavric.tech";

export const NAV_GROUPS = [
  {
    label: "Product",
    description: "Design, generate, and own your backend.",
    items: [
      {
        label: "Backend generator",
        description: "Generate APIs, migrations, auth, and tests from one schema.",
        href: "/#how-it-works",
        icon: "braces",
      },
      {
        label: "Starter backends",
        description: "Start with a detailed model for SaaS, CRM, commerce, and more.",
        href: "/templates",
        icon: "layout-template",
      },
      {
        label: "Agent workflow",
        description: "Give Claude or Codex backend rules and project-aware tools.",
        href: `${DOCS_URL}/develop/tools/ai-assisted-development`,
        external: true,
        icon: "bot",
      },
      {
        label: "Deploy and own",
        description: "Run on Apso Cloud or take the generated service to your cloud.",
        href: "/#deploy",
        icon: "cloud-cog",
      },
    ],
    featured: {
      eyebrow: "Agent-first workflow",
      title: "Turn your coding agent into a backend expert",
      description: "Give your agent Apso's expert rules and project-aware MCP tools. Add task skills through the Claude plugin.",
      action: "See the expert workflow",
      href: `${DOCS_URL}/develop/tools/ai-assisted-development`,
      external: true,
      icon: "sparkles",
    },
  },
  {
    label: "Developers",
    description: "Everything you need to build and integrate.",
    items: [
      {
        label: "Documentation",
        description: "Guides, concepts, integrations, and reference material.",
        href: DOCS_URL,
        external: true,
        icon: "book-open",
      },
      {
        label: "Quickstart",
        description: "Create a schema and run your first generated API.",
        href: `${DOCS_URL}/get-started/quickstart`,
        external: true,
        icon: "rocket",
      },
      {
        label: "CLI reference",
        description: "Use init, generate, migrate, deploy, and MCP commands.",
        href: `${DOCS_URL}/develop/tools/cli`,
        external: true,
        icon: "terminal",
      },
      {
        label: "Frontend guides",
        description: "Connect Next.js, React, React Native, or Flutter.",
        href: `${DOCS_URL}/develop/frontend`,
        external: true,
        icon: "panels-top-left",
      },
      {
        label: "GitHub",
        description: "Inspect the CLI, templates, and SDK source.",
        href: GITHUB_URL,
        external: true,
        icon: "github",
      },
    ],
    featured: {
      eyebrow: "Start here",
      title: "Generate your first API",
      description: "Follow the shortest path from a product model to a running backend.",
      action: "Read the quickstart",
      href: `${DOCS_URL}/get-started/quickstart`,
      external: true,
      icon: "rocket",
    },
  },
  {
    label: "Solutions",
    description: "Backend foundations for real product patterns.",
    items: [
      {
        label: "Multi-tenant SaaS",
        description: "Model workspaces, members, roles, billing, and audit history.",
        href: "/use-cases/saas-backend",
        icon: "building-2",
      },
      {
        label: "Customer platforms",
        description: "Build CRM, support, and client portal backends.",
        href: "/templates#crm",
        icon: "contact-round",
      },
      {
        label: "Commerce and operations",
        description: "Start with orders, inventory, events, or project workflows.",
        href: "/templates#ecommerce",
        icon: "shopping-cart",
      },
      {
        label: "Internal tools",
        description: "Generate stable APIs for workflows your team controls.",
        href: "/use-cases",
        icon: "wrench",
      },
    ],
    featured: {
      eyebrow: "Starter library",
      title: "Begin with a proven backend model",
      description: "Choose a detailed starting point for SaaS, CRM, commerce, operations, and more.",
      action: "Browse starter backends",
      href: "/templates",
      icon: "layers-3",
    },
  },
] as const;

export const NAV_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: DOCS_URL, external: true },
  { label: "Blog", href: "/blog" },
] as const;

export const FOOTER_LINKS = {
  Product: [
    { label: "How it works", href: "/#how-it-works" },
    { label: "Starter backends", href: "/templates" },
    { label: "Pricing", href: "/pricing" },
    { label: "Compare", href: "/compare" },
  ],
  Developers: [
    { label: "Documentation", href: DOCS_URL, external: true },
    { label: "Quickstart", href: `${DOCS_URL}/get-started/quickstart`, external: true },
    { label: "CLI Reference", href: `${DOCS_URL}/develop/tools/cli`, external: true },
    { label: "TypeScript SDK", href: `${DOCS_URL}/develop/tools/sdk`, external: true },
    { label: "GitHub", href: GITHUB_URL, external: true },
  ],
  Solutions: [
    { label: "Multi-tenant SaaS", href: "/use-cases/saas-backend" },
    { label: "Customer CRM", href: "/templates#crm" },
    { label: "E-Commerce", href: "/templates#ecommerce" },
    { label: "All use cases", href: "/use-cases" },
  ],
  Resources: [
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Who it's for", href: "/who-its-for" },
    { label: "About", href: "/company" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
} as const;
