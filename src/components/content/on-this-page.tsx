"use client";

import { useEffect, useState } from "react";

interface OnThisPageProps {
  items: { id: string; label: string; count?: number }[];
  label: string;
}

// Sticky section nav that highlights the section currently in view.
export function OnThisPage({ items, label }: OnThisPageProps) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-112px 0px -60% 0px" }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className="sticky top-28">
      <p className="text-[13px] font-semibold text-fg-4">On this page</p>
      <ul className="mt-1 space-y-0.5">
        {items.map(({ id, label: text, count }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "location" : undefined}
              className={`flex items-start justify-between gap-3 rounded-[6px] px-3 text-[14px] font-medium transition-colors ${
                active === id ? "bg-brand-soft text-brand" : "text-fg-3 hover:bg-bg-1 hover:text-fg-1"
              } ${count !== undefined ? "py-2.5" : "py-2"}`}
            >
              <span>{text}</span>
              {count !== undefined && <span className="text-[13px] font-normal text-fg-4">{count}</span>}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
