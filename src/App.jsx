import React, { useState } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { ExactStorefront } from './components/ExactStorefront';
import { ExactProductDetailModal } from './components/ExactProductDetailModal';
import { ExactCheckoutView } from './components/ExactCheckoutView';
import { LiveCustomizerModal } from './components/LiveCustomizerModal';
import { LiveOrderTrackerModal } from './components/LiveOrderTrackerModal';
import { GiftPhotoTesterStudio } from './components/GiftPhotoTesterStudio';
import { AboutView, ContactView } from './components/AboutContact';
import { CustomerDashboard } from './components/CustomerDashboard';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/Admin/AdminPortal';

function MainApp() {
  const { currentView, setCurrentView, notifications, products } = useStore();

  // Modals
  const [selectedProductModal, setSelectedProductModal] = useState(null);
  const [customizerProduct, setCustomizerProduct] = useState(null);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  
  // Interactive Photo Tester Studio
  const [isPhotoTesterOpen, setIsPhotoTesterOpen] = useState(false);
  const [photoTesterProduct, setPhotoTesterProduct] = useState(null);

  const handleOpenPhotoTester = (product = null) => {
    setPhotoTesterProduct(product || products[0]);
    setIsPhotoTesterOpen(true);
  };

  // Active Toast
  const activeToast = notifications[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 antialiased font-sans selection:bg-rose-600 selection:text-white">
      
      {/* Real Human Navigation Header */}
      <Header 
        onOpenPhotoTester={handleOpenPhotoTester}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'store' && (
          <ExactStorefront 
            onOpenProductModal={(p) => setSelectedProductModal(p)} 
            onOpenPhotoTester={handleOpenPhotoTester}
          />
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

      {/* Interactive Photo & Gift Customizer Modal */}
      <GiftPhotoTesterStudio
        isOpen={isPhotoTesterOpen}
        onClose={() => setIsPhotoTesterOpen(false)}
        initialProduct={photoTesterProduct}
      />

      {/* Customizer Modal */}
      <LiveCustomizerModal
        product={customizerProduct}
        isOpen={!!customizerProduct}
        onClose={() => setCustomizerProduct(null)}
      />

      {/* Order Tracker Modal */}
      <LiveOrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      {/* Product Detail Modal */}
      <ExactProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onOpenPhotoTester={handleOpenPhotoTester}
      />

      {/* Notification Toast */}
      {activeToast && (
        <div className="fixed bottom-6 inset-x-0 flex justify-center z-50 pointer-events-none animate-in fade-in slide-in-from-bottom-2">
          <div className="bg-slate-900 text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-xl pointer-events-auto">
            {activeToast.title ? `${activeToast.message || activeToast.title}` : 'Item updated in cart'}
          </div>
        </div>
      )}

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
