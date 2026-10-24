import React from 'react';
import { ProductItem, Language } from '../types';
import { translations } from '../translations';

interface ProductCardProps {
  product: ProductItem;
  isFavorite: boolean;
  onToggleFavorite: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  lang: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  lang,
}) => {
  const { title, image, price, originalPrice, category, rating } = product;
  const t = translations[lang];

  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  const rate = rating?.rate ?? 4.7;
  const reviewCount = rating?.count ?? 38;

  return (
    <div className="group bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/90 dark:border-slate-700/70 p-4 flex flex-col h-full shadow-xs hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container with Quick View & Favorite Buttons */}
      <div className="relative w-full aspect-square rounded-xl bg-slate-50 dark:bg-slate-900 p-4 flex items-center justify-center overflow-hidden mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal transition-transform duration-500 group-hover:scale-108"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/img/icon.png';
          }}
        />

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product);
          }}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center shadow-md backdrop-blur-md transition-all cursor-pointer ${
            isFavorite
              ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-400 ring-1 ring-rose-200 dark:ring-rose-800'
              : 'bg-white/90 text-slate-500 hover:text-rose-500 dark:bg-slate-800/90 dark:text-slate-300'
          }`}
          title={isFavorite ? t.favoriteRemoved : t.favoriteAdded}
        >
          <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`}></i>
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:block">
          <button
            onClick={() => onQuickView(product)}
            className="w-full py-2 bg-slate-900/90 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg backdrop-blur-xs shadow transition cursor-pointer flex items-center justify-center gap-1.5"
          >
            <i className="fa-regular fa-eye text-xs"></i>
            <span>{t.quickView}</span>
          </button>
        </div>
      </div>

      {/* Metadata (Unboxed text with dots) */}
      <div className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-400 mb-1.5">
        <span className="capitalize">{category || 'General'}</span>
        <span aria-hidden="true">·</span>
        <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-semibold tabular-nums">
          <i className="fa-solid fa-star text-[10px]"></i>
          <span>{rate}</span>
          <span className="text-slate-400 font-normal">({reviewCount})</span>
        </div>
      </div>

      {/* Title */}
      <h3
        onClick={() => onQuickView(product)}
        className="text-sm font-semibold text-slate-800 dark:text-slate-100 line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer mb-3 leading-snug"
        title={title}
      >
        {title}
      </h3>

      {/* Price & Action row */}
      <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-bold text-slate-900 dark:text-white tabular-nums">
              ${numericPrice.toFixed(2)}
            </span>
            {originalPrice && originalPrice > numericPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
            <i className="fa-solid fa-check text-[9px]"></i>
            <span>{t.inStock}</span>
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Quick View for mobile */}
          <button
            onClick={() => onQuickView(product)}
            className="sm:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition cursor-pointer text-xs"
            title={t.quickView}
          >
            <i className="fa-regular fa-eye"></i>
          </button>

          {/* Add to Cart Button */}
          <button
            onClick={() => onAddToCart(product)}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-semibold rounded-lg shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
            title={t.addToCart}
          >
            <i className="fa-solid fa-bag-shopping text-xs"></i>
            <span className="hidden sm:inline">{t.addToCart}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
