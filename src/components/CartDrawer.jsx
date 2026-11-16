import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, 
  Sparkles, ShieldCheck, Tag, Gift
} from 'lucide-react';

export const CartDrawer = () => {
  const { 
    isCartOpen, setIsCartOpen, 
    cart, updateCartQuantity, removeFromCart,
    setIsCheckoutOpen, addNotification
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  if (!isCartOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrapFee = cart.reduce((sum, item) => sum + (item.giftWrap ? 49 * item.quantity : 0), 0);
  
  // Free delivery over 999
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  
  // Coupon discount
  let discount = 0;
  if (appliedCoupon === 'FIRSTGIFT') {
    discount = 150;
  } else if (appliedCoupon === 'VELTRIX10') {
    discount = Math.round(subtotal * 0.10);
  }

  const finalTotal = Math.max(0, subtotal + giftWrapFee + shippingFee - discount);

  const applyCoupon = (e) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'FIRSTGIFT' || clean === 'VELTRIX10') {
      setAppliedCoupon(clean);
      addNotification('Coupon Applied', `Code ${clean} activated! Savings reflected in total.`, 'success');
    } else {
      addNotification('Invalid Coupon', 'Please try codes: FIRSTGIFT or VELTRIX10', 'warning');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-rose-600" />
              <h2 className="text-base font-bold text-slate-900">Your Gift Bag</h2>
              <span className="text-xs bg-rose-100 text-rose-700 font-bold px-2 py-0.5 rounded-full">
                {cart.length} {cart.length === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-slate-300" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Your bag is empty</p>
                <p className="text-xs mt-1">Discover handcrafted 3D lamps, neon signs and personalized treasures.</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-4 px-5 py-2.5 bg-rose-600 text-white rounded-full text-xs font-bold hover:bg-rose-700 transition"
                >
                  Start Gifting
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex gap-3.5 p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-rose-200 transition"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shrink-0 bg-slate-50 border border-slate-100"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-slate-400 hover:text-rose-600 p-0.5 transition"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization Details */}
                      {item.customization && (
                        <p className="text-[11px] text-rose-600 font-medium truncate mt-0.5">
                          Engraved: "{item.customization}"
                        </p>
                      )}
                      {item.giftWrap && (
                        <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <Gift className="w-3 h-3 text-rose-500" />
                          <span>Gift Box Wrapped (+₹49)</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                      <span className="text-xs font-black text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                      
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity - 1)}
                          className="p-1 hover:bg-white rounded text-slate-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.cartItemId, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded text-slate-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-3">
              
              {/* Coupon Form */}
              <form onSubmit={applyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. FIRSTGIFT)"
                    className="w-full pl-8 pr-2 py-1.5 text-xs uppercase bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition"
                >
                  Apply
                </button>
              </form>

              {appliedCoupon && (
                <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <span className="font-semibold">Coupon '{appliedCoupon}' Active</span>
                  <span className="font-bold">-₹{discount}</span>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {giftWrapFee > 0 && (
                  <div className="flex justify-between">
                    <span>Gift Box Wrapping</span>
                    <span className="font-semibold text-slate-800">₹{giftWrapFee}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Standard Shipping</span>
                  <span className="font-semibold text-slate-800">
                    {shippingFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `₹${shippingFee}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-rose-600 font-semibold">
                    <span>Discount Savings</span>
                    <span>-₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-rose-600">₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setIsCheckoutOpen(true);
                }}
                className="w-full py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>256-Bit Encrypted Secure Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

