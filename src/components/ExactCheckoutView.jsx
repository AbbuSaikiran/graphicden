import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';
import { Check } from 'lucide-react';

export const ExactCheckoutView = ({ onContinueShopping }) => {
  const { 
    cart, updateCartQuantity, placeOrder, products, 
    setCurrentView, addNotification 
  } = useStore();

  const [step, setStep] = useState(1); // 1 = Cart and delivery, 2 = Payment, 3 = Confirmation

  // Delivery details form state (prefilled from screenshot)
  const [fullName, setFullName] = useState('Priya Reddy');
  const [email, setEmail] = useState('priya@example.com');
  const [mobile, setMobile] = useState('9876543210');
  const [address, setAddress] = useState('12-4-56 Hanamkonda Main Road');
  const [city, setCity] = useState('Warangal');
  const [pinCode, setPinCode] = useState('506001');

  // Payment method state
  const [payMethod, setPayMethod] = useState('Card'); // 'UPI' | 'Card' | 'Net banking' | 'Cash on delivery'
  const [upiId, setUpiId] = useState('demo@upi');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [nameOnCard, setNameOnCard] = useState('Priya Reddy');
  const [expiry, setExpiry] = useState('08/29');
  const [cvv, setCvv] = useState('•••');

  // Confirmed order data
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  // Subtotal and Total calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const deliveryFee = subtotal >= 999 || subtotal === 0 ? 0 : 79;
  const total = subtotal + deliveryFee;

  // Step 1: Validate and proceed to payment
  const handleProceedToPayment = (e) => {
    e.preventDefault();
    if (!fullName || !mobile || !address || !pinCode) {
      addNotification('Details Required', 'Please complete the delivery details.', 'warning');
      return;
    }
    setStep(2);
  };

  // Step 2: Complete payment and place order
  const handlePayOrder = () => {
    const orderItemsSummary = cart.map(i => `${i.name} ×${i.quantity || 1}`).join(', ');
    const paymentMethodLabel = payMethod === 'Card' 
      ? 'Card ending 4242' 
      : payMethod === 'UPI' 
      ? `UPI (${upiId})` 
      : payMethod;

    const newOrder = placeOrder({
      customerName: fullName,
      customerPhone: mobile,
      customerEmail: email,
      shippingAddress: `${address}, ${city} ${pinCode}`,
      itemsSummary: orderItemsSummary,
      items: [...cart],
      totalAmount: total,
      paymentMethod: paymentMethodLabel,
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed'
    });

    setConfirmedOrder({
      ...newOrder,
      items: [...cart],
      total: total,
      paymentMethodLabel: paymentMethodLabel,
      timestamp: new Date().toLocaleString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
    });

    setStep(3);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5">
      
      {/* Top Step Progress Bar: flex-wrap for mobile */}
      <div className="flex flex-wrap items-center gap-2">
        <span className={`px-3.5 py-1 rounded-full text-xs font-semibold transition ${
          step === 1
            ? 'bg-[#b91c1c] text-white'
            : 'bg-emerald-100 text-emerald-800'
        }`}>
          1 Cart and delivery
        </span>

        <span className={`px-3.5 py-1 rounded-full text-xs font-semibold transition ${
          step === 2
            ? 'bg-[#b91c1c] text-white'
            : step === 3
            ? 'bg-emerald-100 text-emerald-800'
            : 'bg-white border border-slate-200 text-slate-500'
        }`}>
          2 Payment
        </span>

        <span className={`px-3.5 py-1 rounded-full text-xs font-semibold transition ${
          step === 3
            ? 'bg-[#b91c1c] text-white'
            : 'bg-white border border-slate-200 text-slate-500'
        }`}>
          3 Confirmation
        </span>
      </div>

      {/* STEP 1: CART AND DELIVERY */}
      {step === 1 && (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5">
          
          {/* Left / Top: Your Cart */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Your cart</h2>

            {cart.length === 0 ? (
              <div className="py-12 text-center text-slate-400 text-sm">
                Your cart is empty. Please add items from the store.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {cart.map(item => (
                  <div key={item.cartItemId || item.id} className="py-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <ProductIllustration name={item.name} className="w-full h-full" />
                      </div>
                      <div>
                        <p className="font-bold text-xs text-slate-900">{item.name}</p>
                        <p className="text-[11px] text-slate-500">₹{item.price} each</p>
                      </div>
                    </div>

                    {/* Stepper [-] 1 [+] */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, (item.quantity || 1) - 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center text-xs"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs text-slate-900">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, (item.quantity || 1) + 1)}
                        className="w-7 h-7 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold flex items-center justify-center text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Totals Breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery (free above ₹999)</span>
                <span className="text-slate-900 font-medium">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Right / Bottom: Delivery Details */}
          <div className="lg:col-span-6 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4">Delivery details</h2>

            <form onSubmit={handleProceedToPayment} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-900 font-bold mb-1">Full name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-bold mb-1">Mobile</label>
                  <input
                    type="tel"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-bold mb-1">PIN code</label>
                  <input
                    type="text"
                    required
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-rose-600 rounded-xl focus:outline-none text-xs font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs disabled:opacity-50 mt-2"
              >
                Continue to payment
              </button>
            </form>
          </div>

        </div>
      )}

      {/* STEP 2: PAYMENT */}
      {step === 2 && (
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-5">
          
          {/* Top / Left: Choose How to Pay */}
          <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Choose how to pay</h2>

            {/* Payment method selector buttons */}
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                { id: 'UPI', label: 'UPI' },
                { id: 'Card', label: 'Card' },
                { id: 'Net banking', label: 'Net banking' },
                { id: 'Cash on delivery', label: 'Cash on delivery' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={`px-3.5 py-2 rounded-xl font-semibold border transition text-xs ${
                    payMethod === m.id
                      ? 'border-[#b91c1c] text-[#b91c1c] bg-rose-50/50'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* If UPI selected */}
            {payMethod === 'UPI' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-rose-600 rounded-xl text-xs focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">Test ID: demo@upi</p>
                </div>
              </div>
            )}

            {/* If Card selected */}
            {payMethod === 'Card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">Card number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-900 font-bold mb-1">Name on card</label>
                  <input
                    type="text"
                    value={nameOnCard}
                    onChange={(e) => setNameOnCard(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-900 font-bold mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-slate-400"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-900 font-bold mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      className="w-full px-3 py-2 bg-white border-2 border-rose-600 rounded-xl text-xs focus:outline-none font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-[11px] text-slate-500 pt-1">
              Demo only: no real money moves and card details are never stored.
            </p>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handlePayOrder}
                className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
              >
                Pay ₹{total.toLocaleString('en-IN')}
              </button>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition text-center"
              >
                Back to cart
              </button>
            </div>
          </div>

          {/* Bottom / Right: Order Summary */}
          <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3 text-xs">
            <h2 className="text-base font-bold text-slate-900">Order summary</h2>

            <div className="space-y-2 divide-y divide-slate-100">
              {cart.map(i => (
                <div key={i.cartItemId || i.id} className="pt-2 flex justify-between text-slate-800">
                  <span>{i.name} × {i.quantity || 1}</span>
                  <span className="font-semibold text-slate-900">₹{(i.price * (i.quantity || 1)).toLocaleString('en-IN')}</span>
                </div>
              ))}
              <div className="pt-2 flex justify-between text-slate-700">
                <span>Delivery</span>
                <span className="font-medium">{deliveryFee === 0 ? 'Free' : `₹${deliveryFee}`}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-between text-base font-bold text-slate-900">
              <span>To pay</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>

            <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
              Delivering to {fullName}, {address}, {city} {pinCode}
            </p>
          </div>

        </div>
      )}

      {/* STEP 3: CONFIRMATION (Matches Image 6) */}
      {step === 3 && confirmedOrder && (
        <div className="max-w-xl mx-auto bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4 animate-in zoom-in-95">
          
          {/* Green Check Icon */}
          <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center">
            <Check className="w-7 h-7 stroke-[3]" />
          </div>

          {/* Title & Order ID */}
          <div>
            <h2 className="text-2xl font-black text-slate-900">Order placed</h2>
            <p className="text-xs text-slate-500 mt-1">
              Order {confirmedOrder.id} · {confirmedOrder.timestamp}
            </p>
          </div>

          {/* Itemized List */}
          <div className="space-y-1.5 text-xs text-slate-800 divide-y divide-slate-100 border-y border-slate-100 py-3">
            {confirmedOrder.items.map((i, idx) => (
              <div key={idx} className="pt-1.5 flex justify-between">
                <span>{i.name} × {i.quantity || 1}</span>
                <span className="font-semibold text-slate-900">₹{(i.price * (i.quantity || 1)).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>

          {/* Total Paid */}
          <div className="flex justify-between text-sm font-bold text-slate-900">
            <span>Total paid</span>
            <span>₹{confirmedOrder.total.toLocaleString('en-IN')}</span>
          </div>

          {/* Details */}
          <div className="space-y-1 text-xs text-slate-600">
            <p><strong className="text-slate-800">Payment:</strong> {confirmedOrder.paymentMethodLabel}</p>
            <p><strong className="text-slate-800">Delivering to:</strong> {fullName}, {address}, {city} {pinCode}</p>
            <p><strong className="text-slate-800">Estimated delivery:</strong> 3 to 5 working days</p>
          </div>

          {/* Buttons: side by side or wrap */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              Print receipt
            </button>
            <button
              onClick={onContinueShopping}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl text-xs font-bold transition"
            >
              Continue shopping
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
