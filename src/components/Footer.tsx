export default function Footer() {
  return (
    <footer className="relative py-12 px-4 sm:px-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="3" fill="white" />
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Brain<span className="gradient-text">Hire</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              ИИ-рекрутер для маркетплейсов. Автоматизируем найм
              складских сотрудников с результатом за 3 дня.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <div className="text-white font-semibold mb-3">Продукт</div>
              <ul className="space-y-2">
                {["Возможности", "Тарифы", "Интеграции", "API"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-3">Компания</div>
              <ul className="space-y-2">
                {["О нас", "Блог", "Карьера", "Контакты"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="text-white font-semibold mb-3">Отрасли</div>
              <ul className="space-y-2">
                {["Маркетплейсы", "Ритейл", "Логистика", "Производство"].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="separator-glow mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-600 text-sm">
            © 2025 BrainHire. Все права защищены.
          </p>
          <div className="flex items-center gap-4 text-sm">
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="text-slate-600 hover:text-slate-400 transition-colors">
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
