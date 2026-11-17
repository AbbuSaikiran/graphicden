import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Upload, RotateCw, Sliders, Sun, Moon, 
  Check, ShieldCheck, Heart, ShoppingBag, 
  RefreshCw, Monitor, X
} from 'lucide-react';

// Curated high-res quick-test photos so user can test immediately without searching files
const SAMPLE_TEST_PHOTOS = [
  {
    id: 'sample-1',
    name: 'Romantic Couple',
    category: 'Couple',
    url: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sample-2',
    name: 'Happy Family',
    category: 'Family',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sample-3',
    name: 'Playful Pet',
    category: 'Pets',
    url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sample-4',
    name: 'Birthday Solo',
    category: 'Birthday',
    url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=80'
  },
  {
    id: 'sample-5',
    name: 'Golden Sunset',
    category: 'Travel',
    url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=700&q=80'
  }
];

// 6 Core Gift Items Available for Photo Testing
const GIFTS_FOR_TESTING = [
  {
    id: 'gd-001',
    name: 'Photo mug',
    type: 'mug',
    price: 299,
    originalPrice: 399,
    category: 'Mugs',
    description: '11oz Glossy Ceramic Mug with panoramic photo wrap, microwave & dishwasher safe.'
  },
  {
    id: 'gd-004',
    name: 'Memory frame',
    type: 'led_frame',
    price: 449,
    originalPrice: 599,
    category: 'Frames',
    description: 'Solid wooden moulding with protective anti-glare acrylic shield & desktop easel stand.'
  },
  {
    id: 'gd-003',
    name: 'Custom cushion',
    type: 'cushion',
    price: 549,
    originalPrice: 699,
    category: 'Home',
    description: '16x16 inch plush microfiber velvet pillow with HD sublimation photo printing.'
  },
  {
    id: 'gd-009',
    name: 'Couple mug set',
    type: 'mug',
    price: 549,
    originalPrice: 699,
    category: 'Mugs',
    description: 'Twin nesting ceramic mugs with heart-shaped handles and personalized couple names.'
  },
  {
    id: 'gd-002',
    name: 'Name keychain',
    type: 'wood_plaque',
    price: 149,
    originalPrice: 199,
    category: 'Keychains',
    description: 'Laser-cut natural wood keychain with stainless steel split ring.'
  },
  {
    id: 'gd-008',
    name: 'Love photo book',
    type: 'dual_frame',
    price: 799,
    originalPrice: 999,
    category: 'Frames',
    description: 'Hardcover 24-page custom photo album on premium lustre paper.'
  }
];

export const GiftPhotoTesterStudio = ({ isOpen, onClose, initialProduct }) => {
  const { addToCart, addNotification } = useStore();
  const fileInputRef = useRef(null);

  // Selected gift
  const [selectedGift, setSelectedGift] = useState(() => {
    if (initialProduct) {
      return GIFTS_FOR_TESTING.find(g => g.id === initialProduct.id || g.name.toLowerCase() === initialProduct.name.toLowerCase()) || initialProduct;
    }
    return GIFTS_FOR_TESTING[0];
  });

  // Sync when initialProduct prop changes
  useEffect(() => {
    if (initialProduct) {
      const match = GIFTS_FOR_TESTING.find(g => g.id === initialProduct.id || g.name.toLowerCase() === initialProduct.name.toLowerCase()) || initialProduct;
      setSelectedGift(match);
    }
  }, [initialProduct]);

  // Active Photo (default to romantic couple sample)
  const [activePhoto, setActivePhoto] = useState(SAMPLE_TEST_PHOTOS[0].url);
  const [photoSourceLabel, setPhotoSourceLabel] = useState('Sample: Romantic Couple');

  // Custom text engraving
  const [customText, setCustomText] = useState('Happy Anniversary Rahul & Priya ❤️');
  const [fontFamily, setFontFamily] = useState('font-serif');

  // Photo Testing controls
  const [zoomLevel, setZoomLevel] = useState(100); // 50% to 200%
  const [rotationAngle, setRotationAngle] = useState(0); // 0, 90, 180, 270
  const [selectedFilter, setSelectedFilter] = useState('none'); // 'none', 'warm', 'bw', 'sepia', 'vibrant', 'glow'
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Real life test environment simulator
  const [environment, setEnvironment] = useState('studio'); // 'studio', 'desk', 'nightstand', 'sofa'
  const [isRoomDark, setIsRoomDark] = useState(false);
  const [ledColor, setLedColor] = useState('#f59e0b'); // warm gold default

  if (!isOpen) return null;

  // Handle local user file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 15 * 1024 * 1024) {
        alert('Please choose an image under 15 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setActivePhoto(event.target.result);
        setPhotoSourceLabel(`Uploaded: ${file.name}`);
        addNotification('Photo Uploaded!', `Now previewing on ${selectedGift.name}`, 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Reset adjustments
  const handleResetAdjustments = () => {
    setZoomLevel(100);
    setRotationAngle(0);
    setSelectedFilter('none');
    setOffsetX(0);
    setOffsetY(0);
  };

  // Filter CSS style computation
  const getFilterStyle = () => {
    switch (selectedFilter) {
      case 'warm':
        return 'sepia(30%) saturate(140%) brightness(105%) hue-rotate(-10deg)';
      case 'bw':
        return 'grayscale(100%) contrast(120%)';
      case 'sepia':
        return 'sepia(80%) contrast(95%) brightness(95%)';
      case 'vibrant':
        return 'saturate(180%) contrast(110%)';
      case 'glow':
        return 'brightness(120%) contrast(115%) drop-shadow(0 0 8px rgba(244,63,94,0.6))';
      default:
        return 'none';
    }
  };

  // Add customized gift to bag
  const handleAddCustomizedToCart = () => {
    addToCart(
      selectedGift,
      customText,
      activePhoto,
      false,
      `Customized via Photo Studio (${selectedFilter} filter, ${fontFamily})`,
      1
    );
    addNotification(
      'Customized Gift Added!',
      `${selectedGift.name} with your custom photo added to cart.`,
      'success'
    );
    if (onClose) onClose();
  };

  // Robust Gift Canvas Detection
  const normName = (selectedGift?.name || '').toLowerCase();
  const giftType = (selectedGift?.type || selectedGift?.categoryType || selectedGift?.category || '').toLowerCase();
  const isMug = giftType.includes('mug') || normName.includes('mug');
  const isCushion = giftType.includes('cushion') || normName.includes('cushion');
  const isPlaqueOrKey = giftType.includes('plaque') || giftType.includes('key') || normName.includes('keychain') || normName.includes('plaque');
  const isDualOrBook = giftType.includes('book') || normName.includes('book') || normName.includes('dual') || giftType === 'dual_frame';
  // Default to frame if nothing else matched
  const isFrame = !isMug && !isCushion && !isPlaqueOrKey && !isDualOrBook;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in overflow-y-auto">
      <div className={`relative max-w-6xl w-full rounded-3xl overflow-hidden shadow-2xl border transition-colors duration-500 my-auto ${
        isRoomDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        
        {/* Top Control Bar */}
        <div className={`px-6 py-4 border-b flex items-center justify-between ${
          isRoomDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50'
        }`}>
          <div>
            <h3 className="font-bold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
              Photo Customizer Studio
            </h3>
            <p className="text-[11px] text-slate-500">
              Upload your picture, test zoom & angle, and preview it on your personalized gift before ordering.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Day / Night Room Lighting Toggle */}
            <button
              onClick={() => setIsRoomDark(!isRoomDark)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isRoomDark
                  ? 'bg-slate-800 border-slate-700 text-amber-300 shadow-inner'
                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
              title="Test day or night room ambient lighting"
            >
              {isRoomDark ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
              <span className="hidden sm:inline">{isRoomDark ? 'Night Ambient' : 'Day Studio'}</span>
            </button>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-200/70 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold transition flex items-center justify-center"
                title="Close Customizer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Main 2-Column Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
          
          {/* Left: Interactive Canvas & Real-Life Simulator (7 Cols) */}
          <div className={`lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r ${
            isRoomDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50/70 border-slate-100'
          }`}>
            
            {/* Environment Simulator Selector */}
            <div className="flex items-center justify-between pb-4">
              <span className="text-xs font-bold flex items-center gap-1.5 opacity-80">
                <Monitor className="w-3.5 h-3.5 text-rose-600" />
                <span>Simulation View:</span>
              </span>

              <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-1 rounded-xl text-[11px] font-bold">
                {[
                  { id: 'studio', label: 'Studio' },
                  { id: 'desk', label: 'Office Desk' },
                  { id: 'nightstand', label: 'Bedside' },
                  { id: 'sofa', label: 'Living Couch' }
                ].map(env => (
                  <button
                    key={env.id}
                    onClick={() => setEnvironment(env.id)}
                    className={`px-2.5 py-1 rounded-lg transition ${
                      environment === env.id 
                        ? 'bg-[#b91c1c] text-white shadow-xs' 
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    {env.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Central Realistic Gift Mockup Stage */}
            <div className={`relative w-full aspect-square max-w-md mx-auto rounded-3xl p-6 flex items-center justify-center overflow-hidden transition-all duration-500 shadow-xl ${
              environment === 'desk' 
                ? 'bg-gradient-to-b from-[#3b2314] via-[#52331f] to-[#2b180d]' 
                : environment === 'nightstand'
                ? 'bg-gradient-to-b from-indigo-950 via-slate-900 to-slate-950'
                : environment === 'sofa'
                ? 'bg-gradient-to-b from-slate-300 via-slate-200 to-slate-400'
                : (isRoomDark ? 'bg-slate-900 border border-slate-800' : 'bg-gradient-to-b from-slate-100 via-white to-rose-50/40 border border-slate-200/80')
            }`}>
              
              {/* Tabletop Surface Illusion for Desk / Nightstand */}
              {(environment === 'desk' || environment === 'nightstand') && (
                <div className="absolute bottom-0 inset-x-0 h-28 bg-black/40 backdrop-blur-xs border-t border-white/10" />
              )}

              {/* Dynamic Glow Aura */}
              <div 
                className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-all duration-500"
                style={{ backgroundColor: isRoomDark ? ledColor : `${ledColor}30` }}
              />

              {/* ---------------- 1. CERAMIC PHOTO MUG CANVAS ---------------- */}
              {isMug && (
                <div className="relative flex items-center justify-center animate-in zoom-in-95 duration-300">
                  {/* Mug Handle */}
                  <div className="absolute -right-7 sm:-right-8 top-10 w-16 h-24 rounded-r-3xl border-8 border-slate-300 bg-transparent shadow-lg" />
                  
                  {/* Mug Body */}
                  <div className="relative z-10 w-44 sm:w-52 h-56 sm:h-64 bg-gradient-to-r from-slate-200 via-white to-slate-200 rounded-b-3xl rounded-t-sm shadow-2xl flex flex-col items-center justify-between p-3 border border-slate-300/80 overflow-hidden">
                    
                    {/* Top Ceramic Rim Specular */}
                    <div className="w-full h-3 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full opacity-80" />

                    {/* Photo Canvas wrapped on Ceramic Cylinder */}
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-slate-200/80 shadow-inner bg-slate-900 flex items-center justify-center">
                      <img
                        src={activePhoto}
                        alt="Preview Mug"
                        className="w-full h-full object-cover transition-all duration-300"
                        style={{
                          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg) translate(${offsetX}px, ${offsetY}px)`,
                          filter: getFilterStyle()
                        }}
                      />
                      
                      {/* Realistic Curved Gloss Reflection Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-black/30 pointer-events-none" />
                    </div>

                    {/* Custom Text Engraved along bottom of mug */}
                    <div className="w-full py-1.5 text-center">
                      <p 
                        className={`text-xs font-bold truncate px-2 text-slate-800 ${fontFamily}`}
                      >
                        {customText || 'Rahul & Priya'}
                      </p>
                    </div>

                    {/* Bottom Rim */}
                    <div className="w-full h-2 bg-slate-300 rounded-full" />
                  </div>
                </div>
              )}

              {/* ---------------- 2. VELVET CUSHION CANVAS ---------------- */}
              {isCushion && (
                <div className="relative flex items-center justify-center animate-in zoom-in-95 duration-300">
                  <div className="relative w-56 sm:w-64 h-56 sm:h-64 rounded-3xl bg-[#b91c1c] shadow-2xl p-4 flex flex-col items-center justify-center border-4 border-dashed border-rose-300/40 transform -rotate-1">
                    
                    {/* Soft Cushion Seam Texture & Photo Canvas */}
                    <div className="relative w-44 sm:w-52 h-44 sm:h-52 rounded-2xl overflow-hidden shadow-inner bg-slate-900 border border-white/20 flex items-center justify-center">
                      <img
                        src={activePhoto}
                        alt="Preview Cushion"
                        className="w-full h-full object-cover transition-all duration-300"
                        style={{
                          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg) translate(${offsetX}px, ${offsetY}px)`,
                          filter: getFilterStyle()
                        }}
                      />
                      {/* Velvet Texture Overlay */}
                      <div className="absolute inset-0 bg-radial from-transparent to-black/30 pointer-events-none" />
                    </div>

                    {customText && (
                      <span className={`text-xs font-bold text-white tracking-wide mt-2 truncate max-w-[200px] drop-shadow-sm ${fontFamily}`}>
                        {customText}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* ---------------- 3. WOODEN PLAQUE & KEYCHAIN CANVAS ---------------- */}
              {isPlaqueOrKey && (
                <div className="relative flex flex-col items-center animate-in zoom-in-95 duration-300">
                  <div className="w-56 sm:w-64 h-56 sm:h-64 rounded-2xl bg-[#d4a373] border-4 border-[#bc8a5f] shadow-2xl p-4 flex flex-col items-center justify-between text-[#582f0e]">
                    
                    {/* Laser Etched Monochrome Photo Effect */}
                    <div className="relative w-full h-36 rounded-lg overflow-hidden border border-[#a67449] shadow-inner bg-[#eddcd2] flex items-center justify-center">
                      <img
                        src={activePhoto}
                        alt="Preview Plaque"
                        className="w-full h-full object-cover mix-blend-multiply opacity-90 transition-all duration-300"
                        style={{
                          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg) translate(${offsetX}px, ${offsetY}px)`,
                          filter: 'grayscale(100%) contrast(150%) sepia(50%)'
                        }}
                      />
                    </div>

                    <div className="w-full text-center py-2 border-t border-[#bc8a5f]/40">
                      <p className={`text-xs font-black tracking-widest uppercase ${fontFamily}`}>
                        {customText || 'In Loving Memory'}
                      </p>
                      <span className="text-[9px] font-mono opacity-70 tracking-wider">★ LASER ENGRAVED FINISH ★</span>
                    </div>
                  </div>
                  
                  {/* Stand */}
                  <div className="w-36 h-4 bg-[#8b5a2b] rounded-b-md shadow-md -mt-1" />
                </div>
              )}

              {/* ---------------- 4. DUAL COLLAGE & PHOTO BOOK CANVAS ---------------- */}
              {isDualOrBook && (
                <div className="relative flex flex-col items-center animate-in zoom-in-95 duration-300">
                  <div className="w-60 sm:w-72 h-52 sm:h-56 rounded-2xl bg-gradient-to-r from-amber-800 via-amber-700 to-amber-900 p-3 shadow-2xl flex items-center justify-center gap-2 border-2 border-amber-400">
                    <div className="w-1/2 h-40 rounded-lg overflow-hidden bg-black border border-amber-300 shadow-md">
                      <img
                        src={activePhoto}
                        alt="Preview Album"
                        className="w-full h-full object-cover transition-all duration-300"
                        style={{
                          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg) translate(${offsetX}px, ${offsetY}px)`,
                          filter: getFilterStyle()
                        }}
                      />
                    </div>
                    <div className="w-1/2 h-40 rounded-lg bg-amber-50 p-2 flex flex-col items-center justify-center text-center border border-amber-300 shadow-md">
                      <Heart className="w-6 h-6 text-rose-600 fill-rose-600 mb-2" />
                      <p className={`text-[10px] font-bold text-slate-800 ${fontFamily}`}>
                        {customText || 'You & Me'}
                      </p>
                      <span className="text-[8px] text-amber-800 mt-2 font-mono">EST. 2026</span>
                    </div>
                  </div>
                  <div className="w-36 h-3 bg-[#4a2810] rounded-b-md shadow-md -mt-0.5" />
                </div>
              )}

              {/* ---------------- 5. WOODEN MEMORY PHOTO FRAME CANVAS (Default) ---------------- */}
              {isFrame && (
                <div className="relative flex flex-col items-center animate-in zoom-in-95 duration-300">
                  <div 
                    className="relative z-10 p-4 rounded-2xl shadow-2xl transition-all duration-300 border-4 border-[#8b5a2b] bg-[#a77341]"
                    style={{
                      boxShadow: isRoomDark 
                        ? `0 0 30px ${ledColor}40` 
                        : '0 20px 40px rgba(0,0,0,0.15)'
                    }}
                  >
                    {/* Frame Glass */}
                    <div className="w-52 sm:w-60 h-52 sm:h-60 rounded-xl overflow-hidden bg-black relative flex items-center justify-center border border-white/20">
                      <img
                        src={activePhoto}
                        alt="Preview Frame"
                        className="w-full h-full object-cover transition-all duration-300"
                        style={{
                          transform: `scale(${zoomLevel / 100}) rotate(${rotationAngle}deg) translate(${offsetX}px, ${offsetY}px)`,
                          filter: getFilterStyle()
                        }}
                      />

                      {/* Engraved Plaque at Bottom of Frame */}
                      {customText && (
                        <div className="absolute bottom-2 inset-x-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-md text-center border border-white/20">
                          <span className={`text-[11px] font-bold tracking-wide text-white ${fontFamily}`}>
                            {customText}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Wooden Easel Desk Stand */}
                  <div className="w-32 h-4 bg-[#6f451e] rounded-b-md shadow-md -mt-1 border-t border-[#8b5a2b]" />
                </div>
              )}

            </div>

            {/* Bottom Status / Photo Source tag */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs opacity-75 gap-2">
              <span className="flex items-center gap-1.5 truncate">
                <Check className="w-4 h-4 text-emerald-500" />
                <span>Active Image: <strong>{photoSourceLabel}</strong></span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetAdjustments}
                  className="px-2.5 py-1 rounded-lg border border-slate-300 hover:bg-slate-200 dark:border-slate-700 dark:hover:bg-slate-800 text-[11px] font-bold transition flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Adjustments</span>
                </button>
              </div>
            </div>

          </div>

          {/* Right: Testing Toolset & Customization Controls (5 Cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[620px]">
            
            {/* Step 1: Select Gift to Test On */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1">
                  <span>1. Choose Product</span>
                </label>
                <span className="text-xs font-black text-[#b91c1c]">
                  ₹{selectedGift.price} <span className="line-through text-slate-400 font-normal">₹{selectedGift.originalPrice}</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {GIFTS_FOR_TESTING.map(gift => (
                  <button
                    key={gift.id}
                    onClick={() => setSelectedGift(gift)}
                    className={`p-2 rounded-xl border text-left transition ${
                      selectedGift.id === gift.id
                        ? 'border-[#b91c1c] bg-red-50 dark:bg-red-950/40 font-bold shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <p className="text-xs truncate text-slate-900 dark:text-white">{gift.name}</p>
                    <span className="text-[10px] text-[#b91c1c] font-bold">₹{gift.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Photo Source (Upload YOUR photo OR pick sample) */}
            <div className="space-y-3 pt-1 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1">
                <span>2. Upload Photo or Pick Sample</span>
              </label>

              {/* Upload Button */}
              <div className="flex gap-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 py-3 px-4 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 transition"
                >
                  <Upload className="w-4 h-4 text-white" />
                  <span>Choose Photo from Device (JPG, PNG)</span>
                </button>
              </div>

              {/* Quick Sample Photos Bar */}
              <div>
                <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Or test instantly with samples:</p>
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {SAMPLE_TEST_PHOTOS.map(sample => (
                    <button
                      key={sample.id}
                      onClick={() => {
                        setActivePhoto(sample.url);
                        setPhotoSourceLabel(`Sample: ${sample.name}`);
                      }}
                      className={`relative w-12 h-12 rounded-xl overflow-hidden border-2 shrink-0 transition ${
                        activePhoto === sample.url
                          ? 'border-[#b91c1c] scale-105 shadow-md'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                      title={sample.name}
                    >
                      <img src={sample.url} alt={sample.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Interactive Photo Adjustment Controls */}
            <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b91c1c] flex items-center gap-1">
                <Sliders className="w-3.5 h-3.5" />
                <span>3. Adjust Scale, Angle & Filter</span>
              </label>

              {/* Zoom & Rotation */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span>Zoom ({zoomLevel}%)</span>
                    <button onClick={() => setZoomLevel(100)} className="text-[#b91c1c] hover:underline">100%</button>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(Number(e.target.value))}
                    className="w-full accent-[#b91c1c] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] font-bold mb-1">
                    <span>Rotate ({rotationAngle}°)</span>
                  </div>
                  <button
                    onClick={() => setRotationAngle((prev) => (prev + 90) % 360)}
                    className="w-full py-1.5 px-3 rounded-lg border border-slate-300 dark:border-slate-700 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1 transition"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Rotate +90°</span>
                  </button>
                </div>
              </div>

              {/* Photo Filter Tone Test */}
              <div>
                <span className="text-[11px] font-bold block mb-1.5">Color Tone:</span>
                <div className="grid grid-cols-3 gap-1.5 text-[11px] font-semibold">
                  {[
                    { id: 'none', label: 'Original' },
                    { id: 'warm', label: 'Warm' },
                    { id: 'bw', label: 'B&W' },
                    { id: 'sepia', label: 'Sepia' },
                    { id: 'vibrant', label: 'Vibrant' },
                    { id: 'glow', label: 'Vivid' }
                  ].map(f => (
                    <button
                      key={f.id}
                      onClick={() => setSelectedFilter(f.id)}
                      className={`py-1.5 px-2 rounded-lg border text-center transition ${
                        selectedFilter === f.id
                          ? 'bg-[#b91c1c] text-white border-[#b91c1c] font-bold'
                          : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 4: Custom Inscription / Text */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="text-xs font-bold uppercase tracking-wider text-[#b91c1c]">
                4. Name / Inscribed Text
              </label>

              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="E.g. Rahul & Priya 2026 ❤️"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:outline-none focus:ring-2 focus:ring-[#b91c1c]"
              />

              <div className="flex items-center gap-2">
                <span className="text-[11px] text-slate-500 font-medium">Font Style:</span>
                {[
                  { id: 'font-serif', label: 'Serif' },
                  { id: 'font-sans', label: 'Sans' },
                  { id: 'font-mono', label: 'Mono' }
                ].map(font => (
                  <button
                    key={font.id}
                    onClick={() => setFontFamily(font.id)}
                    className={`px-2.5 py-1 rounded-lg border text-[11px] transition ${
                      fontFamily === font.id 
                        ? 'border-[#b91c1c] bg-red-50 text-[#b91c1c] font-bold' 
                        : 'border-slate-200'
                    }`}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions: Add Customized Gift to Cart */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-2.5">
              <button
                type="button"
                onClick={handleAddCustomizedToCart}
                className="w-full py-3.5 px-4 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-2xl font-bold text-sm shadow-xl flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Customized Gift to Cart (₹{selectedGift.price})</span>
              </button>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Quality Guarantee</span>
                </span>
                <span>•</span>
                <span>Secure Packaging Included</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
