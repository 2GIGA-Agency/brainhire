import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const POSTS_FILE = path.join(process.cwd(), "src", "data", "lists", "posts.json");

export const postSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  date: z.string(),
  author: z.string(),
  authorInitials: z.string(),
  readTime: z.string(),
  tag: z.string(),
  cover: z
    .object({
      gradient: z.string(),
      icon: z.string().optional(),
    })
    .optional(),
});

export type Post = z.infer<typeof postSchema>;

const postsListSchema = z.array(postSchema);

let cache: Post[] | null = null;
const isDev = process.env.NODE_ENV !== "production";

export function getPosts(): Post[] {
  if (!isDev && cache) return cache;
  const raw = readFileSync(POSTS_FILE, "utf-8");
  const parsed = postsListSchema.parse(JSON.parse(raw));
  if (!isDev) cache = parsed;
  return parsed;
}

export function findPost(slug: string): Post | undefined {
  return getPosts().find((p) => p.slug === slug);
}
