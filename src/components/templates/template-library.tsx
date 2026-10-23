"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Copy, Search, X } from "lucide-react";
import { APP_URL } from "@/lib/constants";
import {
  FEATURED_STARTER_IDS,
  STARTER_BACKENDS,
  STARTER_CATEGORIES,
  type StarterBackend,
  type StarterCategory,
} from "@/lib/starter-backends";

type Filter = "all" | StarterCategory;

const filters: Filter[] = ["all", "essential", "popular", "industry"];
const filterLabels: Record<Filter, string> = {
  all: "All starters",
  ...STARTER_CATEGORIES,
};

// Short noun for each "Build ___ backend" button.
const buildLabels: Record<string, string> = {
  "user-auth-teams": "auth",
  "subscription-billing": "billing",
  crm: "CRM",
  "multi-tenant-workspaces": "Workspaces",
  notifications: "notifications",
  "webhooks-integrations": "webhooks",
  "audit-logs": "audit",
  "file-management": "files",
  "feature-flags": "flags",
  "waitlist-launch": "waitlist",
  "support-ticketing": "support",
  "project-management": "projects",
  "issue-tracking": "issues",
  "knowledge-base": "knowledge base",
  ecommerce: "store",
  lms: "learning",
  "survey-feedback": "survey",
  "job-board": "hiring",
  "event-management": "events",
  "blog-cms": "blog",
  inventory: "inventory",
  "property-management": "property",
  "point-of-sale": "point of sale",
  "patient-records": "records",
  "hotel-booking": "booking",
  "fitness-membership": "gym",
  "fleet-management": "fleet",
};

// Drawer copy approved in Figma. Other starters fall back to a prompt built from their description.
const drawerDetails: Record<string, { prompt: string; review: string[] }> = {
  crm: {
    prompt:
      "Build a CRM with Contacts, Companies, Deals, Activities, Notes, Tasks, Emails, a Pipeline with stages, Tags, and Reports. Deals belong to a company and move through pipeline stages.",
    review: [
      "About 10 entities, each with its fields and types",
      "Relationships, such as Deal belongs to Company",
      "Then REST endpoints for each entity, generated from the approved schema",
    ],
  },
};

function getDrawerDetails(starter: StarterBackend) {
  return (
    drawerDetails[starter.id] ?? {
      prompt: `Build a ${starter.title} backend with ${starter.description.charAt(0).toLowerCase()}${starter.description.slice(1)}`,
      review: [
        "The entities, each with its fields and types",
        "The relationships between them",
        "Then REST endpoints for each entity, generated from the approved schema",
      ],
    }
  );
}

const PAGE_SIZE = 6;
const featured = FEATURED_STARTER_IDS.map((id) => STARTER_BACKENDS.find((s) => s.id === id)!);
const rest = STARTER_BACKENDS.filter((s) => !(FEATURED_STARTER_IDS as readonly string[]).includes(s.id));

export function TemplateLibrary() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [open, setOpen] = useState<StarterBackend | null>(null);

  const browsing = filter === "all" && !query.trim();

  const filtered = useMemo(() => {
    const normalized = normalizeSearch(query);
    return STARTER_BACKENDS.filter((starter) => {
      if (filter !== "all" && starter.category !== filter) return false;
      if (!normalized) return true;
      return normalizeSearch([starter.title, starter.description, ...starter.entities].join(" ")).includes(normalized);
    });
  }, [filter, query]);

  // /templates#crm opens that starter's schema drawer.
  useEffect(() => {
    const openFromHash = () => {
      const starter = STARTER_BACKENDS.find((s) => s.id === window.location.hash.slice(1));
      if (starter) setOpen(starter);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const shown = browsing ? featured.length + Math.min(visible, rest.length) : filtered.length;

  return (
    <>
      <div className="flex flex-col gap-3 pb-6 lg:flex-row lg:items-center">
        <div className="flex flex-1 flex-wrap gap-2" role="group" aria-label="Starter categories">
          {filters.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`min-h-10 rounded-full border px-3.5 text-[14px] font-medium transition-colors ${
                filter === value
                  ? "border-fg-1 bg-fg-1 text-white"
                  : "border-line-1 bg-bg-0 text-fg-1 hover:border-fg-5"
              }`}
            >
              {filterLabels[value]}
            </button>
          ))}
        </div>
        <label className="relative block w-full lg:w-[320px]">
          <span className="sr-only">Search starters</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-4" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search starters"
            className="h-[43px] w-full rounded-[8px] border border-line-1 bg-bg-0 pl-[41px] pr-3.5 text-[14px] text-fg-1 outline-none transition-colors placeholder:text-fg-4 focus:border-brand focus:ring-2 focus:ring-brand/10"
          />
        </label>
      </div>

      {browsing ? (
        <>
          <h2 className="mt-2 font-display text-[18px] font-bold text-fg-1">
            Begin with the data model your product already needs
          </h2>
          <div className="mt-6 grid items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((starter) => (
              <StarterCard key={starter.id} starter={starter} featured onView={setOpen} />
            ))}
          </div>
          <h2 className="mt-6 font-display text-[18px] font-bold text-fg-1">All starters</h2>
          <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {rest.slice(0, visible).map((starter) => (
              <StarterCard key={starter.id} starter={starter} onView={setOpen} />
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="mt-2 font-display text-[18px] font-bold text-fg-1">{filterLabels[filter]}</h2>
          {filtered.length > 0 ? (
            <div className="mt-6 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((starter) => (
                <StarterCard key={starter.id} starter={starter} onView={setOpen} />
              ))}
            </div>
          ) : (
            <div className="mt-6 rounded-[12px] border border-line-1 bg-bg-1 px-6 py-16 text-center">
              <p className="font-display text-[22px] font-bold text-fg-1">No starter matches that search</p>
              <p className="mt-2 text-[14px] text-fg-4">Try a product name such as CRM, billing, events, or inventory.</p>
            </div>
          )}
        </>
      )}

      <p className="mt-6 text-[14px] font-medium text-brand" aria-live="polite">
        Showing {shown} of {STARTER_BACKENDS.length}
        {browsing && visible < rest.length && (
          <>
            {" · "}
            <button
              type="button"
              onClick={() => setVisible((v) => v + 2 * PAGE_SIZE)}
              className="font-medium text-brand hover:text-brand-hover hover:underline"
            >
              Load more
            </button>
          </>
        )}
      </p>

      <SchemaDrawer
        starter={open}
        onClose={() => {
          setOpen(null);
          if (window.location.hash) history.replaceState(null, "", window.location.pathname);
        }}
      />
    </>
  );
}

function normalizeSearch(value: string) {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, " ");
}

function StarterCard({
  starter,
  featured = false,
  onView,
}: {
  starter: StarterBackend;
  featured?: boolean;
  onView: (starter: StarterBackend) => void;
}) {
  return (
    <article
      id={starter.id}
      className={`flex scroll-mt-24 flex-col gap-3.5 rounded-[12px] border border-line-1 bg-bg-0 ${featured ? "p-7" : "p-[22px]"}`}
    >
      <p className="text-[13px] font-medium text-fg-4">{STARTER_CATEGORIES[starter.category]}</p>
      <h3 className={`font-display font-bold text-fg-1 ${featured ? "text-[24px]" : "text-[20px]"}`}>{starter.title}</h3>
      <ul className="flex flex-wrap items-start gap-2" aria-label="Core entities">
        {starter.entities.map((entity) => (
          <li key={entity} className="rounded-[6px] border border-line-1 bg-bg-1 px-2.5 py-1 text-[13px] text-fg-3">
            {entity}
          </li>
        ))}
        <li className="py-0.5 text-[13px] text-fg-4">and more</li>
      </ul>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href={APP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[41px] items-center rounded-[8px] bg-brand px-4 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover"
        >
          Build {buildLabels[starter.id] ?? starter.title} backend
        </a>
        <button
          type="button"
          onClick={() => onView(starter)}
          aria-label={`View the ${starter.title} schema`}
          className="py-1 text-[14px] font-medium text-brand hover:text-brand-hover hover:underline"
        >
          View schema
        </button>
      </div>
    </article>
  );
}

function SchemaDrawer({ starter, onClose }: { starter: StarterBackend | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (starter && !dialog.open) dialog.showModal();
    if (!starter && dialog.open) dialog.close();
    setCopied(false);
  }, [starter]);

  const details = starter ? getDrawerDetails(starter) : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      aria-labelledby="schema-drawer-title"
      className="fixed inset-y-0 left-auto right-0 m-0 h-dvh max-h-none w-full max-w-[560px] overflow-y-auto bg-bg-0 shadow-[-8px_0_32px_rgba(0,0,0,0.18)] backdrop:bg-black/40"
    >
      {starter && details && (
        <div className="flex flex-col gap-5 p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <h2 id="schema-drawer-title" className="flex-1 font-display text-[28px] font-extrabold text-fg-1">
              {starter.title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-11 w-11 items-center justify-center rounded-[8px] text-fg-3 hover:bg-bg-2"
            >
              <X aria-hidden="true" className="h-[22px] w-[22px]" />
            </button>
          </div>
          <p className="text-[15px] leading-[1.6] text-fg-4">
            Each starter is a prompt. Apso drafts a schema from it, and you review every entity, field, and relationship
            before anything is generated.
          </p>
          <div className="rounded-[10px] border border-line-1 bg-bg-1 p-5">
            <div className="flex items-center">
              <p className="flex-1 font-mono text-[12px] font-medium text-fg-4">Starter prompt</p>
              <button
                type="button"
                aria-label={copied ? "Prompt copied" : "Copy starter prompt"}
                onClick={() => {
                  navigator.clipboard
                    ?.writeText(details.prompt)
                    .then(() => setCopied(true))
                    .catch(() => {});
                }}
                className="-m-2 flex h-9 w-9 items-center justify-center rounded-[6px] text-fg-4 hover:bg-bg-2 hover:text-fg-1"
              >
                {copied ? <Check aria-hidden="true" className="h-3.5 w-3.5" /> : <Copy aria-hidden="true" className="h-3.5 w-3.5" />}
              </button>
            </div>
            <p className="text-[15px] leading-[1.65] text-fg-1">&ldquo;{details.prompt}&rdquo;</p>
          </div>
          <h3 className="text-[16px] font-semibold text-fg-1">What you review before generating</h3>
          <ul className="flex list-disc flex-col gap-1.5 pl-5 text-[14px] text-fg-3">
            {details.review.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-[8px] bg-brand px-4 text-[14px] font-medium text-white transition-colors hover:bg-brand-hover"
            >
              Build {buildLabels[starter.id] ?? starter.title} backend
              <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
          </div>
          <p className="text-[13px] leading-[1.5] text-fg-4">
            Building opens the app with this starter selected. If you&apos;re new, you&apos;ll sign up first and land back here.
          </p>
        </div>
      )}
    </dialog>
  );
}
