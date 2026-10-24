import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';

interface FeaturedCategoriesProps {
  lang: Language;
  onSelectCategory: (category: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({
  lang,
  onSelectCategory,
}) => {
  const t = translations[lang];

  return (
    <section className="py-10 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
              {t.featuredSpotlights}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Curated by department with hand-picked highlights
            </p>
          </div>
          <button
            onClick={() => onSelectCategory('All')}
            className="text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.allProducts}</span>
            <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs`}></i>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Fashion Spotlight */}
          <div
            onClick={() => onSelectCategory("men's clothing")}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700/60 cursor-pointer aspect-16/9 bg-slate-100 dark:bg-slate-800"
          >
            <img
              src="/src/assets/images/fashion_collection_showcase_1792831283777.jpg"
              alt="Fashion Spotlight"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400">
                Department Spotlight
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {t.fashionSpotlight}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-1">
                {t.fashionSpotlightDesc}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs px-3 py-1.5 rounded-lg transition">
                  <span>Explore Fashion</span>
                  <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-[10px]`}></i>
                </span>
              </div>
            </div>
          </div>

          {/* Tech Spotlight */}
          <div
            onClick={() => onSelectCategory('electronics')}
            className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700/60 cursor-pointer aspect-16/9 bg-slate-100 dark:bg-slate-800"
          >
            <img
              src="/src/assets/images/tech_accessories_showcase_1792831283338.jpg"
              alt="Tech Spotlight"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
              <span className="text-[11px] font-semibold tracking-wider uppercase text-blue-400">
                Department Spotlight
              </span>
              <h3 className="text-xl sm:text-2xl font-bold">
                {t.techSpotlight}
              </h3>
              <p className="text-xs text-slate-200 line-clamp-1">
                {t.techSpotlightDesc}
              </p>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 hover:bg-white/30 backdrop-blur-xs px-3 py-1.5 rounded-lg transition">
                  <span>Explore Tech</span>
                  <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-[10px]`}></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
