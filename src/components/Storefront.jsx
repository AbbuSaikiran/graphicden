import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Banner } from './Banner';
import { ProductCard } from './ProductCard';
import { CATEGORIES } from '../data/initialData';
import { 
  SlidersHorizontal, ArrowUpDown, Gift, 
  MessageSquare, Star, Heart, CheckCircle2, Award 
} from 'lucide-react';

export const Storefront = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const { products, setSelectedProduct } = useStore();

  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating'
  const [maxPrice, setMaxPrice] = useState(5000);

  // Filter products by category, search and price
  let filtered = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Gifts' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.tags && product.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesPrice = product.price <= maxPrice;
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sort
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* Hero Banner with Occasions */}
      <Banner
        onSelectOccasion={(query) => {
          setSearchQuery(query);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onShopNow={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Catalogue Section */}
      <div id="catalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Category Filter Pills & Controls */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Curated Gift Catalogue
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Showing {filtered.length} personalized gifts crafted with love in India
              </p>
            </div>

            {/* Sorting & Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              
              {/* Max Price Slider */}
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 text-xs">
                <span className="text-slate-500">Max: ₹{maxPrice}</span>
                <input
                  type="range"
                  min="500"
                  max="5000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 accent-rose-600 cursor-pointer"
                />
              </div>

              {/* Sort Selector */}
              <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-2xl border border-slate-200 text-xs">
                <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-slate-700 focus:outline-none cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

            </div>
          </div>

          {/* Category Horizontal Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-rose-300 hover:text-rose-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Active Search Notification */}
        {searchQuery && (
          <div className="flex items-center justify-between p-3 bg-rose-50 rounded-2xl border border-rose-200 text-xs text-rose-800">
            <span>Filtering by search query: <strong className="font-bold">"{searchQuery}"</strong></span>
            <button
              onClick={() => setSearchQuery('')}
              className="font-bold underline hover:text-rose-950"
            >
              Clear Filter
            </button>
          </div>
        )}

        {/* Product Cards Grid */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <Gift className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No matching gifts found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your price range or search terms. You can also message our concierge on WhatsApp for custom designs.
            </p>
            <button
              onClick={() => { setSelectedCategory('All Gifts'); setSearchQuery(''); setMaxPrice(5000); }}
              className="mt-2 px-5 py-2 bg-rose-600 text-white rounded-full text-xs font-bold hover:bg-rose-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>

      {/* Real Customer Love & Photo Reviews Section */}
      <div className="bg-gradient-to-b from-white to-rose-50/50 py-16 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Verified Gifting Stories
            </span>
            <h2 className="text-3xl font-black text-slate-900">Loved by 50,000+ Happy Couples & Families</h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Real emotional reactions from people who received a GraphicDen personalized gift.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Ordered the 3D Acrylic Couple Lamp for our 3rd Anniversary. The optical laser clarity is stunning! Priya literally cried happy tears when she turned on the warm light."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Arjun & Sneha</p>
                  <p className="text-[10px] text-slate-400">Mumbai • Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "The Spotify Glass plaque looks so modern on my desk. Scanning the code directly plays our wedding song on Spotify! Delivered securely in 4 days to Bengaluru."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Devansh K.</p>
                  <p className="text-[10px] text-slate-400">Bengaluru • Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {'★'.repeat(5)}
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "Ordered custom neon sign for our cafe. The silicone quality and dimmer remote are top notch. GraphicDen support on WhatsApp was extremely helpful throughout!"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Reviewer"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Meenakshi Roy</p>
                  <p className="text-[10px] text-slate-400">New Delhi • Verified Buyer</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Floating WhatsApp Action Pill */}
      <a
        href="https://wa.me/919876543210?text=Hi%20GraphicDen!%20I%20want%20to%20order%20a%20personalized%20gift"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl transition transform hover:scale-105 group font-bold text-xs"
        title="Chat on WhatsApp"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping"></span>
        <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
        <span>Chat on WhatsApp</span>
      </a>

    </div>
  );
};

