"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_URL, NAV_GROUPS, NAV_LINKS } from "@/lib/constants";
import { NavItemIcon } from "./nav-item-icon";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function MobileNav({ open, onClose }: MobileNavProps) {
  const [openGroup, setOpenGroup] = useState<string>(NAV_GROUPS[0].label);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-fg-1/30"
        onClick={onClose}
        aria-label="Close menu"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className="absolute right-0 top-0 flex h-full w-full max-w-[390px] flex-col border-l border-line-1 bg-bg-0 shadow-2xl"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line-1 px-5">
          <Image src="/images/logo.svg" alt="Apso" width={120} height={40} className="h-8 w-auto" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-[8px] text-fg-3 hover:bg-bg-1"
            onClick={onClose}
            aria-label="Close menu"
            autoFocus
          >
            <X aria-hidden="true" className="h-[22px] w-[22px]" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-5 pb-5 pt-1" aria-label="Mobile navigation">
          <div className="divide-y divide-line-1 border-b border-line-1">
            {NAV_GROUPS.map((group) => {
              const isOpen = openGroup === group.label;
              return (
                <div key={group.label}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-4 text-left text-[16px] font-semibold text-fg-1 focus-visible:outline-2 focus-visible:outline-brand"
                    onClick={() => setOpenGroup(isOpen ? "" : group.label)}
                    aria-expanded={isOpen}
                  >
                    <span>
                      {group.label}
                      <span className="mt-0.5 block text-[13px] font-normal text-fg-4">
                        {group.description}
                      </span>
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-4 w-4 shrink-0 text-fg-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="space-y-1 pb-5">
                      {group.items.map((item) => {
                        const external = "external" in item && item.external;
                        const content = (
                          <>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-line-1 bg-bg-0 text-fg-4">
                              <NavItemIcon name={item.icon} className="h-[18px] w-[18px]" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="flex items-center justify-between gap-3 text-[15px] font-semibold text-fg-1">
                                {item.label}
                                {external ? (
                                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-fg-5" />
                                ) : (
                                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5 text-fg-5" />
                                )}
                              </span>
                              <span className="mt-0.5 block text-[13px] leading-5 text-fg-4">
                                {item.description}
                              </span>
                            </span>
                          </>
                        );
                        const className =
                          "flex gap-3 rounded-[8px] px-3 py-3 hover:bg-bg-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

                        return external ? (
                          <a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                            onClick={onClose}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link key={item.label} href={item.href} className={className} onClick={onClose}>
                            {content}
                          </Link>
                        );
                      })}

                      {(() => {
                        const featured = group.featured;
                        const external = "external" in featured && featured.external;
                        const content = (
                          <>
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-brand/15 bg-bg-0 text-brand">
                              <NavItemIcon name={featured.icon} className="h-[18px] w-[18px]" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-[13px] font-medium text-fg-4">{featured.eyebrow}</span>
                              <span className="mt-1 block font-display text-[18px] font-bold leading-6 text-fg-1">
                                {featured.title}
                              </span>
                              <span className="mt-2 flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                                {featured.action}
                                {external ? (
                                  <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                                ) : (
                                  <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                                )}
                              </span>
                            </span>
                          </>
                        );
                        const className =
                          "mt-3 flex gap-3 rounded-[8px] border border-brand/15 bg-brand-soft p-4 focus-visible:outline-2 focus-visible:outline-brand";

                        return external ? (
                          <a
                            href={featured.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={className}
                            onClick={onClose}
                          >
                            {content}
                          </a>
                        ) : (
                          <Link href={featured.href} className={className} onClick={onClose}>
                            {content}
                          </Link>
                        );
                      })()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-3 gap-2 pt-5">
            {NAV_LINKS.map((link) =>
              "external" in link && link.external ? (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[8px] border border-line-1 px-2 py-2.5 text-center text-[14px] font-medium text-fg-2 hover:bg-bg-1"
                  onClick={onClose}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-[8px] border border-line-1 px-2 py-2.5 text-center text-[14px] font-medium text-fg-2 hover:bg-bg-1"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </nav>

        <div className="shrink-0 border-t border-line-1 bg-bg-1 p-5">
          <Button href={APP_URL} external className="w-full">
            Start building
          </Button>
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 block text-center text-sm font-medium text-fg-3"
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
