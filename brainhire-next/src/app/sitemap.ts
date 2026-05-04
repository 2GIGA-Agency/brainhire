import type { MetadataRoute } from "next";
import { getSolutions } from "@/lib/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

const CASE_SLUGS = [
  "it-1", "finance-1", "medicine-1",
  "production-1", "retail-1", "iteal", "knam",
];

const FEATURE_SLUGS = [
  "ai-vacancy-creation", "ai-resume-analysis",
  "ai-videointerview", "ai-realtime-interview", "ai-staff-scoring",
];

type Entry = MetadataRoute.Sitemap[number];

function url(path: string, opts: Partial<Entry> = {}): Entry {
  return {
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
    ...opts,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    url("/",                { changeFrequency: "weekly", priority: 1.0 }),
    url("/tariffs",         { changeFrequency: "weekly", priority: 0.9 }),
    url("/case",            { changeFrequency: "weekly", priority: 0.8 }),
    url("/reviews",         { changeFrequency: "weekly", priority: 0.7 }),
    url("/about",           { priority: 0.7 }),
    url("/contacts",        { priority: 0.6 }),
    url("/calculator",      { priority: 0.7 }),
    url("/partner",         { priority: 0.6 }),
    url("/mws-partnership", { priority: 0.5 }),
    url("/blog",            { changeFrequency: "daily", priority: 0.7 }),

    ...FEATURE_SLUGS.map((s) => url(`/${s}`, { priority: 0.8 })),

    ...getSolutions().map((s) =>
      url(`/solutions/${s.slug}`, { priority: 0.8 })
    ),

    ...CASE_SLUGS.map((s) =>
      url(`/case/${s}`, { changeFrequency: "weekly", priority: 0.7 })
    ),
  ];
}
