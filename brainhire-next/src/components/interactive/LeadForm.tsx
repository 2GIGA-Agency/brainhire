"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { reachGoal, YM_GOALS } from "@/lib/analytics";

const ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_ENDPOINT ?? "/api/email/demo/";

export type Consent = {
  id: string;
  text: React.ReactNode;
  required: boolean;
  defaultChecked?: boolean;
};

const DEFAULT_CONSENTS: Consent[] = [
  {
    id: "privacy",
    required: true,
    defaultChecked: true,
    text: (
      <>
        Я ознакомлен с{" "}
        <a
          href="/docs/privacy-policy"
          className="text-brand1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          политикой обработки персональных данных
        </a>
      </>
    ),
  },
  {
    id: "personal",
    required: true,
    defaultChecked: true,
    text: (
      <>
        Даю согласие на{" "}
        <a
          href="/docs/personal-data-consent"
          className="text-brand1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          обработку персональных данных
        </a>
      </>
    ),
  },
  {
    id: "agreement",
    required: true,
    defaultChecked: true,
    text: (
      <>
        Принимаю условия{" "}
        <a
          href="/docs/user-agreement"
          className="text-brand1 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          пользовательского соглашения
        </a>
      </>
    ),
  },
  {
    id: "newsletter",
    required: false,
    defaultChecked: false,
    text: <>Я согласен получать рекламные и информационные рассылки</>,
  },
];

type Status = "idle" | "submitting" | "success" | "error";

type LeadFormProps = {
  /** Заголовок над формой (отрисовывается компонентом сверху). */
  title?: string;
  /** Подзаголовок. */
  subtitle?: string;
  /** Текст submit-кнопки. */
  submitLabel?: string;
  /** Тип лида — для трекинга на бэкенде (необязательно). */
  leadType?: string;
  /** Кастомизация согласий (например /reviews может хотеть другие). */
  consents?: Consent[];
  /** Дополнительные классы на корневом контейнере. */
  className?: string;
  /** Тонкая вариация: form внутри уже стилизованной карточки (без shadow/border). */
  variant?: "card" | "bare";
};

function fieldClass(invalid: boolean) {
  return [
    "w-full rounded-[8px] border bg-white px-3.5 py-3 text-[13px] text-text1 placeholder:text-text2 focus:outline-none focus:ring-2",
    invalid
      ? "border-[#F04438] focus:border-[#F04438] focus:ring-[#F04438]/20"
      : "border-grey2 focus:border-brand1 focus:ring-brand1/20",
  ].join(" ");
}

export function LeadForm({
  title = "Запросить демо",
  subtitle = "Заполните форму, и мы свяжемся с вами в течение рабочего дня",
  submitLabel = "Запросить демо",
  leadType,
  consents = DEFAULT_CONSENTS,
  className,
  variant = "card",
}: LeadFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(form: HTMLFormElement) {
    const data = new FormData(form);
    const next: Record<string, string> = {};

    const firstName = String(data.get("first_name") ?? "").trim();
    const company = String(data.get("company_name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phoneRaw = String(data.get("phone") ?? "").trim();
    const phoneDigits = phoneRaw.replace(/\D/g, "");

    if (firstName.length < 2) next.first_name = "Минимум 2 символа";
    if (company.length < 1) next.company_name = "Укажите название компании";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Некорректный email";
    if (phoneDigits.length < 9 || phoneDigits.length > 20)
      next.phone = "Минимум 9 цифр";

    for (const c of consents) {
      if (c.required && !data.get(`consent_${c.id}`)) {
        next[`consent_${c.id}`] = "Обязательно";
      }
    }

    // Honeypot — если заполнен, тихо считаем ботом
    if (String(data.get("website") ?? "").length > 0) {
      next._bot = "spam";
    }

    setErrors(next);
    return { ok: Object.keys(next).length === 0, firstName, company, email, phoneDigits };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const form = e.currentTarget;
    const v = validate(form);
    if (!v.ok) return;

    setStatus("submitting");
    setErrorMsg("");

    try {
      const body = {
        first_name: v.firstName,
        company_name: v.company,
        email: v.email,
        phone: v.phoneDigits,
        ...(leadType ? { lead_type: leadType } : {}),
      };

      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      reachGoal(YM_GOALS.leadForm);
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        "Произошла ошибка при отправке заявки. Попробуйте позже или свяжитесь с нами напрямую.",
      );
      console.error("[LeadForm] submit failed:", err);
    }
  }

  const wrapClass =
    variant === "card"
      ? "rounded-card border border-grey2 bg-white p-8 shadow-md"
      : "";

  if (status === "success") {
    return (
      <div className={[wrapClass, className].filter(Boolean).join(" ")}>
        <div className="flex flex-col items-center gap-4 py-6 text-center">
          <span className="inline-flex size-14 items-center justify-center rounded-full bg-brand1-bg text-brand1">
            <CheckCircle2 size={28} strokeWidth={2} />
          </span>
          <div>
            <div className="text-[18px] font-extrabold text-text1">
              Заявка отправлена
            </div>
            <p className="mt-2 text-[14px] leading-[1.6] text-text2">
              Мы свяжемся с вами в течение рабочего дня. Спасибо!
            </p>
          </div>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-1 text-[13px] font-semibold text-brand1 hover:underline"
          >
            Отправить ещё одну
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={[wrapClass, className].filter(Boolean).join(" ")}>
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <div className="mb-1 text-[18px] font-bold text-text1">{title}</div>
          )}
          {subtitle && <div className="text-[14px] text-text2">{subtitle}</div>}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        noValidate
        className="grid grid-cols-2 gap-3.5"
      >
        {/* Honeypot — должно остаться пустым у людей */}
        <div
          className="absolute left-[-9999px] top-[-9999px]"
          aria-hidden="true"
        >
          <label>
            Сайт
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              defaultValue=""
            />
          </label>
        </div>

        <Field
          name="first_name"
          label="Имя"
          placeholder="Как к вам обращаться"
          autoComplete="given-name"
          error={errors.first_name}
        />
        <Field
          name="company_name"
          label="Компания"
          placeholder="Название компании"
          autoComplete="organization"
          error={errors.company_name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          placeholder="email@company.ru"
          autoComplete="email"
          error={errors.email}
        />
        <Field
          name="phone"
          label="Телефон"
          type="tel"
          placeholder="+7 (___) ___-__-__"
          autoComplete="tel"
          error={errors.phone}
        />

        {consents.map((c) => (
          <label
            key={c.id}
            className="col-span-2 flex cursor-pointer items-start gap-2 text-[13px] text-text2"
          >
            <input
              type="checkbox"
              name={`consent_${c.id}`}
              defaultChecked={c.defaultChecked}
              required={c.required}
              className="mt-0.5 accent-brand1"
            />
            <span>{c.text}</span>
          </label>
        ))}

        {status === "error" && (
          <div className="col-span-2 flex items-start gap-2 rounded-md border border-[#F04438]/30 bg-[#F04438]/[0.06] px-3 py-2.5 text-[13px] text-[#B42318]">
            <AlertCircle size={16} className="mt-0.5 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="col-span-2 mt-2 inline-flex items-center justify-center gap-2 rounded-[8px] bg-brand1 px-5 py-3.5 text-[14px] font-bold text-white shadow-soft transition-all hover:bg-brand1-h hover:-translate-y-px hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {status === "submitting" ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Отправляем…
            </>
          ) : (
            <>{submitLabel} →</>
          )}
        </button>
      </form>
    </div>
  );
}

type FieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  error?: string;
};

function Field({ name, label, placeholder, type = "text", autoComplete, error }: FieldProps) {
  return (
    <div className="col-span-2 [@media(min-width:480px)]:col-span-1">
      <label
        htmlFor={`lf-${name}`}
        className="mb-1.5 block text-[12px] font-semibold text-text1"
      >
        {label}
      </label>
      <input
        id={`lf-${name}`}
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass(Boolean(error))}
      />
      {error && (
        <div className="mt-1 text-[11px] font-medium text-[#B42318]">{error}</div>
      )}
    </div>
  );
}
