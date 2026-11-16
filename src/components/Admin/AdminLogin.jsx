import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { 
  Shield, Lock, KeyRound, Smartphone, AlertTriangle, 
  CheckCircle2, ArrowRight, UserCheck, Eye, EyeOff, Globe
} from 'lucide-react';

export const AdminLogin = () => {
  const { 
    verifyAdminPassword, verifyAdmin2FA, ADMIN_ACCOUNTS,
    simulatedClientIp, setSimulatedClientIp, allowedIps,
    setCurrentView, addNotification
  } = useStore();

  const [step, setStep] = useState(1); // 1 = Password, 2 = 2FA TOTP
  const [selectedEmail, setSelectedEmail] = useState('owner@graphicden.in');
  const [password, setPassword] = useState('Pass@Owner2026!');
  const [totpCode, setTotpCode] = useState('');
  const [pendingAccount, setPendingAccount] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Password Strength Meter
  const checkPasswordStrength = (pass) => {
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[a-z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    return score; // 0 to 5
  };

  const strengthScore = checkPasswordStrength(password);

  const handleStep1 = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const res = verifyAdminPassword(selectedEmail, password);
    if (!res.allowed) {
      if (res.reason === 'IP_BLOCKED') {
        setErrorMsg(`Access Denied (403): Current IP (${simulatedClientIp}) is not in the Admin IP Allowlist!`);
      } else if (res.reason === 'BAD_PASSWORD') {
        setErrorMsg('Invalid administrative credentials. This attempt has been logged in the security audit ledger.');
      } else {
        setErrorMsg('Admin account not found.');
      }
      return;
    }

    setPendingAccount(res.account);
    setStep(2);
    addNotification('Step 1 Passed', 'Password verified. Enter your 6-digit Authenticator TOTP code for Two-Factor Authentication.', 'info');
  };

  const handleStep2 = (e) => {
    e.preventDefault();
    setErrorMsg('');

    const success = verifyAdmin2FA(pendingAccount, totpCode);
    if (!success) {
      setErrorMsg('Invalid 2FA code. Please check your Google Authenticator or use test code: 789123');
      return;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Banner Navigation */}
      <div className="w-full max-w-md mb-6 flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => setCurrentView('store')}
          className="flex items-center gap-1.5 hover:text-white transition"
        >
          ← Back to GraphicDen.in Store
        </button>
        <span className="font-mono text-[11px] bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800 text-slate-300">
          Route: /admin
        </span>
      </div>

      {/* Main Security Card */}
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-8 relative z-10 text-slate-200">
        
        {/* Header Ribbon */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-indigo-600 mx-auto flex items-center justify-center text-white shadow-xl shadow-rose-600/20 mb-3">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-xl font-black text-white tracking-tight">GraphicDen Admin Console</h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-Trust Gateway • 2FA Authenticator • Role-Based Access
          </p>
        </div>

        {/* IP Allowlist Simulation Widget */}
        <div className="mb-6 p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              Simulated Client IP
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              allowedIps.includes(simulatedClientIp) 
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
            }`}>
              {allowedIps.includes(simulatedClientIp) ? 'IP Whitelisted' : 'IP Blocked'}
            </span>
          </div>

          <div className="flex gap-1.5">
            {[
              { label: 'Primary Office', ip: '103.21.54.12' },
              { label: 'Manager Home', ip: '49.37.12.98' },
              { label: 'Untrusted Public IP', ip: '203.0.113.19' }
            ].map(item => (
              <button
                key={item.ip}
                type="button"
                onClick={() => setSimulatedClientIp(item.ip)}
                className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-mono transition text-center ${
                  simulatedClientIp === item.ip
                    ? 'bg-rose-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Email & Strong Password Check */}
        {step === 1 && (
          <form onSubmit={handleStep1} className="space-y-4">
            
            {/* Quick Staff Account Selector */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Staff Identity (Select to Test RBAC Roles)
              </label>
              <div className="space-y-1.5">
                {ADMIN_ACCOUNTS.map(acc => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => {
                      setSelectedEmail(acc.email);
                      setPassword(acc.passwordPolicy);
                    }}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-center justify-between text-xs transition ${
                      selectedEmail === acc.email
                        ? 'bg-rose-600/15 border-rose-500 text-white font-semibold'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <p className="text-white font-medium">{acc.name}</p>
                      <p className="text-[10px] text-slate-400">{acc.email}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      acc.role === 'Owner' 
                        ? 'bg-rose-500/20 text-rose-300' 
                        : acc.role === 'Manager' 
                        ? 'bg-indigo-500/20 text-indigo-300' 
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {acc.role}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Admin Email</label>
              <input
                type="email"
                required
                value={selectedEmail}
                onChange={(e) => setSelectedEmail(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-medium text-slate-300">Master Password</label>
                <span className="text-[10px] text-slate-400 font-mono">Policy: 8+ Chars, Mixed</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Strength Meter Bar */}
              <div className="mt-2 flex gap-1 items-center">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <div
                    key={lvl}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      lvl <= strengthScore
                        ? strengthScore >= 4 ? 'bg-emerald-500' : strengthScore >= 3 ? 'bg-amber-500' : 'bg-rose-500'
                        : 'bg-slate-800'
                    }`}
                  />
                ))}
                <span className="text-[10px] text-slate-400 ml-1">
                  {strengthScore >= 4 ? 'Strong' : strengthScore >= 3 ? 'Medium' : 'Weak'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20 flex items-center justify-center gap-2 transition"
            >
              <span>Verify Password & Proceed to 2FA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: Two-Factor Authentication (TOTP Authenticator) */}
        {step === 2 && pendingAccount && (
          <form onSubmit={handleStep2} className="space-y-5 animate-in fade-in">
            <div className="text-center p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Google Authenticator / TOTP
              </h3>
              <p className="text-[11px] text-slate-400">
                Enter the 6-digit rolling code generated for <span className="text-white font-mono">{pendingAccount.email}</span>
              </p>
              <div className="pt-1">
                <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                  Secret: {pendingAccount.totpSecret}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 text-center mb-2">
                Enter 6-Digit Authenticator Code
              </label>
              <input
                type="text"
                maxLength={6}
                autoFocus
                required
                value={totpCode}
                onChange={(e) => setTotpCode(e.target.value)}
                placeholder="789123"
                className="w-full py-3 text-center text-2xl tracking-widest font-mono font-bold bg-slate-950 border border-slate-800 rounded-2xl text-emerald-400 focus:outline-none focus:border-emerald-500"
              />
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Demo Code: <button type="button" onClick={() => setTotpCode('789123')} className="text-indigo-400 underline font-mono">789123</button>
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
              >
                <KeyRound className="w-4 h-4" />
                <span>Verify 2FA & Enter Portal</span>
              </button>
            </div>
          </form>
        )}

      </div>

      {/* Security Disclaimers */}
      <div className="mt-6 text-center text-[11px] text-slate-600 space-y-1">
        <p>GraphicDen.in Administrative Access Gateway • Protected under ISO/IEC 27001 Security Standards</p>
        <p>All authentication events and administrative operations are cryptographically logged in the Audit Ledger.</p>
      </div>

    </div>
  );
};
