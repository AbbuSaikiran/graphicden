import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';
import { PromoAdsSection } from './PromoAdsSection';
import { 
  Sparkles, Gift, SlidersHorizontal, ArrowUpDown, Truck, 
  ShieldCheck, Heart, Star, Award, Clock, ArrowRight, Eye, Wand2, Camera
} from 'lucide-react';

export const LuxeStorefront = ({ 
  onOpenLiveStudio, 
  onOpenGiftGenie, 
  onOpenOrderTracker,
  onOpenPhotoTester
}) => {
  const { products, addToCart, addNotification } = useStore();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortOption, setSortOption] = useState('featured');

  const categories = [
    'All',
    'Mugs',
    'Keychains',
    'Home',
    'Frames',
    'Hampers',
    'Apparel'
  ];

  let filtered = products.filter(p => {
    const matchesSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));

    const matchesCat = activeCategory === 'All' ||
      (p.category && p.category.toLowerCase() === activeCategory.toLowerCase()) ||
      (activeCategory === 'Home' && (p.category === 'Decor' || p.category === 'Cushions' || p.category === 'Stationery'));

    const matchesPrice = p.price <= maxPrice;

    return matchesSearch && matchesCat && matchesPrice;
  });

  if (sortOption === 'low-high') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOption === 'high-low') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="space-y-12 pb-16">
      
      {/* Top Luxury Announcement Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-slate-900 text-white text-xs py-2.5 px-4 text-center font-medium border-b border-rose-900/40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden md:flex items-center gap-2 text-rose-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" />
            <span>Master Crafted in India</span>
          </div>
          <div className="mx-auto flex items-center gap-2">
            <span>🎁 Complimentary Express Courier on orders ₹999+ • Code: <strong className="font-mono bg-white/20 px-1.5 py-0.5 rounded text-amber-300">LUXE150</strong></span>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenOrderTracker}
              className="text-slate-300 hover:text-white flex items-center gap-1 transition"
            >
              <Truck className="w-3.5 h-3.5" />
              <span>Track Live Parcel</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Spotlight */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 border border-slate-800 p-8 sm:p-14 text-white shadow-2xl">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-rose-600/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Award-Winning Personalized Gift Studio</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                Turn Cherished Moments Into{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
                  Luminous Art
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Handcrafted 3D optical acrylic lamps, laser engraved photo plaques, royal gift hampers, and custom room decor crafted exclusively for the people you cherish.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenLiveStudio(products[0])}
                  className="px-6 py-3.5 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-600 hover:from-rose-500 hover:to-pink-500 text-white rounded-full font-bold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 transition transform hover:-translate-y-0.5"
                >
                  <Wand2 className="w-4 h-4 text-amber-300" />
                  <span>Launch 3D Customizer Studio</span>
                </button>

                <button
                  onClick={onOpenGiftGenie}
                  className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white rounded-full font-bold text-xs border border-white/20 backdrop-blur-md transition flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Ask Gift Concierge</span>
                </button>

                <button
                  onClick={onOpenOrderTracker}
                  className="px-5 py-3.5 bg-slate-900/80 hover:bg-slate-800 text-slate-300 rounded-full font-bold text-xs border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Truck className="w-4 h-4" />
                  <span>Track Parcel</span>
                </button>
              </div>

              {/* 3 Pillars */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  100% Damage Replacement
                </span>
                <span className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  Precision Laser Engraved
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-rose-400" />
                  48-Hr Priority Air Dispatch
                </span>
              </div>
            </div>

            {/* Right: Interactive 3D Glow Card Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div 
                onClick={() => onOpenLiveStudio(products[0])}
                className="relative bg-slate-900/90 border border-slate-700/80 rounded-3xl p-6 shadow-2xl max-w-sm w-full cursor-pointer group hover:border-rose-500 transition-all duration-300"
              >
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
                  <Sparkles className="w-3 h-3" />
                  <span>Click to Customize Live</span>
                </div>

                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center p-2">
                  <ProductIllustration
                    name="Photo mug"
                    glowColor="#f59e0b"
                    isGlowActive={true}
                    customText="Vikram & Ananya"
                    className="w-full h-full"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-rose-400 transition">Photo mug</h3>
                    <p className="text-xs text-slate-400 mt-0.5">High-gloss ceramic with custom photo & caption</p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-rose-400">₹299</span>
                    <p className="text-[10px] text-slate-500 line-through">₹499</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Promotional Ads & Special Offers Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PromoAdsSection 
          onShopCategory={(cat) => setActiveCategory(cat)}
          onOpenPhotoTester={() => onOpenPhotoTester && onOpenPhotoTester()}
        />
      </div>

      {/* Main Catalog Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              The Collection
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-0.5">
              Explore Bespoke Gift Creations
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gifts..."
              className="px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
            />

            {/* Price Filter */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 border border-slate-200 rounded-xl text-xs">
              <span className="text-slate-500">Max: ₹{maxPrice}</span>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-20 accent-rose-600 cursor-pointer"
              />
            </div>

            {/* Sort */}
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
          {filtered.map(product => (
            <div
              key={product.id}
              className="bg-white border border-slate-200/90 rounded-3xl p-4 flex flex-col justify-between hover:shadow-xl hover:border-rose-300 transition duration-300 group"
            >
              {/* Image & Quick Action */}
              <div 
                onClick={() => onOpenLiveStudio(product)}
                className="w-full aspect-square rounded-2xl overflow-hidden mb-3 relative cursor-pointer"
              >
                <ProductIllustration name={product.name} className="w-full h-full" />
                
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-2xs">
                  <span className="px-3.5 py-1.5 rounded-full bg-white text-slate-900 text-xs font-bold shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition">
                    <Wand2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Personalize Live</span>
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-1 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  {product.category}
                </span>
                <h3 className="font-bold text-slate-900 text-sm line-clamp-1">
                  {product.name}
                </h3>
                
                <div className="flex items-baseline gap-2 pt-1">
                  <span className="text-base font-black text-slate-900">
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
              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => onOpenPhotoTester ? onOpenPhotoTester(product) : onOpenLiveStudio(product)}
                  className="py-2.5 px-2 bg-rose-50 hover:bg-rose-100 text-[#b91c1c] rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 text-center"
                >
                  <Camera className="w-3.5 h-3.5 text-rose-600" />
                  <span>Photo & Test</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    addToCart(product, '', null, false, '', 1);
                    addNotification('Added to Bag', `${product.name} added to cart`, 'info');
                  }}
                  className="py-2.5 px-2 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
                >
                  Add to Cart
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Verified Gifting Reviews Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-gradient-to-b from-slate-50 to-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase text-rose-600 tracking-wider">Customer Wall of Love</span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Celebrated by 50,000+ Happy Gifting Moments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "The optical clarity on the personalized couple lamp is out of this world. My fiancé was speechless when it lit up!",
                author: "Ananya & Rohan",
                city: "Bengaluru",
                item: "3D Optical Lamp"
              },
              {
                quote: "Delivered to Mumbai in under 3 days. Packed in a stunning gift-ready velvet box with our handwritten card.",
                author: "Aditya Verma",
                city: "Mumbai",
                item: "Luxury Hamper"
              },
              {
                quote: "Best anniversary surprise ever. The Spotify glass plaque scans instantly from my phone. 10/10 craftsmanship!",
                author: "Pooja Sundaram",
                city: "Chennai",
                item: "Spotify Plaque"
              }
            ].map((rev, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex text-amber-400 text-xs">{'★'.repeat(5)}</div>
                <p className="text-xs text-slate-700 leading-relaxed italic">"{rev.quote}"</p>
                <div className="pt-2 border-t border-slate-100 text-xs flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-900">{rev.author}</p>
                    <p className="text-[10px] text-slate-400">{rev.city} • Verified Buyer</p>
                  </div>
                  <span className="text-[10px] bg-rose-50 text-rose-700 px-2 py-0.5 rounded-full font-bold">
                    {rev.item}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
