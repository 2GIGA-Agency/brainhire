import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";
import type { NavItem } from "@/types/content";

type MegaItem = Extract<NavItem, { type: "mega" }>;

type Props = {
  item: MegaItem;
  isOpen: boolean;
  subOpenId: string | null;
  onPanelEnter: () => void;
  onPanelLeave: () => void;
  onSubEnter: (id: string) => void;
  onSubLeave: () => void;
  onLinkClick: () => void;
};

/**
 * Серверный компонент мегапанели. Рендерит data из site.json:
 * - mega "how": одна колонка с section-блоками (с подпунктами или прямыми)
 * - mega "solutions": 3 колонки c заголовками «По размеру / По отрасли / Маркетплейсы»
 *
 * Видимость управляется CSS (data-open) — открытие/закрытие из HeaderNav через state.
 */
export function MegaPanel({
  item,
  isOpen,
  subOpenId,
  onPanelEnter,
  onPanelLeave,
  onSubEnter,
  onSubLeave,
  onLinkClick,
}: Props) {
  const isHowMenu = item.id === "how";

  return (
    <div
      data-open={isOpen}
      onMouseEnter={onPanelEnter}
      onMouseLeave={onPanelLeave}
      className={cn(
        "absolute left-0 top-full z-[999] mt-px hidden rounded-b-card border border-grey2 bg-white shadow-[0_8px_32px_rgba(17,38,58,0.12)]",
        "data-[open=true]:flex",
        isHowMenu ? "min-w-[300px] p-2" : "min-w-[270px] gap-2 p-2",
      )}
      role="menu"
    >
      {item.columns.map((col, ci) => (
        <div
          key={ci}
          className={cn("flex flex-col gap-0.5", !isHowMenu && "min-w-[180px]")}
        >
          {col.label && (
            <div className="px-3.5 pb-1 pt-2 text-[11px] font-bold uppercase tracking-[0.5px] text-text2">
              {col.label}
            </div>
          )}
          {col.items.map((sub, si) => {
            if (sub.type === "link") {
              return (
                <Link
                  key={sub.href + si}
                  href={sub.href}
                  onClick={onLinkClick}
                  role="menuitem"
                  className="block whitespace-nowrap rounded-sm px-3.5 py-[9px] text-[13px] font-medium text-text1 transition-colors hover:bg-grey1 hover:text-brand1"
                >
                  {sub.label}
                </Link>
              );
            }
            // section
            const hasSub = Boolean(sub.subItems && sub.subItems.length > 0);
            const subId = `${item.id}:${sub.label}`;
            const isSubOpen = hasSub && subOpenId === subId;

            const inner = (
              <span className="flex items-center gap-3">
                {sub.icon && (
                  <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-md bg-brand1-bg text-brand1">
                    <Icon name={sub.icon} size={20} />
                  </span>
                )}
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-bold text-text1">{sub.label}</span>
                  {sub.description && (
                    <span className="block text-[11px] leading-[1.4] text-text2">
                      {sub.description}
                    </span>
                  )}
                </span>
                {hasSub && <ChevronRight size={14} strokeWidth={1.8} className="shrink-0 text-text2" />}
              </span>
            );

            if (hasSub) {
              return (
                <div
                  key={subId}
                  className="relative"
                  data-sub-open={isSubOpen}
                  onMouseEnter={() => onSubEnter(subId)}
                  onMouseLeave={onSubLeave}
                >
                  <div
                    role="menuitem"
                    aria-haspopup="true"
                    aria-expanded={isSubOpen}
                    className="cursor-pointer rounded-sm px-3 py-2.5 transition-colors hover:bg-grey1 data-[active=true]:bg-grey1"
                    data-active={isSubOpen}
                  >
                    {inner}
                  </div>
                  <SubPanel
                    items={sub.subItems!}
                    isOpen={isSubOpen}
                    onLinkClick={onLinkClick}
                  />
                </div>
              );
            }

            return (
              <Link
                key={subId}
                href={sub.href ?? "#"}
                onClick={onLinkClick}
                role="menuitem"
                className="rounded-sm px-3 py-2.5 transition-colors hover:bg-grey1"
              >
                {inner}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}

function SubPanel({
  items,
  isOpen,
  onLinkClick,
}: {
  items: NonNullable<Extract<MegaItem["columns"][number]["items"][number], { type: "section" }>["subItems"]>;
  isOpen: boolean;
  onLinkClick: () => void;
}) {
  return (
    <div
      data-open={isOpen}
      className={cn(
        "absolute left-[calc(100%+4px)] top-0 z-[1000] hidden min-w-[320px] flex-col gap-0.5 rounded-card border border-grey2 bg-white p-2 shadow-[0_8px_32px_rgba(17,38,58,0.12)]",
        "data-[open=true]:flex",
        "max-bp-xl:left-auto max-bp-xl:right-[calc(100%+4px)]",
      )}
      role="menu"
    >
      {items.map((sub) => (
        <Link
          key={sub.href}
          href={sub.href}
          onClick={onLinkClick}
          role="menuitem"
          className="flex items-start gap-3 rounded-sm p-2.5 transition-colors hover:bg-grey1"
        >
          {sub.icon && (
            <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-md bg-brand1-bg text-brand1">
              <Icon name={sub.icon} size={16} />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="block text-[13px] font-semibold text-text1">{sub.label}</span>
            {sub.description && (
              <span className="block text-[11px] leading-[1.4] text-text2">
                {sub.description}
              </span>
            )}
          </span>
        </Link>
      ))}
    </div>
  );
}
