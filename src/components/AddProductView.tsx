import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { ProductItem, ViewMode, Language } from '../types';
import { translations } from '../translations';

interface AddProductViewProps {
  onAddProduct: (product: ProductItem) => void;
  setCurrentView: (view: ViewMode) => void;
  lang: Language;
}

const PRESET_IMAGES = [
  { name: 'Leather Bag', url: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg' },
  { name: 'Casual T-Shirt', url: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg' },
  { name: 'Cotton Jacket', url: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' },
  { name: 'Gold Bracelet', url: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg' },
  { name: 'SSD Drive', url: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg' },
  { name: 'Winter Coat', url: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg' },
];

export const AddProductView: React.FC<AddProductViewProps> = ({
  onAddProduct,
  setCurrentView,
  lang,
}) => {
  const t = translations[lang];

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(PRESET_IMAGES[0].url);
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState("men's clothing");
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !price) {
      Swal.fire({
        title: 'Error!',
        text: 'Please provide at least a title and price.',
        icon: 'error',
        confirmButtonColor: '#2563eb',
      });
      return;
    }

    setIsSubmitting(true);

    const numericPrice = parseFloat(price) || 0;
    const numericOriginal = originalPrice ? parseFloat(originalPrice) : undefined;

    const newProduct: ProductItem = {
      id: Date.now(),
      title: title.trim(),
      image: image.trim() || PRESET_IMAGES[0].url,
      price: numericPrice,
      originalPrice: numericOriginal,
      category,
      description: description.trim(),
      rating: { rate: 5.0, count: 1 },
      inStock: true,
      isFeatured: true,
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (response.ok) {
        const data = await response.json();
        onAddProduct({ ...newProduct, id: data.id || newProduct.id });
      } else {
        onAddProduct(newProduct);
      }
    } catch {
      onAddProduct(newProduct);
    } finally {
      setIsSubmitting(false);

      Swal.fire({
        title: 'Product Added Successfully!',
        text: `${title} is now active in your store catalog.`,
        icon: 'success',
        timer: 1800,
        showConfirmButton: false,
      });

      setTimeout(() => {
        setCurrentView('home');
      }, 1200);
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-10 min-h-[75vh]">
      <div className="max-w-2xl mx-auto mb-6">
        <button
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
        >
          <i className={`fa-solid ${lang === 'ar' ? 'fa-arrow-right' : 'fa-arrow-left'}`}></i>
          <span>Back to Products</span>
        </button>
      </div>

      <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-900/60">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {t.addProduct}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create a new product listing with real-time catalog synchronization
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Product Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Premium Lightweight Casual Bomber Jacket"
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            />
          </div>

          {/* Pricing Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Selling Price ($) <span className="text-rose-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="49.99"
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white tabular-nums"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Original Comparison Price ($)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                placeholder="69.99 (Optional strike-through)"
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white tabular-nums"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            >
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="jewelery">Jewelry & Accessories</option>
              <option value="electronics">Consumer Electronics</option>
            </select>
          </div>

          {/* Preset Image Chooser */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Select Preset Product Photo or Enter Custom URL
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => setImage(preset.url)}
                  className={`p-1.5 rounded-lg border flex flex-col items-center gap-1 transition cursor-pointer ${
                    image === preset.url
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/40 ring-2 ring-blue-500'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                  }`}
                >
                  <img src={preset.url} alt={preset.name} className="w-10 h-10 object-contain" />
                  <span className="text-[9px] text-slate-500 dark:text-slate-400 truncate w-full text-center">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Or paste an image URL..."
              className="w-full p-2.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Detailed Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide sizing details, materials, and highlights..."
              className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-bold rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <span>Publishing Product...</span>
              </>
            ) : (
              <>
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Publish to Store Catalog</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
