import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  X, ShieldCheck, MapPin, CreditCard, QrCode, Truck, 
  CheckCircle2, ArrowRight, Lock, Sparkles, Phone, Mail, User
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    isCheckoutOpen, setIsCheckoutOpen, 
    cart, customerUser, placeOrder,
    setCurrentView
  } = useStore();

  // Form inputs
  const [name, setName] = useState(customerUser?.name || 'Rahul Sharma');
  const [email, setEmail] = useState(customerUser?.email || 'rahul.sharma@gmail.com');
  const [phone, setPhone] = useState(customerUser?.phone || '9876543210');
  const [address, setAddress] = useState('Flat 402, Sunshine Heights, Koramangala 4th Block');
  const [city, setCity] = useState('Bengaluru');
  const [state, setState] = useState('Karnataka');
  const [pincode, setPincode] = useState('560034');

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState('UPI'); // 'UPI' | 'Card' | 'COD'
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [placedOrderResult, setPlacedOrderResult] = useState(null);

  if (!isCheckoutOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const giftWrapFee = cart.reduce((sum, item) => sum + (item.giftWrap ? 49 * item.quantity : 0), 0);
  const shippingFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const totalAmount = subtotal + giftWrapFee + shippingFee;

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    // Simulate payment gateway interaction (Razorpay / UPI validation)
    setTimeout(() => {
      setIsProcessingPayment(false);

      const order = placeOrder({
        customerName: name,
        customerEmail: email,
        customerPhone: '+91 ' + phone,
        shippingAddress: `${address}, ${city}, ${state} - ${pincode}`,
        items: [...cart],
        totalAmount: totalAmount,
        paymentMethod: paymentMethod === 'UPI' ? 'UPI (PhonePe / GPay)' : paymentMethod === 'Card' ? 'Card (Razorpay)' : 'Cash on Delivery',
        paymentStatus: paymentMethod === 'COD' ? 'Pending on Delivery' : 'Paid'
      });

      setPlacedOrderResult(order);

      // Trigger celebratory confetti
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });

    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-100">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-rose-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold">GraphicDen.in Secure Checkout</h2>
              <p className="text-[11px] text-slate-300">PCI-DSS Compliant • 256-Bit SSL Encrypted</p>
            </div>
          </div>
          {!placedOrderResult && (
            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Order Confirmed View */}
        {placedOrderResult ? (
          <div className="p-8 text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                Order Placed Successfully!
              </span>
              <h3 className="text-2xl font-black text-slate-900 mt-2">
                Thank You, {placedOrderResult.customerName}!
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your order is confirmed and our craftsmen are preparing your personalized gift.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="max-w-md mx-auto p-4 bg-slate-50 border border-slate-200 rounded-2xl text-left space-y-2 text-xs">
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">Order Reference</span>
                <span className="font-mono font-bold text-slate-800">{placedOrderResult.id}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">Tracking Number</span>
                <span className="font-mono font-bold text-rose-600">{placedOrderResult.trackingNumber}</span>
              </div>
              <div className="flex justify-between border-b pb-2 border-slate-200">
                <span className="text-slate-500">Delivery Address</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">{placedOrderResult.shippingAddress}</span>
              </div>
              <div className="flex justify-between pt-1 font-bold text-sm text-slate-900">
                <span>Total Paid</span>
                <span className="text-emerald-600">₹{placedOrderResult.totalAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* WhatsApp simulation badge */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>We transmitted your invoice & live tracking updates to WhatsApp at {placedOrderResult.customerPhone}</span>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPlacedOrderResult(null);
                  setCurrentView('dashboard');
                }}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
              >
                View Order in Dashboard
              </button>
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setPlacedOrderResult(null);
                  setCurrentView('store');
                }}
                className="px-6 py-2.5 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCompleteOrder} className="p-6 space-y-6">
            
            {/* Step 1: Shipping Details */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <MapPin className="w-4 h-4 text-rose-500" />
                Shipping & Recipient Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">WhatsApp Mobile (For Updates)</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-slate-700 font-medium mb-1">Street Address / House / Flat No.</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">PIN Code</label>
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Gateway Selection */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-3">
                <CreditCard className="w-4 h-4 text-rose-500" />
                Select Payment Method
              </h3>

              <div className="grid grid-cols-3 gap-3">
                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition ${paymentMethod === 'UPI' ? 'border-rose-600 bg-rose-50/50 text-rose-700 font-bold' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'UPI'}
                    onChange={() => setPaymentMethod('UPI')}
                    className="sr-only"
                  />
                  <QrCode className="w-5 h-5 text-rose-600" />
                  <span className="text-xs">Instant UPI</span>
                  <span className="text-[10px] text-slate-400 font-normal">GPay / PhonePe</span>
                </label>

                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition ${paymentMethod === 'Card' ? 'border-rose-600 bg-rose-50/50 text-rose-700 font-bold' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'Card'}
                    onChange={() => setPaymentMethod('Card')}
                    className="sr-only"
                  />
                  <CreditCard className="w-5 h-5 text-indigo-600" />
                  <span className="text-xs">Cards / Netbanking</span>
                  <span className="text-[10px] text-slate-400 font-normal">Razorpay Gateway</span>
                </label>

                <label className={`p-3 rounded-2xl border cursor-pointer flex flex-col items-center justify-center gap-1.5 text-center transition ${paymentMethod === 'COD' ? 'border-rose-600 bg-rose-50/50 text-rose-700 font-bold' : 'border-slate-200 hover:bg-slate-50'}`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'COD'}
                    onChange={() => setPaymentMethod('COD')}
                    className="sr-only"
                  />
                  <Truck className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-400 font-normal">Pay on Arrival</span>
                </label>
              </div>
            </div>

            {/* Bottom Amount & Submit */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500">Payable Total</p>
                <p className="text-2xl font-black text-slate-900">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>

              <button
                type="submit"
                disabled={isProcessingPayment}
                className="py-3 px-6 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-rose-500/20 flex items-center gap-2 disabled:opacity-50 transition"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Connecting Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Authorize & Place Order</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

