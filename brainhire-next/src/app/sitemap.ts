import type { MetadataRoute } from "next";
import { getSolutions } from "@/lib/solutions";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://brainhire.ru";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const root: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
  ];

  const solutions: MetadataRoute.Sitemap = getSolutions().map((s) => ({
    url: `${SITE_URL}/solutions/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...root, ...solutions];
}
