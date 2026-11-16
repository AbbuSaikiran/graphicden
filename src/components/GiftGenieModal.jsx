import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles, X, Heart, ArrowRight, CheckCircle2, Gift } from 'lucide-react';
import { ProductIllustration } from './ProductIllustrations';

export const GiftGenieModal = ({ isOpen, onClose, onSelectProduct }) => {
  const { products, addToCart, addNotification } = useStore();

  const [step, setStep] = useState(1);
  const [recipient, setRecipient] = useState('');
  const [occasion, setOccasion] = useState('');
  const [budget, setBudget] = useState('all');

  if (!isOpen) return null;

  const recipients = [
    { id: 'partner', label: 'Boyfriend / Girlfriend / Spouse', icon: '❤️' },
    { id: 'friend', label: 'Best Friend', icon: '✨' },
    { id: 'parents', label: 'Mom / Dad / Family', icon: '🏡' },
    { id: 'work', label: 'Colleague / Corporate', icon: '💼' }
  ];

  const occasions = [
    { id: 'anniversary', label: 'Anniversary & Romantic', icon: '💍' },
    { id: 'birthday', label: 'Birthday Celebration', icon: '🎂' },
    { id: 'housewarming', label: 'Home Decor & Keepsake', icon: '🛋️' },
    { id: 'special', label: 'Festive / Just to Say Thanks', icon: '🎁' }
  ];

  // Determine top matching recommendations
  const getRecommendations = () => {
    let matches = [...products];

    if (recipient === 'partner') {
      matches = matches.filter(p => p.name.includes('mug') || p.name.includes('hamper') || p.name.includes('book') || p.name.includes('cushion'));
    } else if (recipient === 'friend') {
      matches = matches.filter(p => p.name.includes('keychain') || p.name.includes('T-shirt') || p.name.includes('mug'));
    } else if (recipient === 'parents') {
      matches = matches.filter(p => p.name.includes('frame') || p.name.includes('calendar') || p.name.includes('candle'));
    }

    if (budget === 'low') {
      matches = matches.filter(p => p.price <= 350);
    } else if (budget === 'mid') {
      matches = matches.filter(p => p.price > 350 && p.price <= 800);
    } else if (budget === 'high') {
      matches = matches.filter(p => p.price > 800);
    }

    return matches.slice(0, 3);
  };

  const recommendations = getRecommendations();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 text-slate-800">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-rose-600 via-pink-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base font-bold">GraphicDen Smart Gift Concierge</h2>
              <p className="text-xs text-rose-100">Find the perfect personalized gift in 3 quick questions</p>
            </div>
          </div>

          <button onClick={onClose} className="text-white/80 hover:text-white p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Who is it for? */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Step 1 of 3</span>
              <h3 className="text-xl font-bold text-slate-900">Who are you surprising today?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {recipients.map(r => (
                  <button
                    key={r.id}
                    onClick={() => { setRecipient(r.id); setStep(2); }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 flex items-center gap-3 text-left transition transform hover:-translate-y-0.5"
                  >
                    <span className="text-2xl">{r.icon}</span>
                    <span className="text-xs font-bold text-slate-800">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Occasion */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Step 2 of 3</span>
              <h3 className="text-xl font-bold text-slate-900">What's the special occasion?</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {occasions.map(o => (
                  <button
                    key={o.id}
                    onClick={() => { setOccasion(o.id); setStep(3); }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 flex items-center gap-3 text-left transition transform hover:-translate-y-0.5"
                  >
                    <span className="text-2xl">{o.icon}</span>
                    <span className="text-xs font-bold text-slate-800">{o.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Budget */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider">Step 3 of 3</span>
              <h3 className="text-xl font-bold text-slate-900">What is your ideal budget?</h3>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                {[
                  { id: 'low', label: 'Under ₹500', desc: 'Thoughtful Tokens' },
                  { id: 'mid', label: '₹500 - ₹1,000', desc: 'Popular Hampers' },
                  { id: 'high', label: '₹1,000+', desc: 'Luxury Statements' }
                ].map(b => (
                  <button
                    key={b.id}
                    onClick={() => { setBudget(b.id); setStep(4); }}
                    className="p-4 rounded-2xl border border-slate-200 hover:border-rose-500 hover:bg-rose-50/50 text-center transition"
                  >
                    <p className="text-xs font-bold text-slate-900">{b.label}</p>
                    <p className="text-[10px] text-slate-400 mt-1">{b.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Matched Recommendations */}
          {step === 4 && (
            <div className="space-y-4 animate-in zoom-in-95">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Curated Matches for Your Occasion
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Handpicked for highest sentimental reaction value</p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-rose-600 font-semibold hover:underline"
                >
                  Start Over
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                {recommendations.map(p => (
                  <div key={p.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between">
                    <div className="w-full h-28 rounded-xl overflow-hidden mb-2">
                      <ProductIllustration name={p.name} className="w-full h-full" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 line-clamp-1">{p.name}</h4>
                      <p className="text-sm font-black text-rose-600 mt-1">₹{p.price}</p>
                    </div>
                    <div className="mt-3 flex gap-1.5">
                      <button
                        onClick={() => {
                          addToCart(p, 'Gift Genie Selection', null, false, '', 1);
                          addNotification('Added to Bag', `${p.name} added to cart`, 'success');
                          onClose();
                        }}
                        className="flex-1 py-1.5 bg-[#b91c1c] text-white rounded-lg text-[11px] font-bold hover:bg-[#991b1b] transition"
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
