import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Shield, Key, Lock, Globe, Clock, AlertTriangle, 
  CheckCircle2, Download, Plus, Trash2, Smartphone, UserCheck
} from 'lucide-react';

export const AdminSecurityView = () => {
  const { 
    auditLogs, simulatedClientIp, setSimulatedClientIp,
    allowedIps, setAllowedIps, sessionTimeoutSeconds, setSessionTimeoutSeconds,
    adminUser, addNotification
  } = useStore();

  const [newIp, setNewIp] = useState('');
  const [logFilter, setLogFilter] = useState('ALL');

  const filteredLogs = logFilter === 'ALL'
    ? auditLogs
    : auditLogs.filter(l => l.status === logFilter);

  const handleAddIp = (e) => {
    e.preventDefault();
    if (!newIp) return;
    if (allowedIps.includes(newIp)) {
      addNotification('Duplicate IP', 'This IP is already in the allowlist.', 'warning');
      return;
    }
    setAllowedIps([...allowedIps, newIp]);
    setNewIp('');
    addNotification('IP Whitelisted', `Added ${newIp} to administrative access whitelist.`, 'success');
  };

  const handleRemoveIp = (ipToRemove) => {
    if (allowedIps.length <= 1) {
      addNotification('Action Denied', 'At least one IP must remain whitelisted to prevent complete lockout.', 'error');
      return;
    }
    setAllowedIps(allowedIps.filter(ip => ip !== ipToRemove));
    addNotification('IP Removed', `Removed ${ipToRemove} from allowlist.`, 'info');
  };

  const downloadAuditReport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `graphicden_audit_ledger_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addNotification('Ledger Exported', 'Downloaded full security audit logs.', 'success');
  };

  return (
    <div className="space-y-8">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white flex items-center gap-2.5">
          <Shield className="w-7 h-7 text-rose-500" />
          Enterprise Security Governance & Audit Ledger
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Compliant with GraphicDen.in E-Commerce Proposal Security Specifications
        </p>
      </div>

      {/* Grid: 3 Security Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Panel 1: IP Allow-Listing */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              IP Allow-Listing Policy
            </h3>
            <span className="text-[10px] font-bold bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">
              Zero-Trust
            </span>
          </div>
          
          <p className="text-xs text-slate-400 leading-relaxed">
            Admin login is strictly rejected (403 Forbidden) if the originating IP address is not explicitly whitelisted.
          </p>

          {/* List of Whitelisted IPs */}
          <div className="space-y-2">
            {allowedIps.map(ip => (
              <div key={ip} className="flex items-center justify-between p-2.5 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs">
                <span className="text-slate-200">{ip}</span>
                {ip === simulatedClientIp && (
                  <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Active IP
                  </span>
                )}
                {allowedIps.length > 1 && (
                  <button
                    onClick={() => handleRemoveIp(ip)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Remove IP"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Add IP Form */}
          <form onSubmit={handleAddIp} className="flex gap-2 pt-2">
            <input
              type="text"
              required
              value={newIp}
              onChange={(e) => setNewIp(e.target.value)}
              placeholder="e.g. 115.240.10.88"
              className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </form>
        </div>

        {/* Panel 2: 2FA MFA Configuration */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-emerald-400" />
              2FA Authenticator (TOTP)
            </h3>
            <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">
              Enforced
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Admin access requires SHA-1 Time-based One-Time Password sync via Google Authenticator or Microsoft Authenticator.
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between text-slate-400">
              <span>MFA Algorithm:</span>
              <span className="text-white font-mono font-bold">HMAC-SHA1 (RFC 6238)</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>TOTP Secret Key:</span>
              <span className="text-rose-400 font-mono font-bold">GRAPHICDEN2026MFA</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Time Slice Window:</span>
              <span className="text-white font-mono">30 Seconds</span>
            </div>
          </div>

          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>MFA protection active on all Owner, Manager and Staff accounts.</span>
          </div>
        </div>

        {/* Panel 3: Session Inactivity Timeout Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              Inactivity Session Timeout
            </h3>
            <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full">
              Auto-Logout
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            Automatically revokes JWT tokens and cookie credentials if zero keyboard or cursor movement is detected.
          </p>

          <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Current Timeout Threshold:</span>
              <span className="text-amber-400 font-bold font-mono">
                {sessionTimeoutSeconds >= 60 ? `${sessionTimeoutSeconds / 60} Minutes` : `${sessionTimeoutSeconds} Seconds`}
              </span>
            </div>

            <input
              type="range"
              min="30"
              max="900"
              step="30"
              value={sessionTimeoutSeconds}
              onChange={(e) => setSessionTimeoutSeconds(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>30s (Test)</span>
              <span>5m (Standard)</span>
              <span>15m (Max)</span>
            </div>
          </div>
        </div>

      </div>

      {/* RBAC Permission Matrix Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-rose-500" />
          Role-Based Access Control (RBAC) Entitlement Matrix
        </h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400">
              <tr>
                <th className="p-3">Feature / Capability</th>
                <th className="p-3 text-center text-rose-400">Owner</th>
                <th className="p-3 text-center text-indigo-400">Manager</th>
                <th className="p-3 text-center text-amber-400">Order Packer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { feature: 'View Financial Revenue & Sales Analytics', owner: true, manager: true, packer: false },
                { feature: 'Create & Modify Products and Pricing', owner: true, manager: true, packer: false },
                { feature: 'Delete Products from Catalogue', owner: true, manager: false, packer: false },
                { feature: 'Inspect Orders & Custom Engravings', owner: true, manager: true, packer: true },
                { feature: 'Update Order Shipping & Packing Status', owner: true, manager: true, packer: true },
                { feature: 'View Customer PII (Phone & Address)', owner: true, manager: true, packer: true },
                { feature: 'Configure IP Whitelist & Session Security', owner: true, manager: false, packer: false },
                { feature: 'Export Full Security Audit Ledger', owner: true, manager: false, packer: false }
              ].map(row => (
                <tr key={row.feature} className="hover:bg-slate-800/40">
                  <td className="p-3 font-medium text-slate-200">{row.feature}</td>
                  <td className="p-3 text-center">
                    {row.owner ? <span className="text-emerald-400 font-bold">✓ Granted</span> : <span className="text-slate-600">✕</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.manager ? <span className="text-emerald-400 font-bold">✓ Granted</span> : <span className="text-slate-600">✕ Denied</span>}
                  </td>
                  <td className="p-3 text-center">
                    {row.packer ? <span className="text-emerald-400 font-bold">✓ Granted</span> : <span className="text-slate-600">✕ Denied</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Audit Logs Ledger */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              Cryptographic Audit Ledger
            </h3>
            <p className="text-xs text-slate-400">
              Immutable sequence of authentication events, authorization checks, and data modifications
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Filter */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              {['ALL', 'SUCCESS', 'SECURITY_ALERT'].map(f => (
                <button
                  key={f}
                  onClick={() => setLogFilter(f)}
                  className={`px-3 py-1 rounded-lg transition ${logFilter === f ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {f === 'ALL' ? 'All Logs' : f === 'SUCCESS' ? 'Successes' : 'Security Alerts'}
                </button>
              ))}
            </div>

            <button
              onClick={downloadAuditReport}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Ledger</span>
            </button>
          </div>
        </div>

        {/* Logs Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase font-bold text-slate-400">
              <tr>
                <th className="p-3">Timestamp (UTC)</th>
                <th className="p-3">Staff Identity</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action Event</th>
                <th className="p-3">Operation Details</th>
                <th className="p-3">Client IP</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-800/40">
                  <td className="p-3 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="p-3 text-white font-sans font-medium">{log.admin}</td>
                  <td className="p-3 text-slate-300">{log.role}</td>
                  <td className="p-3 font-bold text-slate-200">{log.action}</td>
                  <td className="p-3 font-sans text-slate-400 max-w-xs truncate">{log.details}</td>
                  <td className="p-3 text-indigo-400">{log.ip}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.status === 'SECURITY_ALERT'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : log.status === 'SUCCESS'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};

