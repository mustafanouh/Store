import React, { useState } from 'react';
import { CartItem, Language } from '../types';
import { translations } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string | number | undefined, delta: number) => void;
  onRemoveItem: (id: string | number | undefined) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  discountRate: number;
  onApplyCoupon: (code: string) => boolean;
  lang: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  discountRate,
  onApplyCoupon,
  lang,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<string | null>(null);
  const t = translations[lang];

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const p = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
    return sum + p * item.quantity;
  }, 0);

  const discountAmount = subtotal * discountRate;
  const freeShippingThreshold = 50;
  const shippingAmount = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 4.99;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingAmount);
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingPercentage = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = onApplyCoupon(couponCode.trim().toUpperCase());
    if (success) {
      setCouponFeedback(t.promoApplied);
    } else {
      setCouponFeedback(t.promoInvalid);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-bag-shopping text-blue-600 text-lg"></i>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {t.cart} ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-5 py-3 bg-blue-50/70 dark:bg-blue-950/40 border-b border-blue-100/60 dark:border-blue-900/30">
          <div className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-1.5 flex items-center justify-between">
            <span>
              {remainingForFreeShipping === 0
                ? t.freeShippingUnlocked
                : t.freeShippingAway(remainingForFreeShipping)}
            </span>
            <span className="tabular-nums font-bold">
              {freeShippingPercentage.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-blue-200 dark:bg-blue-900/50 h-2 rounded-full overflow-hidden">
            <div
              className="bg-blue-600 h-full rounded-full transition-all duration-300"
              style={{ width: `${freeShippingPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-slate-100 dark:divide-slate-800">
          {cart.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 text-2xl">
                <i className="fa-solid fa-bag-shopping"></i>
              </div>
              <h4 className="text-base font-bold text-slate-800 dark:text-white">
                {t.cartEmpty}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-6 max-w-xs mx-auto">
                {t.cartEmptyDesc}
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
              >
                {t.exploreProducts}
              </button>
            </div>
          ) : (
            cart.map((item, idx) => {
              const itemPrice =
                typeof item.price === 'number'
                  ? item.price
                  : parseFloat(item.price) || 0;
              return (
                <div key={`cart-drawer-${item.id ?? idx}`} className="py-4 flex gap-3">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain bg-slate-50 dark:bg-slate-800 rounded-lg p-1.5 border border-slate-100 dark:border-slate-800 shrink-0"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/img/icon.png';
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                      {item.title}
                    </h5>
                    {(item.selectedSize || item.selectedColor) && (
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.selectedSize && `Size: ${item.selectedSize}`}
                        {item.selectedColor && ` · ${item.selectedColor}`}
                      </span>
                    )}
                    <div className="text-xs font-bold text-blue-600 dark:text-blue-400 tabular-nums mt-1">
                      ${itemPrice.toFixed(2)}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                          <i className="fa-solid fa-minus text-[10px]"></i>
                        </button>
                        <span className="px-2.5 text-xs font-bold tabular-nums text-slate-800 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                        >
                          <i className="fa-solid fa-plus text-[10px]"></i>
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-slate-400 hover:text-rose-500 p-1 transition cursor-pointer text-xs"
                        title="Remove"
                      >
                        <i className="fa-regular fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Drawer Footer & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                placeholder={t.promoCode}
                className="flex-1 uppercase tracking-wider text-xs px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                {t.apply}
              </button>
            </form>
            {couponFeedback && (
              <p className={`text-[11px] font-medium ${discountRate > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {couponFeedback}
              </p>
            )}

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex justify-between">
                <span>{t.subtotal}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>{t.discount} (10%)</span>
                  <span className="font-semibold tabular-nums">
                    -${discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{t.shipping}</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                  {shippingAmount === 0 ? t.free : `$${shippingAmount.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
                <span>{t.total}</span>
                <span className="text-base text-blue-600 dark:text-blue-400 tabular-nums">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={onClearCart}
                className="px-3 py-3 border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold transition cursor-pointer"
              >
                {t.clearCart}
              </button>
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{t.checkout}</span>
                <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-xs`}></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
