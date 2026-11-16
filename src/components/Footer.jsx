import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Gift, Heart, Phone, Mail, MapPin, Shield, Lock, 
  ExternalLink, Sparkles, MessageSquare
} from 'lucide-react';

export const Footer = () => {
  const { setCurrentView } = useStore();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Gift className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Graphic<span className="text-rose-500">Den</span>.in
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              India's bespoke online gift destination. Handcrafted 3D acrylic lamps, wooden photo plaques, neon signs, and luxury anniversary gift hampers.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://wa.me/919876543210?text=Hello%20GraphicDen!%20I%20want%20to%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Instant Support</span>
              </a>

              <button
                onClick={() => setCurrentView('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold border border-amber-400/30 transition"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Staff Portal</span>
              </button>
            </div>
          </div>

          {/* Col 2: Gift Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setCurrentView('store')} className="hover:text-rose-400 transition">3D Acrylic Illusion Lamps</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-rose-400 transition">Laser Engraved Wood Plaque</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-rose-400 transition">Custom Neon Wall Signs</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-rose-400 transition">Scannable Spotify Glass</button></li>
              <li><button onClick={() => setCurrentView('store')} className="hover:text-rose-400 transition">Royal Wedding Hampers</button></li>
            </ul>
          </div>

          {/* Col 3: Company & Proposal Info */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">About & Trust</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><button onClick={() => setCurrentView('about')} className="hover:text-rose-400 transition">Our Craftsmanship Story</button></li>
              <li><button onClick={() => setCurrentView('contact')} className="hover:text-rose-400 transition">Contact Studio & Location</button></li>
              <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-rose-400 transition">Track Parcel Status</button></li>
              <li><span className="text-slate-500">Prepared by Veltrix Stories</span></li>
              <li><span className="text-slate-500">GraphicDen.in Proposal ₹30,000</span></li>
            </ul>
          </div>

          {/* Col 4: Security Highlights */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Security Architecture</h4>
            <div className="space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Lock className="w-3.5 h-3.5" />
                <span>Salted bcrypt Hashing</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <Shield className="w-3.5 h-3.5" />
                <span>2FA Authenticator TOTP</span>
              </div>
              <div className="flex items-center gap-1.5 text-rose-400">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Role-Based Access (RBAC)</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400">
                <Shield className="w-3.5 h-3.5" />
                <span>IP Allow-Listing Defense</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} GraphicDen.in. All Rights Reserved. Conceptualized & Developed by <strong>Veltrix Stories</strong>.
          </div>

          {/* Payment Icons */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400 uppercase font-semibold">100% Secure Payments:</span>
            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-bold bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700">
              <span>UPI</span> • <span>Cards</span> • <span>NetBanking</span> • <span>COD</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

