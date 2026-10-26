"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export interface TocItem {
  id: string;
  label: string;
}

export function OnThisPage({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map(({ id }) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    headings.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  const links = (
    <ul className="flex flex-col gap-0.5">
      {items.map(({ id, label }) => (
        <li key={id}>
          <a
            href={`#${id}`}
            aria-current={active === id ? "location" : undefined}
            className={`block rounded-[6px] px-3 py-2 text-[14px] font-medium transition-colors ${
              active === id ? "bg-brand-soft text-brand" : "text-fg-3 hover:text-fg-1"
            }`}
          >
            {label}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <nav aria-label="On this page" className="sticky top-24 hidden w-[240px] shrink-0 lg:block">
        <p className="mb-0.5 text-[13px] font-semibold text-fg-4">On this page</p>
        {links}
      </nav>
      <details className="group rounded-[10px] border border-line-1 lg:hidden">
        <summary className="flex min-h-[51px] cursor-pointer list-none items-center justify-between px-4 text-[14px] font-medium text-fg-3 [&::-webkit-details-marker]:hidden">
          On this page: {items.length} sections
          <ChevronDown aria-hidden="true" className="h-5 w-5 text-fg-4 transition-transform group-open:rotate-180 motion-reduce:transition-none" />
        </summary>
        <nav aria-label="On this page" className="px-2 pb-2">
          {links}
        </nav>
      </details>
    </>
  );
}
