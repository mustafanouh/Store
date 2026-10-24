import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { CartItem, Order, Language } from '../types';
import { translations } from '../translations';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  subtotal: number;
  discountRate: number;
  onOrderSuccess: (order: Order) => void;
  lang: Language;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  subtotal,
  discountRate,
  onOrderSuccess,
  lang,
}) => {
  if (!isOpen) return null;

  const t = translations[lang];

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+963 ');
  const [city, setCity] = useState('Damascus');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'card'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const discountAmount = subtotal * discountRate;
  const shippingAmount = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingAmount);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all delivery details.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber: `ST-2026-${randomSuffix}`,
      date: new Date().toLocaleDateString(lang === 'ar' ? 'ar-SY' : 'en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      discount: discountAmount,
      shipping: shippingAmount,
      total: totalAmount,
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      paymentMethod,
      status: 'Processing',
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
      onClose();

      Swal.fire({
        title: t.orderConfirmed,
        html: `
          <div style="text-align: left; font-size: 13px; line-height: 1.6; color: #475569; margin-top: 8px;">
            <p style="font-weight: 700; color: #1e3a8a; font-size: 15px;">${t.orderNumber}: ${newOrder.orderNumber}</p>
            <p><strong>Customer:</strong> ${newOrder.customerName}</p>
            <p><strong>Phone:</strong> ${newOrder.phone}</p>
            <p><strong>Delivery:</strong> ${newOrder.city}, ${newOrder.address}</p>
            <p><strong>Total:</strong> $${newOrder.total.toFixed(2)} (${newOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'})</p>
            <hr style="margin: 12px 0; border: 0; border-top: 1px solid #e2e8f0;" />
            <p style="color: #059669; font-weight: 600;">${t.thankYouOrder}</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#2563eb',
      });
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fa-solid fa-truck-fast text-blue-600 text-lg"></i>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              {t.checkoutTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.fullName} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Mustafa Nouh"
                className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.phone} <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+963 985 690 091"
                className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.city} <span className="text-rose-500">*</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
              >
                <option value="Damascus">Damascus (دمشق)</option>
                <option value="Aleppo">Aleppo (حلب)</option>
                <option value="Homs">Homs (حمص)</option>
                <option value="Latakia">Latakia (اللاذقية)</option>
                <option value="Hama">Hama (حماة)</option>
                <option value="Tartus">Tartus (طرطوس)</option>
                <option value="International">International Delivery (توصيل دولي)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                {t.paymentMethod}
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`flex-1 p-2 text-xs font-semibold rounded-lg border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'cod'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-money-bill-wave"></i>
                  <span>COD (الدفع عند الاستلام)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 p-2 text-xs font-semibold rounded-lg border transition cursor-pointer flex items-center justify-center gap-1.5 ${
                    paymentMethod === 'card'
                      ? 'border-blue-600 bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-500'
                      : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <i className="fa-solid fa-credit-card"></i>
                  <span>Card (بطاقة)</span>
                </button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              {t.deliveryAddress} <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Building name, street, nearby landmark..."
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          {/* Order Summary Strip */}
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700/80 space-y-2 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Items in order ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                <span>Coupon Discount (10%)</span>
                <span className="font-semibold tabular-nums">
                  -${discountAmount.toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Delivery Cost</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">
                {shippingAmount === 0 ? 'FREE' : `$${shippingAmount.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center text-sm font-bold text-slate-900 dark:text-white">
              <span>Total Payable</span>
              <span className="text-base text-blue-600 dark:text-blue-400 tabular-nums">
                ${totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Confirming Order...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-lock"></i>
                <span>{t.placeOrder} (${totalAmount.toFixed(2)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
