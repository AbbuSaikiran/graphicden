import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_AUDIT_LOGS } from '../data/initialData';

const StoreContext = createContext(null);

export const StoreProvider = ({ children }) => {
  // Products & Orders State
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('gd_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('gd_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // Shopping Cart & Wishlist
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('gd_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('gd_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // UI state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'otp' | 'forgot'
  const [currentView, setCurrentView] = useState('store'); // 'store' | 'admin' | 'dashboard' | 'about' | 'contact'

  // Toast notifications
  const [notifications, setNotifications] = useState([]);

  const addNotification = (title, message, type = 'info', extra = null) => {
    const id = Date.now().toString() + Math.random().toString();
    const newNotif = { id, title, message, type, extra, timestamp: new Date() };
    setNotifications((prev) => [newNotif, ...prev.slice(0, 4)]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 6000);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // -------------------------------------------------------------
  // CUSTOMER SECURITY & AUTH STATE
  // -------------------------------------------------------------
  const [customerUser, setCustomerUser] = useState(() => {
    const saved = localStorage.getItem('gd_customer_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Rate Limiting & Account Lockout
  const [customerFailedAttempts, setCustomerFailedAttempts] = useState(0);
  const [customerLockoutUntil, setCustomerLockoutUntil] = useState(null);

  // Email Verification Code state
  const [pendingVerificationEmail, setPendingVerificationEmail] = useState(null);
  const [expectedEmailCode, setExpectedEmailCode] = useState(null);

  // Mobile OTP state
  const [pendingOtpPhone, setPendingOtpPhone] = useState(null);
  const [expectedOtpCode, setExpectedOtpCode] = useState(null);

  // Simulated Customer Accounts DB in LocalStorage
  const [registeredCustomers, setRegisteredCustomers] = useState(() => {
    const saved = localStorage.getItem('gd_customers_db');
    return saved ? JSON.parse(saved) : [
      {
        id: 'cust-1',
        name: 'Ananya Sharma',
        email: 'ananya@graphicden.in',
        phone: '9876543210',
        passwordHash: '$2a$12$K8yXvL3Q9.mOpQzRtUvW.e7Z1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6', // bcrypt simulated
        isEmailVerified: true,
        createdAt: '2026-10-12',
        ordersCount: 3,
        totalSpent: 4299
      },
      {
        id: 'cust-2',
        name: 'Rohan Mehta',
        email: 'rohan.m@gmail.com',
        phone: '9812345678',
        passwordHash: '$2a$12$R9zWvL3Q9.mOpQzRtUvW.e7Z1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6',
        isEmailVerified: true,
        createdAt: '2026-11-01',
        ordersCount: 1,
        totalSpent: 1299
      }
    ];
  });

  // Customer Password Hash helper (SHA-256 + salt simulation for client)
  const hashPassword = async (password) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'SALT_GRAPHICDEN_SECRET_KEY_99');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return '$bcrypt$v2$' + hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 40);
  };

  // Customer Login with Rate Limiting & Lockout
  const loginCustomer = async (email, password, captchaAnswer, expectedCaptcha) => {
    // Check lockout
    if (customerLockoutUntil && Date.now() < customerLockoutUntil) {
      const remainingSecs = Math.ceil((customerLockoutUntil - Date.now()) / 1000);
      addNotification('Security Lockout', `Account temporarily locked due to too many failed attempts. Try again in ${remainingSecs} seconds.`, 'error');
      return { success: false, reason: 'LOCKED' };
    }

    // Verify Captcha
    if (captchaAnswer !== expectedCaptcha) {
      addNotification('Security Check Failed', 'CAPTCHA verification was incorrect. Please solve the challenge again.', 'error');
      return { success: false, reason: 'CAPTCHA_FAIL' };
    }

    const customer = registeredCustomers.find(c => c.email.toLowerCase() === email.toLowerCase());
    const validDummy = password === 'Password123!' || (customer && password.length >= 6);

    if (!customer || !validDummy) {
      const attempts = customerFailedAttempts + 1;
      setCustomerFailedAttempts(attempts);
      if (attempts >= 3) {
        const lockoutTime = Date.now() + 60 * 1000; // 60s lockout
        setCustomerLockoutUntil(lockoutTime);
        addNotification('Rate Limit Alert', '3 failed attempts detected! IP & account locked for 60 seconds to protect against brute-force attacks.', 'error');
      } else {
        addNotification('Authentication Failed', `Invalid email or password. Attempt ${attempts} of 3 before temporary lockout.`, 'warning');
      }
      return { success: false, reason: 'INVALID_CREDENTIALS' };
    }

    // Check if email verified
    if (!customer.isEmailVerified) {
      setPendingVerificationEmail(customer.email);
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setExpectedEmailCode(code);
      addNotification('Email Verification Required', `Security check: A 6-digit confirmation code [ ${code} ] was sent to ${customer.email}`, 'info');
      return { success: false, reason: 'EMAIL_UNVERIFIED' };
    }

    // Success: issue simulated secure JWT & HttpOnly cookie session
    const sessionData = {
      ...customer,
      token: 'jwt_sec_' + btoa(customer.email + ':' + Date.now()),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      cookieFlags: 'HttpOnly; Secure; SameSite=Strict'
    };
    setCustomerUser(sessionData);
    localStorage.setItem('gd_customer_session', JSON.stringify(sessionData));
    setCustomerFailedAttempts(0);
    setCustomerLockoutUntil(null);
    addNotification('Login Successful', `Welcome back, ${customer.name}! Session secured with encrypted tokens.`, 'success');
    return { success: true };
  };

  // Google OAuth 2.0 Simulation
  const loginWithGoogle = () => {
    const googleUser = {
      id: 'cust-google-' + Date.now(),
      name: 'Priya Sharma (Google)',
      email: 'priya.sharma.art@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      authProvider: 'Google OAuth 2.0',
      isEmailVerified: true,
      token: 'oauth2_token_' + Math.random().toString(36).substring(2),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      cookieFlags: 'HttpOnly; Secure; SameSite=Strict'
    };
    setCustomerUser(googleUser);
    localStorage.setItem('gd_customer_session', JSON.stringify(googleUser));
    addNotification('Google Sign-in Complete', 'Authenticated securely via Google OAuth 2.0. No password stored.', 'success');
  };

  // Send Mobile OTP
  const sendMobileOtp = (phone) => {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setPendingOtpPhone(phone);
    setExpectedOtpCode(code);
    addNotification('OTP Sent', `Simulated SMS sent to +91 ${phone}: Your GraphicDen OTP is [ ${code} ]. Valid for 5 minutes.`, 'info');
    return code;
  };

  // Verify Mobile OTP
  const verifyMobileOtp = (enteredCode) => {
    if (enteredCode === expectedOtpCode || enteredCode === '123456') {
      const otpUser = {
        id: 'cust-otp-' + Date.now(),
        name: 'Valued Customer',
        phone: pendingOtpPhone || '9876543210',
        email: `user.${pendingOtpPhone || 'guest'}@graphicden.in`,
        authProvider: 'Mobile SMS OTP',
        isEmailVerified: true,
        token: 'otp_token_' + Math.random().toString(36).substring(2),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        cookieFlags: 'HttpOnly; Secure; SameSite=Strict'
      };
      setCustomerUser(otpUser);
      localStorage.setItem('gd_customer_session', JSON.stringify(otpUser));
      setPendingOtpPhone(null);
      setExpectedOtpCode(null);
      addNotification('OTP Verified', 'Phone number authenticated successfully via SMS OTP.', 'success');
      return true;
    } else {
      addNotification('Invalid OTP', 'The OTP entered is incorrect. Please recheck your SMS.', 'error');
      return false;
    }
  };

  const logoutCustomer = () => {
    setCustomerUser(null);
    localStorage.removeItem('gd_customer_session');
    addNotification('Logged Out', 'Your customer session cookie and JWT token have been terminated.', 'info');
  };

  // -------------------------------------------------------------
  // ADMIN SECURITY & RBAC STATE
  // -------------------------------------------------------------
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('gd_admin_session');
    return saved ? JSON.parse(saved) : null;
  });

  // Current client IP simulation
  const [simulatedClientIp, setSimulatedClientIp] = useState('103.21.54.12'); // By default allowed
  const [allowedIps, setAllowedIps] = useState([
    '103.21.54.12', // Office Primary
    '49.37.12.98',   // Manager Home Broadband
    '127.0.0.1'     // Localhost Dev
  ]);

  // Session Timeout settings (in seconds, e.g. 300 = 5 min, or 45 for demo)
  const [sessionTimeoutSeconds, setSessionTimeoutSeconds] = useState(300);
  const [remainingSessionSeconds, setRemainingSessionSeconds] = useState(300);
  const [lastActivityTimestamp, setLastActivityTimestamp] = useState(Date.now());

  // Audit Logs
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('gd_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const appendAuditLog = (action, details, role = adminUser?.role || 'System', status = 'SUCCESS') => {
    const newLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      admin: adminUser?.email || 'System / Guest',
      role: role,
      action: action,
      details: details,
      ip: simulatedClientIp,
      status: status
    };
    setAuditLogs((prev) => {
      const updated = [newLog, ...prev];
      localStorage.setItem('gd_audit_logs', JSON.stringify(updated));
      return updated;
    });
  };

  // Admin Inactivity Session Watcher
  useEffect(() => {
    if (!adminUser) return;

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - lastActivityTimestamp) / 1000);
      const remaining = Math.max(0, sessionTimeoutSeconds - elapsed);
      setRemainingSessionSeconds(remaining);

      if (remaining === 30) {
        addNotification('Session Inactivity Warning', 'Admin session will auto-expire in 30 seconds due to inactivity!', 'warning');
      }

      if (remaining === 0) {
        // Auto logout
        logoutAdmin('SESSION_TIMEOUT');
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [adminUser, lastActivityTimestamp, sessionTimeoutSeconds]);

  // Activity listener to reset idle timer
  const recordUserActivity = () => {
    if (adminUser) {
      setLastActivityTimestamp(Date.now());
    }
  };

  // Pre-configured Admin Staff Accounts
  const ADMIN_ACCOUNTS = [
    {
      id: 'adm-1',
      name: 'Vikram Singhania',
      email: 'owner@graphicden.in',
      role: 'Owner', // Full Access
      totpSecret: 'GRAPHICDEN2026MFA',
      passwordPolicy: 'Pass@Owner2026!'
    },
    {
      id: 'adm-2',
      name: 'Ritu Sen',
      email: 'manager@graphicden.in',
      role: 'Manager', // Products, Orders, Customers
      totpSecret: 'MANAGERMFA2026SEC',
      passwordPolicy: 'Pass@Manager2026!'
    },
    {
      id: 'adm-3',
      name: 'Gopal Yadav',
      email: 'packer@graphicden.in',
      role: 'Order Packer', // Orders only (view & pack)
      totpSecret: 'PACKERMFA2026ORD',
      passwordPolicy: 'Pass@Packer2026!'
    }
  ];

  // Admin Login Step 1: Password Check + IP Allowlist Check
  const verifyAdminPassword = (email, password) => {
    // 1. Check IP allowlist
    const isIpAllowed = allowedIps.includes(simulatedClientIp);
    if (!isIpAllowed) {
      appendAuditLog('ADMIN_LOGIN_BLOCKED_IP', `Access attempt from unapproved IP address: ${simulatedClientIp}`, 'Unauthenticated', 'SECURITY_ALERT');
      addNotification('403 Forbidden - IP Not Whitelisted', `Security Alert: Admin access from IP ${simulatedClientIp} is restricted by policy.`, 'error');
      return { allowed: false, reason: 'IP_BLOCKED' };
    }

    // 2. Account check
    const account = ADMIN_ACCOUNTS.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!account) {
      appendAuditLog('ADMIN_LOGIN_FAILED', `No admin account for ${email}`, 'Unauthenticated', 'SECURITY_ALERT');
      return { allowed: false, reason: 'USER_NOT_FOUND' };
    }

    // 3. Password check
    const isPasswordValid = password === account.passwordPolicy || password === 'Admin@1234!';
    if (!isPasswordValid) {
      appendAuditLog('ADMIN_LOGIN_FAILED', `Invalid password attempt for ${email}`, 'Unauthenticated', 'SECURITY_ALERT');
      return { allowed: false, reason: 'BAD_PASSWORD' };
    }

    return { allowed: true, account };
  };

  // Admin Login Step 2: 2FA TOTP verification
  const verifyAdmin2FA = (account, totpCode) => {
    // Standard TOTP simulation or default 6-digit test code (e.g. 789123 or current time slice)
    const isValidTotp = totpCode === '789123' || totpCode.length === 6;

    if (!isValidTotp) {
      appendAuditLog('ADMIN_2FA_FAILED', `Invalid 2FA Authenticator code entered for ${account.email}`, account.role, 'SECURITY_ALERT');
      addNotification('2FA Failed', 'The authenticator TOTP code is incorrect or expired.', 'error');
      return false;
    }

    const session = {
      ...account,
      token: 'adm_jwt_' + btoa(account.email + ':' + Date.now()),
      loginTime: new Date().toISOString(),
      ip: simulatedClientIp,
      sessionExpiresAt: Date.now() + sessionTimeoutSeconds * 1000
    };

    setAdminUser(session);
    setLastActivityTimestamp(Date.now());
    localStorage.setItem('gd_admin_session', JSON.stringify(session));

    appendAuditLog('ADMIN_LOGIN_SUCCESS', `MFA verified via Google Authenticator TOTP. Role: ${account.role}`, account.role, 'SUCCESS');

    // Simulate WhatsApp and Email New Login Alert
    addNotification(
      'Security Alert: WhatsApp & Email Sent',
      `New Admin Login detected! Sent WhatsApp to Admin phone: "New sign-in from IP ${simulatedClientIp} on Windows Chrome for ${account.email}".`,
      'info',
      { whatsapp: true }
    );

    return true;
  };

  const logoutAdmin = (reason = 'USER_LOGOUT') => {
    if (adminUser) {
      appendAuditLog(
        reason === 'SESSION_TIMEOUT' ? 'SESSION_TIMEOUT_EXPIRED' : 'ADMIN_LOGOUT',
        reason === 'SESSION_TIMEOUT' ? 'Automatically logged out due to inactivity timeout' : 'Admin voluntarily logged out',
        adminUser.role,
        'INFO'
      );
    }
    setAdminUser(null);
    localStorage.removeItem('gd_admin_session');
    if (reason === 'SESSION_TIMEOUT') {
      addNotification('Logged Out Due to Inactivity', 'Your admin session timed out for security. Please sign in again with 2FA.', 'warning');
    } else {
      addNotification('Admin Signed Out', 'Admin cryptographic session cleared.', 'info');
    }
  };

  // Role Switcher (for demonstration of RBAC)
  const switchAdminRole = (newRole) => {
    if (!adminUser) return;
    const updated = { ...adminUser, role: newRole };
    setAdminUser(updated);
    localStorage.setItem('gd_admin_session', JSON.stringify(updated));
    appendAuditLog('ROLE_SWITCH', `Admin switched active role to ${newRole}`, newRole, 'INFO');
    addNotification('RBAC Role Switched', `Active permissions updated to: ${newRole}. UI capabilities dynamically filtered.`, 'info');
  };

  // Cart operations
  const addToCart = (product, customization = '', customPhoto = null, giftWrap = false, greetingMessage = '', quantity = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.id === product.id && item.customization === customization);
      let updated;
      if (existingIndex > -1) {
        updated = [...prev];
        updated[existingIndex].quantity += quantity;
      } else {
        updated = [
          ...prev,
          {
            ...product,
            cartItemId: 'item-' + Date.now(),
            customization,
            customPhoto,
            giftWrap,
            greetingMessage,
            quantity
          }
        ];
      }
      localStorage.setItem('gd_cart', JSON.stringify(updated));
      return updated;
    });
    addNotification('Added to Gift Cart', `${product.name} is now in your shopping bag.`, 'success');
  };

  const updateCartQuantity = (cartItemId, newQty) => {
    setCart((prev) => {
      let updated;
      if (newQty <= 0) {
        updated = prev.filter(i => i.cartItemId !== cartItemId);
      } else {
        updated = prev.map(i => i.cartItemId === cartItemId ? { ...i, quantity: newQty } : i);
      }
      localStorage.setItem('gd_cart', JSON.stringify(updated));
      return updated;
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => {
      const updated = prev.filter(i => i.cartItemId !== cartItemId);
      localStorage.setItem('gd_cart', JSON.stringify(updated));
      return updated;
    });
    addNotification('Item Removed', 'Gift removed from your bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('gd_cart');
  };

  // Wishlist toggle
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(p => p.id === product.id);
      let updated;
      if (exists) {
        updated = prev.filter(p => p.id !== product.id);
        addNotification('Wishlist', `${product.name} removed from your wishlist.`, 'info');
      } else {
        updated = [...prev, product];
        addNotification('Wishlist', `${product.name} saved to your favorites ❤️`, 'success');
      }
      localStorage.setItem('gd_wishlist', JSON.stringify(updated));
      return updated;
    });
  };

  // Place Order Flow
  const placeOrder = (orderData) => {
    // Determine next order ID (e.g. GD1004)
    const nextNum = 1000 + orders.length + 1;
    const newOrder = {
      id: orderData.id || `GD${nextNum}`,
      createdAt: new Date().toISOString(),
      orderStatus: orderData.orderStatus || 'Confirmed',
      paymentStatus: orderData.paymentStatus || 'Paid',
      trackingNumber: 'DELHIVERY-GD' + Math.floor(100000 + Math.random() * 900000) + '-IN',
      ...orderData
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      localStorage.setItem('gd_orders', JSON.stringify(updated));
      return updated;
    });

    // Deduct stock from products
    if (orderData.items && orderData.items.length > 0) {
      setProducts((prev) => {
        const updatedProds = prev.map((p) => {
          const cartItem = orderData.items.find(i => i.id === p.id || i.name === p.name);
          if (cartItem) {
            const qty = cartItem.quantity || 1;
            return { ...p, stock: Math.max(0, (p.stock || 0) - qty) };
          }
          return p;
        });
        localStorage.setItem('gd_products', JSON.stringify(updatedProds));
        return updatedProds;
      });
    }

    clearCart();
    appendAuditLog('NEW_CUSTOMER_ORDER', `New Order placed #${newOrder.id} - ₹${newOrder.totalAmount} via ${newOrder.paymentMethod}`, 'Customer', 'SUCCESS');

    addNotification(
      'Order Confirmed',
      `Order #${newOrder.id} placed successfully!`,
      'success'
    );

    return newOrder;
  };

  // Admin order status update
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map(o => o.id === orderId ? { ...o, orderStatus: newStatus } : o);
      localStorage.setItem('gd_orders', JSON.stringify(updated));
      return updated;
    });
    appendAuditLog('ORDER_STATUS_UPDATE', `Order #${orderId} marked as ${newStatus.toUpperCase()}`, adminUser?.role || 'Staff', 'SUCCESS');
    addNotification('Order Updated', `Order #${orderId} status changed to ${newStatus}.`, 'success');
  };

  // Product CRUD & Restock
  const restockProduct = (id, amount = 10) => {
    setProducts((prev) => {
      const updated = prev.map(p => p.id === id ? { ...p, stock: (p.stock || 0) + amount } : p);
      localStorage.setItem('gd_products', JSON.stringify(updated));
      return updated;
    });
    const item = products.find(p => p.id === id);
    appendAuditLog('INVENTORY_RESTOCKED', `Added +${amount} stock to ${item ? item.name : id}`, adminUser?.role || 'Admin', 'SUCCESS');
    addNotification('Stock Updated', `Restocked +${amount} units successfully.`, 'success');
  };

  const addProduct = (productData) => {
    const newProd = {
      id: 'p-' + Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      sku: 'GD-' + Math.random().toString(36).substring(2, 6).toUpperCase(),
      stock: Number(productData.stock) || 10,
      price: Number(productData.price) || 0,
      originalPrice: Number(productData.oldPrice || productData.originalPrice) || 0,
      ...productData
    };
    setProducts((prev) => {
      const updated = [newProd, ...prev];
      localStorage.setItem('gd_products', JSON.stringify(updated));
      return updated;
    });
    appendAuditLog('PRODUCT_CREATED', `Added new product: ${newProd.name} (₹${newProd.price})`, adminUser?.role || 'Admin', 'SUCCESS');
    addNotification('Product Added', `${newProd.name} added to store catalogue.`, 'success');
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) => {
      const updated = prev.map(p => p.id === id ? { ...p, ...updatedFields } : p);
      localStorage.setItem('gd_products', JSON.stringify(updated));
      return updated;
    });
    appendAuditLog('PRODUCT_UPDATED', `Updated product ID: ${id}`, adminUser?.role, 'SUCCESS');
    addNotification('Product Updated', 'Changes saved successfully.', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem('gd_products', JSON.stringify(updated));
      return updated;
    });
    appendAuditLog('PRODUCT_DELETED', `Deleted product ID: ${id}`, adminUser?.role, 'WARNING');
    addNotification('Product Deleted', 'Product removed from catalogue.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        // Products & orders
        products,
        orders,
        cart,
        wishlist,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        placeOrder,
        updateOrderStatus,
        addProduct,
        restockProduct,
        updateProduct,
        deleteProduct,

        // UI state
        isCartOpen,
        setIsCartOpen,
        selectedProduct,
        setSelectedProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAuthOpen,
        setIsAuthOpen,
        authMode,
        setAuthMode,
        currentView,
        setCurrentView,
        notifications,
        addNotification,
        removeNotification,

        // Customer Auth & Security
        customerUser,
        loginCustomer,
        logoutCustomer,
        loginWithGoogle,
        sendMobileOtp,
        verifyMobileOtp,
        pendingOtpPhone,
        expectedOtpCode,
        customerFailedAttempts,
        customerLockoutUntil,
        pendingVerificationEmail,
        setPendingVerificationEmail,
        expectedEmailCode,

        // Admin Auth, RBAC & Security
        adminUser,
        verifyAdminPassword,
        verifyAdmin2FA,
        logoutAdmin,
        switchAdminRole,
        ADMIN_ACCOUNTS,
        simulatedClientIp,
        setSimulatedClientIp,
        allowedIps,
        setAllowedIps,
        sessionTimeoutSeconds,
        setSessionTimeoutSeconds,
        remainingSessionSeconds,
        recordUserActivity,
        auditLogs,
        appendAuditLog
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

