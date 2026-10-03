import { lines, stations } from "@/content/network";
import type { Line, Station } from "./types";

export const stationLines = (slug: string): Line[] =>
  lines.filter((l) => l.routes.some((r) => r.includes(slug)));
export const isInterchange = (slug: string) => stationLines(slug).length > 1;
export const lineStations = (l: Line): Station[] =>
  [...new Set(l.routes.flat())].map((slug) => stations[slug]);

/** Station kế tiếp trên từng tuyến đi qua `slug` (kể cả tuyến giao nhau). */
export function nextStops(slug: string) {
  const out: { line: Line; station: Station }[] = [];
  for (const line of stationLines(slug))
    for (const r of line.routes) {
      const i = r.indexOf(slug);
      if (
        i >= 0 &&
        r[i + 1] &&
        !out.some((o) => o.line.id === line.id && o.station.slug === r[i + 1])
      )
        out.push({ line, station: stations[r[i + 1]] });
    }
  return out;
}

type P = { x: number; y: number };
const toward = (a: P, b: P, d: number): P => {
  const L = Math.hypot(b.x - a.x, b.y - a.y) || 1;
  return { x: a.x + ((b.x - a.x) / L) * d, y: a.y + ((b.y - a.y) / L) * d };
};

/** Tạo path SVG vuông góc, bo góc, đi qua các station theo thứ tự. */
export function routePath(slugs: string[], elbow: "h" | "v" = "h", r = 28) {
  const pts: P[] = [stations[slugs[0]]];
  for (const slug of slugs.slice(1)) {
    const a = pts[pts.length - 1],
      b = stations[slug];
    if (a.x !== b.x && a.y !== b.y)
      pts.push(elbow === "h" ? { x: b.x, y: a.y } : { x: a.x, y: b.y });
    pts.push({ x: b.x, y: b.y });
  }
  let d = `M${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length - 1; i++) {
    const rr = Math.min(
      r,
      Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y) / 2,
      Math.hypot(pts[i + 1].x - pts[i].x, pts[i + 1].y - pts[i].y) / 2,
    );
    const a = toward(pts[i], pts[i - 1], rr),
      b = toward(pts[i], pts[i + 1], rr);
    d += ` L${a.x} ${a.y} Q${pts[i].x} ${pts[i].y} ${b.x} ${b.y}`;
  }
  const last = pts[pts.length - 1];
  return { d: d + ` L${last.x} ${last.y}`, from: pts[0], to: last };
}
