"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { APP_URL, NAV_GROUPS, NAV_LINKS } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";
import { NavItemIcon } from "./nav-item-icon";

type NavGroupLabel = (typeof NAV_GROUPS)[number]["label"];
type NavGroup = (typeof NAV_GROUPS)[number];
type NavItemData = NavGroup["items"][number];

function NavItem({ item, onNavigate }: { item: NavItemData; onNavigate: () => void }) {
  const external = "external" in item && item.external;
  const className =
    "group/item flex items-start gap-3 rounded-[8px] p-3 transition-colors hover:bg-bg-1 focus-visible:bg-bg-1 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";
  const content = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-line-1 bg-bg-0 text-fg-4 transition-colors group-hover/item:border-brand/20 group-hover/item:bg-brand-soft group-hover/item:text-brand">
        <NavItemIcon name={item.icon} className="h-[18px] w-[18px]" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-start justify-between gap-3 text-[15px] font-semibold leading-6 text-fg-1">
          {item.label}
          {external ? (
            <ArrowUpRight
              aria-hidden="true"
              className="mt-[5px] h-3.5 w-3.5 shrink-0 text-fg-5 transition-transform group-hover/item:-translate-y-0.5 group-hover/item:translate-x-0.5"
            />
          ) : (
            <ArrowRight
              aria-hidden="true"
              className="mt-[5px] h-3.5 w-3.5 shrink-0 text-fg-5 transition-transform group-hover/item:translate-x-0.5"
            />
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-5 text-fg-4">{item.description}</span>
      </span>
    </>
  );

  return external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onNavigate}
    >
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

function FeaturedMenuItem({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const featured = group.featured;
  const external = "external" in featured && featured.external;
  const content = (
    <>
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[8px] border border-brand/15 bg-bg-0 text-brand">
          <NavItemIcon name={featured.icon} className="h-[18px] w-[18px]" />
        </span>
        <span className="text-[13px] font-medium text-fg-4">{featured.eyebrow}</span>
      </span>
      <span className="mt-6 block font-display text-[22px] font-bold leading-7 text-fg-1">{featured.title}</span>
      <span className="mt-3 block text-[14px] leading-[22px] text-fg-4">{featured.description}</span>
      <span className="mt-auto flex items-center gap-2 pt-6 text-[14px] font-semibold text-brand group-hover/featured:underline">
        {featured.action}
        {external ? (
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        ) : (
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        )}
      </span>
    </>
  );
  const className =
    "group/featured flex h-full flex-col border-t border-line-1 bg-brand-soft p-6 lg:border-l lg:border-t-0 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand";

  return external ? (
    <a
      href={featured.href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={onNavigate}
    >
      {content}
    </a>
  ) : (
    <Link href={featured.href} className={className} onClick={onNavigate}>
      {content}
    </Link>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<NavGroupLabel | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pinnedMenuRef = useRef<NavGroupLabel | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const cancelMenuClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  const scheduleMenuClose = () => {
    cancelMenuClose();
    if (pinnedMenuRef.current) return;
    closeTimerRef.current = setTimeout(() => setActiveMenu(null), 140);
  };

  const dismissMenu = () => {
    cancelMenuClose();
    pinnedMenuRef.current = null;
    setActiveMenu(null);
  };

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        pinnedMenuRef.current = null;
        setActiveMenu(null);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Return focus to the open menu's trigger so keyboard users keep their place.
        const trigger = headerRef.current?.querySelector<HTMLElement>('nav button[aria-expanded="true"]');
        if (trigger && headerRef.current?.contains(document.activeElement)) trigger.focus();
        pinnedMenuRef.current = null;
        setActiveMenu(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  return (
    <>
      <header ref={headerRef} className="sticky top-0 z-50 border-b border-line-1 bg-bg-0/95 backdrop-blur-md">
        <Container>
          <div className="flex h-16 items-center justify-between gap-6">
            <Link href="/" className="flex shrink-0 items-center" aria-label="Apso home">
              <Image
                src="/images/logo.svg"
                alt="Apso"
                width={140}
                height={48}
                className="h-9 w-auto"
                priority
              />
            </Link>

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
              {NAV_GROUPS.map((group) => {
                const isOpen = activeMenu === group.label;
                return (
                  <div
                    key={group.label}
                    onMouseEnter={() => {
                      cancelMenuClose();
                      if (pinnedMenuRef.current !== group.label) pinnedMenuRef.current = null;
                      setActiveMenu(group.label);
                    }}
                    onMouseLeave={scheduleMenuClose}
                    onBlur={(event) => {
                      if (!event.currentTarget.contains(event.relatedTarget)) dismissMenu();
                    }}
                  >
                    <button
                      type="button"
                      className={`flex h-10 items-center gap-1.5 rounded-sm px-3 text-[14px] font-medium transition-colors hover:bg-bg-1 hover:text-fg-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                        isOpen ? "bg-bg-1 text-fg-1" : "text-fg-3"
                      }`}
                      aria-expanded={isOpen}
                      aria-controls={`nav-menu-${group.label.toLowerCase()}`}
                      onClick={() => {
                        cancelMenuClose();
                        if (isOpen && pinnedMenuRef.current === group.label) {
                          dismissMenu();
                          return;
                        }

                        pinnedMenuRef.current = group.label;
                        setActiveMenu(group.label);
                      }}
                    >
                      {group.label}
                      <ChevronDown
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                        strokeWidth={1.8}
                      />
                    </button>

                    {isOpen && (
                      <div className="fixed left-1/2 top-16 w-[min(880px,calc(100vw-32px))] -translate-x-1/2 pt-2">
                        <div
                          id={`nav-menu-${group.label.toLowerCase()}`}
                          className="grid overflow-hidden rounded-[12px] border border-line-1 bg-bg-0 shadow-[0_20px_50px_rgba(17,24,39,0.12)] lg:grid-cols-[1fr_280px]"
                        >
                          <div className="flex flex-col p-3">
                            <div className="border-b border-line-1 px-3 pb-3 pt-2">
                              <p className="text-[15px] font-semibold text-fg-1">Explore {group.label}</p>
                              <p className="mt-0.5 text-[13px] text-fg-4">{group.description}</p>
                            </div>
                            <div className="mt-2 grid flex-1 grid-cols-2 content-start gap-1">
                              {group.items.map((item) => (
                                <NavItem
                                  key={item.label}
                                  item={item}
                                  onNavigate={dismissMenu}
                                />
                              ))}
                            </div>
                          </div>
                          <FeaturedMenuItem group={group} onNavigate={dismissMenu} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {NAV_LINKS.map((link) =>
                "external" in link && link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 items-center rounded-sm px-3 text-[14px] font-medium text-fg-3 transition-colors hover:bg-bg-1 hover:text-fg-1"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex h-10 items-center rounded-sm px-3 text-[14px] font-medium text-fg-3 transition-colors hover:bg-bg-1 hover:text-fg-1"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden shrink-0 items-center gap-2 lg:flex">
              <a
                href={APP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 text-[14px] font-medium text-fg-3 transition-colors hover:text-fg-1"
              >
                Sign in
              </a>
              <Button href={APP_URL} external size="default">
                Start building
              </Button>
            </div>

            <button
              type="button"
              className="-mr-2 flex h-10 w-10 items-center justify-center rounded-sm text-fg-3 hover:bg-bg-1 lg:hidden"
              ref={menuButtonRef}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu aria-hidden="true" className="h-[22px] w-[22px]" />
            </button>
          </div>
        </Container>
      </header>
      <MobileNav
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }}
      />
    </>
  );
}
