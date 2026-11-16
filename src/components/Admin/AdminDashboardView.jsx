import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  DollarSign, ShoppingCart, Package, Users, TrendingUp, 
  ShieldCheck, AlertTriangle, ArrowUpRight, Clock, Star
} from 'lucide-react';

export const AdminDashboardView = () => {
  const { orders, products, auditLogs } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'Paid' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter(o => o.orderStatus !== 'Delivered').length;
  const averageOrderValue = orders.length > 0 ? Math.round(totalRevenue / orders.length) : 0;
  const securityEvents = auditLogs.filter(l => l.status === 'SECURITY_ALERT').length;

  return (
    <div className="space-y-8">
      
      {/* Page Title & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Store Analytics & Operational Overview</h1>
          <p className="text-xs text-slate-400 mt-1">Real-time performance metrics for GraphicDen.in</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-xs font-semibold text-emerald-400">Storefront Live • 12 Active Shoppers</span>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Revenue */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Gross Sales</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">₹{totalRevenue.toLocaleString('en-IN')}</span>
            <span className="text-[11px] font-bold text-emerald-400 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +18.4%
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">From confirmed gift purchases</p>
        </div>

        {/* Orders */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Total Orders</span>
            <div className="w-9 h-9 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
              <ShoppingCart className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{orders.length}</span>
            <span className="text-[11px] font-bold text-rose-400 flex items-center">
              <ArrowUpRight className="w-3 h-3" /> +12 this week
            </span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            {pendingOrders} awaiting packaging & dispatch
          </p>
        </div>

        {/* Average Order Value */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Avg Order Value</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">₹{averageOrderValue.toLocaleString('en-IN')}</span>
            <span className="text-[11px] font-bold text-indigo-400">+₹240</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">High due to custom engraving sets</p>
        </div>

        {/* Security Threats Blocked */}
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Security Integrity</span>
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">100% Protected</span>
            <span className="text-[11px] font-bold text-emerald-400">Zero Breaches</span>
          </div>
          <p className="text-[10px] text-slate-500 mt-1">
            {securityEvents} rogue login attempts intercepted
          </p>
        </div>

      </div>

      {/* Grid: Sales Distribution & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Performance Breakdown */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Category Sales Volume
            </h3>
            <span className="text-xs text-slate-400">30 Days</span>
          </div>

          <div className="space-y-4">
            {[
              { name: '3D Acrylic Optical Lamps', share: 42, rev: '₹14,500', color: 'bg-rose-500' },
              { name: 'Custom Neon Name Signs', share: 28, rev: '₹9,800', color: 'bg-indigo-500' },
              { name: 'Laser Engraved Wood Plaques', share: 18, rev: '₹6,200', color: 'bg-amber-500' },
              { name: 'Spotify Music Plaques & Frames', share: 12, rev: '₹4,100', color: 'bg-emerald-500' }
            ].map(cat => (
              <div key={cat.name} className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>{cat.name}</span>
                  <span className="font-bold text-white">{cat.rev} ({cat.share}%)</span>
                </div>
                <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color}`} style={{ width: `${cat.share}%` }}></div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs text-slate-400 flex items-center justify-between">
            <span>Overall Inventory: <strong>{products.length} Products Live</strong></span>
            <span className="text-emerald-400 font-semibold">98.2% In-Stock Health</span>
          </div>
        </div>

        {/* Live Security & Order Activity Feed */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Live Operations Feed
            </h3>
            <span className="text-[10px] font-mono text-slate-500">Auto-Refreshed</span>
          </div>

          <div className="space-y-3">
            {auditLogs.slice(0, 5).map(log => (
              <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    log.status === 'SECURITY_ALERT'
                      ? 'bg-rose-500/20 text-rose-300'
                      : log.status === 'SUCCESS'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">{log.timestamp.split(' ')[1]}</span>
                </div>
                <p className="text-slate-300 text-[11px]">{log.details}</p>
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5">
                  <span>Role: {log.role}</span>
                  <span>IP: {log.ip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

