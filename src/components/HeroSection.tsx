import React from 'react';
import { Language, ViewMode } from '../types';
import { translations } from '../translations';

interface HeroSectionProps {
  lang: Language;
  onExplore: () => void;
  setCurrentView: (view: ViewMode) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExplore,
  setCurrentView,
}) => {
  const t = translations[lang];

  return (
    <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 lg:px-8 py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              <span>{t.heroTag}</span>
              <span aria-hidden="true">·</span>
              <span>2026 Collection</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
              {t.heroTitle}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
              {t.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExplore}
                className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer flex items-center gap-2"
              >
                <span>{t.shopNow}</span>
                <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs`}></i>
              </button>

              <button
                onClick={() => setCurrentView('add-product')}
                className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold rounded-xl text-sm border border-slate-200 dark:border-slate-700 transition cursor-pointer flex items-center gap-2"
              >
                <i className="fa-solid fa-plus text-xs text-blue-500"></i>
                <span>{t.addProduct}</span>
              </button>
            </div>

            {/* Micro proof metrics */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-8 text-xs text-slate-500 dark:text-slate-400 font-medium">
              <div>
                <span className="block text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  2,500+
                </span>
                <span>Satisfied Customers</span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div>
                <span className="block text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  4.9 / 5.0
                </span>
                <span className="flex items-center gap-1">
                  <i className="fa-solid fa-star text-amber-400 text-[10px]"></i>
                  <span>Store Rating</span>
                </span>
              </div>
              <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
              <div>
                <span className="block text-lg font-bold text-slate-900 dark:text-white tabular-nums">
                  24-48h
                </span>
                <span>Quick Dispatch</span>
              </div>
            </div>
          </div>

          {/* Media Column */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-200/80 dark:border-slate-800 group bg-slate-100 dark:bg-slate-800 aspect-16/10">
              <img
                src="/src/assets/images/hero_store_campaign_1792831283350.jpg"
                alt="Curated Store Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border border-white/20 dark:border-slate-700/50 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 block">
                    Curated Exclusive Collection
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Premium Quality · 100% Authentic
                  </span>
                </div>
                <button
                  onClick={onExplore}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700 transition"
                >
                  View Catalog
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Trust Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-12 mt-12 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 text-lg">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.trustFastShipping}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t.trustFastShippingDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 text-lg">
              <i className="fa-solid fa-shield-halved"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.trustQuality}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t.trustQualityDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 text-lg">
              <i className="fa-solid fa-headset"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.trustSupport}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t.trustSupportDesc}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 text-lg">
              <i className="fa-solid fa-arrow-rotate-left"></i>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                {t.trustReturns}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                {t.trustReturnsDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
