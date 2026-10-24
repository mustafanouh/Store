import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ViewMode, Language } from '../types';
import { translations } from '../translations';

interface FooterProps {
  setCurrentView: (view: ViewMode) => void;
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView, lang }) => {
  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !cleanEmail.includes('@')) {
      Swal.fire({
        title: 'Error!',
        text: 'Please enter a valid email address.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const existing: string[] = JSON.parse(
        localStorage.getItem('newsletter_subscribers') || '[]'
      );

      if (existing.includes(cleanEmail)) {
        setIsSubmitting(false);
        Swal.fire({
          title: lang === 'ar' ? 'أنت مشترك بالفعل!' : 'Already Subscribed!',
          text: lang === 'ar'
            ? 'هذا البريد الإلكتروني مسجل مسبقاً في قائمتنا البريدية.'
            : 'This email is already registered in our newsletter list.',
          icon: 'info',
          confirmButtonColor: '#2563eb',
        });
        return;
      }

      existing.push(cleanEmail);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(existing));

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubscribed(true);
        setEmail('');

        Swal.fire({
          title: lang === 'ar' ? 'تم الاشتراك بنجاح!' : 'Subscription Successful!',
          text: t.newsletterSuccess,
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
        });
      }, 500);
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 transition-colors mt-auto">
      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Newsletter Subscription Component */}
        <div className="mb-12 pb-12 border-b border-slate-800">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-800/90 via-slate-800/60 to-slate-800/90 border border-slate-700/70 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center lg:text-left max-w-xl">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 flex items-center justify-center lg:justify-start gap-1.5">
                <i className="fa-regular fa-paper-plane"></i>
                <span>Exclusive VIP Perks</span>
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                {t.newsletterTitle}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {t.newsletterDesc}
              </p>
            </div>

            <form
              onSubmit={handleSubscribe}
              className="w-full lg:w-auto flex-1 max-w-md flex flex-col sm:flex-row gap-2"
            >
              <div className="relative flex-1">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 pointer-events-none">
                  <i className="fa-regular fa-envelope text-xs"></i>
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.newsletterPlaceholder}
                  className="w-full pl-10 pr-4 py-3 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 shrink-0 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin text-xs"></i>
                    <span>...</span>
                  </>
                ) : (
                  <>
                    <span>{t.newsletterButton}</span>
                    <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-left' : 'fa-arrow-right'} text-[10px]`}></i>
                  </>
                )}
              </button>
            </form>
          </div>

          {isSubscribed && (
            <p className="text-xs text-emerald-400 mt-3 text-center font-semibold flex items-center justify-center gap-1.5 animate-in fade-in">
              <i className="fa-solid fa-circle-check"></i>
              <span>{t.newsletterSuccess}</span>
            </p>
          )}
        </div>

        {/* 4-Column Grid Links */}
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
