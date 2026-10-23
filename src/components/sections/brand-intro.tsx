import { Container } from "@/components/ui/container";

const AUDIENCES = [
  ["Backend developers stay in control", "Inspect predictable NestJS, FastAPI, or Gin code and add product logic without losing it when the schema changes."],
  ["Product teams can define the system", "Turn entities, relationships, and rules into a working API without hand-assembling every backend layer."],
  ["Lean teams can operate without a dedicated DevOps team", "Run locally, deploy through Apso Cloud, or take the generated service to infrastructure your team controls."],
];

export function BrandIntro() {
  return (
    <section className="bg-bg-0 py-14 md:py-28">
      <Container>
        <h2 className="max-w-[1000px] font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.02em] text-fg-1 md:text-[60px]">
          A backend foundation that keeps people and agents aligned
        </h2>
        <p className="mt-8 max-w-[760px] text-[17px] leading-[1.65] text-fg-3 md:mt-10 md:text-[19px]">
          Backend developers get code they can review and extend. Product teams get a clear model of the system. AI
          agents get Apso&apos;s rules for schemas, access boundaries, extensions, and migrations, plus a repeatable
          process that produces the same structure across every service.
        </p>
        <div className="mt-12 grid gap-8 md:mt-[50px] lg:grid-cols-3 lg:gap-12">
          {AUDIENCES.map(([title, body]) => (
            <div key={title} className="border-t border-[#e5e7eb] pt-[30px]">
              <h3 className="font-display text-[26px] font-bold leading-[1.15] text-fg-1 md:text-[28px]">{title}</h3>
              <p className="mt-3.5 text-[16px] leading-[1.6] text-fg-3">{body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
