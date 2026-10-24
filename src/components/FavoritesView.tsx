import React from 'react';
import Swal from 'sweetalert2';
import { ProductItem, ViewMode, Language } from '../types';
import { ProductCard } from './ProductCard';
import { translations } from '../translations';

interface FavoritesViewProps {
  favorites: ProductItem[];
  onToggleFavorite: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onQuickView: (product: ProductItem) => void;
  onClearFavorites: () => void;
  setCurrentView: (view: ViewMode) => void;
  lang: Language;
}

export const FavoritesView: React.FC<FavoritesViewProps> = ({
  favorites,
  onToggleFavorite,
  onAddToCart,
  onQuickView,
  onClearFavorites,
  setCurrentView,
  lang,
}) => {
  const t = translations[lang];

  const handleClear = () => {
    Swal.fire({
      title: 'Clear Favorites?',
      text: 'Are you sure you want to remove all saved items from your wishlist?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#94a3b8',
      confirmButtonText: 'Yes, clear all',
    }).then((res) => {
      if (res.isConfirmed) {
        onClearFavorites();
      }
    });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-[75vh]">
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 mb-8 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('home')}
            className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            title="Back to products"
          >
            <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left'} text-lg`}></i>
          </button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <i className="fa-solid fa-heart text-rose-500 text-xl"></i>
              <span>{t.favorites} ({favorites.length})</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Saved items you want to keep an eye on or buy later
            </p>
          </div>
        </div>

        {favorites.length > 0 && (
          <button
            onClick={handleClear}
            className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fa-regular fa-trash-can"></i>
            <span>{t.clearFavorites}</span>
          </button>
        )}
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 max-w-lg mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-rose-50 dark:bg-rose-950/40 rounded-full flex items-center justify-center text-rose-400 text-2xl">
            <i className="fa-regular fa-heart"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            {t.noFavorites}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            Click the heart icon on any card to store items here for quick retrieval.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow transition cursor-pointer"
          >
            {t.exploreProducts}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((product, idx) => (
            <ProductCard
              key={`favorite-card-${product.id ?? idx}`}
              product={product}
              isFavorite={true}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              lang={lang}
            />
          ))}
        </div>
      )}
    </div>
  );
};
