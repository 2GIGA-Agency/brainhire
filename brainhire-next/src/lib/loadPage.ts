import "server-only";
import { readFileSync } from "node:fs";
import path from "node:path";
import { pageSchema, type Page } from "@/types/content";

const PAGES_DIR = path.join(process.cwd(), "src", "data", "pages");

export class PageNotFoundError extends Error {
  constructor(slug: string) {
    super(`Page not found: ${slug}`);
    this.name = "PageNotFoundError";
  }
}

const cache = new Map<string, Page>();
const isDev = process.env.NODE_ENV !== "production";

/**
 * Загружает src/data/pages/<slug>.json и валидирует через Zod.
 * В проде кэширует — страницы SSG, читаются 1 раз при build.
 * В dev кэш отключён, чтобы изменения JSON подхватывались на каждый запрос.
 */
export function loadPage(slug: string): Page {
  if (!isDev && cache.has(slug)) return cache.get(slug)!;

  const file = path.join(PAGES_DIR, `${slug}.json`);
  let raw: string;
  try {
    raw = readFileSync(file, "utf-8");
  } catch {
    throw new PageNotFoundError(slug);
  }

  const json = JSON.parse(raw);
  const page = pageSchema.parse(json);
  if (!isDev) cache.set(slug, page);
  return page;
}

export function tryLoadPage(slug: string): Page | null {
  try {
    return loadPage(slug);
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.error(`[loadPage] failed for "${slug}":`, e);
    }
    return null;
  }
}
