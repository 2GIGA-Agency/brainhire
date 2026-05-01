import { Container } from "@/components/ui/Container";
import { InlineHtml } from "@/components/ui/InlineHtml";
import { Icon } from "@/components/ui/Icon";
import { LeadForm, type Consent } from "@/components/interactive/LeadForm";
import { cn } from "@/lib/cn";
import type { BlockOf } from "./_types";

type Props = BlockOf<"CTAForm">;

export function CTAForm({
  tag,
  title,
  titleHtml,
  body,
  points,
  leadType,
  formTitle,
  formSub,
  submitLabel,
  consents,
  note,
  bgGrey,
}: Props) {
  // Конвертируем consents из JSON-схемы в формат LeadForm
  const leadConsents: Consent[] | undefined = consents?.map((c, i) => ({
    id: `c${i}`,
    required: c.required,
    defaultChecked: c.required,
    text: c.linkHref && c.linkLabel ? (
      <>
        {c.label}{" "}
        <a
          href={c.linkHref}
          className="text-brand1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {c.linkLabel}
        </a>
      </>
    ) : (
      <>{c.label}</>
    ),
  }));

  return (
    <section
      id="form"
      className={cn(
        "py-20 max-bp-lg:py-14",
        bgGrey ? "border-y border-grey2 bg-grey1" : "border-t border-grey2 bg-white",
      )}
    >
      <Container className="grid grid-cols-2 items-start gap-20 max-bp-xl:grid-cols-1 max-bp-xl:gap-12">
        <div>
          {tag && (
            <div className="mb-4 inline-flex items-center rounded-full border border-brand1/25 bg-brand1-bg px-3 py-1 text-[11px] font-bold uppercase tracking-[1.2px] text-brand1">
              {tag}
            </div>
          )}
          {titleHtml ? (
            <InlineHtml
              as="h2"
              html={title}
              className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1 [&_em]:not-italic [&_em]:text-brand1"
            />
          ) : (
            <h2 className="text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.18] tracking-[-0.7px] text-text1">
              {title}
            </h2>
          )}
          {body && <p className="mt-5 text-[15px] leading-[1.72] text-text2">{body}</p>}

          {points.length > 0 && (
            <ul className="mt-7 flex flex-col gap-3">
              {points.map((p) => (
                <li
                  key={p.title}
                  className="flex items-start gap-4 rounded-[10px] border border-grey2 bg-grey1 px-4 py-3.5"
                >
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border border-brand1/20 bg-brand1-bg text-brand1">
                    <Icon name={p.icon} size={18} />
                  </span>
                  <div className="text-[13px] text-text2">
                    <strong className="block text-text1">{p.title}</strong>
                    {p.body}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <LeadForm
          title={formTitle}
          subtitle={formSub}
          submitLabel={submitLabel}
          leadType={leadType}
          {...(leadConsents ? { consents: leadConsents } : {})}
        />
      </Container>

      {note && (
        <Container className="mt-4">
          <p
            className="text-center text-[12px] leading-[1.55] text-text2 [&_a]:text-brand1 [&_a]:hover:underline"
            dangerouslySetInnerHTML={{ __html: note }}
          />
        </Container>
      )}
    </section>
  );
}
