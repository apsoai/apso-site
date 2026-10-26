export function formatDate(date: string) {
  // Frontmatter dates are calendar dates; format in UTC so "2026-06-01" never renders as May 31.
  return new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
