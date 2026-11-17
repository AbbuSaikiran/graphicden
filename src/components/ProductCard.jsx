import React from 'react';
import { useStore } from '../context/StoreContext';
import { Heart, Camera, Star, Eye } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { wishlist, toggleWishlist, setSelectedProduct } = useStore();

  const isWishlisted = wishlist.some(p => p.id === product.id);
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200/80 hover:border-rose-300 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 flex flex-col overflow-hidden">
      
      {/* Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start z-10">
          {product.tags && product.tags[0] && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white shadow-xs">
              {product.tags[0]}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-rose-500 text-white shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition z-10 ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600 shadow-md' 
              : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
        </button>

        {/* Customizable overlay banner */}
        {product.isCustomizable && (
          <div className="absolute bottom-2 inset-x-2 bg-white/90 backdrop-blur-md py-1 px-2 rounded-lg text-center text-[10px] font-bold text-rose-700 flex items-center justify-center gap-1 shadow-xs">
            <Camera className="w-3 h-3 text-rose-500" />
            <span>Personalize with Photo & Text</span>
          </div>
        )}
      </div>

      {/* Info Body */}
      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] font-semibold text-rose-600 uppercase tracking-wider mb-1">
          {product.category}
        </div>

        <h3 
          onClick={() => setSelectedProduct(product)}
          className="text-sm font-bold text-slate-800 line-clamp-2 hover:text-rose-600 cursor-pointer transition flex-1"
        >
          {product.name}
        </h3>

        {/* Ratings */}
        <div className="flex items-center gap-1.5 mt-2 text-xs">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-bold text-slate-700 ml-1 text-xs">{product.rating}</span>
          </div>
          <span className="text-slate-400 text-[11px]">({product.reviewsCount})</span>
        </div>

        {/* Pricing */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-black text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-slate-400 line-through">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={() => setSelectedProduct(product)}
          className="mt-3 w-full py-2 px-3 bg-slate-900 hover:bg-rose-600 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition duration-200"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Customize & Order</span>
        </button>
      </div>

    </div>
  );
};

