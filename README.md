This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Secrets

Secrets live in 1Password (Mavric account, vault `apso-site`), one item per secret, the same way as `agent-runtime`. `deploy/secrets.env` holds only `op://` references and the non-secret values; it is safe to commit.

| Variable | 1Password reference |
| --- | --- |
| `GHL_API_TOKEN` | `op://apso-site/ghl-private-integration/token` (GoHighLevel Private Integration token, Apso sub-account, contacts write) |
| `GHL_LOCATION_ID` | `op://apso-site/ghl-private-integration/location_id` |
| `RESEND_API_KEY` | `op://apso-site/resend/credential` (contact form fallback email) |

- Local dev with real values: `scripts/with-secrets.sh npm run dev`
- Push to Amplify (merges with the branch's existing variables, prints key names only):
  `AMPLIFY_APP_ID=<apso-site app id> scripts/with-secrets.sh scripts/sync-amplify-env.sh main --dry-run`, then again without `--dry-run`, then redeploy the branch.

`scripts/with-secrets.sh` uses a read-only 1Password service account token from the macOS Keychain (service `apso-site-op-sa`) when present, so nothing prompts; otherwise the 1Password app asks once.

## Cloudflare (in progress, #28)

- Local on the Workers runtime: `npm run cf:build`, then `scripts/with-secrets.sh npm run cf:preview` (port 3050).
- Infrastructure (zone, DNS, Worker, secrets, Access) is the Pulumi program in `infra/`. See `infra/README.md`.
