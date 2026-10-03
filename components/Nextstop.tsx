import Link from "next/link";
import { nextStops, stationLines } from "@/lib/network";

export default function NextStop({ slug }: { slug: string }) {
  const stops = nextStops(slug);
  const transfers = stationLines(slug).length > 1;
  return (
    <section className="mt-20 border-t border-black/10 pt-10">
      <h2 className="font-display text-2xl">Next stop</h2>
      {transfers && (
        <p className="mt-1 text-sm text-[var(--mute)]">
          This is an interchange. Pick the line you want to continue on.
        </p>
      )}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {stops.map(({ line, station }) => {
          const soon = station.status === "soon";
          const inner = (
            <>
              <span
                className="mb-3 block h-2 w-16 rounded-full"
                style={{
                  background: `linear-gradient(90deg,${line.colors[0]},${line.colors[1]})`,
                }}
              />
              <span className="text-xs text-[var(--mute)]">on {line.name}</span>
              <span className="font-display mt-1 block text-xl leading-snug">
                {station.title}
              </span>
              <span className="mt-1 block text-sm text-[var(--mute)]">
                {soon ? "Coming soon" : station.summary}
              </span>
            </>
          );
          const cls =
            "block rounded-2xl border border-black/10 bg-white/60 p-5";
          return soon ? (
            <div key={line.id + station.slug} className={`${cls} opacity-60`}>
              {inner}
            </div>
          ) : (
            <Link
              key={line.id + station.slug}
              href={`/post/${station.slug}`}
              className={`${cls} transition hover:border-black/40`}
            >
              {inner}
            </Link>
          );
        })}
        {stops.length === 0 && (
          <p className="text-[var(--mute)]">
            End of the line. Pick another route on the map.
          </p>
        )}
      </div>
      <Link
        href="/"
        className="mt-8 inline-block text-sm underline underline-offset-4"
      >
        Back to the map
      </Link>
    </section>
  );
}
