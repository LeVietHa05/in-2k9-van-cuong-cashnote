"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Tip } from "@/lib/tips";

function NoTip() {
  return (
    <div className="mt-10 rounded-2xl border border-dashed border-black/20 p-8 text-[var(--mute)]">
      No tip yet. This one&apos;s still being written.
    </div>
  );
}

export default function TipsView({ tips }: { tips: Tip[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [active]);

  if (tips.length === 0) return <NoTip />;

  if (active === null) {
    return (
      <>
        <ul className="mt-10 list-none p-0 border-t-2">
          {tips.map((tip, i) => (
            <li key={tip.slug}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="font-display font-bold text-2xl block w-full py-2 text-left border-b-2 hover:underline focus-visible:-outline-offset-2 focus-visible:outline-2"
              >
                {tip.title}
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }

  const tip = tips[active];
  const isLast = active === tips.length - 1;

  return (
    <>
      <h1 className="font-display mt-12 text-3xl font-bold leading-tight ">
        {tip.title}
      </h1>
      {tip.readTime && (
        <p className="mt-2 text-sm text-[var(--mute)]">{tip.readTime}</p>
      )}
      <hr />
      {tip.content ? (
        <article className="article mt-10 text-xl">
          <ReactMarkdown>{tip.content}</ReactMarkdown>
        </article>
      ) : (
        <NoTip />
      )}

      <nav
        aria-label="Tip navigation"
        className="fixed inset-x-0 bottom-0 z-40 flex justify-center px-4 pb-5"
      >
        <div className="flex items-center gap-5 rounded-full border border-[var(--ink)]/70 bg-[var(--paper)] px-6 py-2">
          <button
            type="button"
            onClick={() => setActive(null)}
            className="text-[var(--mute)] underline underline-offset-4 hover:text-[var(--ink)] focus-visible:-outline-offset-2 focus-visible:outline-2"
          >
            Back
          </button>
          <span aria-hidden="true" className="h-4 w-px bg-black/15" />
          <button
            type="button"
            onClick={() => setActive(isLast ? null : active + 1)}
            className="underline underline-offset-4 hover:text-[var(--ink)] focus-visible:-outline-offset-2 focus-visible:outline-2"
          >
            Next
          </button>
        </div>
      </nav>
    </>
  );
}
