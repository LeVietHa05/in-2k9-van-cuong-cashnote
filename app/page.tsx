import MetroMap from "@/components/Metromap";

export default function Home() {
  return (
    <main>
      {/* <div className="mx-auto max-w-4xl px-6 pb-10 pt-4">
        <h1 className="font-display text-4xl leading-tight sm:text-5xl">
          Pick a line. Ride it.
        </h1>
        <p className="mt-3 max-w-xl text-[var(--mute)]">
          Every topic is a line, every article a station. Transfer where lines
          cross.
        </p>
      </div> */}
      <MetroMap />
    </main>
  );
}
