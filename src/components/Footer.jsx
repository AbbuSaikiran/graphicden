import React from 'react';
import { useStore } from '../context/StoreContext';

export const Footer = () => {
  const { setCurrentView } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <span className="text-2xl font-black text-[#b91c1c] tracking-tight">
              GraphicDen<span className="text-slate-400 text-xs font-normal">.in</span>
            </span>

            <p className="text-xs text-slate-400 leading-relaxed">
              India's bespoke online gift destination. Handcrafted photo mugs, custom cushions, memory wooden frames, and festive hampers.
            </p>

            <div className="pt-1">
              <a
                href="https://wa.me/919876543210?text=Hello%20GraphicDen!%20I%20want%20to%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition"
              >
                WhatsApp Instant Support
              </a>
            </div>
          </div>

          {/* Gift Categories */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><button onClick={() => setCurrentView('store')} className="hover:text-white transition">Personalized Photo Mugs</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-white transition">Memory Photo Frames</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-white transition">Custom Name Keychains</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-white transition">Handcrafted Gift Hampers</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-white transition">Personalized Cushions</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-white transition">Our Craftsmanship</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-white transition">Contact & Studio Address</button></li>
              <li><button onClick={() => setCurrentView('account')} className="hover:text-white transition">Track Your Order</button></li>
              <li><span className="text-slate-400">Free Delivery on Orders ₹999+</span></li>
              <li><span className="text-slate-400">100% Safe Transit Guarantee</span></li>
            </ul>
          </div>

          {/* Secure Payments & Admin */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Payment & Security</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Secured by Razorpay. We accept UPI (Google Pay, PhonePe, Paytm), Debit/Credit Cards, and NetBanking with automated webhook verification.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentView('admin')}
                className="text-xs text-slate-500 hover:text-slate-300 transition underline"
              >
                Admin & Staff Portal
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 GraphicDen.in. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Razorpay Verified</span>
            <span>•</span>
            <span>Made with Care in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
