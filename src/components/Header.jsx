import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, Layers, Camera, Tag, HelpCircle, PhoneCall, ShoppingBag, ShieldCheck } from 'lucide-react';

export const Header = ({ platformTheme, setPlatformTheme, onOpenPhotoTester }) => {
  const { 
    cart, 
    currentView, setCurrentView 
  } = useStore();

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-20 gap-3">
          
          {/* Logo & Theme Switcher */}
          <div className="flex items-center justify-between sm:justify-start gap-4">
            <div 
              className="cursor-pointer flex items-center gap-2" 
              onClick={() => setCurrentView('store')}
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#b91c1c]">
                GraphicDen
              </span>
              <span className="hidden md:inline px-2 py-0.5 rounded-full bg-red-100 text-[#b91c1c] text-[10px] font-bold">
                .in
              </span>
            </div>

            {/* Platform Theme Switcher (Luxe vs Classic) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
              <button
                type="button"
                onClick={() => setPlatformTheme('luxe')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  platformTheme === 'luxe'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Ultra-Modern Luxury Studio with 3D Customizer"
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>Luxe Studio</span>
              </button>

              <button
                type="button"
                onClick={() => setPlatformTheme('classic')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold text-[11px] transition ${
                  platformTheme === 'classic'
                    ? 'bg-[#b91c1c] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Wireframe View matching user screenshots"
              >
                <Layers className="w-3 h-3" />
                <span>Classic Wireframe</span>
              </button>
            </div>
          </div>

          {/* Navigation Links & Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-2.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            
            {/* Shop button */}
            <button
              onClick={() => setCurrentView('store')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border text-center whitespace-nowrap ${
                currentView === 'store'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Shop Gifts
            </button>

            {/* In the gift: Photo & Test Live button! */}
            <button
              onClick={() => onOpenPhotoTester && onOpenPhotoTester()}
              className="px-3.5 sm:px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs flex items-center gap-1.5 transition whitespace-nowrap transform hover:-translate-y-0.5"
            >
              <Camera className="w-3.5 h-3.5 text-amber-300" />
              <span>Photo & Test It</span>
            </button>

            {/* About Us button */}
            <button
              onClick={() => setCurrentView('about')}
              className={`hidden md:inline-block px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border text-center whitespace-nowrap ${
                currentView === 'about'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              About
            </button>

            {/* Contact button */}
            <button
              onClick={() => setCurrentView('contact')}
              className={`hidden md:inline-block px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border text-center whitespace-nowrap ${
                currentView === 'contact'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Contact
            </button>

            {/* My Account */}
            <button
              onClick={() => setCurrentView('account')}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold transition border text-center whitespace-nowrap ${
                currentView === 'account'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              My Orders
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentView('cart')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border text-center whitespace-nowrap flex items-center gap-1.5 ${
                currentView === 'cart'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart ({cartCount})</span>
            </button>

            {/* Admin Button */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition border text-center whitespace-nowrap ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
              }`}
            >
              Admin Portal
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
