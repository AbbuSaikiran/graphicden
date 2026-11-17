import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const RazorpayModal = ({ isOpen, onClose, orderAmount, orderId, customerDetails, onSuccess }) => {
  const { addNotification, recordRazorpayWebhook } = useStore();

  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'qr'
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('888');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStep, setPaymentStep] = useState('form'); // 'form' | 'success' | 'webhook_view'
  const [latestWebhook, setLatestWebhook] = useState(null);

  if (!isOpen) return null;

  const razorpayOrderId = `order_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;
  const razorpayPaymentId = `pay_${Math.random().toString(36).substring(2, 11).toUpperCase()}`;

  const handlePay = () => {
    setIsProcessing(true);

    // Simulate real Razorpay gateway round-trip and webhook trigger
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentStep('success');

      // Construct official Razorpay Webhook event payload
      const webhookPayload = {
        entity: 'event',
        account_id: 'acc_GDEN99182',
        event: 'payment.captured',
        contains: ['payment'],
        payload: {
          payment: {
            entity: {
              id: razorpayPaymentId,
              entity: 'payment',
              amount: orderAmount * 100, // Razorpay amounts in paise
              currency: 'INR',
              status: 'captured',
              order_id: razorpayOrderId,
              invoice_id: null,
              international: false,
              method: activeTab === 'card' ? 'card' : activeTab === 'netbanking' ? 'netbanking' : 'upi',
              amount_refunded: 0,
              refund_status: null,
              captured: true,
              description: `GraphicDen.in Order ${orderId || '#GD10245'}`,
              card_id: activeTab === 'card' ? 'card_881920' : null,
              bank: activeTab === 'netbanking' ? selectedBank : null,
              wallet: null,
              vpa: activeTab === 'upi' ? upiId : null,
              email: customerDetails?.email || 'customer@graphicden.in',
              contact: customerDetails?.mobile || '9876543210',
              fee: Math.round(orderAmount * 0.02 * 100), // 2% gateway fee
              tax: Math.round(orderAmount * 0.0036 * 100), // 18% GST on fee
              error_code: null,
              error_description: null,
              created_at: Math.floor(Date.now() / 1000)
            }
          }
        },
        webhook_signature: `rzp_sec_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
        verified: true,
        received_at: new Date().toISOString()
      };

      setLatestWebhook(webhookPayload);
      if (recordRazorpayWebhook) {
        recordRazorpayWebhook(webhookPayload);
      }

      addNotification('Payment Captured', `Razorpay transaction ${razorpayPaymentId} verified successfully via webhook.`, 'success');

      if (onSuccess) {
        onSuccess({
          paymentId: razorpayPaymentId,
          orderId: razorpayOrderId,
          method: `Razorpay (${activeTab.toUpperCase()})`,
          webhook: webhookPayload
        });
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200">
        
        {/* Official Razorpay Header */}
        <div className="bg-[#0c2340] text-white p-5 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white">
                Razorpay
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0052cc] text-white">
                SECURE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Paying GraphicDen.in
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-300 block">Amount to Pay</span>
            <span className="text-xl font-black text-emerald-400">
              ₹{orderAmount?.toLocaleString('en-IN') || '0'}
            </span>
          </div>
        </div>

        {paymentStep === 'form' && (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl text-xs font-bold text-center">
              <button
                type="button"
                onClick={() => setActiveTab('upi')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'upi' ? 'bg-white text-[#0c2340] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                UPI / QR
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'card' ? 'bg-white text-[#0c2340] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Cards
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('netbanking')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'netbanking' ? 'bg-white text-[#0c2340] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                NetBanking
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('wallets')}
                className={`py-2 rounded-lg transition ${
                  activeTab === 'wallets' ? 'bg-white text-[#0c2340] shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Wallets
              </button>
            </div>

            {/* Tab 1: UPI & QR Code */}
            {activeTab === 'upi' && (
              <div className="space-y-4 pt-1">
                <div className="border border-slate-200 rounded-xl p-4 bg-slate-50 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Instant UPI QR Code</span>
                    <span className="text-[11px] text-slate-500">Scan using Google Pay, PhonePe, Paytm, or BHIM</span>
                  </div>
                  <div className="w-14 h-14 bg-white border border-slate-300 rounded-lg p-1 flex items-center justify-center shadow-xs">
                    <div className="w-full h-full bg-slate-900 rounded grid grid-cols-3 gap-0.5 p-1">
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white rounded-xs"></div>
                      <div className="bg-transparent"></div>
                      <div className="bg-white rounded-xs"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Or Enter Any UPI VPA ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="mobile@upi or user@okhdfcbank"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                  <div className="flex gap-2 mt-2">
                    {['@okhdfcbank', '@paytm', '@ybl', '@okicici'].map(suffix => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => setUpiId(upiId.split('@')[0] + suffix)}
                        className="text-[10px] font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded"
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Credit / Debit Cards */}
            {activeTab === 'card' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      placeholder="12/28"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVV</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#0c2340]"
                    />
                  </div>
                </div>

                <p className="text-[11px] text-slate-500">
                  Supported: Visa, MasterCard, RuPay, Maestro. 256-bit SSL encrypted.
                </p>
              </div>
            )}

            {/* Tab 3: NetBanking */}
            {activeTab === 'netbanking' && (
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-700">Select Your Bank</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map(bank => (
                    <button
                      key={bank}
                      type="button"
                      onClick={() => setSelectedBank(bank)}
                      className={`p-2.5 rounded-xl border text-left font-medium transition ${
                        selectedBank === bank
                          ? 'border-[#0c2340] bg-slate-100 font-bold'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {bank}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Wallets */}
            {activeTab === 'wallets' && (
              <div className="space-y-3 pt-1">
                <label className="block text-xs font-bold text-slate-700">Available Wallets</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {['Paytm Wallet', 'Amazon Pay', 'MobiKwik', 'Airtel Money'].map(w => (
                    <div key={w} className="p-3 border border-slate-200 rounded-xl bg-slate-50 font-semibold">
                      {w}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 bg-[#0c2340] hover:bg-[#15345d] text-white rounded-xl text-sm font-bold shadow-md transition disabled:opacity-50 text-center"
              >
                {isProcessing ? 'Connecting to Razorpay & Verifying Webhook...' : `Pay ₹${orderAmount?.toLocaleString('en-IN')} via Razorpay`}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 bg-transparent text-slate-500 hover:text-slate-800 text-xs font-semibold text-center"
              >
                Cancel and return to checkout
              </button>
            </div>
          </div>
        )}

        {/* Payment Success & Webhook Dispatch Step */}
        {paymentStep === 'success' && (
          <div className="p-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-2xl font-black shadow-inner">
              ✓
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Payment Successful!
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Transaction ID: <span className="font-mono font-bold text-slate-900">{latestWebhook?.payload?.payment?.entity?.id}</span>
              </p>
              <div className="inline-block mt-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                Razorpay Webhook: <code>payment.captured</code> (Signature Verified)
              </div>
            </div>

            {/* Webhook JSON Preview Toggle */}
            <div className="bg-slate-900 text-left rounded-xl p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto max-h-40">
              <div className="text-slate-400 text-[10px] pb-1 border-b border-slate-800 mb-1">
                POST /api/razorpay/webhook (200 OK)
              </div>
              <pre>{JSON.stringify(latestWebhook, null, 2)}</pre>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition text-center"
            >
              Continue to Order Confirmation →
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
