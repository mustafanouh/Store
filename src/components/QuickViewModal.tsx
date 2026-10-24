import React, { useState } from 'react';
import { ProductItem, Language } from '../types';
import { translations } from '../translations';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem, quantity: number, size?: string, color?: string) => void;
  onBuyNow: (product: ProductItem, quantity: number, size?: string, color?: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (product: ProductItem) => void;
  lang: Language;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isFavorite,
  onToggleFavorite,
  lang,
}) => {
  if (!product) return null;

  const t = translations[lang];
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Default');

  const { title, image, price, originalPrice, description, category, rating } = product;
  const numericPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
  const rate = rating?.rate ?? 4.8;
  const count = rating?.count ?? 42;

  const isClothing = category?.toLowerCase().includes('clothing');
  const sizes = isClothing ? ['S', 'M', 'L', 'XL'] : [];
  const colors = [
    { name: 'Default', bg: 'bg-slate-900' },
    { name: 'Navy', bg: 'bg-blue-900' },
    { name: 'Olive', bg: 'bg-emerald-800' },
  ];

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedSize, selectedColor);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        {/* Header with Close */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="capitalize">{category || 'Store Item'}</span>
            <span aria-hidden="true">·</span>
            <span>ID #{product.id || 'N/A'}</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
          {/* Gallery / Image Column */}
          <div className="md:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 rounded-xl p-6 relative border border-slate-100 dark:border-slate-800">
            <img
              src={image}
              alt={title}
              className="max-h-64 w-full object-contain mix-blend-multiply dark:mix-blend-normal"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/img/icon.png';
              }}
            />
            <button
              onClick={() => onToggleFavorite(product)}
              className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow backdrop-blur-md transition cursor-pointer ${
                isFavorite
                  ? 'bg-rose-50 text-rose-500 dark:bg-rose-950/60'
                  : 'bg-white/90 text-slate-400 hover:text-rose-500 dark:bg-slate-800'
              }`}
            >
              <i className={`${isFavorite ? 'fa-solid' : 'fa-regular'} fa-heart text-sm`}></i>
            </button>
          </div>

          {/* Product Details Column */}
          <div className="md:col-span-7 flex flex-col">
            <div className="flex items-center gap-1.5 text-amber-500 text-xs font-semibold mb-2">
              <i className="fa-solid fa-star text-[10px]"></i>
              <span className="tabular-nums">{rate}</span>
              <span className="text-slate-400 font-normal">({count} {t.reviews})</span>
              <span className="text-emerald-600 dark:text-emerald-400 ml-auto font-medium text-xs">
                {t.inStock}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 leading-snug">
              {title}
            </h2>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">
                ${numericPrice.toFixed(2)}
              </span>
              {originalPrice && originalPrice > numericPrice && (
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 line-clamp-4">
              {description || 'Curated high-grade store article designed with premium durability and refined finish.'}
            </p>

            {/* Variants if clothing */}
            {sizes.length > 0 && (
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  {t.size}: <span className="font-bold text-blue-600">{selectedSize}</span>
                </label>
                <div className="flex gap-2">
                  {sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`w-9 h-9 rounded-lg text-xs font-bold transition cursor-pointer border ${
                        selectedSize === s
                          ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-500'
                          : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="mb-6 flex items-center gap-4">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {t.quantity}:
              </span>
              <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <i className="fa-solid fa-minus text-xs"></i>
                </button>
                <span className="px-4 text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <span>{t.addToCart}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-bolt"></i>
                <span>{t.buyNow}</span>
              </button>
            </div>

            {/* Direct WhatsApp Contact link */}
            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-500">
              <a
                href={`https://wa.me/963985690091?text=${encodeURIComponent(`مرحباً مصطفى، أود الاستفسار عن المنتج: ${title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
              >
                <i className="fa-brands fa-whatsapp text-sm"></i>
                <span>{t.directWhatsApp}</span>
              </a>
              <span className="text-[11px] text-slate-400">
                14-day return guarantee
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
