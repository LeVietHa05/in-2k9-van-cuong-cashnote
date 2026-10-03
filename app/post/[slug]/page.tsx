import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import NextStop from "@/components/Nextstop";
import YouAreHere from "@/components/Youarehere";
import { stations } from "@/content/network";
import { getPost } from "@/lib/post";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () =>
  Object.keys(stations).map((slug) => ({ slug }));

export async function generateMetadata({ params }: Props) {
  const st = stations[(await params).slug];
  return st ? { title: `${st.title} · CashNode`, description: st.summary } : {};
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const st = stations[slug];
  if (!st) notFound();
  const post = st.status === "published" ? getPost(slug) : null;

  return (
    <main className="mx-auto max-w-2xl px-6 pb-24">
      <YouAreHere slug={slug} />
      <h1 className="font-display mt-12 text-4xl leading-tight sm:text-5xl">
        {st.long_title}
      </h1>
      <p className="mt-3 text-lg text-[var(--mute)]">{st.summary}</p>
      {post?.meta.readTime && (
        <p className="mt-2 text-sm text-[var(--mute)]">{post.meta.readTime}</p>
      )}

      {post ? (
        <article className="article mt-10">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      ) : (
        <div className="mt-10 rounded-2xl border border-dashed border-black/20 p-8 text-[var(--mute)]">
          This station isn&apos;t open yet. Ride on to the next stop below.
        </div>
      )}
      <NextStop slug={slug} />
    </main>
  );
}
