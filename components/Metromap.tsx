"use client";
import Link from "next/link";
import { useState } from "react";
import { lines, stations } from "@/content/network";
import { isInterchange, routePath, stationLines } from "@/lib/network";
import type { Station } from "@/lib/types";

const W = 960,
  H = 1060,
  GREY = "#d3d1c9";

const labelPos = (st: Station) => {
  switch (st.label) {
    case "l":
      return { x: st.x - 24, y: st.y + 5, anchor: "end" as const };
    case "r":
      return { x: st.x + 24, y: st.y + 5, anchor: "start" as const };
    case "t":
      return { x: st.x, y: st.y - 26, anchor: "middle" as const };
    default:
      return { x: st.x, y: st.y + 38, anchor: "middle" as const };
  }
};

export default function MetroMap() {
  const [pin, setPin] = useState<string | null>(null); // tuyến được ghim (filter)
  const [hl, setHl] = useState<string | null>(null); // tuyến đang hover ở legend
  const [hs, setHs] = useState<string | null>(null); // station đang hover

  const lineId = pin ?? hl;
  const lit: Set<string> | null = lineId
    ? new Set([lineId])
    : hs
      ? new Set(stationLines(hs).map((l) => l.id))
      : null;
  const hovered = hs ? stations[hs] : null;

  return (
    <section className="mx-auto max-w-4xl px-4 pb-24">
      <div
        className="mb-6 flex flex-wrap gap-2"
        role="group"
        aria-label="Filter lines"
      >
        {lines.map((l) => (
          <button
            key={l.id}
            onMouseEnter={() => setHl(l.id)}
            onMouseLeave={() => setHl(null)}
            onFocus={() => setHl(l.id)}
            onBlur={() => setHl(null)}
            onClick={() => setPin(pin === l.id ? null : l.id)}
            aria-pressed={pin === l.id}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition focus-visible:outline-2 ${
              pin === l.id
                ? "border-[var(--ink)] bg-white"
                : "border-black/10 hover:border-black/40"
            }`}
          >
            <span
              className="h-3 w-6 rounded-full"
              style={{
                background: `linear-gradient(90deg,${l.colors[0]},${l.colors[1]})`,
              }}
            />
            {l.name}
          </button>
        ))}
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="CashNode metro map"
        >
          <defs>
            {lines.flatMap((l) =>
              l.routes.map((r, i) => {
                const { from, to } = routePath(r, l.elbow);
                return (
                  <linearGradient
                    key={`${l.id}${i}`}
                    id={`g-${l.id}-${i}`}
                    gradientUnits="userSpaceOnUse"
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                  >
                    <stop offset="0" stopColor={l.colors[0]} />
                    <stop offset="1" stopColor={l.colors[1]} />
                  </linearGradient>
                );
              }),
            )}
          </defs>

          {lines.map((l) =>
            l.routes.map((r, i) => (
              <path
                key={`${l.id}${i}`}
                d={routePath(r, l.elbow).d}
                pathLength={1}
                className="metro-line"
                fill="none"
                strokeWidth={26}
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke={`url(#g-${l.id}-${i})`}
                opacity={lit && !lit.has(l.id) ? 0.12 : 1}
                style={{ animationDelay: `${lines.indexOf(l) * 0.15}s` }}
              />
            )),
          )}

          {Object.values(stations).map((st, i) => {
            const ls = stationLines(st.slug);
            const soon = st.status === "soon";
            const dim = lit && !ls.some((l) => lit.has(l.id));
            const inter = isInterchange(st.slug);
            const lp = labelPos(st);
            const body = (
              <g
                className="metro-station"
                style={{
                  animationDelay: `${1 + i * 0.06}s`,
                  opacity: dim ? 0.2 : 1,
                  cursor: soon ? "default" : "pointer",
                }}
                onMouseEnter={() => setHs(st.slug)}
                onMouseLeave={() => setHs(null)}
              >
                <circle
                  cx={st.x}
                  cy={st.y}
                  r={inter ? 17 : 14}
                  fill={soon ? GREY : inter ? "#fff" : ls[0].colors[0]}
                  stroke={inter ? "var(--ink)" : "#fff"}
                  strokeWidth={3}
                />
                {inter && (
                  <circle
                    cx={st.x}
                    cy={st.y}
                    r={6}
                    fill={soon ? GREY : "var(--ink)"}
                  />
                )}
                <text
                  x={lp.x}
                  y={lp.y}
                  textAnchor={lp.anchor}
                  fontSize={15}
                  fill={soon ? "var(--mute)" : "var(--ink)"}
                  className="select-none"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {st.title}
                  {soon ? " · soon" : ""}
                </text>
              </g>
            );
            return soon ? (
              <g
                key={st.slug}
                tabIndex={0}
                onFocus={() => setHs(st.slug)}
                onBlur={() => setHs(null)}
              >
                {body}
              </g>
            ) : (
              <Link
                key={st.slug}
                href={`/post/${st.slug}`}
                aria-label={st.title}
                onFocus={() => setHs(st.slug)}
                onBlur={() => setHs(null)}
              >
                {body}
              </Link>
            );
          })}
        </svg>

        {hovered && (
          <div
            className="pointer-events-none absolute z-10 w-60 rounded-xl border border-black/10 bg-white p-3 shadow-lg"
            style={{
              left: `${(hovered.x / W) * 100}%`,
              top: `${(hovered.y / H) * 100}%`,
              transform: "translate(-50%, calc(-100% - 28px))",
            }}
          >
            <p className="font-display text-base leading-snug">
              {hovered.title}
            </p>
            <p className="mt-1 text-sm text-[var(--mute)]">{hovered.summary}</p>
            <p className="mt-2 flex flex-wrap gap-x-3 text-xs">
              {stationLines(hovered.slug).map((l) => (
                <span key={l.id} className="flex items-center gap-1">
                  <i
                    className="h-2 w-2 rounded-full"
                    style={{ background: l.colors[0] }}
                  />
                  {l.name}
                </span>
              ))}
            </p>
            {hovered.status === "soon" && (
              <p className="mt-1 text-xs text-[var(--mute)]">Coming soon</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
