import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';
import { Sparkles, Upload, ShieldCheck, Heart, Truck, Check } from 'lucide-react';

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
        addNotification('Photo Applied!', `Photo loaded onto ${product.name}`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = () => {
    addToCart(product, customText, userPhoto, false, '', 1);
    addNotification('Added to Bag', `${product.name} personalized & added to cart`, 'info');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-7 space-y-5 border border-slate-200">
        
        {/* Large Illustration View with Live Photo rendering */}
        <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center relative border border-slate-100">
          <ProductIllustration 
            name={product.name} 
            customText={customText} 
            userPhoto={userPhoto}
            className="w-full h-full" 
          />
          {userPhoto && (
            <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-xs">
              <Check className="w-3 h-3" /> Photo Tested
            </span>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-xl font-bold text-slate-900">
              {product.name}
            </h2>
            <div className="text-right">
              <span className="text-lg font-black text-[#b91c1c]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-slate-400 line-through block">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            {product.description || 'Curated handcrafted personalized gift item made with premium materials.'}
          </p>

          {/* In-Modal Photo Upload & Live Text inputs */}
          <div className="pt-2 space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>Personalize & Test Photo:</span>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenPhotoTester) onOpenPhotoTester(product);
                }}
                className="text-rose-600 hover:text-rose-700 text-[11px] font-bold flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Open 3D Studio →</span>
              </button>
            </div>

            <div className="flex gap-2">
              <label className="flex-1 cursor-pointer py-2 px-3 bg-white hover:bg-slate-100 border border-slate-300 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-1.5 transition">
                <Upload className="w-3.5 h-3.5 text-rose-600" />
                <span>{userPhoto ? 'Change Photo' : 'Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>

              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="Engrave name/text"
                className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-rose-500"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-1">
          <button
            onClick={handleAdd}
            className="flex-1 py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-md flex items-center justify-center gap-1.5"
          >
            <span>Add to cart</span>
          </button>
          
          <button
            onClick={onClose}
            className="px-5 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
