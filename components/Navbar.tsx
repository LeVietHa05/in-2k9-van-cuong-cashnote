"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Thêm/sửa mục nav ở đây. `match` quyết định khi nào mục được coi là đang active.
const items = [
  {
    href: "/",
    label: "CashNode",
    match: (p: string) => p === "/" || p.startsWith("/post"),
  },
  {
    href: "/overview",
    label: "Overview",
    match: (p: string) => p.startsWith("/overview"),
  },
  { href: "/tips", label: "Tips", match: (p: string) => p.startsWith("/tips") },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="mx-auto max-w-4xl px-4 pt-5 sm:px-6">
      <ul className="flex overflow-hidden rounded-2xl border border-[var(--ink)]/70 bg-[var(--paper)]">
        {items.map((it, i) => {
          const active = it.match(pathname);
          return (
            <li
              key={it.href}
              className={`flex-1 ${i > 0 ? "border-l border-[var(--ink)]/70" : ""}`}
            >
              <Link
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={`block px-3 py-3 text-center text-base transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:-outline-offset-2 sm:text-lg ${
                  active
                    ? "font-semibold underline decoration-2 underline-offset-[6px]"
                    : ""
                }`}
              >
                {it.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
