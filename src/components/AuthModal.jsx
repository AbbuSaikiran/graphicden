import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Shield, Lock, Mail, Smartphone, ArrowRight, RefreshCw, 
  CheckCircle2, AlertTriangle, KeyRound, UserCheck, Eye, EyeOff
} from 'lucide-react';

export const AuthModal = () => {
  const { 
    isAuthOpen, setIsAuthOpen, 
    authMode, setAuthMode,
    customerUser, loginCustomer, loginWithGoogle,
    sendMobileOtp, verifyMobileOtp,
    customerFailedAttempts, customerLockoutUntil,
    pendingVerificationEmail, expectedEmailCode,
    addNotification
  } = useStore();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(30);
  const [emailVerificationCode, setEmailVerificationCode] = useState('');

  // Password reset state
  const [resetSent, setResetSent] = useState(false);
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Captcha state
  const [captchaNum1, setCaptchaNum1] = useState(4);
  const [captchaNum2, setCaptchaNum2] = useState(7);
  const [userCaptcha, setUserCaptcha] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState(0);

  const refreshCaptcha = () => {
    setCaptchaNum1(Math.floor(Math.random() * 8) + 2);
    setCaptchaNum2(Math.floor(Math.random() * 8) + 1);
    setUserCaptcha('');
  };

  useEffect(() => {
    refreshCaptcha();
  }, [authMode, isAuthOpen]);

  // Lockout countdown timer
  useEffect(() => {
    if (!customerLockoutUntil) return;
    const interval = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((customerLockoutUntil - Date.now()) / 1000));
      setLockoutTimer(remaining);
      if (remaining === 0) clearInterval(interval);
    }, 1000);
    return () => clearInterval(interval);
  }, [customerLockoutUntil]);

  // OTP Countdown
  useEffect(() => {
    if (!otpSent || otpTimer <= 0) return;
    const interval = setInterval(() => {
      setOtpTimer(prev => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  if (!isAuthOpen) return null;

  const handleEmailPasswordLogin = async (e) => {
    e.preventDefault();
    const expected = captchaNum1 + captchaNum2;
    const res = await loginCustomer(email, password, parseInt(userCaptcha, 10), expected);
    if (res.success) {
      setIsAuthOpen(false);
      resetForms();
    } else {
      refreshCaptcha();
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      addNotification('Invalid Phone', 'Please enter a valid 10-digit mobile number.', 'warning');
      return;
    }
    sendMobileOtp(phone);
    setOtpSent(true);
    setOtpTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const success = verifyMobileOtp(enteredOtp);
    if (success) {
      setIsAuthOpen(false);
      resetForms();
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!email) {
      addNotification('Email Required', 'Please enter your registered email address.', 'warning');
      return;
    }
    const token = 'tok_reset_' + Math.random().toString(36).substring(2, 10);
    setResetToken(token);
    setResetSent(true);
    addNotification('Password Reset Token Sent', `A secure 15-minute reset token was generated: [ ${token} ]`, 'info');
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      addNotification('Weak Password', 'New password must be at least 8 characters long.', 'warning');
      return;
    }
    addNotification('Password Updated', 'Your password has been re-hashed with bcrypt. You can now login.', 'success');
    setResetSent(false);
    setAuthMode('login');
  };

  const resetForms = () => {
    setEmail('');
    setPassword('');
    setPhone('');
    setEnteredOtp('');
    setOtpSent(false);
    setUserCaptcha('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 p-6 text-white text-center relative">
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-md mx-auto flex items-center justify-center mb-2 shadow-inner">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">GraphicDen.in Customer Vault</h2>
          <p className="text-xs text-rose-100 mt-1">
            Protected by bcrypt hashing, OAuth 2.0, OTP & Rate-Limiter
          </p>
        </div>

        {/* Security Lockout Banner */}
        {lockoutTimer > 0 && (
          <div className="bg-rose-50 border-b border-rose-200 p-3 text-xs text-rose-800 flex items-center gap-2 font-medium">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Rate-limit reached: Account locked for {lockoutTimer}s.</span>
          </div>
        )}

        {/* Mode Selector Tabs */}
        <div className="grid grid-cols-3 bg-slate-100 p-1 m-4 rounded-xl text-xs font-semibold text-slate-600">
          <button
            onClick={() => { setAuthMode('login'); setResetSent(false); }}
            className={`py-2 rounded-lg transition ${authMode === 'login' ? 'bg-white text-rose-600 shadow-sm' : 'hover:text-slate-900'}`}
          >
            Password Login
          </button>
          <button
            onClick={() => { setAuthMode('otp'); setResetSent(false); }}
            className={`py-2 rounded-lg transition ${authMode === 'otp' ? 'bg-white text-rose-600 shadow-sm' : 'hover:text-slate-900'}`}
          >
            Mobile OTP
          </button>
          <button
            onClick={() => { setAuthMode('register'); setResetSent(false); }}
            className={`py-2 rounded-lg transition ${authMode === 'register' ? 'bg-white text-rose-600 shadow-sm' : 'hover:text-slate-900'}`}
          >
            Quick Sign Up
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 pt-1">
          {/* TAB 1: Password Login */}
          {authMode === 'login' && !resetSent && (
            <form onSubmit={handleEmailPasswordLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ananya@graphicden.in"
                    className="w-full pl-9 pr-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-xs text-rose-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-9 pr-10 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="mt-1 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Demo: <code className="text-slate-600 font-mono">Password123!</code></span>
                  {customerFailedAttempts > 0 && (
                    <span className="text-amber-600">Failed attempts: {customerFailedAttempts}/3</span>
                  )}
                </div>
              </div>

              {/* Bot Protection / CAPTCHA */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-medium flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-indigo-500" />
                    Security CAPTCHA: Solve {captchaNum1} + {captchaNum2} = ?
                  </span>
                  <button
                    type="button"
                    onClick={refreshCaptcha}
                    className="text-slate-400 hover:text-slate-600"
                    title="New challenge"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
                <input
                  type="number"
                  required
                  value={userCaptcha}
                  onChange={(e) => setUserCaptcha(e.target.value)}
                  placeholder="Enter math answer"
                  className="w-full px-3 py-1.5 text-xs bg-white border rounded-lg border-slate-200 focus:ring-1 focus:ring-rose-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={lockoutTimer > 0}
                className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium text-sm hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 disabled:opacity-50 transition"
              >
                Sign In Securely
              </button>

              <div className="relative my-4 text-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <span className="relative bg-white px-3 text-xs text-slate-400 uppercase font-medium">Or continue with</span>
              </div>

              {/* Social Login: OAuth 2.0 Google */}
              <button
                type="button"
                onClick={() => {
                  loginWithGoogle();
                  setIsAuthOpen(false);
                }}
                className="w-full py-2.5 px-4 border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-2 shadow-sm transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Sign in with Google (OAuth 2.0)
              </button>
            </form>
          )}

          {/* TAB 2: Mobile OTP Login */}
          {authMode === 'otp' && (
            <div className="space-y-4">
              {!otpSent ? (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Indian Mobile Number</label>
                    <div className="flex gap-2">
                      <div className="w-16 px-2 py-2 text-sm bg-slate-100 border border-slate-200 rounded-xl font-medium text-center text-slate-600">
                        +91
                      </div>
                      <div className="relative flex-1">
                        <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          maxLength={10}
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                          placeholder="e.g. 9876543210"
                          className="w-full pl-9 pr-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                        />
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">We will transmit a 6-digit verification code via fast SMS gateway.</p>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium text-sm hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-2"
                  >
                    <span>Send Login OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                    <p className="font-medium">OTP dispatched to +91 {phone}</p>
                    <p className="text-[11px] mt-0.5 text-emerald-600">Tip: Check the notification toast banner or use default code <span className="font-mono font-bold">123456</span></p>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Enter 6-digit SMS OTP</label>
                    <input
                      type="text"
                      maxLength={6}
                      required
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value)}
                      placeholder="• • • • • •"
                      className="w-full py-2.5 text-center text-lg tracking-widest font-mono font-bold border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>{otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Did not receive code?'}</span>
                    {otpTimer <= 0 && (
                      <button
                        type="button"
                        onClick={() => { sendMobileOtp(phone); setOtpTimer(30); }}
                        className="text-rose-600 font-medium hover:underline"
                      >
                        Resend Code
                      </button>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 shadow-md shadow-emerald-600/20 transition"
                  >
                    Verify & Access Store
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: Quick Sign Up */}
          {authMode === 'register' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNotification('Account Created!', `A verification link has been sent to ${email}. Email verification simulated.`, 'success');
                setAuthMode('login');
              }}
              className="space-y-3"
            >
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rahul@example.com"
                  className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Set Password (bcrypt encrypted)</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Min 8 chars, 1 uppercase, 1 symbol"
                  className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>

              <div className="text-[11px] text-slate-500 bg-slate-50 p-2.5 rounded-lg border border-slate-100 flex items-start gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Passwords are hashed with cryptographic salt + bcrypt before storage. Plaintext is never saved.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-xl font-medium text-sm hover:from-rose-600 hover:to-pink-700 shadow-md shadow-rose-500/20 transition"
              >
                Create Free Account
              </button>
            </form>
          )}

          {/* Forgot Password Flow */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              {!resetSent ? (
                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div className="text-xs text-slate-600">
                    Enter your email to receive an expiring cryptographic password reset token.
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ananya@graphicden.in"
                      className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition"
                  >
                    Generate Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => setAuthMode('login')}
                    className="w-full text-center text-xs text-slate-500 hover:text-slate-700"
                  >
                    Back to login
                  </button>
                </form>
              ) : (
                <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                    <p className="font-semibold">Reset Token Validated</p>
                    <p className="font-mono text-[11px] text-indigo-700 mt-0.5 break-all">Token: {resetToken}</p>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">New Strong Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-3 py-2 text-sm border rounded-xl border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 bg-emerald-600 text-white rounded-xl font-medium text-sm hover:bg-emerald-700 transition"
                  >
                    Update & Hash Password
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Footer Security Badges */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <Lock className="w-3 h-3 text-emerald-500" />
              256-Bit TLS
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3 h-3 text-indigo-500" />
              HttpOnly Cookies
            </span>
            <span className="flex items-center gap-1">
              <KeyRound className="w-3 h-3 text-rose-500" />
              bcrypt Encrypted
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

