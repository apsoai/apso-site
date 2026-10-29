import { Container } from "@/components/ui/container";

const SPECS = [
  ["Repeatable project structure", "The schema and CLI version determine the generated entities, controllers, services, and DTOs."],
  ["Familiar framework stacks", "Generate NestJS with TypeORM, FastAPI with SQLAlchemy, or Gin with GORM."],
  ["PostgreSQL migrations", "Preview schema changes locally and commit language-native migration files with the service."],
  ["Auth and tenant context", "Use Better Auth, Auth0, Clerk, Cognito, any JWKS provider, or API keys, and carry tenant scope through generated request handling."],
  ["REST API and TypeScript SDK", "Connect through standard HTTP or use the SDK for fluent filters, sorting, pagination, and mutations."],
  ["No lock-in. You own the code.", "The generated service lives in your repository. Run, test, extend, and deploy it anywhere. Apso is not required in production."],
];

export function FeatureGrid() {
  return (
    <section id="generator" className="scroll-mt-20 bg-bg-0 py-14 md:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,700px)] lg:justify-between lg:gap-24">
          <div>
            <h2 className="font-display text-[30px] font-extrabold leading-[1.05] tracking-[-0.015em] text-fg-1 md:text-[44px]">
              The backend work every application needs
            </h2>
            <p className="mt-5 max-w-[400px] text-[17px] leading-[1.65] text-fg-3 md:text-[18px]">
              Apso creates the repeated service layers from one schema. The result is a coherent backend in your
              repository with no required Apso runtime.
            </p>
          </div>
          <dl className="border-t border-[#e5e7eb]">
            {SPECS.map(([title, body]) => (
              <div key={title} className="grid gap-2 border-b border-[#e5e7eb] py-6 sm:grid-cols-[260px_minmax(0,1fr)] sm:gap-8">
                <dt className="font-display text-[22px] font-bold leading-[1.2] text-fg-1">{title}</dt>
                <dd className="text-[16px] leading-[1.6] text-fg-3">{body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </section>
  );
}
