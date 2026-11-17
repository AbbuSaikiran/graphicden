import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const PromoAdsSection = ({ onShopCategory, onOpenPhotoTester }) => {
  const { addNotification } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addNotification('Coupon Copied', `Code ${code} copied to clipboard`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="space-y-4">
      
      {/* 3 Clean, Elegant Highlight Cards (No AI icons, clean human UI) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Anniversary Offer */}
        <div className="bg-rose-50/70 border border-rose-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-rose-300 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-rose-700 tracking-wider text-[11px] uppercase">
                Anniversary Special
              </span>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-100 px-2 py-0.5 rounded-full">
                Flat 30% Off
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Couple & Memory Keepsakes
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Personalized dual mugs, memory frames and custom photo books for your special day.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between gap-2">
            <button
              onClick={() => handleCopyCode('LOVE30')}
              className="px-3 py-1.5 bg-white border border-rose-200 rounded-lg text-xs font-mono font-bold text-rose-800 hover:bg-rose-100/60 transition"
            >
              {copiedCode === 'LOVE30' ? 'Copied!' : 'CODE: LOVE30'}
            </button>
            <button
              onClick={() => onShopCategory?.('Frames')}
              className="text-xs font-bold text-rose-700 hover:text-rose-900 transition"
            >
              Shop Deals →
            </button>
          </div>
        </div>

        {/* Card 2: Interactive Photo Tester */}
        <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-300 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-amber-800 tracking-wider text-[11px] uppercase">
                Live Studio
              </span>
              <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                Instant Preview
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Test Your Photo on Any Gift
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upload your favourite photo to preview it live on mugs, cushions, and frames before ordering.
            </p>
          </div>

          <div className="pt-4">
            <button
              onClick={onOpenPhotoTester}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition text-center"
            >
              Upload Photo & Test Live →
            </button>
          </div>
        </div>

        {/* Card 3: Free Express Courier */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-300 transition">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-800 tracking-wider text-[11px] uppercase">
                Fast Delivery
              </span>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                Pan India
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Free Courier On Orders ₹999+
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Safe transit packaging with 100% damage replacement guarantee. Priority dispatch within 48 hours.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700">
              Auto applied at checkout
            </span>
            <button
              onClick={() => onShopCategory?.('All categories')}
              className="text-xs font-bold text-emerald-800 hover:text-emerald-950 transition"
            >
              Browse All →
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
