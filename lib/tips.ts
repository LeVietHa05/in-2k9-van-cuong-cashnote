import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Tip {
  slug: string;
  title: string;
  /** null khi chưa có file .md tương ứng -> UI hiện "no tip". */
  content: string | null;
  readTime?: string;
}

const DIR = path.join(process.cwd(), "content/tips");

/** "bank-app-fee" -> "Bank App Fee", dùng khi file không có dòng "# Tiêu đề". */
function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/^./, (c) => c.toUpperCase());
}

/** Tách dòng "# Tiêu đề" đầu tiên ra khỏi thân bài. */
function splitTitle(body: string) {
  const match = body.match(/^#\s+(.+)$/m);
  if (!match) return { title: undefined, body: body.trim() };
  return {
    title: match[1].trim(),
    body: body.replace(match[0], "").trim(),
  };
}

/** Mỗi .md trong content/tips là một tip; thiếu file hoặc lỗi đọc -> content null. */
export function getAllTips(): Tip[] {
  let files: string[];
  try {
    files = fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }

  return files
    .sort()
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const tip: Tip = { slug, title: humanize(slug), content: null };
      try {
        const parsed = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
        const { title, body } = splitTitle(parsed.content);
        tip.title = title ?? tip.title;
        tip.content = body;
        tip.readTime = parsed.data?.readTime as string | undefined;
      } catch {
        // file biết là có nhưng đọc lỗi -> để content null, UI tự hiện "no tip"
      }
      return tip;
    });
}