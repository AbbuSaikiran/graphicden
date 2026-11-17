import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';

export const ExactStorefront = ({ onOpenProductModal, onOpenPhotoTester }) => {
  const { products, addToCart, addNotification } = useStore();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All categories');
  const [sortOption, setSortOption] = useState('featured');

  // Categories list
  const categories = [
    'All categories',
    'Mugs',
    'Keychains',
    'Home',
    'Frames',
    'Hampers',
    'Apparel'
  ];

  // Filtering
  let filtered = products.filter(p => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = selectedCategory === 'All categories' ||
      (p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()) ||
      (selectedCategory === 'Home' && (p.category === 'Decor' || p.category === 'Cushions' || p.category === 'Stationery'));

    return matchesSearch && matchesCat;
  });

  // Sorting
  if (sortOption === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product, '', null, false, '', 1);
    addNotification('Added to Bag', `${product.name} added to cart`, 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-6">
      
      {/* Red Hero Banner (Matching Image 1 & Image 3 Exactly) */}
      <div className="bg-[#b91c1c] rounded-3xl p-6 sm:p-10 text-white shadow-xs">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          Gifts that feel personal
        </h1>
        <p className="mt-3 text-xs sm:text-sm text-red-100 max-w-xl leading-relaxed">
          Mugs, frames, hampers and more, made for the people you love. Add to cart and pay securely.
        </p>
      </div>

      {/* Filter Row matching Wireframe (Image 1 & Image 3) */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
        {/* Search input */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gifts"
          className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
        />

        {/* Categories Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        {/* Sort Dropdown */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer"
        >
          <option value="featured">Sort: featured</option>
          <option value="low-high">Price: low to high</option>
          <option value="high-low">Price: high to low</option>
        </select>
      </div>

      {/* Product Cards Grid: 1 column on mobile, 2 on tablet, 4 on desktop (Matching Wireframe Image 1) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-1">
        {filtered.map(product => {
          const categoryTag = product.category === 'Decor' || product.category === 'Cushions' || product.category === 'Stationery'
            ? 'Home'
            : product.category === 'Accessories'
            ? 'Keychains'
            : product.category === 'Photo Books'
            ? 'Frames'
            : product.category;

          return (
            <div
              key={product.id}
              onClick={() => onOpenProductModal(product)}
              className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition cursor-pointer group"
            >
              {/* Product Illustration with smooth pastel box */}
              <div className="w-full aspect-square rounded-xl overflow-hidden mb-3.5 relative bg-slate-50 flex items-center justify-center">
                <ProductIllustration name={product.name} className="w-full h-full" />
              </div>

              {/* Product Info */}
              <div className="space-y-1 flex-1">
                <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#b91c1c] transition">
                  {product.name}
                </h3>
                <p className="text-xs font-semibold text-rose-500">
                  {categoryTag}
                </p>
                <div className="flex items-baseline gap-1.5 pt-0.5">
                  <span className="font-bold text-sm text-slate-900">
                    ₹{product.price}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-xs text-slate-400 line-through">
                      ₹{product.originalPrice}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {product.stock || 0} in stock
                </p>
              </div>

              {/* Single Add to Cart Red Button (Matching Wireframe Image 1 Exactly) */}
              <div className="mt-3.5">
                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
                >
                  Add to cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
