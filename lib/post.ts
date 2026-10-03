import fs from "fs";
import path from "path";
import matter from "gray-matter";

/** Nội dung bài nằm ở content/posts/<slug>.md, tách hoàn toàn khỏi UI. */
export function getPost(slug: string) {
  const file = path.join(process.cwd(), "content/posts", `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { content, data } = matter(fs.readFileSync(file, "utf8"));
  return { content, meta: data as { date?: string; readTime?: string } };
}
