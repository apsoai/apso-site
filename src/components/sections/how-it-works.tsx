import { Check } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Dog } from "@/components/home/dog";

const RULES = ["schema", "tenancy", "auth", "migrations", "extensions", "deploy"];
const ENTITIES = ["Workspace", "Project", "Task"];
const TICKS = ["propose model", "generate service", "verify result"];

const STEPS = [
  {
    mood: "curious" as const,
    title: "Give your agent backend expertise",
    body: "Apso gives Claude or Codex repeatable rules for schema design, tenancy, auth, migrations, extensions, and deployment. The agent can apply the right backend pattern without waiting for you to name it.",
    scene: (
      <div className="scene sc-rules" aria-hidden="true">
        {RULES.map((r, i) => (
          <span key={r} className="rule" style={{ "--i": i } as React.CSSProperties}>{r}</span>
        ))}
      </div>
    ),
  },
  {
    mood: "active" as const,
    title: "Connect it to the real project",
    body: "The Apso MCP server gives the agent access to the current schema and generation tools. It can inspect, design, validate, and build from what your project actually contains.",
    scene: (
      <div className="scene sc-mcp" aria-hidden="true">
        <span className="cable"><b>MCP</b></span>
        <div className="mini">
          <div className="mini-h"><span className="dot" />project schema</div>
          {ENTITIES.map((e, i) => (
            <span key={e} className="ent" style={{ "--i": i } as React.CSSProperties}>{e}</span>
          ))}
        </div>
      </div>
    ),
  },
  {
    mood: "happy" as const,
    title: "Ask for the product outcome",
    body: "Describe the workflow in plain language. Your agent chooses the Apso process, proposes the model, generates the service, and verifies the result before you review the code.",
    scene: (
      <div className="scene sc-ask" aria-hidden="true">
        <div className="ask"><span className="ask-t" data-full="Add team invitations.">Add team invitations.</span></div>
        <ul className="ticks">
          {TICKS.map((t) => (
            <li key={t}><Check size={12} strokeWidth={2.4} />{t}</li>
          ))}
        </ul>
      </div>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-[#0b1220] py-14 text-white md:py-[120px]">
      <Container>
        <h2 className="max-w-[960px] font-display text-[34px] font-extrabold leading-[1.02] tracking-[-0.02em] text-white md:text-[60px]">
          Turn your coding agent into a backend expert with Apso
        </h2>
        <p className="mt-8 max-w-[760px] text-[17px] leading-[1.65] text-[#9ca3af] md:text-[19px]">
          Apso gives Claude, Codex, and other coding agents repeatable backend rules, specialized workflows, and
          project-aware tools. You describe the outcome. The agent designs, generates, and verifies the foundation.
        </p>
        <div className="mt-8 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-2xl bg-[#13203a] px-5 py-3.5 text-[14px]">
          <b className="font-semibold text-[#93c5fd]">Backend expertise in context</b>
          <span className="text-[#cbd5e1]">
            Schema design, access boundaries, extensions, migrations, generation, and verification become part of the
            agent&apos;s working context.
          </span>
        </div>

        <div className="mt-12 grid gap-12 md:mt-20 lg:grid-cols-3 lg:gap-10" data-hm="steps">
          {STEPS.map((s, i) => (
            <div key={s.title} className="step awake min-w-0" data-wake={s.mood}>
              <div className="step-top">
                <Dog mood={s.mood} />
                {s.scene}
                <span className="rail"><i /></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="step-num grid h-[33px] w-8 shrink-0 place-items-center rounded-2xl bg-brand text-[14px] font-semibold text-white">
                  {i + 1}
                </span>
                <h3 className="pt-0.5 font-display text-[24px] font-bold leading-[1.17] text-white">{s.title}</h3>
              </div>
              <p className="mt-[18px] text-[16px] leading-[1.63] text-[#9ca3af]">{s.body}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
