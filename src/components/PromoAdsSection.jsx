import React, { useState } from 'react';
import { Camera, Tag, ArrowRight, Clock, Copy, Check, Gift, Percent, Building2, Flame } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const PromoAdsSection = ({ onShopCategory, onOpenPhotoTester }) => {
  const { addNotification } = useStore();
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    addNotification('Coupon Copied!', `Code ${code} copied to clipboard. Apply at checkout for discount.`, 'success');
    setTimeout(() => setCopiedCode(null), 3000);
  };

  return (
    <section className="space-y-8 py-6">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-rose-600 animate-pulse" />
            <span>Exclusive Promotional Deals & Ads</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Special Offers & Seasonal Campaigns
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Save on handcrafted personalized gifts with limited-time coupons & bulk corporate rates.
          </p>
        </div>

        <button
          onClick={onOpenPhotoTester}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold rounded-xl shadow-md transition"
        >
          <Camera className="w-4 h-4 text-white" />
          <span>Upload Photo & Preview Live →</span>
        </button>
      </div>

      {/* Main Grid of 3 High-Impact Promotional Ad Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Ad 1: Anniversary Romance 30% OFF */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-rose-900 via-rose-800 to-pink-900 text-white p-7 shadow-xl flex flex-col justify-between border border-rose-700/50 group hover:shadow-2xl transition duration-300">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition" />
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-extrabold uppercase tracking-widest text-rose-100">
                LIMITED TIME OFFER
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-rose-200">
                <Clock className="w-3.5 h-3.5" />
                <span>Ends Tonight</span>
              </span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-amber-300">
                FLAT 30% OFF
              </span>
              <h3 className="text-xl font-bold mt-1 text-white leading-snug">
                Anniversary & Couple Keepsakes
              </h3>
              <p className="text-xs text-rose-100/90 mt-2 leading-relaxed">
                Personalized couple mugs, dual LED frames & memory books crafted to celebrate your everlasting love story.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 space-y-3">
            <div className="flex items-center justify-between bg-black/30 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-mono font-bold text-xs tracking-wider text-amber-200">LOVE30</span>
              </div>
              <button
                onClick={() => handleCopyCode('LOVE30')}
                className="text-[11px] font-bold text-white hover:text-amber-300 flex items-center gap-1 transition"
              >
                {copiedCode === 'LOVE30' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Photo Gifts')}
              className="w-full py-2.5 bg-white text-rose-900 hover:bg-rose-50 font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Shop Anniversary Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ad 2: Corporate & Bulk Branding */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white p-7 shadow-xl flex flex-col justify-between border border-slate-700/60 group hover:shadow-2xl transition duration-300">
          <div className="absolute bottom-0 right-0 -mr-6 -mb-6 w-36 h-36 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-[10px] font-extrabold uppercase tracking-widest">
                CORPORATE SUITE
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-400">
                <Building2 className="w-3.5 h-3.5" />
                <span>GST Invoicing</span>
              </span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-sky-400">
                UP TO 45% OFF
              </span>
              <h3 className="text-xl font-bold mt-1 text-white leading-snug">
                Bespoke Corporate Hampers & Plaques
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Laser engraved executive wooden plaques, customized drinkware & welcome kits with your brand logo and employee names.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 space-y-3">
            <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-mono font-bold text-xs tracking-wider text-sky-200">CORP15</span>
              </div>
              <button
                onClick={() => handleCopyCode('CORP15')}
                className="text-[11px] font-bold text-white hover:text-sky-300 flex items-center gap-1 transition"
              >
                {copiedCode === 'CORP15' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Corporate Gifts')}
              className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-600 hover:to-indigo-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Explore Corporate Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Ad 3: Neon Signs & LED Optical Art */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-950 via-slate-900 to-pink-950 text-white p-7 shadow-xl flex flex-col justify-between border border-purple-800/50 group hover:shadow-2xl transition duration-300">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-200 border border-pink-400/30 text-[10px] font-extrabold uppercase tracking-widest">
                TRENDING DÉCOR
              </span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-amber-300">
                <Gift className="w-3.5 h-3.5" />
                <span>Free Adapter</span>
              </span>
            </div>

            <div>
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-fuchsia-400">
                FROM ₹799
              </span>
              <h3 className="text-xl font-bold mt-1 text-white leading-snug">
                Custom Neon Glow Signs & 3D Lamps
              </h3>
              <p className="text-xs text-purple-200/90 mt-2 leading-relaxed">
                Transform any room with personalized glowing neon typography and acrylic 3D illusion night lamps with 7 RGB modes.
              </p>
            </div>
          </div>

          <div className="pt-6 relative z-10 space-y-3">
            <div className="flex items-center justify-between bg-black/40 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <div className="flex items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-fuchsia-400" />
                <span className="font-mono font-bold text-xs tracking-wider text-fuchsia-200">NEONMAGIC</span>
              </div>
              <button
                onClick={() => handleCopyCode('NEONMAGIC')}
                className="text-[11px] font-bold text-white hover:text-fuchsia-300 flex items-center gap-1 transition"
              >
                {copiedCode === 'NEONMAGIC' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => onShopCategory?.('Home Decor')}
              className="w-full py-2.5 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center gap-1.5"
            >
              <span>Customize Neon Signs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* Ad Banner 4: Horizontal Special 50% Off Flash Bar (like in EleGift image) */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-red-600 p-1 shadow-lg">
        <div className="bg-white rounded-xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Gift className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-extrabold uppercase">
                  MEGA FESTIVE FLASH SALE
                </span>
                <span className="text-xs text-slate-500 font-medium hidden md:inline">
                  Valid for the next 48 hours across India
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mt-0.5">
                Buy Any 2 Personalized Gifts, Get Free High-Gloss Photo Mug!
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="font-mono font-black text-rose-600 text-sm bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200">
              CODE: FREEPHOTO
            </span>
            <button
              onClick={() => handleCopyCode('FREEPHOTO')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-xs"
            >
              Apply Deal
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};
