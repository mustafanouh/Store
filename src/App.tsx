import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrdersView } from './components/OrdersView';
import { AddProductView } from './components/AddProductView';
import { FavoritesView } from './components/FavoritesView';
import { LoginView } from './components/LoginView';
import { AboutContactModals } from './components/AboutContactModals';
import { Footer } from './components/Footer';
import { InitialLoader } from './components/InitialLoader';
import { ProductItem, CartItem, Order, ViewMode, Language, SortOption } from './types';
import { translations } from './translations';

const FALLBACK_PRODUCTS: ProductItem[] = [
  {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    originalPrice: 139.99,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop in the padded sleeve.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 4.8, count: 120 },
    inStock: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'Mens Casual Premium Slim Fit T-Shirts',
    price: 22.3,
    originalPrice: 29.99,
    description: 'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, soft breathable fabric.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    rating: { rate: 4.5, count: 259 },
    inStock: true,
  },
  {
    id: 3,
    title: 'Mens Cotton Jacket - Outdoor Field Outerwear',
    price: 55.99,
    originalPrice: 79.99,
    description: 'Great outerwear jackets for Spring/Autumn/Winter, suitable for casual wear and daily commute.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    rating: { rate: 4.7, count: 500 },
    inStock: true,
    isFeatured: true,
  },
  {
    id: 4,
    title: 'Mens Casual Slim Fit Henley Shirt',
    price: 15.99,
    description: 'Lightweight and durable fabric for daily comfort and athletic utility.',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    rating: { rate: 4.3, count: 430 },
    inStock: true,
  },
  {
    id: 5,
    title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695.0,
    originalPrice: 750.0,
    description: "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl.",
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.9, count: 85 },
    inStock: true,
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Solid Gold Petite Micropave Band',
    price: 168.0,
    description: 'Satisfaction Guaranteed. Return or exchange any order within 14 days.',
    category: 'jewelery',
    image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    rating: { rate: 4.6, count: 70 },
    inStock: true,
  },
  {
    id: 7,
    title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
    price: 64.0,
    originalPrice: 89.99,
    description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    rating: { rate: 4.7, count: 340 },
    inStock: true,
  },
  {
    id: 8,
    title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
    price: 109.0,
    description: 'Easy upgrade for faster boot up, shutdown, application load and responsive multi-tasking.',
    category: 'electronics',
    image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
    rating: { rate: 4.8, count: 670 },
    inStock: true,
    isFeatured: true,
  },
  {
    id: 9,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    originalPrice: 75.0,
    description: 'Windproof, water-resistant winter coat designed for active outdoor lifestyles and everyday cold-weather wear.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    rating: { rate: 4.6, count: 235 },
    inStock: true,
  },
  {
    id: 10,
    title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description: 'Premium faux leather with removable fleece hood for versatile everyday layering.',
    category: "women's clothing",
    image: 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg',
    rating: { rate: 4.5, count: 340 },
    inStock: true,
  },
];

export const App: React.FC = () => {
  const [lang, setLang] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem('storeLang');
      return (stored as Language) || 'ar'; // Default to Arabic as requested by user
    } catch {
      return 'ar';
    }
  });

  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [apiProducts, setApiProducts] = useState<ProductItem[]>([]);
  const [localProducts, setLocalProducts] = useState<ProductItem[]>(() => {
    try {
      const stored = localStorage.getItem('products');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState<ProductItem[]>(() => {
    try {
      const stored = localStorage.getItem('favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const stored = localStorage.getItem('orders');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem('currentUser') || null;
    } catch {
      return null;
    }
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('darkMode') === 'true';
    } catch {
      return false;
    }
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(1000);
  const [discountRate, setDiscountRate] = useState<number>(0);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const catalogSectionRef = useRef<HTMLDivElement>(null);
  const t = translations[lang];

  // Sync RTL / LTR attribute on HTML element
  useEffect(() => {
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    localStorage.setItem('storeLang', lang);
  }, [lang]);

  // Dark mode class sync
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [isDarkMode]);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(localProducts));
  }, [localProducts]);

  // Fetch API products
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('API failed');
        const data = await res.json();
        if (isMounted) {
          setApiProducts(data);
        }
      } catch {
        if (isMounted) {
          setApiProducts(FALLBACK_PRODUCTS);
        }
      } finally {
        if (isMounted) {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }
      }
    };

    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // Combined product catalog
  const allProducts = useMemo(() => {
    return [...localProducts, ...apiProducts];
  }, [apiProducts, localProducts]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let result = allProducts.filter((product) => {
      // Category match
      const matchCat =
        selectedCategory === 'All' ||
        product.category?.toLowerCase() === selectedCategory.toLowerCase();

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        product.title.toLowerCase().includes(q) ||
        (product.category && product.category.toLowerCase().includes(q)) ||
        (product.description && product.description.toLowerCase().includes(q));

      // Price filter
      const p = typeof product.price === 'number' ? product.price : parseFloat(product.price) || 0;
      const matchPrice = p <= maxPriceFilter;

      return matchCat && matchSearch && matchPrice;
    });

    // Sorting
    result = [...result].sort((a, b) => {
      const priceA = typeof a.price === 'number' ? a.price : parseFloat(a.price) || 0;
      const priceB = typeof b.price === 'number' ? b.price : parseFloat(b.price) || 0;
      const rateA = a.rating?.rate ?? 4.5;
      const rateB = b.rating?.rate ?? 4.5;

      switch (sortBy) {
        case 'price-asc':
          return priceA - priceB;
        case 'price-desc':
          return priceB - priceA;
        case 'rating':
          return rateB - rateA;
        case 'newest':
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        case 'featured':
        default:
          return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      }
    });

    return result;
  }, [allProducts, selectedCategory, searchQuery, maxPriceFilter, sortBy]);

  // Handlers
  const handleToggleFavorite = (product: ProductItem) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.title === product.title);
      return exists ? prev.filter((p) => p.title !== product.title) : [...prev, product];
    });
  };

  const handleAddToCart = (
    product: ProductItem,
    qty = 1,
    size?: string,
    color?: string
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.title === product.title && i.selectedSize === size
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += qty;
        return next;
      }
      return [
        ...prev,
        {
          ...product,
          quantity: qty,
          selectedSize: size,
          selectedColor: color,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (
    product: ProductItem,
    qty = 1,
    size?: string,
    color?: string
  ) => {
    handleAddToCart(product, qty, size, color);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateCartQuantity = (id: string | number | undefined, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQ = item.quantity + delta;
            return newQ > 0 ? { ...item, quantity: newQ } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string | number | undefined) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const handleClearCart = () => setCart([]);
  const handleClearFavorites = () => setFavorites([]);
  const handleClearOrders = () => setOrders([]);

  const handleApplyCoupon = (code: string) => {
    if (code === 'STORE10' || code === 'MUSTAFA10') {
      setDiscountRate(0.1);
      return true;
    }
    return false;
  };

  const handleOrderSuccess = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setCurrentView('orders');
  };

  const handleAddProduct = (newProduct: ProductItem) => {
    setLocalProducts((prev) => [newProduct, ...prev]);
  };

  const handleLogin = (user: string) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const scrollToCatalog = () => {
    if (catalogSectionRef.current) {
      catalogSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const p = typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0;
      return sum + p * item.quantity;
    }, 0);
  }, [cart]);

  const categoriesList = [
    { label: t.all, value: 'All' },
    { label: t.mensClothing, value: "men's clothing" },
    { label: t.womensClothing, value: "women's clothing" },
    { label: t.jewelery, value: 'jewelery' },
    { label: t.electronics, value: 'electronics' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <InitialLoader isLoading={isLoading} />

      {/* 1. Announcement Bar */}
      <AnnouncementBar lang={lang} />

      {/* 2. Top Bar Navigation */}
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        favoritesCount={favorites.length}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isDarkMode={isDarkMode}
        toggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        lang={lang}
        toggleLang={() => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'))}
        currentUser={currentUser}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'home' && (
          <>
            {/* 3. Hero Campaign Section */}
            <HeroSection
              lang={lang}
              onExplore={scrollToCatalog}
              setCurrentView={setCurrentView}
            />

            {/* 4. Department Spotlights */}
            <FeaturedCategories
              lang={lang}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                scrollToCatalog();
              }}
            />

            {/* 5. Products Catalog & Filter Console */}
            <section ref={catalogSectionRef} className="py-12 lg:py-16">
              <div className="container mx-auto px-4 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {selectedCategory === 'All' ? t.allProducts : selectedCategory}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {filteredProducts.length} {t.itemsCount}{' '}
                      {searchQuery && `matching "${searchQuery}"`}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setCurrentView('add-product')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer flex items-center gap-1.5"
                    >
                      <i className="fa-solid fa-plus text-[10px]"></i>
                      <span>{t.addProduct}</span>
                    </button>
                  </div>
                </div>

                {/* Filter and Sort Controls */}
                <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 mb-8 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-4">
                  {/* Category Segmented Control (Interactive buttons per frontend-design guidelines) */}
                  <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
                    {categoriesList.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setSelectedCategory(cat.value)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                          selectedCategory === cat.value
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>

                  {/* Sort by Dropdown */}
                  <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
                    <span className="text-xs font-semibold text-slate-500 shrink-0">
                      {t.sortBy}:
                    </span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="p-2 text-xs font-medium rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="featured">{t.sortFeatured}</option>
                      <option value="price-asc">{t.sortPriceAsc}</option>
                      <option value="price-desc">{t.sortPriceDesc}</option>
                      <option value="rating">{t.sortRating}</option>
                      <option value="newest">{t.sortNewest}</option>
                    </select>
                  </div>
                </div>

                {/* Product Grid */}
                {filteredProducts.length === 0 ? (
                  <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-xs border border-slate-200 dark:border-slate-800 max-w-lg mx-auto p-8">
                    <div className="w-16 h-16 mx-auto mb-3 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 text-2xl">
                      <i className="fa-solid fa-box-open"></i>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {t.noProductsFound}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
                      {t.tryAdjustingFilters}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCategory('All');
                        setSearchQuery('');
                        setMaxPriceFilter(1000);
                      }}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow transition cursor-pointer"
                    >
                      {t.resetFilters}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product, idx) => (
                      <ProductCard
                        key={`product-item-${product.id ?? idx}-${product.title}`}
                        product={product}
                        isFavorite={favorites.some((f) => f.title === product.title)}
                        onToggleFavorite={handleToggleFavorite}
                        onAddToCart={handleAddToCart}
                        onQuickView={(p) => setQuickViewProduct(p)}
                        lang={lang}
                      />
                    ))}
                  </div>
                )}
              </div>
            </section>
          </>
        )}

        {currentView === 'favorites' && (
          <FavoritesView
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onAddToCart={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onClearFavorites={handleClearFavorites}
            setCurrentView={setCurrentView}
            lang={lang}
          />
        )}

        {currentView === 'orders' && (
          <OrdersView
            orders={orders}
            lang={lang}
            setCurrentView={setCurrentView}
            onClearOrders={handleClearOrders}
          />
        )}

        {currentView === 'add-product' && (
          <AddProductView
            onAddProduct={handleAddProduct}
            setCurrentView={setCurrentView}
            lang={lang}
          />
        )}

        {currentView === 'login' && (
          <LoginView
            currentUser={currentUser}
            onLogin={handleLogin}
            onLogout={handleLogout}
            setCurrentView={setCurrentView}
            lang={lang}
          />
        )}
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        isFavorite={
          quickViewProduct
            ? favorites.some((f) => f.title === quickViewProduct.title)
            : false
        }
        onToggleFavorite={handleToggleFavorite}
        lang={lang}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountRate={discountRate}
        onApplyCoupon={handleApplyCoupon}
        lang={lang}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={subtotal}
        discountRate={discountRate}
        onOrderSuccess={handleOrderSuccess}
        lang={lang}
      />

      {/* About & Contact Modals */}
      <AboutContactModals
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} lang={lang} />
    </div>
  );
};

export default App;
