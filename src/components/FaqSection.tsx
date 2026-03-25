"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Нужны ли технические знания для запуска?",
    a: "Нет. Интерфейс BrainHire создан для руководителей и собственников бизнеса. Вы заполняете простую форму — дальше всё делает ИИ. Никакого программирования, никаких сложных настроек.",
  },
  {
    q: "На какие платформы публикуются вакансии?",
    a: "BrainHire автоматически публикует вакансии на hh.ru, Avito, SuperJob, Работа.ру и ряде других платформ. Также формируется персональная ссылка, которую можно распространять в мессенджерах и соцсетях.",
  },
  {
    q: "Как ИИ оценивает кандидатов?",
    a: "Система анализирует резюме по множеству параметров: соответствие опыта требованиям вакансии, ключевые навыки, стабильность карьеры, образование. Каждому кандидату присваивается скоринговый балл. На интервью ИИ дополнительно оценивает качество ответов и soft skills.",
  },
  {
    q: "А вдруг ИИ отсеет хорошего кандидата?",
    a: "Система настраивается под ваши требования и учитывает все нюансы вашей вакансии. Вы всегда можете посмотреть полный список откликов и скорректировать критерии. Плюс ИИ объясняет каждое решение, чтобы вы понимали логику оценки.",
  },
  {
    q: "Сколько времени занимает запуск первой вакансии?",
    a: "Около 10 минут. Вы регистрируетесь, описываете вакансию в простой форме, и BrainHire берёт всё остальное на себя — создаёт текст, публикует на платформах и начинает обрабатывать отклики.",
  },
  {
    q: "Подходит ли сервис для массового найма (10+ человек)?",
    a: "Да, именно для этого BrainHire и создавался. При срочном найме 5–10 комплектовщиков или грузчиков на склад ИИ параллельно обрабатывает все отклики и выдаёт список приоритетных кандидатов в разы быстрее любого HR-специалиста.",
  },
];

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-badge mb-4">FAQ</span>
          <h2 className="section-headline text-white mb-4 mt-4">
            Частые <span className="gradient-text">вопросы</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`glass-card rounded-2xl overflow-hidden border transition-all duration-300 ${
                open === i ? "border-indigo-500/30" : "border-white/5"
              }`}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className={`font-semibold transition-colors ${
                    open === i ? "text-white" : "text-slate-300"
                  }`}
                >
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center transition-all duration-300 ${
                    open === i
                      ? "bg-indigo-500/20 rotate-45"
                      : "bg-white/5"
                  }`}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={open === i ? "text-indigo-400" : "text-slate-400"}
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </div>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-400 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
