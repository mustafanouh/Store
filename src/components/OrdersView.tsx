import React from 'react';
import { Order, Language, ViewMode } from '../types';
import { translations } from '../translations';

interface OrdersViewProps {
  orders: Order[];
  lang: Language;
  setCurrentView: (view: ViewMode) => void;
  onClearOrders: () => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  lang,
  setCurrentView,
  onClearOrders,
}) => {
  const t = translations[lang];

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-[70vh]">
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
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {t.myOrders}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Track delivery progress and view itemized invoices
            </p>
          </div>
        </div>

        {orders.length > 0 && (
          <button
            onClick={onClearOrders}
            className="text-xs text-rose-500 hover:text-rose-700 font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <i className="fa-regular fa-trash-can"></i>
            <span>Clear History</span>
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700/60 max-w-lg mx-auto p-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-50 dark:bg-blue-950/40 rounded-full flex items-center justify-center text-blue-500 text-2xl">
            <i className="fa-solid fa-box-open"></i>
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
            {t.noOrders}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
            When you complete an order, your tracking number and order receipt will be saved here.
          </p>
          <button
            onClick={() => setCurrentView('home')}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow transition cursor-pointer"
          >
            {t.exploreProducts}
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700/70 p-6 shadow-xs hover:shadow-md transition-shadow"
            >
              {/* Order header row */}
              <div className="flex flex-wrap items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-700/60 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">{t.orderNumber}</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                    #{order.orderNumber}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{t.orderDate}</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    {order.date}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{t.status}</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>{order.status === 'Processing' ? t.statusProcessing : order.status}</span>
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block font-medium">{t.total}</span>
                  <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Items in order */}
              <div className="py-4 divide-y divide-slate-100 dark:divide-slate-800">
                {order.items.map((item, idx) => {
                  const p = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
                  return (
                    <div key={`order-item-${item.id ?? idx}`} className="py-3 flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-12 h-12 object-contain bg-slate-50 dark:bg-slate-900 rounded p-1 border dark:border-slate-800 shrink-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/img/icon.png';
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-slate-800 dark:text-slate-100 truncate">
                          {item.title}
                        </h5>
                        <span className="text-[11px] text-slate-400">
                          Qty: {item.quantity} · ${p.toFixed(2)} each
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 tabular-nums">
                        ${(p * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Customer & Delivery snapshot */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex flex-wrap justify-between items-center text-xs text-slate-500 gap-2">
                <div>
                  <span>Delivered to: </span>
                  <strong className="text-slate-700 dark:text-slate-300">
                    {order.customerName} ({order.city}, {order.address})
                  </strong>
                </div>
                <div className="flex items-center gap-3">
                  <span>Method: <strong>{order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}</strong></span>
                  <a
                    href="tel:+963985690091"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
                  >
                    <i className="fa-solid fa-headset"></i>
                    <span>Support</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
