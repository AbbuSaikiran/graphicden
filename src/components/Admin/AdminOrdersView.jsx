import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  ShoppingCart, Package, Truck, CheckCircle2, Clock, 
  MapPin, Phone, MessageSquare, ExternalLink, Sparkles, Filter
} from 'lucide-react';

export const AdminOrdersView = () => {
  const { orders, updateOrderStatus, addNotification } = useStore();
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredOrders = filterStatus === 'All'
    ? orders
    : orders.filter(o => o.orderStatus === filterStatus);

  const handleWhatsAppUpdate = (order) => {
    const text = encodeURIComponent(
      `Hello ${order.customerName}! Your GraphicDen.in Order #${order.id} is now ${order.orderStatus.toUpperCase()}! Tracking ID: ${order.trackingNumber}. Thank you for choosing GraphicDen.`
    );
    window.open(`https://wa.me/${order.customerPhone.replace(/\D/g, '')}?text=${text}`, '_blank');
    addNotification('WhatsApp Dispatched', `Simulated WhatsApp tracking ping sent to ${order.customerPhone}`, 'info', { whatsapp: true });
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Orders & Packaging Pipeline</h1>
          <p className="text-xs text-slate-400 mt-1">Review gift customizations, shipping labels and update delivery stages</p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-1.5 bg-slate-900 p-1 rounded-2xl border border-slate-800 text-xs">
          {['All', 'Confirmed', 'Packed', 'Dispatched', 'Delivered'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl transition ${
                filterStatus === status
                  ? 'bg-rose-600 text-white font-bold shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-5">
        {filteredOrders.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-500 text-xs">
            No orders found under "{filterStatus}".
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-5 hover:border-slate-700 transition"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">
                    {order.id}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">{order.customerName}</h3>
                    <p className="text-[11px] text-slate-400">{order.customerEmail} • {order.customerPhone}</p>
                  </div>
                </div>

                {/* Status Switcher & Tracking */}
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs">
                    <span className="text-slate-500 text-[11px] uppercase font-bold">Status:</span>
                    <select
                      value={order.orderStatus}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="bg-slate-950 border border-slate-700 text-white text-xs font-bold px-3 py-1.5 rounded-xl focus:border-rose-500 cursor-pointer"
                    >
                      <option value="Confirmed">Confirmed (New)</option>
                      <option value="Packed">Packed (Ready)</option>
                      <option value="Dispatched">Dispatched (In Transit)</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                  {/* Send WhatsApp update button */}
                  <button
                    onClick={() => handleWhatsAppUpdate(order)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-semibold border border-emerald-500/30 transition"
                    title="Send WhatsApp update to customer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Update</span>
                  </button>
                </div>
              </div>

              {/* Items & Engraving Details for Craftsman/Packer */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Product items column */}
                <div className="md:col-span-7 space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Crafting & Packaging Instructions
                  </span>

                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-950 rounded-2xl border border-slate-800/80 flex items-start gap-3.5"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-800 shrink-0"
                      />
                      <div className="flex-1 text-xs">
                        <p className="font-bold text-white">{item.name}</p>
                        <p className="text-slate-400 text-[11px]">Quantity: {item.quantity} • ₹{item.price}</p>
                        
                        {/* Custom Engraving Highlight */}
                        {item.customization ? (
                          <div className="mt-1.5 p-2 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300">
                            <span className="font-bold flex items-center gap-1 text-[10px] uppercase tracking-wider">
                              <Sparkles className="w-3 h-3 text-rose-400" />
                              Custom Laser Text:
                            </span>
                            <p className="text-xs font-mono font-bold mt-0.5 select-all">
                              "{item.customization}"
                            </p>
                          </div>
                        ) : (
                          <span className="text-[10px] text-slate-500 mt-1 inline-block">No custom text requested</span>
                        )}

                        {item.giftWrap && (
                          <span className="inline-block mt-1 text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                            🎁 Include Luxury Gift Box Wrapping
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Delivery & Billing Summary */}
                <div className="md:col-span-5 bg-slate-950 p-4 rounded-2xl border border-slate-800/80 space-y-3 text-xs">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Shipping & Payment Details
                  </span>

                  <div>
                    <p className="text-slate-400 text-[11px] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-400" />
                      Destination Address:
                    </p>
                    <p className="font-medium text-slate-200 mt-1 leading-relaxed bg-slate-900 p-2.5 rounded-xl border border-slate-800 text-[11px]">
                      {order.shippingAddress}
                    </p>
                  </div>

                  <div className="space-y-1 pt-2 border-t border-slate-800 text-[11px]">
                    <div className="flex justify-between text-slate-400">
                      <span>Courier Partner</span>
                      <span className="text-white font-mono">{order.trackingNumber}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Payment Method</span>
                      <span className="text-white font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Payment Status</span>
                      <span className="text-emerald-400 font-bold">{order.paymentStatus}</span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold text-xs text-white">
                      <span>Invoice Total</span>
                      <span className="text-rose-400 text-sm">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

