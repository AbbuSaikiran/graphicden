import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Package, Heart, Shield, User, ArrowLeft, Clock, 
  CheckCircle2, Truck, ExternalLink, Calendar, MapPin
} from 'lucide-react';

export const CustomerDashboard = () => {
  const { 
    customerUser, orders, wishlist, addToCart, 
    setCurrentView, setSelectedProduct 
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'wishlist' | 'security'

  // Filter orders for current user or show recent demo orders
  const userOrders = orders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Back button */}
      <button
        onClick={() => setCurrentView('store')}
        className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Gift Catalogue</span>
      </button>

      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {customerUser?.name ? customerUser.name.charAt(0) : 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black">{customerUser?.name || 'Guest Customer'}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Account
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">{customerUser?.email || 'customer@graphicden.in'}</p>
            <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-rose-400" />
                Auth: {customerUser?.authProvider || 'bcrypt Password'}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-indigo-400" />
                {userOrders.length} Orders Placed
              </span>
            </div>
          </div>
        </div>

        {/* Quick Nav Tabs */}
        <div className="flex bg-white/10 p-1.5 rounded-2xl backdrop-blur-md text-xs font-medium">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'orders' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-white hover:text-rose-200'}`}
          >
            My Orders ({userOrders.length})
          </button>
          <button
            onClick={() => setActiveTab('wishlist')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'wishlist' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-white hover:text-rose-200'}`}
          >
            Wishlist ({wishlist.length})
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl transition ${activeTab === 'security' ? 'bg-white text-slate-900 font-bold shadow-sm' : 'text-white hover:text-rose-200'}`}
          >
            Security Vault
          </button>
        </div>
      </div>

      {/* TAB 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Your Order History & Live Tracking</h2>

          {userOrders.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">No orders yet</p>
              <button
                onClick={() => setCurrentView('store')}
                className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-full text-xs font-bold hover:bg-rose-700 transition"
              >
                Browse Personalized Gifts
              </button>
            </div>
          ) : (
            userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden p-6 space-y-6"
              >
                {/* Header line */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg">
                      {order.id}
                    </span>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Ordered on {new Date(order.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      Tracking: {order.trackingNumber}
                    </span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                      order.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : order.orderStatus === 'Dispatched'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      ● {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* Tracking Progress Timeline Bar */}
                <div className="py-2">
                  <div className="relative flex items-center justify-between max-w-2xl mx-auto">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full -z-0"></div>
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-rose-500 transition-all -z-0"
                      style={{
                        width: order.orderStatus === 'Delivered' ? '100%' : order.orderStatus === 'Dispatched' ? '66%' : order.orderStatus === 'Packed' ? '33%' : '10%'
                      }}
                    ></div>

                    {['Confirmed', 'Packed', 'Dispatched', 'Delivered'].map((step, idx) => {
                      const isComplete = 
                        order.orderStatus === step || 
                        (step === 'Confirmed') ||
                        (step === 'Packed' && (order.orderStatus === 'Packed' || order.orderStatus === 'Dispatched' || order.orderStatus === 'Delivered')) ||
                        (step === 'Dispatched' && (order.orderStatus === 'Dispatched' || order.orderStatus === 'Delivered')) ||
                        (step === 'Delivered' && order.orderStatus === 'Delivered');

                      return (
                        <div key={step} className="flex flex-col items-center z-10">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                            isComplete ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30' : 'bg-slate-200 text-slate-500'
                          }`}>
                            {idx + 1}
                          </div>
                          <span className="text-[11px] font-semibold text-slate-700 mt-1">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items in this order */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-slate-800">{item.name}</p>
                        {item.customization && (
                          <p className="text-rose-600 font-medium mt-0.5">
                            Engraving: "{item.customization}"
                          </p>
                        )}
                        <p className="text-slate-500 mt-0.5">Qty: {item.quantity} • ₹{item.price}</p>
                      </div>
                      <div className="text-xs font-black text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total & Shipping info */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-600 pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Delivering to: <span className="font-semibold text-slate-800">{order.shippingAddress}</span></span>
                  </div>
                  <div className="text-sm font-black text-slate-900">
                    Grand Total: <span className="text-rose-600">₹{order.totalAmount.toLocaleString('en-IN')}</span> ({order.paymentMethod})
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      )}

      {/* TAB 2: Wishlist */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <h2 className="text-lg font-bold text-slate-900">Your Saved Favorites ({wishlist.length})</h2>
          {wishlist.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
              <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-700">Your wishlist is currently empty</p>
              <button
                onClick={() => setCurrentView('store')}
                className="mt-4 px-6 py-2.5 bg-rose-600 text-white rounded-full text-xs font-bold hover:bg-rose-700 transition"
              >
                Explore Gift Store
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between">
                  <img src={item.image} alt={item.name} className="w-full h-44 object-cover rounded-xl mb-3" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                    <p className="text-sm font-black text-slate-900 mt-1">₹{item.price}</p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => setSelectedProduct(item)}
                      className="flex-1 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
                    >
                      Customize
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: Security Vault Details */}
      {activeTab === 'security' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              Active Customer Security Protocols
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              GraphicDen.in implements comprehensive e-commerce defenses to protect your credentials and orders.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900">Password Hashing</p>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Passwords are encrypted using salted bcrypt hashing with work-factor cost 12. Plaintext passwords are never logged or stored.
              </p>
              <span className="inline-block mt-2 text-[10px] font-mono bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                bcrypt Active
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900">Session Cookie Security</p>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Tokens use HttpOnly flags to prevent Cross-Site Scripting (XSS), Secure flags to mandate TLS, and SameSite=Strict against CSRF.
              </p>
              <span className="inline-block mt-2 text-[10px] font-mono bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded">
                HttpOnly; Secure; SameSite
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-900">Brute-Force Rate Limiting</p>
              <p className="text-slate-500 mt-1 leading-relaxed">
                Accounts are automatically quarantined for 60 seconds after 3 invalid authentication attempts, preventing credential stuffing bots.
              </p>
              <span className="inline-block mt-2 text-[10px] font-mono bg-rose-100 text-rose-800 px-2 py-0.5 rounded">
                Rate-Limiter Active
              </span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

