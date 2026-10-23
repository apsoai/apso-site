import { Container } from "@/components/ui/container";

interface BandLink {
  label: string;
  href: string;
}

interface ClosingBandProps {
  title: string;
  description?: string;
  primary: BandLink;
  secondary: BandLink;
  /** "light": trust pages (white button, 40px title). "outline": read pages (bordered button, 36px title). */
  secondaryStyle?: "light" | "outline";
}

// Local variant of PageCta: the redesign adds the dogs illustration and drops the arrow icons.
export function ClosingBand({ title, description, primary, secondary, secondaryStyle = "light" }: ClosingBandProps) {
  return (
    <section className="bg-navy py-10 text-white md:py-16">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="max-w-[790px]">
            <h2 className={`text-balance font-display text-[28px] font-extrabold leading-[1.1] md:text-[36px] ${secondaryStyle === "light" ? "lg:text-[40px]" : ""}`}>{title}</h2>
            {description && (
              <p className={`mt-3 text-[16px] leading-[1.6] text-[#D1D5DB] md:text-[17px] ${secondaryStyle === "outline" ? "max-w-[560px]" : ""}`}>{description}</p>
            )}
            <div className="mt-4 flex flex-wrap gap-3">
              <BandButton link={primary} className="bg-brand text-white hover:bg-brand-hover" />
              <BandButton
                link={secondary}
                className={
                  secondaryStyle === "light"
                    ? "border border-line-1 bg-white text-fg-1 hover:bg-bg-2"
                    : "border border-fg-4 text-white hover:border-white"
                }
              />
            </div>
          </div>
          <div aria-hidden="true" className="relative h-[105px] w-[266px] shrink-0 overflow-hidden md:h-[150px] md:w-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/closing-dogs.svg" alt="" className="absolute left-[79px] top-[16px] w-[104px] max-w-none md:left-[113px] md:top-[23px] md:w-[148px]" />
          </div>
        </div>
      </Container>
    </section>
  );
}

function BandButton({ link, className }: { link: BandLink; className: string }) {
  const external = link.href.startsWith("http");
  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`inline-flex min-h-12 items-center rounded-[8px] px-5 text-[15px] font-semibold transition-colors ${className}`}
    >
      {link.label}
    </a>
  );
}
