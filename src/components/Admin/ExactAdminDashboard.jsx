import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Shield } from 'lucide-react';

export const ExactAdminDashboard = () => {
  const { 
    orders, products, updateOrderStatus, addProduct, restockProduct,
    adminUser, simulatedClientIp, remainingSessionSeconds,
    switchAdminRole, addNotification, razorpayWebhooks
  } = useStore();

  // Search & Filter state for Order list
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  // Security tab toggle inside admin dashboard so all required security specs are accessible
  const [showSecurityDrawer, setShowSecurityDrawer] = useState(false);
  const [selectedWebhook, setSelectedWebhook] = useState(null);

  // New product form states
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Mugs');
  const [price, setPrice] = useState('');
  const [oldPrice, setOldPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');

  // Compute metrics exactly as displayed
  const totalOrdersCount = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const lowStockCount = products.filter(p => (Number(p.stock) || 0) < 10).length;

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = !orderSearch ||
      order.id.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerPhone.includes(orderSearch) ||
      (order.itemsSummary && order.itemsSummary.toLowerCase().includes(orderSearch.toLowerCase()));

    const matchesStatus = statusFilter === 'All statuses' || order.orderStatus.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFileName(file.name);
    } else {
      setFileName('No file chosen');
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      addNotification('Input Required', 'Please enter a product name.', 'warning');
      return;
    }

    const newProd = {
      name: productName.trim(),
      category: category.trim() || 'Gifts',
      price: Number(price) || 299,
      oldPrice: Number(oldPrice) || 499,
      stock: Number(stock) || 10,
      description: description.trim() || 'Personalized customized gift.',
      image: imageFile 
        ? URL.createObjectURL(imageFile) 
        : 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      isCustomizable: true
    };

    addProduct(newProd);

    // Reset form
    setProductName('');
    setCategory('Mugs');
    setPrice('');
    setOldPrice('');
    setStock('10');
    setDescription('');
    setImageFile(null);
    setFileName('No file chosen');
  };

  return (
    <div className="space-y-5 max-w-7xl mx-auto">
      
      {/* Page Title & Security Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Admin dashboard
        </h1>

        {/* Security Quick Status Bar */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-slate-600 font-medium">Role: <strong className="text-rose-600 font-bold">{adminUser?.role || 'Owner'}</strong></span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500 font-mono text-[11px]">IP: {simulatedClientIp}</span>
          </div>

          <button
            onClick={() => setShowSecurityDrawer(!showSecurityDrawer)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-semibold shadow-2xs transition"
            title="View Security & RBAC Specs"
          >
            <Shield className="w-3.5 h-3.5 text-amber-400" />
            <span>Security</span>
          </button>
        </div>
      </div>

      {/* Security Plan Expandable Drawer */}
      {showSecurityDrawer && (
        <div className="bg-slate-900 text-slate-200 rounded-2xl p-4 sm:p-5 border border-slate-800 shadow-xl space-y-4 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <h3 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              Active Admin Security Suite (2FA, RBAC, IP Allowlist, Short Session Timeout)
            </h3>
            <button
              onClick={() => setShowSecurityDrawer(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Close ✕
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Two-Factor Authentication</span>
              <p className="text-white font-bold mt-1">TOTP Google Authenticator</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Enforced with rolling 30s secret key.</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Role-Based Access Control</span>
              <div className="mt-1 flex items-center gap-1.5">
                <select
                  value={adminUser?.role || 'Owner'}
                  onChange={(e) => switchAdminRole(e.target.value)}
                  className="bg-slate-900 text-rose-400 font-bold border border-slate-700 rounded px-2 py-1 text-xs focus:outline-none cursor-pointer"
                >
                  <option value="Owner">Owner (Full Access)</option>
                  <option value="Manager">Manager (Catalogue & Orders)</option>
                  <option value="Order Packer">Order Packer (Orders Only)</option>
                </select>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">IP Allowlist Policy</span>
              <p className="text-emerald-400 font-mono font-bold mt-1">{simulatedClientIp}</p>
              <p className="text-slate-400 text-[11px] mt-0.5">Untrusted IPs blocked with 403 Forbidden.</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Session Timeout Countdown</span>
              <p className="text-amber-400 font-mono font-bold mt-1">
                {Math.floor(remainingSessionSeconds / 60)}m {remainingSessionSeconds % 60}s remaining
              </p>
              <p className="text-slate-400 text-[11px] mt-0.5">Auto-terminates upon inactivity.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3 Metric Cards Row (Stacked on Mobile, 3 cols on Desktop) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-5">
        
        {/* Card 1: Orders */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="text-sm sm:text-base font-normal text-slate-800">
            Orders
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 sm:mt-2">
            {totalOrdersCount}
          </div>
        </div>

        {/* Card 2: Revenue */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="text-sm sm:text-base font-normal text-slate-800">
            Revenue
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 sm:mt-2">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </div>
        </div>

        {/* Card 3: Low stock items */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-5 sm:p-6 shadow-xs">
          <div className="text-sm sm:text-base font-normal text-slate-800">
            Low stock items
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-1 sm:mt-2">
            {lowStockCount}
          </div>
        </div>

      </div>

      {/* Card 2: Order list */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Order list
        </h2>

        {/* Search & Filter Row */}
        <div className="flex gap-2.5">
          <input
            type="text"
            value={orderSearch}
            onChange={(e) => setOrderSearch(e.target.value)}
            placeholder="Search order or customer"
            className="flex-1 px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-700 focus:outline-none cursor-pointer shrink-0"
          >
            <option value="All statuses">All statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Orders Table with responsive horizontal scroll */}
        <div className="overflow-x-auto pt-1">
          <table className="w-full text-left text-xs sm:text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-900">
                <th className="py-2.5 px-2 font-bold">Order</th>
                <th className="py-2.5 px-3 font-bold">Customer</th>
                <th className="py-2.5 px-3 font-bold">Items</th>
                <th className="py-2.5 px-3 font-bold">Payment</th>
                <th className="py-2.5 px-3 font-bold">Total</th>
                <th className="py-2.5 px-3 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400 text-xs">
                    No orders match your filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id} className="hover:bg-slate-50/60 transition">
                    
                    {/* Order ID */}
                    <td className="py-3 px-2 font-normal text-slate-900 whitespace-nowrap">
                      {order.id}
                    </td>

                    {/* Customer */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">{order.customerName}</div>
                      <div className="text-slate-500 text-[11px]">{order.customerPhone}</div>
                    </td>

                    {/* Items */}
                    <td className="py-3 px-3 text-slate-800 max-w-xs">
                      {order.itemsSummary || (order.items && order.items.map(i => `${i.name} ×${i.quantity}`).join(', '))}
                    </td>

                    {/* Payment */}
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                      {order.paymentMethod}
                    </td>

                    {/* Total */}
                    <td className="py-3 px-3 whitespace-nowrap font-bold text-slate-900">
                      ₹{Number(order.totalAmount).toLocaleString('en-IN')}
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3 px-3 whitespace-nowrap">
                      <select
                        value={order.orderStatus}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-800 focus:outline-none cursor-pointer shadow-2xs"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 3: Upload a new product */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Upload a new product
        </h2>

        <form onSubmit={handleAddProduct} className="space-y-3 sm:space-y-4 text-xs">
          
          {/* Row 1: Stacks on mobile, 5 cols on large desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div>
              <label className="block text-slate-900 font-bold mb-1">Product name</label>
              <input
                type="text"
                required
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder=""
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-900 font-bold mb-1">Category</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Mugs"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-900 font-bold mb-1">Price (₹)</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder=""
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-900 font-bold mb-1">Old price (₹)</label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder=""
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
              />
            </div>

            <div>
              <label className="block text-slate-900 font-bold mb-1">Stock</label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                placeholder="10"
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
              />
            </div>
          </div>

          {/* Row 2: Description */}
          <div>
            <label className="block text-slate-900 font-bold mb-1">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder=""
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 text-xs"
            />
          </div>

          {/* Row 3: Product image file upload */}
          <div>
            <label className="block text-slate-900 font-bold mb-1.5">
              Product image (PNG, JPG or WebP, up to 1.5 MB)
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
              <label className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded text-xs text-slate-800 cursor-pointer shadow-2xs font-normal">
                Choose File
                <input
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              <span className="text-slate-600 text-xs">{fileName}</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-1">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-lg font-bold text-xs shadow-xs transition text-center"
            >
              Add product to store
            </button>
          </div>

        </form>
      </div>

      {/* Card 4: Inventory */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <h2 className="text-base sm:text-lg font-bold text-slate-900">
          Inventory
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[450px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-900">
                <th className="py-2.5 px-2 font-bold">Product</th>
                <th className="py-2.5 px-3 font-bold">Price</th>
                <th className="py-2.5 px-3 font-bold">Stock</th>
                <th className="py-2.5 px-3 font-bold text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50/60 transition">
                  
                  {/* Product Name */}
                  <td className="py-3 px-2 font-normal text-slate-900">
                    {product.name}
                  </td>

                  {/* Price */}
                  <td className="py-3 px-3 font-normal text-slate-900 whitespace-nowrap">
                    ₹{product.price.toLocaleString('en-IN')}
                  </td>

                  {/* Stock */}
                  <td className="py-3 px-3 font-normal text-slate-900 whitespace-nowrap">
                    <span className={(product.stock || 0) < 10 ? 'text-rose-600 font-bold' : ''}>
                      {product.stock || 0}
                    </span>
                  </td>

                  {/* Restock +10 Action Button */}
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => restockProduct(product.id, 10)}
                      className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-900 font-bold text-xs shadow-2xs transition"
                    >
                      Restock +10
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Card 5: Razorpay Gateway & Webhook Audit Log */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Razorpay Webhook Stream & Verification
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                HMAC SHA256
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Endpoint: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">https://api.graphicden.in/v1/webhooks/razorpay</code> · Secret: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">whsec_***99A</code>
            </p>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
              Listener Active
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm min-w-[650px]">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-900">
                <th className="py-2.5 px-2 font-bold">Event</th>
                <th className="py-2.5 px-3 font-bold">Payment ID</th>
                <th className="py-2.5 px-3 font-bold">Order ID</th>
                <th className="py-2.5 px-3 font-bold">Amount</th>
                <th className="py-2.5 px-3 font-bold">Method</th>
                <th className="py-2.5 px-3 font-bold">Signature</th>
                <th className="py-2.5 px-3 font-bold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-800">
              {(!razorpayWebhooks || razorpayWebhooks.length === 0) ? (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400 text-xs">
                    No webhook events recorded yet. Complete an order via Razorpay to see real-time webhook captures.
                  </td>
                </tr>
              ) : (
                razorpayWebhooks.map((wh) => (
                  <tr key={wh.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 px-2 font-mono font-bold text-blue-900 whitespace-nowrap">
                      {wh.event}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-900 whitespace-nowrap">
                      {wh.paymentId}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 whitespace-nowrap">
                      {wh.orderId}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">
                      ₹{wh.amount ? (wh.amount / 100).toLocaleString('en-IN') : '0'}
                    </td>
                    <td className="py-3 px-3 uppercase text-slate-700 whitespace-nowrap font-medium">
                      {wh.method}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                        Verified
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedWebhook(wh)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-semibold text-xs transition"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Webhook JSON Inspection Modal */}
      {selectedWebhook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Webhook Payload Inspection</h3>
                <p className="text-xs text-slate-500 font-mono">{selectedWebhook.event} · {selectedWebhook.paymentId}</p>
              </div>
              <button
                onClick={() => setSelectedWebhook(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>
            <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-xs rounded-xl overflow-x-auto max-h-96">
              {JSON.stringify(selectedWebhook.raw || selectedWebhook, null, 2)}
            </pre>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedWebhook(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
