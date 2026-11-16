import React from 'react';

export const ProductIllustration = ({ name, glowColor = '#f59e0b', isGlowActive = true, customText = '', userPhoto = null, className = "w-full h-44" }) => {
  const normalized = (name || '').toLowerCase();

  // 1. Photo mug
  if (normalized.includes('photo mug') && !normalized.includes('couple')) {
    return (
      <div className={`${className} bg-gradient-to-b from-rose-100/70 via-pink-50 to-pink-100/50 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-300`}>
        <div className="relative flex items-center justify-center">
          {/* Mug handle */}
          <div className="absolute -right-4 w-12 h-16 rounded-full border-4 border-slate-300/80 bg-transparent"></div>
          {/* Mug body */}
          <div className="relative z-10 w-24 h-28 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-b-2xl rounded-t-sm shadow-md flex flex-col items-center justify-center border border-slate-200">
            {/* Printed photo frame on mug */}
            <div className="w-16 h-16 bg-sky-200 rounded-sm overflow-hidden flex flex-col justify-between p-1 border border-sky-300 relative shadow-inner">
              {userPhoto ? (
                <img src={userPhoto} alt="Personalized Mug" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-300 self-end"></div>
                  <div className="w-full flex items-end justify-center">
                    <div className="w-0 h-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[20px] border-b-emerald-600"></div>
                    <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-emerald-500 -ml-2"></div>
                  </div>
                </>
              )}
            </div>
            {customText && (
              <span className="text-[9px] font-bold text-slate-700 mt-1 truncate max-w-[80px]">
                {customText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 2. Acrylic Illusion Lamp & Neon Sign (Supports Live Dynamic Glow & Custom Text!)
  if (normalized.includes('lamp') || normalized.includes('neon') || normalized.includes('light')) {
    const activeGlow = isGlowActive ? glowColor : '#94a3b8';
    const shadowStyle = isGlowActive ? { filter: `drop-shadow(0 0 16px ${glowColor}) drop-shadow(0 0 35px ${glowColor}66)` } : {};

    return (
      <div className={`${className} bg-slate-950 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500`}>
        {/* Glow Aura */}
        {isGlowActive && (
          <div
            className="absolute inset-0 opacity-30 blur-2xl rounded-full"
            style={{ backgroundColor: glowColor }}
          />
        )}

        <div className="relative z-10 flex flex-col items-center">
          {/* Acrylic Plaque Outline */}
          <div 
            className="w-24 h-24 rounded-2xl border-2 flex flex-col items-center justify-center p-2 transition-all duration-300 backdrop-blur-xs"
            style={{ 
              borderColor: activeGlow, 
              ...shadowStyle,
              backgroundColor: isGlowActive ? `${glowColor}15` : 'transparent'
            }}
          >
            {/* Holographic couple / icon */}
            <svg className="w-10 h-10 transition-colors duration-300" style={{ fill: activeGlow }} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <span 
              className="text-[9px] font-bold tracking-widest uppercase mt-1 truncate max-w-[85px] text-center font-mono"
              style={{ color: activeGlow }}
            >
              {customText || 'LOVE 2026'}
            </span>
          </div>

          {/* Wooden / Acrylic Base */}
          <div className="w-28 h-5 bg-[#784e27] rounded-md shadow-lg border-t-2 border-[#a3713f] flex items-center justify-center -mt-1 z-20">
            <div className="w-12 h-1 bg-black/40 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Name keychain
  if (normalized.includes('keychain')) {
    return (
      <div className={`${className} bg-gradient-to-b from-amber-50 to-orange-100/60 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="flex flex-col items-center">
          {/* Metal Ring */}
          <div className="w-12 h-12 rounded-full border-4 border-slate-300 shadow-sm"></div>
          <div className="w-1.5 h-3 bg-slate-400 -mt-0.5"></div>
          {/* Wooden tag */}
          <div className="w-24 h-16 bg-[#b58348] rounded-md shadow-md border border-[#966b36] flex flex-col items-center justify-center p-1.5">
            <div className="w-2 h-2 rounded-full bg-[#825622] mb-1"></div>
            <span className="text-[11px] font-bold text-[#54330f] tracking-widest uppercase font-mono truncate max-w-[80px]">
              {customText || 'ARJUN'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  // 4. Custom cushion
  if (normalized.includes('cushion')) {
    return (
      <div className={`${className} bg-gradient-to-b from-pink-100/80 via-rose-50 to-rose-100 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="w-28 h-24 bg-[#e13b5a] rounded-2xl shadow-lg border-2 border-dashed border-pink-200 flex flex-col items-center justify-center relative transform -rotate-2 p-1.5 overflow-hidden">
          {userPhoto ? (
            <div className="w-16 h-14 rounded-lg overflow-hidden border border-white/40 shadow-inner">
              <img src={userPhoto} alt="Cushion Photo" className="w-full h-full object-cover" />
            </div>
          ) : (
            <svg className="w-10 h-10 text-white fill-white drop-shadow-sm" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          )}
          {customText && (
            <span className="text-[9px] font-bold text-white tracking-wider mt-0.5 max-w-[80px] truncate">
              {customText}
            </span>
          )}
        </div>
      </div>
    );
  }

  // 5. Memory frame
  if (normalized.includes('memory frame') || (normalized.includes('frame') && !normalized.includes('photo book'))) {
    return (
      <div className={`${className} bg-gradient-to-b from-slate-100 via-sky-50 to-sky-100/70 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="w-28 h-28 bg-[#a06834] rounded-sm p-2 shadow-lg border border-[#835324]">
          <div className="w-full h-full bg-white p-1.5 flex flex-col items-center justify-center">
            <div className="w-full h-full bg-sky-300 relative overflow-hidden flex flex-col justify-between p-1">
              {userPhoto ? (
                <img src={userPhoto} alt="Memory Frame Photo" className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-300 self-end"></div>
                  <div className="w-full flex items-end justify-center">
                    <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[24px] border-b-emerald-600"></div>
                    <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[18px] border-b-emerald-500 -ml-2.5"></div>
                  </div>
                </>
              )}
            </div>
            {customText && (
              <span className="text-[7px] font-bold text-slate-700 mt-0.5 truncate max-w-[70px]">
                {customText}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // 6. Gift hamper
  if (normalized.includes('hamper')) {
    return (
      <div className={`${className} bg-gradient-to-b from-amber-50/80 via-orange-50/50 to-amber-100/70 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="flex flex-col items-center">
          <div className="flex items-end gap-1.5 -mb-2 z-10">
            <div className="w-6 h-12 bg-amber-400 rounded-t-md shadow-xs"></div>
            <div className="w-5 h-16 bg-emerald-600 rounded-t-full shadow-xs"></div>
            <div className="w-7 h-10 bg-[#b91c1c] rounded-t-md shadow-xs"></div>
          </div>
          <div className="w-28 h-16 bg-[#c49258] border-t-4 border-[#8e6332] rounded-b-lg shadow-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 flex flex-col justify-around py-1 opacity-25">
              <div className="w-full h-0.5 bg-black"></div>
              <div className="w-full h-0.5 bg-black"></div>
              <div className="w-full h-0.5 bg-black"></div>
            </div>
            <div className="w-3.5 h-full bg-[#b91c1c] z-10"></div>
            <div className="absolute -top-1 w-6 h-3 bg-[#b91c1c] rounded-full z-20 shadow-xs"></div>
          </div>
        </div>
      </div>
    );
  }

  // 7. Scented candle
  if (normalized.includes('candle')) {
    return (
      <div className={`${className} bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="flex flex-col items-center">
          <div className="w-3.5 h-6 bg-amber-400 rounded-full shadow-[0_0_20px_#f59e0b] animate-pulse"></div>
          <div className="w-0.5 h-1.5 bg-slate-700"></div>
          <div className="w-16 h-16 bg-gradient-to-b from-amber-100 to-amber-200/90 rounded-md shadow-lg border border-amber-300 flex items-center justify-center">
            <div className="w-10 h-7 bg-amber-50/70 border border-amber-200 rounded-xs flex items-center justify-center">
              <span className="text-[8px] font-serif text-amber-900">Vanilla</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 8. Printed T-shirt
  if (normalized.includes('t-shirt') || normalized.includes('shirt')) {
    return (
      <div className={`${className} bg-gradient-to-b from-slate-100 to-sky-100/60 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="relative flex flex-col items-center">
          <div className="relative w-28 h-28 bg-white border border-slate-300 rounded-b-xl shadow-md flex flex-col items-center pt-2">
            <div className="w-8 h-3.5 bg-sky-100/60 rounded-b-full border-b border-slate-300 -mt-2"></div>
            <div className="mt-4 w-9 h-9 rounded-full bg-[#b91c1c] flex items-center justify-center shadow-xs">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. Love photo book
  if (normalized.includes('book')) {
    return (
      <div className={`${className} bg-gradient-to-b from-amber-50 to-orange-100/50 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="w-24 h-28 bg-[#7a1c2d] rounded-r-md shadow-xl border-l-4 border-[#52111d] p-2 flex flex-col justify-between">
          <div className="w-full h-14 bg-sky-200 rounded-xs overflow-hidden flex flex-col justify-between p-1">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-300 self-end"></div>
            <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[14px] border-b-emerald-600 mx-auto"></div>
          </div>
          <span className="text-[9px] italic text-rose-200 text-center font-serif">
            {customText || 'Our Story'}
          </span>
        </div>
      </div>
    );
  }

  // 10. Couple mug set
  if (normalized.includes('couple mug')) {
    return (
      <div className={`${className} bg-gradient-to-b from-rose-100/70 to-pink-100/60 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
        <div className="flex items-center gap-2">
          <div className="relative w-14 h-18 bg-white border border-slate-200 rounded-b-xl shadow-md flex flex-col items-center justify-center">
            <svg className="w-6 h-6 text-[#b91c1c] fill-[#b91c1c]" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <div className="relative w-14 h-18 bg-[#8e1b29] border border-[#6b141f] rounded-b-xl shadow-md flex flex-col items-center justify-center">
            <div className="absolute -right-3 top-2 w-4 h-8 rounded-r-full border-2 border-[#8e1b29]"></div>
            <svg className="w-6 h-6 text-white fill-white" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  // 11. Desk calendar (Default)
  return (
    <div className={`${className} bg-gradient-to-b from-emerald-50 to-teal-100/60 rounded-2xl flex items-center justify-center relative overflow-hidden`}>
      <div className="flex flex-col items-center">
        <div className="w-24 h-4 bg-[#b91c1c] rounded-t-md border-b border-red-800"></div>
        <div className="w-24 h-20 bg-white shadow-md border border-slate-200 p-1 flex flex-col justify-around">
          <div className="grid grid-cols-7 gap-0.5 text-[6px] text-slate-400 text-center font-mono">
            <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-[6px] text-slate-700 text-center font-mono">
            <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span>
            <span>8</span><span>9</span><span>10</span><span>11</span><span>12</span><span>13</span><span>14</span>
            <span>15</span><span>16</span><span>17</span><span>18</span><span>19</span><span>20</span><span>21</span>
            <span>22</span><span>23</span><span>24</span><span>25</span><span>26</span><span>27</span><span>28</span>
          </div>
        </div>
      </div>
    </div>
  );
};
