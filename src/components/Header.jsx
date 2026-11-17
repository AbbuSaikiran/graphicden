import React from 'react';
import { useStore } from '../context/StoreContext';

export const Header = ({ onOpenPhotoTester }) => {
  const { 
    cart, 
    currentView, setCurrentView 
  } = useStore();

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="bg-white border-b border-slate-200/90 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo - Matching Wireframe Exactly */}
          <div 
            className="cursor-pointer flex items-baseline gap-1 select-none" 
            onClick={() => setCurrentView('store')}
          >
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#b91c1c]">
              GraphicDen
            </span>
          </div>

          {/* Action Buttons - Matching Exact Wireframe in Image 1 & Image 3 */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            
            {/* Shop Button */}
            <button
              onClick={() => setCurrentView('store')}
              className={`px-4 sm:px-6 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
                currentView === 'store'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Shop
            </button>

            {/* Photo Studio / Test Photo Quick Button */}
            <button
              onClick={() => onOpenPhotoTester && onOpenPhotoTester()}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition border bg-rose-50 text-[#b91c1c] border-rose-200 hover:bg-rose-100"
            >
              Photo & Test
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentView('cart')}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
                currentView === 'cart'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Cart ({cartCount})
            </button>

            {/* Admin Button */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition border ${
                currentView === 'admin'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c] shadow-xs'
                  : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'
              }`}
            >
              Admin
            </button>

          </div>

        </div>
      </div>
    </header>
  );
};
