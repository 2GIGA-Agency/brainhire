import type { Block } from "@/types/content";

export type BlockOf<T extends Block["type"]> = Extract<Block, { type: T }>;
