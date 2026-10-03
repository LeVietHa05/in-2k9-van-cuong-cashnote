import Link from "next/link";
import { Fragment } from "react";
import { lineStations, stationLines } from "@/lib/network";

export default function YouAreHere({ slug }: { slug: string }) {
  return (
    <nav
      aria-label="You are here"
      className="space-y-5 rounded-2xl border border-black/10 bg-white/60 p-5"
    >
      <p className="text-sm text-[var(--mute)]">You are here</p>
      {stationLines(slug).map((l) => {
        const bar = `linear-gradient(90deg,${l.colors[0]},${l.colors[1]})`;
        return (
          <div key={l.id}>
            <p className="mb-2 text-sm font-medium">{l.name}</p>
            <div className="flex items-center">
              {lineStations(l).map((st, i) => {
                const cur = st.slug === slug;
                return (
                  <Fragment key={st.slug}>
                    {i > 0 && (
                      <span
                        className="h-2 flex-1"
                        style={{ background: bar }}
                      />
                    )}
                    <Link
                      href={`/post/${st.slug}`}
                      title={st.title}
                      aria-current={cur ? "page" : undefined}
                      className="shrink-0 rounded-full border-white transition-transform hover:scale-125"
                      style={{
                        width: cur ? 22 : 12,
                        height: cur ? 22 : 12,
                        borderWidth: 3,
                        background:
                          st.status === "soon"
                            ? "#d3d1c9"
                            : cur
                              ? "var(--ink)"
                              : l.colors[0],
                        outline: cur ? "2px solid var(--ink)" : undefined,
                      }}
                    />
                  </Fragment>
                );
              })}
            </div>
          </div>
        );
      })}
    </nav>
  );
}
