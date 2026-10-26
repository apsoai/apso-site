import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { DOCS_URL } from "@/lib/constants";

// Only frontends with a docs guide. Add a chip when its guide ships.
const STACKS = [
  { label: "Web", items: [["Next.js", "nextjs"], ["React", "react"]] },
  { label: "Mobile", items: [["React Native", "react-native"], ["Flutter", "flutter"]] },
];

export function FullStack() {
  return (
    <section className="bg-[#f6f8fb] py-14 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,500px)_minmax(0,620px)] lg:justify-between">
          <div className="min-w-0">
            <h2 className="font-display text-[52px] font-extrabold leading-[1.04] tracking-[-0.015em] text-fg-1">
              Use the frontend stack you know
            </h2>
            <p className="mt-6 max-w-[480px] text-[17px] leading-[1.65] text-fg-3 md:text-[18px]">
              Use Next.js Server Components and Server Actions as your BFF, or call the generated REST API from a web
              or mobile client. The TypeScript SDK handles queries and mutations without hiding the HTTP boundary.
            </p>
            <div className="mt-6 grid gap-2.5">
              {STACKS.map((row) => (
                <div key={row.label} className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-2">
                  <span className="pt-3 font-mono text-[12px] font-medium text-[#475569]">{row.label}</span>
                  <div className="flex flex-wrap gap-2">
                    {row.items.map(([name, slug]) => (
                      <a
                        key={name}
                        href={`${DOCS_URL}/develop/frontend/${slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full border border-[#d1d5db] bg-bg-0 px-4 py-3 text-[14px] font-medium leading-[21px] text-fg-1 transition-colors hover:border-brand hover:text-brand"
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/templates"
              className="mt-6 inline-flex items-center gap-1.5 py-2.5 text-[16px] font-semibold text-brand hover:text-brand-hover"
            >
              Choose a backend model <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="panel min-w-0 !rounded-2xl" data-hm="sdk">
            <div className="bar">
              <span>app/projects/page.tsx</span>
              <span className="ml-auto text-[11px] tracking-[0.06em] text-[#60a5fa]">SERVER</span>
            </div>
            <pre className="p-6">
              <span className="c">{"// app/projects/page.tsx"}</span>
              {"\n"}
              <span className="k">import</span> {"{ ApsoClientFactory } "}
              <span className="k">from</span> <span className="s">{"'@apso/sdk'"}</span>;{"\n\n"}
              <span className="k">const</span> {"apso = ApsoClientFactory."}
              <span className="f">getClient</span>
              {"({\n  baseURL: process.env.APSO_API_URL,\n  apiKey: process.env.APSO_API_KEY,\n});\n\n"}
              <span className="k">export default async function</span> <span className="f">Projects</span>
              {"() {\n  "}
              <span className="k">const</span> {"projects = "}
              <span className="k">await</span> {"apso."}
              <span className="f">entity</span>(<span className="s">{"'Projects'"}</span>)
              <span className="chain">
                {"    ."}
                <span className="f">where</span>
                {"({ status: { $eq: "}
                <span className="s">{"'Active'"}</span>
                {" } })"}
              </span>
              <span className="chain">
                {"    ."}
                <span className="f">orderBy</span>
                {"({ created_at: "}
                <span className="s">{"'DESC'"}</span>
                {" })"}
              </span>
              <span className="chain">
                {"    ."}
                <span className="f">limit</span>
                {"(20)"}
              </span>
              <span className="chain">
                {"    ."}
                <span className="f">get</span>
                {"();"}
              </span>
              {"\n  "}
              <span className="k">return</span> {"<"}
              <span className="f">ProjectList</span>
              {" projects={projects} />;\n}"}
            </pre>
            <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr] items-center gap-2 border-t border-[#1e293b] px-4 py-4 sm:gap-3 sm:px-6" aria-hidden="true">
              <div>
                <b className="block text-[14px] font-semibold text-white">Next.js</b>
                <small className="text-[12px] text-[#9ca3af]">UI + BFF</small>
              </div>
              <span className="arrow a1" />
              <div>
                <b className="block text-[14px] font-semibold text-white">Apso SDK</b>
                <small className="text-[12px] text-[#9ca3af]">Typed queries</small>
              </div>
              <span className="arrow a2" />
              <div className="text-right">
                <b className="block text-[14px] font-semibold text-white">Generated API</b>
                <small className="text-[12px] text-[#9ca3af]">Owned service</small>
                <br />
                <span className="ok">200 OK</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
