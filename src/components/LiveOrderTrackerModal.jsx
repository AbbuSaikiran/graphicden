import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Truck, MapPin, CheckCircle2, Clock, X, Search, PhoneCall, ExternalLink } from 'lucide-react';

export const LiveOrderTrackerModal = ({ isOpen, onClose }) => {
  const { orders } = useStore();
  const [query, setQuery] = useState('GD1004');
  const [searchedOrder, setSearchedOrder] = useState(() => orders[0]);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(o => o.id.toLowerCase() === query.trim().toLowerCase());
    if (found) {
      setSearchedOrder(found);
    }
  };

  const steps = [
    { title: 'Order Received & Verified', location: 'GraphicDen Studio, New Delhi', done: true, time: '16 Nov, 10:30 AM' },
    { title: 'Laser Engraving & Quality Check', location: 'Crafting Hub, Okhla Hub', done: true, time: '16 Nov, 01:15 PM' },
    { title: 'Dispatched via Express Air', location: 'Indira Gandhi Airport Cargo Hub', done: searchedOrder?.orderStatus !== 'Confirmed', time: '16 Nov, 06:40 PM' },
    { title: 'In Transit to Destination Hub', location: 'Bengaluru / Hyderabad Transit Facility', done: searchedOrder?.orderStatus === 'Shipped' || searchedOrder?.orderStatus === 'Delivered', time: '17 Nov, 04:20 AM' },
    { title: 'Out for Doorstep Delivery', location: searchedOrder?.shippingAddress || 'Customer Destination', done: searchedOrder?.orderStatus === 'Delivered', time: 'Estimated Today by 6:00 PM' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 text-slate-800">
        
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600/20 text-rose-400 flex items-center justify-center">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold">GraphicDen Live Parcel Radar</h2>
              <p className="text-xs text-slate-400">Real-time GPS dispatch & courier tracking</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Search order input */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter Order ID (e.g. GD1004, GD1003)"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs uppercase font-mono font-bold focus:outline-none focus:ring-1 focus:ring-rose-500"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#b91c1c] text-white rounded-xl text-xs font-bold hover:bg-[#991b1b] transition"
            >
              Track Order
            </button>
          </form>

          {searchedOrder ? (
            <div className="space-y-6">
              
              {/* Order Info Card */}
              <div className="p-4 bg-rose-50/50 rounded-2xl border border-rose-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-[10px] font-bold uppercase text-rose-600 tracking-wider">Tracking Reference</span>
                  <p className="font-mono font-bold text-slate-900 text-sm mt-0.5">{searchedOrder.id}</p>
                  <p className="text-slate-500 text-[11px]">Courier: Delhivery Surface Air (Express)</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200">
                    ● {searchedOrder.orderStatus}
                  </span>
                  <p className="text-[10px] text-slate-500 mt-1">Recipient: {searchedOrder.customerName}</p>
                </div>
              </div>

              {/* Transit Timeline */}
              <div className="space-y-4 pl-2">
                {steps.map((st, idx) => (
                  <div key={idx} className="flex gap-3.5 relative">
                    {idx < steps.length - 1 && (
                      <div className={`absolute left-3.5 top-6 bottom-0 w-0.5 ${
                        st.done ? 'bg-emerald-500' : 'bg-slate-200'
                      }`} />
                    )}
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 ${
                      st.done ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {st.done ? <CheckCircle2 className="w-4 h-4 stroke-[2.5]" /> : <Clock className="w-3.5 h-3.5" />}
                    </div>
                    <div className="text-xs pb-3">
                      <p className={`font-bold ${st.done ? 'text-slate-900' : 'text-slate-400'}`}>
                        {st.title}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{st.location}</p>
                      <span className="text-[10px] font-mono text-slate-400">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Order not found. Please try with `GD1001`, `GD1002`, `GD1003` or your placed order ID.
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
