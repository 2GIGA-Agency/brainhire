import { z } from "zod";
import solutionsJson from "@/data/lists/solutions.json";

export const solutionEntrySchema = z.object({
  slug: z.string(),
  title: z.string(),
  segment: z.enum(["industry", "size", "marketplace"]),
});

export type SolutionEntry = z.infer<typeof solutionEntrySchema>;

const solutionsListSchema = z.array(solutionEntrySchema);

let cached: SolutionEntry[] | null = null;

export function getSolutions(): SolutionEntry[] {
  if (cached) return cached;
  cached = solutionsListSchema.parse(solutionsJson);
  return cached;
}

export function findSolution(slug: string): SolutionEntry | undefined {
  return getSolutions().find((s) => s.slug === slug);
}
