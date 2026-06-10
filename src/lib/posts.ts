// Public types + formatters for blog posts.
// Data lives in the database; see `src/lib/posts.functions.ts`.

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;          // formatted display date (pt-BR)
  publishedAt: string;   // ISO timestamp
  tag: string;
  readingTime: string;
  content: string[];
  coverImageUrl: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
});

export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(iso)).replace(/\.$/, "");
}
