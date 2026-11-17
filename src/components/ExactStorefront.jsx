import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';
import { PromoAdsSection } from './PromoAdsSection';
import { Camera, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-8">
      
      {/* Red Hero Banner (Matching Image 5) */}
      <div className="bg-[#b91c1c] rounded-3xl p-6 sm:p-10 text-white shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Gifts that feel personal
          </h1>
          <p className="text-sm sm:text-base text-red-100 leading-relaxed">
            Mugs, frames, hampers and more, made for the people you love. Add to cart and pay securely.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenPhotoTester && onOpenPhotoTester()}
          className="px-5 py-3 bg-white text-[#b91c1c] hover:bg-red-50 rounded-xl font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 transition shrink-0"
        >
          <Camera className="w-4 h-4 text-[#b91c1c]" />
          <span>Upload Photo & Preview Live →</span>
        </button>
      </div>

      {/* Promotional Ads Section */}
      <PromoAdsSection 
        onShopCategory={(cat) => setSelectedCategory(cat)}
        onOpenPhotoTester={() => onOpenPhotoTester && onOpenPhotoTester()}
      />

      {/* Filter Row matching Mobile and Desktop */}
      <div className="space-y-3 pt-2 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            Browse All Gift Items ({filtered.length})
          </h3>
          <span className="text-xs text-slate-500">
            Click any item to customize or test photo
          </span>
        </div>

        {/* Row 1 on mobile: Search gifts & All categories side by side */}
        <div className="flex gap-2.5 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gifts..."
            className="flex-1 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none cursor-pointer shrink-0"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Row 2 on mobile: Sort dropdown */}
        <div className="flex">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-700 focus:outline-none cursor-pointer"
          >
            <option value="featured">Sort: featured</option>
            <option value="low-high">Price: low to high</option>
            <option value="high-low">Price: high to low</option>
          </select>
        </div>
      </div>

      {/* Product Cards Grid: 1 column on mobile, 2 on tablet, 4 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-1">
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
              className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between hover:shadow-lg transition cursor-pointer group"
            >
              {/* Product Illustration */}
              <div className="w-full aspect-square sm:aspect-square rounded-xl overflow-hidden mb-3 relative">
                <ProductIllustration name={product.name} className="w-full h-full" />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold opacity-0 group-hover:opacity-100 transition">
                  Quick View
                </span>
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

              {/* Action Buttons */}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onOpenPhotoTester) onOpenPhotoTester(product);
                  }}
                  className="py-2 px-2 bg-rose-50 hover:bg-rose-100 text-[#b91c1c] rounded-xl text-[11px] font-bold transition text-center flex items-center justify-center gap-1"
                >
                  <Camera className="w-3 h-3" />
                  <span>Test Photo</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleAddToCart(e, product)}
                  className="py-2 px-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-[11px] font-bold transition shadow-xs text-center"
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
