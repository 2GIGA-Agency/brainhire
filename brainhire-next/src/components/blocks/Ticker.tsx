import { Icon } from "@/components/ui/Icon";
import type { BlockOf } from "./_types";

type Props = BlockOf<"Ticker">;

export function Ticker({ items }: Props) {
  // Дублируем массив для seamless loop
  const doubled = [...items, ...items];

  return (
    <div className="border-y border-grey2 bg-grey1 py-3.5 overflow-hidden">
      <div className="flex w-max gap-10 animate-ticker">
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex shrink-0 items-center gap-2 whitespace-nowrap text-[13px] font-medium text-text2"
          >
            {item.icon && (
              <span className="text-brand1">
                <Icon name={item.icon} size={16} />
              </span>
            )}
            <b className="font-bold text-text1">{item.bold}</b>
            {item.text && <span>— {item.text}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
