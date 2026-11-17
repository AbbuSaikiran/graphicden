import React from 'react';
import { useStore } from '../context/StoreContext';

export const Header = ({ onOpenPhotoTester }) => {
  const { 
    cart, 
    currentView, setCurrentView 
  } = useStore();

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:h-20 gap-3">
          
          {/* Logo */}
          <div className="flex items-center justify-between">
            <div 
              className="cursor-pointer flex items-center gap-2" 
              onClick={() => setCurrentView('store')}
            >
              <span className="text-2xl sm:text-3xl font-black tracking-tight text-[#b91c1c]">
                GraphicDen
              </span>
              <span className="text-xs font-semibold text-slate-400">.in</span>
            </div>

            {/* Mobile Cart & Admin quick links */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setCurrentView('cart')}
                className="px-3 py-1.5 bg-[#b91c1c] text-white rounded-lg text-xs font-bold"
              >
                Cart ({cartCount})
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold"
              >
                Admin
              </button>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button
              onClick={() => setCurrentView('store')}
              className={`hover:text-[#b91c1c] transition ${currentView === 'store' ? 'text-[#b91c1c] font-bold' : ''}`}
            >
              Shop Gifts
            </button>
            
            <button
              onClick={() => onOpenPhotoTester && onOpenPhotoTester()}
              className="text-rose-700 hover:text-rose-900 font-semibold transition"
            >
              Photo Customizer
            </button>

            <button
              onClick={() => setCurrentView('about')}
              className={`hover:text-[#b91c1c] transition ${currentView === 'about' ? 'text-[#b91c1c] font-bold' : ''}`}
            >
              About Us
            </button>

            <button
              onClick={() => setCurrentView('contact')}
              className={`hover:text-[#b91c1c] transition ${currentView === 'contact' ? 'text-[#b91c1c] font-bold' : ''}`}
            >
              Contact
            </button>

            <button
              onClick={() => setCurrentView('account')}
              className={`hover:text-[#b91c1c] transition ${currentView === 'account' ? 'text-[#b91c1c] font-bold' : ''}`}
            >
              My Orders
            </button>
          </nav>

          {/* Header Action Buttons (Matching Screenshot UI) */}
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            
            {/* Shop Button */}
            <button
              onClick={() => setCurrentView('store')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition border text-center ${
                currentView === 'store'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Shop
            </button>

            {/* Photo & Test Button */}
            <button
              onClick={() => onOpenPhotoTester && onOpenPhotoTester()}
              className="flex-1 sm:flex-none px-3.5 sm:px-4 py-2 bg-rose-50 hover:bg-rose-100 text-[#b91c1c] border border-rose-200 rounded-xl text-xs sm:text-sm font-bold transition text-center"
            >
              Test Photo
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCurrentView('cart')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition border text-center ${
                currentView === 'cart'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
              }`}
            >
              Cart ({cartCount})
            </button>

            {/* Admin Button */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-xl text-sm font-bold transition border text-center ${
                currentView === 'admin'
                  ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                  : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
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
