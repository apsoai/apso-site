import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Dog } from "@/components/home/dog";
import { APP_URL, DOCS_URL } from "@/lib/constants";

const CHECKS = ["Workspace-scoped data", "Member roles", "Project and task CRUD", "REST endpoints"];
const P = ({ children }: { children: string }) => <span className="p">{children}</span>;
const K = ({ children }: { children: string }) => <span className="k">{children}</span>;
const S = ({ children }: { children: string }) => <span className="s">{children}</span>;

export function Hero() {
  return (
    <section className="overflow-x-clip bg-bg-0 py-14 md:pb-[120px] md:pt-24">
      <Container>
        <p className="mb-6 text-[16px] font-semibold text-brand md:mb-7">The backend foundation for AI-built software</p>
        <h1 className="font-display text-[52px] font-extrabold leading-[0.92] tracking-[-0.03em] text-fg-1 sm:text-[80px] lg:text-[112px]">
          Get the foundation right.
        </h1>
        <div className="mt-7 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[600px] text-[18px] leading-[1.65] text-fg-3 md:text-[21px]">
            Apso turns your product model into a consistent, scalable backend. You own the generated code, APIs,
            migrations, and infrastructure.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button href={APP_URL} external size="lg">
              Start building
            </Button>
            <Button href={DOCS_URL} external variant="outline" size="lg">
              Quickstart
            </Button>
          </div>
        </div>

        <noscript>
          <style>{`.hm .stage.armed .reveal, .hm .stage.armed .v2 { opacity: 1; transform: none; } .hm .stage.armed .code { opacity: 1; } .hm .t-more { display: inline; } .hm .t-end { display: none; } .hm .armed .col .num { background: #2563eb; color: #fff; }`}</style>
        </noscript>
        <div className="stage armed" data-hm="stage">
          <div className="track" aria-hidden="true">
            <i />
          </div>
          <div className="rider" data-hm="rider" aria-hidden="true">
            <Dog mood="curious" className="dozing" id="hm-hero-dog" />
            <div className="walker" data-hm="walker" data-dir="1">
              <div className="lot" />
            </div>
            <div className="thought" data-hm="thought">
              <svg viewBox="0 0 64 40" fill="none">
                <path pathLength={1} d="M23 11C31 11 31 9 39 9" />
                <path pathLength={1} d="M23 11C31 11 31 29 39 29" />
                <rect x="3" y="6" width="20" height="11" rx="3" />
                <rect x="39" y="4" width="22" height="11" rx="3" />
                <rect x="39" y="24" width="22" height="11" rx="3" />
              </svg>
            </div>
          </div>

          <div
            className="panel"
            role="img"
            aria-label="Apso turns a plain-language intent into an .apsorc schema, then generates REST endpoints. A second request adds team invitations in the same pattern."
          >
            <div className="bar">
              <span className="dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              project-api / generated
              <span className="status">
                <span className="pulse" />
                <span data-hm="status">deployed</span>
              </span>
            </div>
            <div className="flow">
              <div className="col on" data-hm="col">
                <div className="col-head">
                  <span className="num">01</span>Intent
                </div>
                <p className="intent" data-hm="intent">
                  <span data-hm="itext">Add team invitations.</span>
                  <span className="caret" />
                </p>
                <ul className="checks">
                  {CHECKS.map((c) => (
                    <li key={c} className="reveal">
                      <Check size={16} strokeWidth={2.2} />
                      {c}
                    </li>
                  ))}
                  <li className="v2">
                    <Check size={16} strokeWidth={2.2} />
                    Team invitations
                  </li>
                </ul>
              </div>
              <div className="col on" data-hm="col">
                <div className="col-head">
                  <span className="num">02</span>.apsorc <span className="sub">source of truth</span>
                </div>
                <pre data-hm="schema">
                  <span className="ln reveal"><P>{"{"}</P> <K>{'"entities"'}</K><P>{": ["}</P></span>
                  <span className="ln reveal">  <P>{"{"}</P> <K>{'"name"'}</K><P>:</P> <S>{'"Workspace"'}</S> <P>{"},"}</P></span>
                  <span className="ln reveal">  <P>{"{"}</P> <K>{'"name"'}</K><P>:</P> <S>{'"Project"'}</S><P>,</P></span>
                  <span className="ln reveal hl" data-hm="scope">    <K>{'"scopeBy"'}</K><P>:</P> <S>{'"workspaceId"'}</S> <P>{"},"}</P></span>
                  <span className="ln reveal">  <P>{"{"}</P> <K>{'"name"'}</K><P>:</P> <S>{'"Task"'}</S> <P>{"}"}</P><span className="p t-end">{" ] }"}</span><span className="p t-more">,</span></span>
                  <span className="ln v2" data-hm="inv1">  <P>{"{"}</P> <K>{'"name"'}</K><P>:</P> <S>{'"Invitation"'}</S><P>,</P></span>
                  <span className="ln v2 hl" data-hm="inv2">    <K>{'"scopeBy"'}</K><P>:</P> <S>{'"workspaceId"'}</S> <P>{"} ] }"}</P></span>
                </pre>
              </div>
              <div className="col on" data-hm="col">
                <div className="col-head">
                  <span className="num">03</span>Output <span className="sub">generated</span>
                </div>
                <div className="eps">
                  <div className="ep reveal"><span className="verb post">POST</span>/Projects<span className="code">201</span></div>
                  <div className="ep reveal"><span className="verb get">GET</span>/Projects/:id<span className="code">200</span></div>
                  <div className="ep reveal"><span className="verb patch">PATCH</span>/Tasks/:id<span className="code">200</span></div>
                  <div className="ep v2" data-hm="inv-ep"><span className="verb post">POST</span>/Invitations<span className="code">201</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
