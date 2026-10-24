import React, { useState } from 'react';
import { ViewMode, Language } from '../types';
import { translations } from '../translations';

interface HeaderProps {
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  favoritesCount: number;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  lang: Language;
  toggleLang: () => void;
  currentUser: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  favoritesCount,
  cartCount,
  onOpenCart,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  isDarkMode,
  toggleDarkMode,
  lang,
  toggleLang,
  currentUser,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const t = translations[lang];

  const navCategories = [
    { label: t.all, value: 'All' },
    { label: t.mensClothing, value: "men's clothing" },
    { label: t.womensClothing, value: "women's clothing" },
    { label: t.jewelery, value: 'jewelery' },
    { label: t.electronics, value: 'electronics' },
  ];

  const handleNavClick = (catValue: string) => {
    setSelectedCategory(catValue);
    if (currentView !== 'home') {
      setCurrentView('home');
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between gap-6 h-20">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setCurrentView('home');
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="flex items-center gap-3 group text-left cursor-pointer"
            >
              <img
                src="/img/icon.png"
                alt="Store Logo"
                className="w-10 h-10 object-contain rounded-lg transition-transform group-hover:scale-105"
              />
              <div className="leading-tight">
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white block">
                  {t.storeName}
                </span>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block tracking-normal">
                  {t.storeSubtitle}
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
            {navCategories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => handleNavClick(cat.value)}
                className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 relative ${
                  currentView === 'home' && selectedCategory === cat.value
                    ? 'text-blue-600 dark:text-blue-400 font-bold'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {cat.label}
                {currentView === 'home' && selectedCategory === cat.value && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"></span>
                )}
              </button>
            ))}

            <button
              onClick={() => setCurrentView('orders')}
              className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer py-1 ${
                currentView === 'orders'
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {t.orders}
            </button>
          </nav>

          {/* Zone 3: Actions (Search, Language, Theme, Wishlist, Cart, User) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-48 lg:w-60">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 pointer-events-none">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 rounded-lg border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              )}
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title="Search"
            >
              <i className="fa-solid fa-magnifying-glass text-sm"></i>
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-blue-500 transition cursor-pointer"
              title={lang === 'ar' ? 'Switch to English' : 'التحويل للغة العربية'}
            >
              {lang === 'ar' ? 'EN' : 'العربية'}
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative flex items-center p-1 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 transition-all cursor-pointer shadow-xs group"
              title={
                isDarkMode
                  ? lang === 'ar'
                    ? 'التحويل للوضع النهاري'
                    : 'Switch to Light Mode'
                  : lang === 'ar'
                  ? 'التحويل للوضع الليلي'
                  : 'Switch to Dark Mode'
              }
              aria-label="Toggle Theme"
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 ${
                  !isDarkMode
                    ? 'bg-white text-amber-500 shadow-xs'
                    : 'text-slate-400 group-hover:text-slate-300'
                }`}
              >
                <i className="fa-solid fa-sun text-xs"></i>
              </span>
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-lg transition-all duration-200 ${
                  isDarkMode
                    ? 'bg-slate-900 text-blue-400 shadow-xs ring-1 ring-slate-700'
                    : 'text-slate-400 group-hover:text-slate-600'
                }`}
              >
                <i className="fa-solid fa-moon text-xs"></i>
              </span>
            </button>

            {/* Favorites Icon */}
            <button
              onClick={() => setCurrentView('favorites')}
              className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              title={t.favorites}
            >
              <i className="fa-regular fa-heart text-base"></i>
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center tabular-nums shadow">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer hover:shadow"
              title={t.cart}
            >
              <i className="fa-solid fa-bag-shopping text-sm"></i>
              <span className="hidden sm:inline">{t.cart}</span>
              {cartCount > 0 && (
                <span className="bg-white text-blue-700 text-[10px] font-bold px-1.5 py-0.2 rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button
              onClick={() => setCurrentView('login')}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer relative"
              title={currentUser ? currentUser : t.login}
            >
              <i className="fa-regular fa-user text-base"></i>
              {currentUser && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
          </div>
        </div>

        {/* Mobile Search Row if activated */}
        {showSearchInput && (
          <div className="py-2.5 border-t border-slate-200 dark:border-slate-800 md:hidden">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
                <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full pl-8 pr-8 py-2 text-sm bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg border border-transparent focus:border-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400"
                >
                  <i className="fa-solid fa-xmark text-sm"></i>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-800 space-y-3 animate-in fade-in duration-150">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-2">
              {t.categories}
            </div>
            <div className="grid grid-cols-2 gap-2">
              {navCategories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleNavClick(cat.value)}
                  className={`text-left text-sm py-2 px-3 rounded-lg font-medium transition cursor-pointer ${
                    selectedCategory === cat.value
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-1">
              <button
                onClick={() => {
                  setCurrentView('orders');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <i className="fa-solid fa-box text-blue-500"></i>
                <span>{t.orders}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('about');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <i className="fa-solid fa-circle-info text-blue-500"></i>
                <span>{t.aboutUs}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('contact');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <span>{t.contact}</span>
              </button>
              <button
                onClick={() => {
                  setCurrentView('add-product');
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm py-2 px-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
              >
                <i className="fa-solid fa-plus text-blue-500"></i>
                <span>{t.addProduct}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between px-3 text-xs text-slate-500">
              <a href="tel:+963985690091" className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-bold">
                <i className="fa-solid fa-phone"></i>
                <span>+963985690091</span>
              </a>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleDarkMode}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-750 text-slate-700 dark:text-slate-200 text-xs font-semibold"
                  title="Toggle Theme"
                >
                  <i className={`fa-solid ${isDarkMode ? 'fa-sun text-amber-400' : 'fa-moon text-blue-500'} text-xs`}></i>
                  <span>{isDarkMode ? 'نهاري' : 'ليلي'}</span>
                </button>
                <span>{t.storeName}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
