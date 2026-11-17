import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductIllustration } from './ProductIllustrations';
import { Camera, Moon, Sun, Gift, Check, X, Shield, Sliders } from 'lucide-react';

export const LiveCustomizerModal = ({ product, isOpen, onClose }) => {
  const { addToCart, addNotification } = useStore();

  const [customText, setCustomText] = useState('Rahul & Priya');
  const [selectedGlow, setSelectedGlow] = useState('#f59e0b');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isGlowOn, setIsGlowOn] = useState(true);
  const [giftWrap, setGiftWrap] = useState(false);
  const [greeting, setGreeting] = useState('');

  if (!isOpen || !product) return null;

  const glowOptions = [
    { label: 'Warm Sunset', color: '#f59e0b' },
    { label: 'Neon Rose', color: '#f43f5e' },
    { label: 'Cyber Cyan', color: '#06b6d4' },
    { label: 'Emerald Glow', color: '#10b981' },
    { label: 'Royal Violet', color: '#8b5cf6' }
  ];

  const handleAddCustomized = () => {
    addToCart(
      product,
      customText,
      null,
      giftWrap,
      greeting,
      1
    );
    addNotification('Crafted & Added', `${product.name} personalized with "${customText}" added to bag!`, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className={`relative max-w-4xl w-full rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Header bar */}
        <div className={`p-4 px-6 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50'
        }`}>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-rose-600/20 text-rose-500">
              <Camera className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold tracking-tight">GraphicDen Personalization Studio</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Dark mode room toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-300' 
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
              title="Simulate day or night ambient room lighting"
            >
              {isDarkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span>{isDarkMode ? 'Dark Studio' : 'Bright Room'}</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-full text-slate-400 hover:text-white transition`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 p-6 sm:p-8 gap-8 items-center">
          
          {/* Left: Interactive Preview Mockup with Live Glow */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div className={`relative w-full aspect-square max-w-sm rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-500 ${
              isDarkMode ? 'bg-slate-900/90 shadow-2xl border border-slate-800' : 'bg-slate-100 border border-slate-200'
            }`}>
              <ProductIllustration
                name={product.name}
                glowColor={selectedGlow}
                isGlowActive={isGlowOn}
                customText={customText}
                className="w-full h-64"
              />

              {/* Ambient status indicator */}
              <div className="mt-4 flex items-center justify-between w-full px-2 text-[11px] text-slate-400 font-medium">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: selectedGlow }}></span>
                  Laser Precision Preview
                </span>
                <button
                  type="button"
                  onClick={() => setIsGlowOn(!isGlowOn)}
                  className="underline hover:text-rose-400 font-bold"
                >
                  {isGlowOn ? 'Turn Glow Off' : 'Turn Glow On'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Customization Controls */}
          <div className="md:col-span-6 space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                Customizing
              </span>
              <h2 className="text-xl sm:text-2xl font-black mt-0.5">
                {product.name}
              </h2>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold text-rose-500">₹{product.price}</span>
                {product.originalPrice > product.price && (
                  <span className="text-xs text-slate-500 line-through">₹{product.originalPrice}</span>
                )}
                <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-full">
                  Free Laser Engraving
                </span>
              </div>
            </div>

            {/* Input 1: Custom Text */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Engraving Text (Names, Date, or Short Message)
              </label>
              <input
                type="text"
                maxLength={30}
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="e.g. Rahul & Priya"
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-rose-500 ${
                  isDarkMode ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            {/* Input 2: Glow Color Palette */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                LED Illumination Hue
              </label>
              <div className="flex items-center gap-2.5">
                {glowOptions.map(g => (
                  <button
                    key={g.color}
                    type="button"
                    onClick={() => { setSelectedGlow(g.color); setIsGlowOn(true); }}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition transform hover:scale-110 ${
                      selectedGlow === g.color ? 'ring-3 ring-white ring-offset-2 ring-offset-slate-950 scale-110 shadow-lg' : 'opacity-80'
                    }`}
                    style={{ backgroundColor: g.color }}
                    title={g.label}
                  >
                    {selectedGlow === g.color && <Check className="w-4 h-4 text-white drop-shadow-md stroke-[3]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Gift Wrapping Add-on */}
            <div className={`p-3.5 rounded-2xl border space-y-2 ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <label className="flex items-center justify-between cursor-pointer text-xs font-semibold">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                    className="rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span>Add Luxury Velvet Gift Wrap (+₹49)</span>
                </span>
                <Gift className="w-4 h-4 text-rose-500" />
              </label>

              {giftWrap && (
                <input
                  type="text"
                  value={greeting}
                  onChange={(e) => setGreeting(e.target.value)}
                  placeholder="Personal greeting card message (e.g. Happy Anniversary Love!)"
                  className={`w-full px-3 py-1.5 text-xs rounded-lg border focus:outline-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-800'
                  }`}
                />
              )}
            </div>

            {/* Submit */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleAddCustomized}
                className="w-full py-3.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-lg flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>Confirm Personalization & Add to Bag</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
