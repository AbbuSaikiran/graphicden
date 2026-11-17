import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';

export const ExactProductDetailModal = ({ product, onClose, onOpenPhotoTester }) => {
  const { addToCart, addNotification } = useStore();
  const [customText, setCustomText] = useState('');
  const [userPhoto, setUserPhoto] = useState(null);

  if (!product) return null;

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUserPhoto(event.target.result);
        addNotification('Photo Applied', `Photo preview loaded on ${product.name}`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    addToCart(product, customText, userPhoto, false, '', 1);
    addNotification('Added to Bag', `${product.name} added to cart`, 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl p-6 sm:p-7 space-y-4 border border-slate-200">
        
        {/* Large Illustration Box (Matches Image 2) */}
        <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#fbf6f0] flex items-center justify-center relative border border-amber-100/50">
          <ProductIllustration 
            name={product.name} 
            customText={customText} 
            userPhoto={userPhoto}
            className="w-full h-full" 
          />
        </div>

        {/* Product Details (Matches Image 2) */}
        <div className="space-y-1.5">
          <h2 className="text-xl font-bold text-slate-900">
            {product.name}
          </h2>

          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description || 'Handcrafted gift item with custom photo print and premium finish.'}
          </p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-[#b91c1c]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Minimalist Photo & Text Customization (No AI icons) */}
        <div className="pt-1 space-y-2">
          <div className="flex gap-2">
            <label className="flex-1 cursor-pointer py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center text-center transition">
              <span>{userPhoto ? 'Change Photo' : 'Upload Photo'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenPhotoTester) onOpenPhotoTester(product);
              }}
              className="py-2 px-3 bg-rose-50 hover:bg-rose-100 text-[#b91c1c] border border-rose-200 rounded-xl text-xs font-semibold transition"
            >
              Test in Studio →
            </button>
          </div>

          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Custom name or message (optional)"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        {/* Action Buttons (Matches Image 2 Exactly) */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={handleAdd}
            className="flex-1 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
          >
            Add to cart
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition text-center"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
