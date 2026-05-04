import { z } from "zod";

/* ════════════════════════════════════════════════════════════════════
   Site config (header, footer, urgency, brand)
   ════════════════════════════════════════════════════════════════════ */

export const linkSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});
export type Link = z.infer<typeof linkSchema>;

export const ctaSchema = linkSchema.extend({
  variant: z.enum(["primary", "secondary"]).default("primary"),
});
export type Cta = z.infer<typeof ctaSchema>;

export const subItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
});

export const megaSectionSchema = z.object({
  type: z.literal("section"),
  label: z.string(),
  href: z.string().optional(),
  description: z.string().optional(),
  icon: z.string().optional(),
  subItems: z.array(subItemSchema).optional(),
});

export const megaColumnSchema = z.object({
  label: z.string().optional(),
  items: z.array(
    z.union([
      megaSectionSchema,
      z.object({ type: z.literal("link"), label: z.string(), href: z.string() }),
    ]),
  ),
});

export const navItemSchema = z.union([
  z.object({ type: z.literal("link"), label: z.string(), href: z.string() }),
  z.object({
    type: z.literal("mega"),
    id: z.string(),
    label: z.string(),
    columns: z.array(megaColumnSchema),
  }),
]);
export type NavItem = z.infer<typeof navItemSchema>;
export type MegaColumn = z.infer<typeof megaColumnSchema>;
export type SubItem = z.infer<typeof subItemSchema>;

export const footerColumnSchema = z.object({
  title: z.string(),
  links: z.array(linkSchema),
});

export const socialSchema = z.object({
  id: z.enum(["vk", "telegram", "instagram", "linkedin", "youtube"]),
  href: z.string(),
});
export type Social = z.infer<typeof socialSchema>;

export const siteSchema = z.object({
  domain: z.string(),
  brand: z.object({
    name: z.string(),
    logo: z.string(),
    phone: z.string(),
    email: z.string(),
  }),
  urgency: z.object({ enabled: z.boolean(), text: z.string() }),
  topbar: z.array(linkSchema),
  header: z.object({
    menu: z.array(navItemSchema),
    ctaPrimary: ctaSchema,
    ctaSecondary: ctaSchema,
  }),
  footer: z.object({
    description: z.string(),
    columns: z.array(footerColumnSchema),
    socials: z.array(socialSchema),
    contacts: z.object({
      phone: z.string(),
      phoneSub: z.string().optional(),
      email: z.string(),
      address: z.string(),
    }),
    legal: z.object({
      company: z.string(),
      ogrn: z.string().optional(),
      copyright: z.string(),
      links: z.array(linkSchema),
      docs: z.array(linkSchema).optional(),
    }),
  }),
  analytics: z.object({ yandexMetrikaIdEnv: z.string().optional() }).optional(),
});
export type Site = z.infer<typeof siteSchema>;

/* ════════════════════════════════════════════════════════════════════
   Block schemas — каждая страница описывается массивом блоков.
   ════════════════════════════════════════════════════════════════════ */

const pipelineStageSchema = z.object({
  title: z.string(),
  meta: z.string().optional(),
  badge: z.string(),
  badgeTone: z.enum(["grey", "blue", "orange", "teal"]).default("grey"),
  icon: z.string().optional(),
});

export const blockSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("Hero"),
    badge: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    primaryCta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
    proof: z.array(z.string()).optional(),
    pipeline: z
      .object({
        title: z.string(),
        stages: z.array(pipelineStageSchema),
        footer: z.string().optional(),
      })
      .optional(),
  }),

  z.object({
    type: z.literal("Ticker"),
    items: z.array(
      z.object({
        icon: z.string().optional(),
        bold: z.string(),
        text: z.string().optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("PainCards"),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    items: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        body: z.string(),
      }),
    ),
    footnote: z.string().optional(),
  }),

  z.object({
    type: z.literal("StatsBar"),
    items: z.array(
      z.object({
        value: z.string(),
        label: z.string(),
        labelHtml: z.boolean().optional(),
      }),
    ),
    note: z.string().optional(),
  }),

  z.object({
    type: z.literal("Steps"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgWhite: z.boolean().optional(),
    steps: z.array(
      z.object({
        num: z.string(),
        time: z.string().optional(),
        title: z.string(),
        body: z.string(),
        icon: z.string().optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("Compare"),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgGrey: z.boolean().optional(),
    left: z.object({
      header: z.string(),
      items: z.array(z.object({ title: z.string(), time: z.string(), icon: z.string().optional() })),
      total: z.string(),
      totalTone: z.enum(["red", "blue", "orange"]).default("orange"),
    }),
    right: z.object({
      header: z.string(),
      badge: z.string().optional(),
      items: z.array(z.object({ title: z.string(), time: z.string(), icon: z.string().optional() })),
      total: z.string(),
      totalTone: z.enum(["red", "blue", "orange"]).default("blue"),
    }),
  }),

  z.object({
    type: z.literal("Logos"),
    label: z.string().optional(),
    bgWhite: z.boolean().optional(),
    items: z.array(
      z.object({
        href: z.string().optional(),
        label: z.string(),
        html: z.string().optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("CasesGrid"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    bgGrey: z.boolean().optional(),
    items: z.array(
      z.object({
        href: z.string(),
        tag: z.string(),
        date: z.string(),
        title: z.string(),
        body: z.string(),
        author: z.string().optional(),
        readTime: z.string().optional(),
      }),
    ),
    cta: ctaSchema.optional(),
  }),

  z.object({
    type: z.literal("FeatureRows"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgGrey: z.boolean().optional(),
    rows: z.array(
      z.object({
        side: z.enum(["left", "right"]).default("left"),
        num: z.string().optional(),
        title: z.string(),
        body: z.string(),
        bullets: z.array(z.string()).optional(),
        cta: ctaSchema.optional(),
        ctaSecondary: ctaSchema.optional(),
        mockupKey: z.string().optional(),
        mockupData: z.record(z.unknown()).optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("VideoDemo"),
    tag: z.string().optional(),
    title: z.string(),
    body: z.string().optional(),
    poster: z.string().optional(),
    videoSrc: z.string().optional(),
    badge: z.string().optional(),
    bgWhite: z.boolean().optional(),
    features: z.array(z.object({ icon: z.string(), title: z.string(), body: z.string() })).optional(),
    stats: z.array(z.object({ value: z.string(), label: z.string() })).optional(),
    cta: ctaSchema.optional(),
  }),

  z.object({
    type: z.literal("CTAForm"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    body: z.string().optional(),
    bgGrey: z.boolean().optional(),
    points: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        body: z.string(),
      }),
    ),
    leadType: z.string().default("default"),
    formTitle: z.string(),
    formSub: z.string().optional(),
    submitLabel: z.string().default("Отправить"),
    note: z.string().optional(),
    consents: z
      .array(
        z.object({
          label: z.string(),
          linkLabel: z.string().optional(),
          linkHref: z.string().optional(),
          required: z.boolean().default(true),
        }),
      )
      .optional(),
  }),

  z.object({
    type: z.literal("BlogGrid"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    bgWhite: z.boolean().optional(),
    cta: ctaSchema.optional(),
    items: z.array(
      z.object({
        href: z.string(),
        tag: z.string(),
        date: z.string(),
        title: z.string(),
        body: z.string(),
        author: z.string(),
        authorInitials: z.string(),
        readTime: z.string(),
        likes: z.string().optional(),
        cover: z
          .object({
            gradient: z.string(),
            icon: z.string().optional(),
          })
          .optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("FAQ"),
    title: z.string(),
    bgGrey: z.boolean().optional(),
    items: z.array(z.object({ q: z.string(), a: z.string() })),
  }),

  z.object({
    type: z.literal("Audience"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    items: z.array(
      z.object({
        label: z.string(),
        title: z.string(),
        body: z.string(),
        checks: z.array(z.string()),
        stats: z.array(z.object({ value: z.string(), label: z.string() })),
      }),
    ),
  }),

  z.object({
    type: z.literal("SolutionsGrid"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    bgGrey: z.boolean().optional(),
    items: z.array(
      z.object({
        href: z.string(),
        icon: z.string(),
        label: z.string(),
        body: z.string(),
        badge: z.string().optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("TrustIndicators"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    bgWhite: z.boolean().optional(),
    cards: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        body: z.string(),
      }),
    ),
    partner: z
      .object({
        name: z.string(),
        description: z.string(),
        cta: ctaSchema.optional(),
        metrics: z.array(z.object({ value: z.string(), label: z.string() })),
      })
      .optional(),
  }),

  z.object({
    type: z.literal("RoiCalc"),
    tag: z.string().optional(),
    title: z.string().optional(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgGrey: z.boolean().optional(),
  }),

  z.object({
    type: z.literal("Placeholder"),
    title: z.string(),
    note: z.string().optional(),
    bgWhite: z.boolean().optional(),
  }),

  z.object({
    type: z.literal("FeaturesGrid"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgWhite: z.boolean().optional(),
    bgGrey: z.boolean().optional(),
    items: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        body: z.string(),
        href: z.string().optional(),
      }),
    ),
  }),

  z.object({
    type: z.literal("RolesGrid"),
    tag: z.string().optional(),
    title: z.string(),
    titleHtml: z.boolean().optional(),
    sub: z.string().optional(),
    bgWhite: z.boolean().optional(),
    bgGrey: z.boolean().optional(),
    items: z.array(
      z.object({
        icon: z.string(),
        title: z.string(),
        duties: z.string(),
        criteriaLabel: z.string().optional(),
        criteria: z.array(z.string()),
      }),
    ),
  }),
]);

export type Block = z.infer<typeof blockSchema>;
export type BlockType = Block["type"];

export const pageMetaSchema = z.object({
  title: z.string(),
  description: z.string(),
  canonical: z.string().optional(),
  ogImage: z.string().optional(),
  noindex: z.boolean().optional(),
  updatedAt: z.string().optional(),
  draft: z.boolean().optional(),
});
export type PageMeta = z.infer<typeof pageMetaSchema>;

export const pageSchema = z.object({
  meta: pageMetaSchema,
  blocks: z.array(blockSchema),
});
export type Page = z.infer<typeof pageSchema>;
