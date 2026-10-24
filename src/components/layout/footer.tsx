import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { FOOTER_LINKS, GITHUB_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-line-1 bg-bg-0 py-16">
      <Container>
        <div className="grid grid-cols-2 gap-10 md:grid-cols-3 lg:grid-cols-[1.25fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.svg"
                alt="Apso"
                width={128}
                height={48}
                className="h-9 w-auto"
              />
            </Link>
            <p className="mt-3 text-sm text-fg-4 leading-relaxed">
              The backend foundation for AI-built software.
            </p>
            {/* Social */}
            <div className="mt-4 flex gap-4">
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-5 hover:text-fg-2 transition-colors"
                aria-label="GitHub"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://x.com/apsoai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-fg-5 hover:text-fg-2 transition-colors"
                aria-label="X (Twitter)"
              >
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h3 className="mb-4 text-[14px] font-semibold text-fg-1">{category}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-fg-3 hover:text-fg-1 transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-fg-3 hover:text-fg-1 transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-2 border-t border-line-1 pt-6 text-sm text-fg-5 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} Mavric Technology, LLC.</span>
          <span>Consistent backend code with no required Apso runtime.</span>
        </div>
      </Container>
    </footer>
  );
}
