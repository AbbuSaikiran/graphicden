import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const PromoAdsSection = ({ onShopCategory, onOpenPhotoTester }) => {
  const { addNotification } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addNotification('Coupon Copied!', `Code ${code} copied to clipboard. Apply at checkout.`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="space-y-6 py-4">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#b91c1c] uppercase tracking-wider block mb-1">
            Special Offers & Seasonal Campaigns
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Promotional Deals & Discounts
          </h2>
          <p className="text-sm text-slate-600 mt-0.5">
            Save on handcrafted personalized gifts with limited-time coupons & bulk corporate rates.
          </p>
        </div>

        <button
          onClick={onOpenPhotoTester}
          className="px-5 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold rounded-xl shadow-xs transition text-center"
        >
          Upload Photo & Preview Live →
        </button>
      </div>

      {/* Main Grid of 3 Promotional Cards (No icons, clean text) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ad 1: Anniversary Romance 30% OFF */}
        <div className="rounded-2xl bg-gradient-to-br from-rose-900 to-rose-800 text-white p-6 shadow-md flex flex-col justify-between border border-rose-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 uppercase tracking-wider text-rose-100">
                LIMITED TIME OFFER
              </span>
              <span className="text-rose-200">
                Ends Tonight
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold tracking-tight text-amber-300">
                FLAT 30% OFF
              </span>
              <h3 className="text-lg font-bold mt-1 text-white leading-snug">
                Anniversary & Couple Keepsakes
              </h3>
              <p className="text-xs text-rose-100/90 mt-1.5 leading-relaxed">
                Personalized couple mugs, dual memory frames & photo books crafted to celebrate your love story.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between bg-black/30 px-3.5 py-2 rounded-xl border border-white/15">
              <span className="font-mono font-bold text-xs tracking-wider text-amber-200">
                CODE: LOVE30
              </span>
              <button
                onClick={() => handleCopyCode('LOVE30')}
                className="text-[11px] font-bold text-white hover:text-amber-300 transition"
              >
                {copiedCode === 'LOVE30' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Frames')}
              className="w-full py-2.5 bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs rounded-xl transition text-center"
            >
              Shop Anniversary Deals →
            </button>
          </div>
        </div>

        {/* Ad 2: Corporate & Bulk Branding */}
        <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 shadow-md flex flex-col justify-between border border-slate-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-indigo-200 uppercase tracking-wider">
                CORPORATE ORDERS
              </span>
              <span className="text-slate-300">
                GST Invoicing Available
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold tracking-tight text-sky-400">
                UP TO 45% OFF
              </span>
              <h3 className="text-lg font-bold mt-1 text-white leading-snug">
                Bespoke Corporate Hampers & Plaques
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Laser engraved executive wooden plaques, customized drinkware & welcome kits with your brand logo.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between bg-black/40 px-3.5 py-2 rounded-xl border border-white/10">
              <span className="font-mono font-bold text-xs tracking-wider text-sky-200">
                CODE: CORP15
              </span>
              <button
                onClick={() => handleCopyCode('CORP15')}
                className="text-[11px] font-bold text-white hover:text-sky-300 transition"
              >
                {copiedCode === 'CORP15' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Hampers')}
              className="w-full py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl transition text-center"
            >
              Explore Corporate Catalog →
            </button>
          </div>
        </div>

        {/* Ad 3: Room Decor & Gift Offers */}
        <div className="rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-800 text-white p-6 shadow-md flex flex-col justify-between border border-neutral-700">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                HOME DÉCOR
              </span>
              <span className="text-amber-300">
                Free Adapter Included
              </span>
            </div>

            <div>
              <span className="text-3xl font-extrabold tracking-tight text-amber-400">
                FROM ₹249
              </span>
              <h3 className="text-lg font-bold mt-1 text-white leading-snug">
                Custom Cushions & Desk Calendars
              </h3>
              <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                Spruce up your living space or office desk with customized velvet cushions and yearly memory calendars.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-3">
            <div className="flex items-center justify-between bg-black/40 px-3.5 py-2 rounded-xl border border-white/10">
              <span className="font-mono font-bold text-xs tracking-wider text-amber-200">
                CODE: DECOR10
              </span>
              <button
                onClick={() => handleCopyCode('DECOR10')}
                className="text-[11px] font-bold text-white hover:text-amber-300 transition"
              >
                {copiedCode === 'DECOR10' ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Home')}
              className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition text-center"
            >
              Shop Home Décor →
            </button>
          </div>
        </div>

      </div>

      {/* Ad Banner 4: Clean Horizontal Free Gift Offer Bar */}
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-2 py-0.5 rounded bg-[#b91c1c] text-white text-[10px] font-bold uppercase tracking-wider">
            FESTIVE OFFER
          </span>
          <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1">
            Buy Any 2 Personalized Gifts, Get a Free Ceramic Photo Mug!
          </h4>
          <p className="text-xs text-slate-500">
            Valid on all prepaid orders placed today across India.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="font-mono font-bold text-xs bg-white border border-slate-300 px-3 py-1.5 rounded-lg text-slate-800">
            CODE: FREEPHOTO
          </span>
          <button
            onClick={() => handleCopyCode('FREEPHOTO')}
            className="px-3 py-1.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold rounded-lg transition"
          >
            Apply Code
          </button>
        </div>
      </div>

    </section>
  );
};
