import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Every page is prerendered at build time and nothing revalidates, so prerendered pages are served
// from Workers static assets. ponytail: switch to the R2 cache if a page ever uses ISR or revalidate.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
});
