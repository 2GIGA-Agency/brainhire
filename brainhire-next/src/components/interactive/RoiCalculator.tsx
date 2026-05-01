"use client";

import { useMemo, useState } from "react";
import { Pencil, AlertCircle, CheckCircle2 } from "lucide-react";

/**
 * ROI-калькулятор найма. 1:1 с pages/calculator.html (.calc-*).
 *
 * Layout: вверху список input'ов «Ваши данные» (label слева, узкий input
 * 140px справа), ниже grid 2 колонки сравнения «Без BRaiN HR» / «С BRaiN HR»,
 * внизу .calc-savings — диагональный градиент с двумя метриками и вертикальным
 * делителем между ними.
 *
 * Формулы 1:1 из HTML:
 *   hourR        = fot_recruiter / 170
 *   hourM        = fot_manager / 170
 *   dayVacancy   = salary / 21
 *   relCand      = responses * 0.6
 *
 *   --- Без BRaiN HR (25 дней) ---
 *   oldRecruiter = (responses*5/60 + relCand*10/60 + 60*60/60) * hourR
 *   oldManager   = (24*10/60 + 12*60/60) * hourM
 *   oldDowntime  = dayVacancy * 25
 *
 *   --- С BRaiN HR (7 дней + 27 000 руб./мес стоимости платформы) ---
 *   newRecruiter = (20*10/60) * hourR
 *   newManager   = (20*10/60 + 5*60/60) * hourM
 *   newDowntime  = dayVacancy * 7
 *   newTotal     = newRecruiter + newManager + newDowntime + 27000
 */

const BRAIN_COST = 27000;
const OLD_DAYS = 25;
const NEW_DAYS = 7;

type Inputs = {
  fot_recruiter: number;
  fot_manager: number;
  salary: number;
  responses: number;
  vacancies_year: number;
};

const DEFAULTS: Inputs = {
  fot_recruiter: 80000,
  fot_manager: 150000,
  salary: 100000,
  responses: 500,
  vacancies_year: 24,
};

function calculate(i: Inputs) {
  const hourR = i.fot_recruiter / 170;
  const hourM = i.fot_manager / 170;
  const dayVacancy = i.salary / 21;
  const relCand = i.responses * 0.6;

  const oldRecruiter =
    (i.responses * 5) / 60 * hourR + (relCand * 10) / 60 * hourR + (60 * 60) / 60 * hourR;
  const oldManager = (24 * 10) / 60 * hourM + (12 * 60) / 60 * hourM;
  const oldDowntime = dayVacancy * OLD_DAYS;
  const oldTotal = oldRecruiter + oldManager + oldDowntime;

  const newRecruiter = (20 * 10) / 60 * hourR;
  const newManager = (20 * 10) / 60 * hourM + (5 * 60) / 60 * hourM;
  const newDowntime = dayVacancy * NEW_DAYS;
  const newTotal = newRecruiter + newManager + newDowntime + BRAIN_COST;

  const savings = oldTotal - newTotal;
  const annualSavings = savings * i.vacancies_year;

  return {
    oldRecruiter, oldManager, oldDowntime, oldTotal,
    newRecruiter, newManager, newDowntime, newTotal,
    savings, annualSavings,
  };
}

const fmt = (n: number) =>
  Math.round(n).toLocaleString("ru-RU").replace(/,/g, " ") + " руб.";

export function RoiCalculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const r = useMemo(() => calculate(inputs), [inputs]);

  const onChange = (key: keyof Inputs) => (e: React.ChangeEvent<HTMLInputElement>) => {
    // Принимаем только цифры — пользователь может вставить «80 000» из буфера,
    // мы вычистим пробелы и парсим как целое.
    const cleaned = e.target.value.replace(/[^\d]/g, "");
    const raw = cleaned === "" ? 0 : Number(cleaned);
    setInputs((prev) => ({ ...prev, [key]: Number.isFinite(raw) ? raw : 0 }));
  };

  return (
    <div id="calculator" className="mx-auto max-w-[960px] overflow-hidden rounded-card border-[1.5px] border-grey2 bg-white shadow-md">
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-grey2 bg-grey1 px-10 py-7 max-bp-sm:p-5">
        <div>
          <h3 className="text-[20px] font-extrabold text-text1">
            Калькулятор стоимости закрытия вакансии
          </h3>
          <p className="text-[14px] text-text2">
            Измените значения в полях, чтобы увидеть персональный расчёт
          </p>
        </div>
      </div>

      {/* BODY */}
      <div className="p-10 max-bp-sm:px-5 max-bp-sm:py-6">
        {/* INPUTS */}
        <div className="mb-8">
          <ColTitle accent="brand1">
            <Pencil size={18} strokeWidth={1.8} className="text-brand1" />
            Ваши данные
          </ColTitle>

          <CalcInputRow label="ФОТ рекрутера (руб./мес)" value={inputs.fot_recruiter} onChange={onChange("fot_recruiter")} />
          <CalcInputRow label="ФОТ руководителя (руб./мес)" value={inputs.fot_manager} onChange={onChange("fot_manager")} />
          <CalcInputRow label="Зарплата специалиста по вакансии (руб./мес)" value={inputs.salary} onChange={onChange("salary")} />
          <CalcInputRow label="Количество откликов на вакансию" value={inputs.responses} onChange={onChange("responses")} />
          <CalcInputRow label="Количество вакансий в год" value={inputs.vacancies_year} onChange={onChange("vacancies_year")} isLast />
        </div>

        {/* COMPARISON GRID */}
        <div className="grid grid-cols-2 gap-12 max-bp-lg:grid-cols-1 max-bp-lg:gap-8">
          {/* Без BRaiN HR */}
          <div>
            <ColTitle accent="danger">
              <AlertCircle size={16} strokeWidth={1.8} className="text-[#F04438]" />
              Без BRaiN HR
            </ColTitle>
            <CalcResultRow label="Время закрытия" value={`${OLD_DAYS} дней`} />
            <CalcResultRow label="Стоимость рекрутера" value={fmt(r.oldRecruiter)} />
            <CalcResultRow label="Стоимость руководителя" value={fmt(r.oldManager)} />
            <CalcResultRow label="Цена простоя позиции" value={fmt(r.oldDowntime)} />
            {/* Невидимая строка-заполнитель для выравнивания высоты с правой колонкой */}
            <div
              className="flex items-center justify-between gap-3 border-b border-grey1 py-3 text-[14px]"
              style={{ visibility: "hidden" }}
            >
              <span className="flex-1 text-text2">&nbsp;</span>
              <span className="text-right font-bold text-text1">&nbsp;</span>
            </div>
            <Total tone="bad" total={fmt(r.oldTotal)} />
          </div>

          {/* С BRaiN HR */}
          <div>
            <ColTitle accent="brand1">
              <CheckCircle2 size={16} strokeWidth={1.8} className="text-brand1" />
              С BRaiN HR
            </ColTitle>
            <CalcResultRow label="Время закрытия" value={`${NEW_DAYS} дней`} highlight />
            <CalcResultRow label="Стоимость рекрутера" value={fmt(r.newRecruiter)} />
            <CalcResultRow label="Стоимость руководителя" value={fmt(r.newManager)} />
            <CalcResultRow label="Цена простоя позиции" value={fmt(r.newDowntime)} />
            <CalcResultRow label="Стоимость BRaiN HR" value={fmt(BRAIN_COST)} />
            <Total tone="good" total={fmt(r.newTotal)} />
          </div>
        </div>

        {/* SAVINGS */}
        <div className="mt-8 rounded-card border border-brand1/25 bg-[linear-gradient(135deg,var(--color-brand1-bg)_0%,rgba(64,150,255,0.05)_100%)] p-8 text-center">
          <div className="flex flex-wrap justify-center gap-12 max-bp-sm:flex-col max-bp-sm:gap-5">
            <div className="text-center">
              <div className="mb-1 text-[40px] font-black tracking-[-1px] text-brand1 max-bp-sm:text-[28px]">
                {fmt(r.savings)}
              </div>
              <div className="text-[14px] font-semibold text-brand3">
                выгода на каждой вакансии
              </div>
            </div>
            <div className="w-px self-stretch bg-brand1/30 max-bp-sm:h-px max-bp-sm:w-[60px] max-bp-sm:self-center" />
            <div className="text-center">
              <div className="mb-1 text-[40px] font-black tracking-[-1px] text-brand2 max-bp-sm:text-[28px]">
                {fmt(r.annualSavings)}
              </div>
              <div className="text-[14px] font-semibold text-brand3">
                экономия за год
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── helpers ─────────────────────────────────────────────────────── */

function ColTitle({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent: "brand1" | "danger";
}) {
  const borderCls =
    accent === "brand1" ? "border-brand1/30" : "border-grey2";
  const colorCls = accent === "brand1" ? "text-text2" : "text-text2";
  return (
    <div
      className={`mb-5 flex items-center gap-2 border-b ${borderCls} pb-2.5 text-[15px] font-bold ${colorCls}`}
    >
      {children}
    </div>
  );
}

function CalcInputRow({
  label,
  value,
  onChange,
  isLast,
}: {
  label: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLast?: boolean;
}) {
  return (
    <div
      className={
        "flex items-center justify-between gap-3 py-3 text-[14px]" +
        (isLast ? "" : " border-b border-grey1")
      }
    >
      <span className="flex-1 text-text2">{label}</span>
      <input
        type="text"
        inputMode="numeric"
        min={0}
        value={value === 0 ? "" : String(value)}
        onChange={onChange}
        className="w-[140px] rounded-sm border-[1.5px] border-grey2 px-3.5 py-[9px] text-right font-display text-[14px] font-semibold text-text1 outline-none transition-colors focus:border-brand1 focus:ring-[3px] focus:ring-brand1/15 max-bp-sm:w-[110px]"
      />
    </div>
  );
}

function CalcResultRow({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-grey1 py-3 text-[14px] last:border-b-0">
      <span className="flex-1 text-text2">{label}</span>
      <span
        className={
          "whitespace-nowrap text-right font-bold " +
          (highlight ? "text-[16px] text-brand1" : "text-text1")
        }
      >
        {value}
      </span>
    </div>
  );
}

function Total({ tone, total }: { tone: "bad" | "good"; total: string }) {
  const cls =
    tone === "bad"
      ? "border-[rgba(240,68,56,0.2)] bg-[rgba(240,68,56,0.06)] text-[#F04438]"
      : "border-brand1/25 bg-brand1-bg text-brand1";

  return (
    <div
      className={`mt-4 flex items-center justify-between rounded-sm border px-6 py-[18px] text-[15px] font-bold ${cls}`}
    >
      <span>Итого на 1 вакансию</span>
      <span className="text-[24px] font-black tracking-[-0.5px]">{total}</span>
    </div>
  );
}
