"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-[#070B16]/90 backdrop-blur-xl border-b border-white/5"
          : "py-5 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"
                fill="white"
              />
              <circle cx="12" cy="12" r="3" fill="white" opacity="0.6" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            Brain<span className="gradient-text">Hire</span>
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Возможности
          </a>
          <a
            href="#how-it-works"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Как работает
          </a>
          <a
            href="#results"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Результаты
          </a>
          <a
            href="#pricing"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            Тарифы
          </a>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
          >
            Войти
          </a>
          <a
            href="#demo"
            className="btn-cta text-sm !py-2.5 !px-5 !text-sm !gap-1.5"
          >
            <span>Попробовать бесплатно</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
