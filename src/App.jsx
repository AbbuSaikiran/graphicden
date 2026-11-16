import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { LuxeStorefront } from './components/LuxeStorefront';
import { ExactStorefront } from './components/ExactStorefront';
import { ExactProductDetailModal } from './components/ExactProductDetailModal';
import { ExactCheckoutView } from './components/ExactCheckoutView';
import { LiveCustomizerModal } from './components/LiveCustomizerModal';
import { GiftGenieModal } from './components/GiftGenieModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { GiftPhotoTesterStudio } from './components/GiftPhotoTesterStudio';
import { AboutView, ContactView } from './components/AboutContact';
import { CustomerDashboard } from './components/CustomerDashboard';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/Admin/AdminPortal';
import { SecurityDemoPill } from './components/SecurityDemoPill';

function MainApp() {
  const { currentView, setCurrentView, notifications, products } = useStore();

  // Platform design theme: 'luxe' (Ultra-Modern Studio) | 'classic' (Wireframe)
  const [platformTheme, setPlatformTheme] = useState('luxe');

  // Interactive Modals
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [customizerProduct, setCustomizerProduct] = useState(null);
  const [isGiftGenieOpen, setIsGiftGenieOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  
  // Interactive Photo Tester Studio
  const [isPhotoTesterOpen, setIsPhotoTesterOpen] = useState(false);
  const [photoTesterProduct, setPhotoTesterProduct] = useState(null);

  const handleOpenPhotoTester = (product = null) => {
    setPhotoTesterProduct(product || products[0]);
    setIsPhotoTesterOpen(true);
  };

  // Active Bottom Toast
  const activeToast = notifications[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans selection:bg-rose-600 selection:text-white">
      
      {/* Header with Luxe vs Classic Switcher & Navigation */}
      <Header 
        platformTheme={platformTheme} 
        setPlatformTheme={setPlatformTheme} 
        onOpenPhotoTester={handleOpenPhotoTester}
      />

      {/* Main Dynamic View */}
      <main className="flex-1">
        {currentView === 'store' && (
          platformTheme === 'luxe' ? (
            <LuxeStorefront
              onOpenLiveStudio={(p) => setCustomizerProduct(p || products[0])}
              onOpenGiftGenie={() => setIsGiftGenieOpen(true)}
              onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
              onOpenPhotoTester={handleOpenPhotoTester}
            />
          ) : (
            <ExactStorefront 
              onOpenProductModal={(p) => setSelectedProductModal(p)} 
              onOpenPhotoTester={handleOpenPhotoTester}
            />
          )
        )}

        {currentView === 'cart' && (
          <ExactCheckoutView onContinueShopping={() => setCurrentView('store')} />
        )}

        {currentView === 'admin' && (
          <AdminPortal />
        )}

        {currentView === 'about' && (
          <AboutView />
        )}

        {currentView === 'contact' && (
          <ContactView />
        )}

        {currentView === 'account' && (
          <CustomerDashboard />
        )}
      </main>

      {/* Footer */}
      {currentView !== 'admin' && <Footer />}

      {/* 3D Interactive Photo & Gift Testing Studio Modal */}
      <GiftPhotoTesterStudio
        isOpen={isPhotoTesterOpen}
        onClose={() => setIsPhotoTesterOpen(false)}
        initialProduct={photoTesterProduct}
      />

      {/* 3D Personalization Live Studio Modal */}
      <LiveCustomizerModal
        product={customizerProduct}
        isOpen={!!customizerProduct}
        onClose={() => setCustomizerProduct(null)}
      />

      {/* Smart Gift Genie Concierge Modal */}
      <GiftGenieModal
        isOpen={isGiftGenieOpen}
        onClose={() => setIsGiftGenieOpen(false)}
      />

      {/* Live Order GPS Radar Tracker Modal */}
      <LiveOrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      {/* Classic Product Detail Modal with Photo Tester Trigger */}
      <ExactProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onOpenPhotoTester={handleOpenPhotoTester}
      />

      {/* Bottom Center Toast Pill */}
      {activeToast && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-[#0f172a] text-white text-xs font-medium px-5 py-2.5 rounded-full shadow-2xl pointer-events-auto">
            {activeToast.title ? `${activeToast.message || activeToast.title}` : 'Item updated in cart'}
          </div>
        </div>
      )}

      {/* Quick Security Inspector */}
      <SecurityDemoPill />

    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <MainApp />
    </StoreProvider>
  );
}
