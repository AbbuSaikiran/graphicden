import React from 'react';
import { Camera, Gift, Heart, ArrowRight, ShieldCheck, Truck, Clock, Award } from 'lucide-react';
import { OCCASIONS } from '../data/initialData';

export const Banner = ({ onSelectOccasion, onShopNow }) => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-rose-50/60 via-pink-50/30 to-white pb-12 pt-6">
      
      {/* Decorative Blur Orbs */}
      <div className="absolute top-10 left-1/4 w-72 h-72 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs font-semibold shadow-xs">
              <Gift className="w-3.5 h-3.5 text-rose-600" />
              <span>India’s Leading Personalized Gift Brand</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Make Every Moment <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600">
                Unforgettable & Custom
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Explore bespoke 3D Acrylic Lamps, scannable Spotify Plaques, luxury hampers, and vibrant neon signs. Crafted with precision for the people you cherish most.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="px-7 py-3.5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-full font-bold text-sm shadow-xl shadow-rose-500/25 flex items-center gap-2.5 transition transform hover:-translate-y-0.5"
              >
                <span>Explore Trending Gifts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              
              <a
                href="https://wa.me/919876543210?text=Hi%20GraphicDen!%20I%20need%20custom%20gift%20assistance"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-full font-bold text-sm shadow-sm flex items-center gap-2 transition"
              >
                <span>Custom Order on WhatsApp</span>
              </a>
            </div>

            {/* Occasion Filter Pills */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Popular Occasion Collections
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {OCCASIONS.map((occ) => (
                  <button
                    key={occ.label}
                    onClick={() => onSelectOccasion(occ.query)}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-700 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/50 shadow-xs transition"
                  >
                    <span>{occ.icon}</span>
                    <span>{occ.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Visual Showcase Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md">
              
              {/* Main Card with Real Gift Visual */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80"
                  alt="Personalized Lamp"
                  className="w-full h-80 object-cover"
                />
                <div className="p-5 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent absolute inset-x-0 bottom-0 text-white">
                  <span className="px-2.5 py-1 rounded-md bg-rose-500 text-[10px] font-black uppercase tracking-wider">
                    ★ #1 Trending Anniversary Gift
                  </span>
                  <h3 className="text-lg font-bold mt-2">Custom 3D Acrylic Photo Lamp</h3>
                  <p className="text-xs text-slate-300 mt-0.5">Laser engraved with your couple photo & anniversary date</p>
                  <div className="mt-2.5 flex items-center justify-between">
                    <div>
                      <span className="text-xl font-black text-rose-400">₹1,299</span>
                      <span className="text-xs text-slate-400 line-through ml-2">₹2,499</span>
                    </div>
                    <span className="text-xs font-medium bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                      ⚡ 48% OFF
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Testimonial Pill */}
              <div className="absolute -bottom-5 -left-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3 animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1 text-amber-400 text-xs">
                    {'★'.repeat(5)}
                  </div>
                  <p className="text-xs font-bold text-slate-800">50,000+ Happy Customers</p>
                  <p className="text-[10px] text-slate-400">Average 4.9/5 verified reviews</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4 Value Proposition Pillars */}
        <div className="mt-14 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">100% Bespoke Craft</p>
              <p className="text-[11px] text-slate-500">Live preview & custom text</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Pan-India Express</p>
              <p className="text-[11px] text-slate-500">Fast 3-5 day doorstep transit</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Damage Protection</p>
              <p className="text-[11px] text-slate-500">Free re-dispatch if transit damaged</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900">Veltrix Certified</p>
              <p className="text-[11px] text-slate-500">Enterprise security & encryption</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

