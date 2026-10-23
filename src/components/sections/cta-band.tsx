import { Container } from "@/components/ui/container";
import { Dog } from "@/components/home/dog";
import { APP_URL, DOCS_URL } from "@/lib/constants";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-brand pb-[150px] pt-14 text-white md:pt-[104px]" data-hm="band">
      <Container>
        <div className="grid max-w-[700px] gap-6">
          <h2 className="font-display text-[38px] font-extrabold leading-[1.0] tracking-[-0.02em] text-white md:text-[68px]">
            Give your product a backend that can grow with it
          </h2>
          <p className="max-w-[620px] text-[17px] leading-[1.65] text-[#dbeafe] md:text-[19px]">
            Start in the service builder or connect Apso to Claude or Codex. Apso teaches your agent the backend
            conventions, gives it the project tools, and keeps the generated service consistent as it grows.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-hm="start"
              className="inline-flex items-center rounded-[10px] bg-white px-6 py-[15px] text-[16px] font-semibold text-[#1d4ed8] transition-colors hover:bg-[#eff6ff]"
            >
              Start building
            </a>
            <a
              href={`${DOCS_URL}/develop/tools/ai-assisted-development`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-[10px] border border-white/55 px-6 py-[15px] text-[16px] font-semibold text-white transition-colors hover:border-white"
            >
              Make your agent an expert
            </a>
          </div>
        </div>
      </Container>
      {/* The pack that grows: the motion fills this yard, cloning each new dog from the hidden template. */}
      <div className="yard" data-hm="yard" aria-hidden="true" />
      <div hidden data-hm="dog-tpl">
        <Dog mood="relaxed" />
      </div>
    </section>
  );
}
