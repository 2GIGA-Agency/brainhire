import siteJson from "@/data/site.json";
import { siteSchema, type Site } from "@/types/content";

let cached: Site | null = null;

export function getSite(): Site {
  if (cached) return cached;
  if (process.env.NODE_ENV !== "production") {
    cached = siteSchema.parse(siteJson);
  } else {
    cached = siteJson as unknown as Site;
  }
  return cached;
}
