import React from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Shield, LogOut, Clock, Globe, UserCheck, 
  BarChart3, Package, ShoppingCart, Users, Key, AlertTriangle, Eye
} from 'lucide-react';

export const AdminHeader = ({ activeTab, setActiveTab }) => {
  const { 
    adminUser, logoutAdmin, switchAdminRole,
    simulatedClientIp, allowedIps,
    remainingSessionSeconds, recordUserActivity,
    setSessionTimeoutSeconds, setCurrentView
  } = useStore();

  const minutes = Math.floor(remainingSessionSeconds / 60);
  const seconds = remainingSessionSeconds % 60;
  const isExpiringSoon = remainingSessionSeconds <= 30;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-200 sticky top-0 z-30">
      
      {/* Top Status & Role Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs border-b border-slate-800/80">
        
        {/* Left: Brand & Admin route */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-white text-sm">
                Graphic<span className="text-rose-500">Den</span>.in <span className="text-xs font-normal text-slate-400">/ Admin Suite</span>
              </span>
            </div>
          </div>

          <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-400">
            Route: /admin
          </span>
        </div>

        {/* Middle: Session Inactivity Timer & IP */}
        <div className="flex items-center gap-3">
          
          {/* IP Allowlist indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px]">
            <Globe className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-slate-400">IP:</span>
            <span className={allowedIps.includes(simulatedClientIp) ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
              {simulatedClientIp}
            </span>
          </div>

          {/* Session Timeout Countdown */}
          <div 
            onClick={recordUserActivity}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border font-mono text-[11px] cursor-pointer transition ${
              isExpiringSoon
                ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
            title="Click anywhere to extend idle session timeout"
          >
            <Clock className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-rose-400' : 'text-amber-400'}`} />
            <span>Timeout: {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span>
            <span className="hidden lg:inline text-[9px] bg-slate-800 px-1 rounded text-slate-400">Reset</span>
          </div>

          {/* Quick Demo toggle for timeout */}
          <button
            onClick={() => setSessionTimeoutSeconds(30)}
            className="hidden xl:inline text-[10px] text-amber-400 underline hover:text-amber-300"
            title="Sets timer to 30s so you can see auto-logout in action"
          >
            Test 30s Expiry
          </button>
        </div>

        {/* Right: Staff Identity, Role Switcher (RBAC) & Logout */}
        <div className="flex items-center gap-2">
          
          {/* Active Role Selector dropdown (RBAC Live Demo) */}
          <div className="flex items-center gap-1.5 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
            <span className="text-[10px] uppercase font-bold text-slate-500">RBAC Role:</span>
            <select
              value={adminUser?.role}
              onChange={(e) => switchAdminRole(e.target.value)}
              className="bg-transparent text-xs font-bold text-rose-400 focus:outline-none cursor-pointer"
            >
              <option value="Owner" className="bg-slate-900 text-white">Owner (Full Access)</option>
              <option value="Manager" className="bg-slate-900 text-white">Manager (Catalog & Orders)</option>
              <option value="Order Packer" className="bg-slate-900 text-white">Order Packer (Fulfillment Only)</option>
            </select>
          </div>

          {/* View storefront */}
          <button
            onClick={() => setCurrentView('store')}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
            title="View Live Public Store"
          >
            <Eye className="w-4 h-4" />
          </button>

          {/* Logout button */}
          <button
            onClick={() => logoutAdmin()}
            className="flex items-center gap-1 px-3 py-1 bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white rounded-lg text-xs font-semibold border border-rose-500/30 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>

        </div>

      </div>

      {/* Main Admin Tab Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-1 sm:space-x-3 overflow-x-auto py-2 text-xs font-semibold">
          
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl transition shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview & KPIs</span>
          </button>

          {/* Catalog: Only Owner and Manager */}
          {adminUser?.role !== 'Order Packer' ? (
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl transition shrink-0 ${
                activeTab === 'products'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products Catalogue</span>
            </button>
          ) : (
            <span className="flex items-center gap-1.5 py-2 px-3 text-slate-600 text-xs shrink-0 cursor-not-allowed opacity-50" title="Restricted for Order Packer">
              <Package className="w-4 h-4" />
              <span>Products (Locked by RBAC)</span>
            </span>
          )}

          {/* Orders: Available to all (Packer, Manager, Owner) */}
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 py-2 px-3.5 rounded-xl transition shrink-0 ${
              activeTab === 'orders'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>Orders & Fulfillment</span>
          </button>

          {/* Customers: Only Owner and Manager */}
          {adminUser?.role !== 'Order Packer' && (
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl transition shrink-0 ${
                activeTab === 'customers'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers Directory</span>
            </button>
          )}

          {/* Security & Audit: Owner Only */}
          {adminUser?.role === 'Owner' ? (
            <button
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-2 py-2 px-3.5 rounded-xl transition shrink-0 ${
                activeTab === 'security'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span>Security & Audit Ledger</span>
            </button>
          ) : (
            <span className="flex items-center gap-1.5 py-2 px-3 text-slate-600 text-xs shrink-0 cursor-not-allowed opacity-50" title="Security settings restricted to Owner role">
              <Key className="w-4 h-4" />
              <span>Security (Owner Only)</span>
            </span>
          )}

        </nav>
      </div>

    </header>
  );
};
