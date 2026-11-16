import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, Star, Heart, Sparkles, Upload, Gift, Truck, ShieldCheck, 
  Check, Plus, Minus, ArrowRight, MessageSquare
} from 'lucide-react';

export const ProductDetailModal = () => {
  const { 
    selectedProduct, setSelectedProduct, 
    addToCart, setIsCartOpen, setIsCheckoutOpen,
    wishlist, toggleWishlist 
  } = useStore();

  const [customText, setCustomText] = useState('');
  const [selectedFont, setSelectedFont] = useState('font-serif');
  const [customPhotoUrl, setCustomPhotoUrl] = useState(null);
  const [giftWrap, setGiftWrap] = useState(false);
  const [greetingMessage, setGreetingMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState(null);

  if (!selectedProduct) return null;

  const isWishlisted = wishlist.some(p => p.id === selectedProduct.id);
  const discountPercent = Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100);

  // Simulated Photo Upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomPhotoUrl(url);
    }
  };

  const checkPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.length !== 6) {
      setPincodeStatus({ valid: false, message: 'Please enter a valid 6-digit Indian PIN code.' });
      return;
    }
    setPincodeStatus({ 
      valid: true, 
      message: `Delivering to PIN ${pincode} by ${new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })} • Free Express Shipping` 
    });
  };

  const handleAddToCart = () => {
    addToCart(selectedProduct, customText, customPhotoUrl, giftWrap, greetingMessage, quantity);
    setIsCartOpen(true);
    setSelectedProduct(null);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, customText, customPhotoUrl, giftWrap, greetingMessage, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md flex items-center justify-center transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          
          {/* Left Column: Image & Live Personalization Preview Mockup */}
          <div className="md:col-span-6 bg-slate-50 p-6 flex flex-col justify-between border-r border-slate-100">
            
            <div className="relative rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-80 sm:h-96 object-cover"
              />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-slate-900 text-white">
                  SKU: {selectedProduct.sku}
                </span>
                {discountPercent > 0 && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-rose-600 text-white">
                    {discountPercent}% OFF
                  </span>
                )}
              </div>

              {/* LIVE CUSTOM ENGRAVING PREVIEW OVERLAY */}
              {(customText || customPhotoUrl) && (
                <div className="absolute inset-x-4 bottom-4 p-3 bg-slate-950/85 backdrop-blur-md rounded-xl text-white border border-white/20 shadow-2xl animate-in slide-in-from-bottom-2">
                  <div className="flex items-center gap-2">
                    {customPhotoUrl && (
                      <img
                        src={customPhotoUrl}
                        alt="Custom upload"
                        className="w-12 h-12 rounded-lg object-cover border-2 border-rose-400 shrink-0"
                      />
                    )}
                    <div className="flex-1 overflow-hidden">
                      <p className="text-[10px] uppercase font-bold text-rose-400 tracking-wider">
                        Engraving Preview
                      </p>
                      <p className={`text-sm font-semibold truncate ${selectedFont}`}>
                        "{customText || 'Your Custom Text'}"
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Trust highlights under image */}
            <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>100% Quality Checked</span>
              </div>
              <div className="flex items-center gap-1.5 p-2 bg-white rounded-xl border border-slate-200">
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Free Gift Ready Box</span>
              </div>
            </div>

          </div>

          {/* Right Column: Details & Customization Options */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            
            <div className="space-y-4">
              
              {/* Category & Title */}
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  {selectedProduct.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1 leading-snug">
                  {selectedProduct.name}
                </h2>
                
                {/* Rating & Stock */}
                <div className="mt-2 flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full font-bold border border-amber-200">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{selectedProduct.rating}</span>
                    <span className="text-slate-400">({selectedProduct.reviewsCount} reviews)</span>
                  </div>
                  <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    In Stock ({selectedProduct.inStock} units left)
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 p-3 bg-rose-50/50 rounded-2xl border border-rose-100">
                <span className="text-3xl font-black text-slate-900">
                  ₹{selectedProduct.price.toLocaleString('en-IN')}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-slate-400 line-through">
                    ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-rose-700 bg-rose-200/60 px-2 py-0.5 rounded">
                  Save ₹{(selectedProduct.originalPrice - selectedProduct.price).toLocaleString('en-IN')}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedProduct.description}
              </p>

              {/* CUSTOMIZATION CONTROLS */}
              {selectedProduct.isCustomizable && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/90 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-rose-600" />
                      Personalization Options
                    </span>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold">
                      FREE Engraving
                    </span>
                  </div>

                  {/* Text Input */}
                  <div>
                    <label className="block text-[11px] font-medium text-slate-700 mb-1">
                      {selectedProduct.customFieldPlaceholder || 'Custom Engraving Text'}
                    </label>
                    <input
                      type="text"
                      maxLength={40}
                      value={customText}
                      onChange={(e) => setCustomText(e.target.value)}
                      placeholder="e.g. Rahul & Priya - 14 Feb"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:outline-none"
                    />
                  </div>

                  {/* Font Style Switcher */}
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                      Engraving Font Style
                    </label>
                    <div className="grid grid-cols-4 gap-1.5 text-xs">
                      {[
                        { id: 'font-serif', label: 'Classic' },
                        { id: 'font-sans', label: 'Modern' },
                        { id: 'font-mono', label: 'Tech' },
                        { id: 'italic font-serif', label: 'Cursive' }
                      ].map(f => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => setSelectedFont(f.id)}
                          className={`py-1.5 px-2 rounded-lg border text-center text-[11px] transition ${
                            selectedFont === f.id
                              ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-xs'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          <span className={f.id}>{f.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Upload (if applicable) */}
                  {selectedProduct.allowPhotoUpload && (
                    <div>
                      <label className="block text-[11px] font-medium text-slate-700 mb-1">
                        Upload Your Photo for Printing / Engraving
                      </label>
                      <label className="flex items-center justify-center gap-2 p-3 bg-white border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-rose-400 transition text-xs text-slate-600">
                        <Upload className="w-4 h-4 text-rose-500" />
                        <span>{customPhotoUrl ? 'Photo Uploaded (Click to change)' : 'Select High Resolution JPEG/PNG'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  )}

                  {/* Gift Wrap add-on */}
                  <div className="pt-2 border-t border-slate-200/80">
                    <label className="flex items-center justify-between cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={giftWrap}
                          onChange={(e) => setGiftWrap(e.target.checked)}
                          className="rounded text-rose-600 focus:ring-rose-500"
                        />
                        <span className="text-xs font-semibold text-slate-800">
                          Add Luxury Gift Box Wrapping (+₹49)
                        </span>
                      </div>
                      <Gift className="w-4 h-4 text-rose-500" />
                    </label>

                    {giftWrap && (
                      <input
                        type="text"
                        value={greetingMessage}
                        onChange={(e) => setGreetingMessage(e.target.value)}
                        placeholder="Write greeting card message (e.g. Happy Birthday Love!)"
                        className="mt-2 w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:ring-1 focus:ring-rose-500 focus:outline-none animate-in fade-in"
                      />
                    )}
                  </div>

                </div>
              )}

              {/* Pin Code Checker */}
              <div className="space-y-1.5">
                <form onSubmit={checkPincode} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={6}
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter delivery PIN code"
                    className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition"
                  >
                    Check
                  </button>
                </form>
                {pincodeStatus && (
                  <p className={`text-[11px] ${pincodeStatus.valid ? 'text-emerald-600 font-semibold' : 'text-rose-600'}`}>
                    {pincodeStatus.message}
                  </p>
                )}
              </div>

            </div>

            {/* Sticky Bottom Actions */}
            <div className="pt-6 border-t border-slate-100 mt-6 space-y-3">
              <div className="flex items-center gap-4">
                
                {/* Quantity Stepper */}
                <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-slate-800">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-1.5 hover:bg-white rounded-lg text-slate-600 transition"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Gift className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>

                {/* Buy Now Instant */}
                <button
                  onClick={handleBuyNow}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-rose-500/20 transition"
                >
                  <span>Buy Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

