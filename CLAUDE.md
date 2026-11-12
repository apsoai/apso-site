# Apso Marketing Site

## What This Is

The apso.ai marketing site. Standalone Next.js 16 app served by a Cloudflare Worker (OpenNext). Replaces the WordPress site.

## Stack

- Next.js 16, React 19, TypeScript
- Tailwind CSS 4 with `@theme inline` design tokens
- MDX via `next-mdx-remote` for blog, compare, and use-case content
- Fonts: Barlow (headlines), Public Sans (body), Roboto Mono (code)
- Resend for contact form (server action)
- PostHog for analytics
- Zod for form validation

## Commands

```bash
npm run dev        # Dev server (localhost:3000)
npm run build      # Production build
npm run lint       # ESLint
```

## Content

MDX content lives in `src/content/` with three categories: `blog/`, `compare/`, `use-cases/`. Each file needs frontmatter (title, description, date). The content pipeline reads files at build time via `src/lib/content.ts`.

## Key Patterns

- Design tokens in `src/app/globals.css` as `@theme inline` vars
- UI primitives in `src/components/ui/` (Button, Container, Section, Card, Badge, etc.)
- Layout components in `src/components/layout/` (Header, Footer, MobileNav)
- Homepage sections in `src/components/sections/`
- Marketing pages use the `(marketing)/` route group with shared Header/Footer layout
- Blog, compare, and use-cases have their own layouts

## Writing Style

All copy follows the vault writing guide: no em dashes, no fragments, plain direct prose.

## Git

Repo: `apsoai/apso-site`
Deployed to `apso.ai` by GitHub Actions on push to `main` (`.github/workflows/deploy.yml`); every pull request gets a build check. Rerun a deploy with `gh workflow run deploy --ref main`. No local secrets are needed.
