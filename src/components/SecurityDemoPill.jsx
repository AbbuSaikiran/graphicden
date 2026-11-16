import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Shield, ChevronUp, ChevronDown, CheckCircle2, Lock, Smartphone, Globe, UserCheck, Sparkles } from 'lucide-react';

export const SecurityDemoPill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentView, setCurrentView, 
    simulatedClientIp, setSimulatedClientIp,
    allowedIps, addNotification
  } = useStore();

  return (
    <div className="fixed bottom-5 left-5 z-40 max-w-sm">
      {/* Collapsed Pill */}
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-900 text-white shadow-2xl border border-slate-700/80 backdrop-blur-md text-xs font-semibold transition transform hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <Shield className="w-4 h-4 text-emerald-400" />
          <span>Security & Role Inspector</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      ) : (
        <div className="bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-3xl p-5 shadow-2xl text-slate-200 text-xs space-y-4 animate-in slide-in-from-bottom-4">
          
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span className="font-bold text-white text-xs">Security Plan Verification</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Quick View Switcher */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Application View
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setCurrentView('store')}
                className={`py-1.5 px-2.5 rounded-xl text-center text-xs font-semibold transition ${
                  currentView === 'store'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Customer Store
              </button>
              <button
                onClick={() => setCurrentView('admin')}
                className={`py-1.5 px-2.5 rounded-xl text-center text-xs font-semibold transition ${
                  currentView === 'admin'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Admin Suite (/admin)
              </button>
            </div>
          </div>

          {/* Live Security Feature Status */}
          <div className="space-y-1.5 text-[11px]">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Active Security Guardrails
            </span>
            <div className="space-y-1">
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  bcrypt / Argon2 Password Hashing
                </span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
                  Google Authenticator (TOTP 2FA)
                </span>
                <span className="text-indigo-400 font-bold">Enforced</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-amber-400" />
                  IP Whitelist ({simulatedClientIp})
                </span>
                <span className={allowedIps.includes(simulatedClientIp) ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                  {allowedIps.includes(simulatedClientIp) ? 'Allowed' : '403 Blocked'}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <UserCheck className="w-3.5 h-3.5 text-rose-400" />
                  Role-Based Access Control
                </span>
                <span className="text-rose-400 font-bold">3 Roles</span>
              </div>
            </div>
          </div>

          {/* Simulate Rogues & Attacks */}
          <div className="pt-2 border-t border-slate-800 space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Interactive Test Triggers
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  const rogueIp = '203.0.113.19';
                  setSimulatedClientIp(rogueIp);
                  addNotification('Simulated Attack: Rogue IP', `Client IP set to ${rogueIp}. Admin login will be blocked!`, 'error');
                }}
                className="flex-1 py-1.5 px-2 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-[10px] font-semibold transition text-center"
              >
                Simulate Rogue IP
              </button>
              <button
                onClick={() => {
                  const trustedIp = '103.21.54.12';
                  setSimulatedClientIp(trustedIp);
                  addNotification('IP Restored', `Client IP reset to trusted office IP: ${trustedIp}`, 'success');
                }}
                className="flex-1 py-1.5 px-2 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 rounded-xl text-[10px] font-semibold transition text-center"
              >
                Restore Whitelist IP
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

