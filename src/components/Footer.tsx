import React from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  setCurrentView: (view: ViewMode) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, lang }) => {
  const t = translations[lang];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-slate-800">
          {/* Brand info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/img/icon.png" alt="Store Logo" className="w-10 h-10 object-contain rounded-lg" />
              <div>
                <span className="text-xl font-extrabold text-white block">
                  {t.storeName}
                </span>
                <span className="text-xs text-slate-400 block">
                  {t.storeSubtitle}
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footerAboutText}
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white flex items-center justify-center transition"
                title="Facebook"
              >
                <i className="fa-brands fa-facebook-f text-xs"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-pink-600 hover:text-white flex items-center justify-center transition"
                title="Instagram"
              >
                <i className="fa-brands fa-instagram text-xs"></i>
              </a>
              <a
                href="https://wa.me/963985690091"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition"
                title="WhatsApp"
              >
                <i className="fa-brands fa-whatsapp text-xs"></i>
              </a>
              <a
                href="https://github.com/mustafanouh/Store"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 hover:text-white flex items-center justify-center transition"
                title="GitHub"
              >
                <i className="fa-brands fa-github text-xs"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.products}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('home')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.allProducts}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('favorites')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.favorites}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('orders')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.myOrders}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('add-product')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.addProduct}
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.aboutUs}
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('contact')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.contact}
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('login')}
                  className="hover:text-white transition cursor-pointer"
                >
                  {t.login}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              {t.contact}
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <a
                href="tel:+963985690091"
                className="flex items-center gap-2 hover:text-white transition font-medium"
              >
                <i className="fa-solid fa-phone text-blue-400"></i>
                <span className="tabular-nums">+963 985 690 091</span>
              </a>
              <a
                href="mailto:mustafanuh00000@gmail.com"
                className="flex items-center gap-2 hover:text-white transition font-medium"
              >
                <i className="fa-solid fa-envelope text-blue-400"></i>
                <span>mustafanuh00000@gmail.com</span>
              </a>
              <div className="pt-2 text-[11px] text-slate-500">
                Created with passion for <strong className="text-slate-300">Quality & Style</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>{t.allRightsReserved}</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Secure 256-bit Checkout</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-400">Syria & Worldwide Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
