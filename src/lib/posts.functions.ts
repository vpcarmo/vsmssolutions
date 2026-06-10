import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { Post } from "@/lib/posts";

const PRODUCT_SLUG = "site-vsms";

type DbPostRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  tag: string | null;
  reading_time: string | null;
  cover_image_url: string | null;
  seo_title: string | null;
  seo_description: string | null;
  published_at: string;
};

function mapRow(row: DbPostRow): Post {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content ?? [],
    tag: row.tag ?? "VSMS",
    readingTime: row.reading_time ?? "5 min",
    publishedAt: row.published_at,
    date: row.published_at,
    coverImageUrl: row.cover_image_url,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
  };
}

const SELECT =
  "slug,title,excerpt,content,tag,reading_time,cover_image_url,seo_title,seo_description,published_at";

export const listPublishedPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<Post[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: product, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("slug", PRODUCT_SLUG)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    if (!product) return [];

    const { data, error } = await supabaseAdmin
      .from("posts")
      .select(SELECT)
      .eq("product_id", product.id)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []).map((r) => mapRow(r as DbPostRow));
  },
);

export const getPostBySlug = createServerFn({ method: "GET" })
  .inputValidator((data: unknown) => z.object({ slug: z.string().min(1) }).parse(data))
  .handler(async ({ data }): Promise<Post | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: product, error: pErr } = await supabaseAdmin
      .from("products")
      .select("id")
      .eq("slug", PRODUCT_SLUG)
      .maybeSingle();
    if (pErr) throw new Error(pErr.message);
    if (!product) return null;

    const { data: row, error } = await supabaseAdmin
      .from("posts")
      .select(SELECT)
      .eq("product_id", product.id)
      .eq("slug", data.slug)
      .eq("status", "published")
      .lte("published_at", new Date().toISOString())
      .maybeSingle();
    if (error) throw new Error(error.message);
    return row ? mapRow(row as DbPostRow) : null;
  });
