import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Gift, Heart, Award, Phone, Mail, MapPin, 
  Send, ShieldCheck, CheckCircle2, ArrowRight
} from 'lucide-react';

export const AboutView = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider">
          About GraphicDen.in & Veltrix Stories
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Where Thoughtful Gifts Meet Master Craftsmanship
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          GraphicDen.in was founded to make emotional gifting seamless, authentic, and truly personal. Designed and architected in partnership with <strong>Veltrix Stories</strong>, our digital storefront connects customers across India to customized keepsakes.
        </p>
      </div>

      {/* 3 Story Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Customized With Soul</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every 3D acrylic illusion lamp, engraved beechwood plaque, and vibrant neon sign is tailor-made to order. No mass cookie-cutter production.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Precision Laser Engineering</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We use Japanese optical laser engravers and FDA-grade non-toxic polymers to ensure razor-sharp photo replication and enduring brilliance.
          </p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">Bank-Grade Store Security</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Engineered with modern cryptographic password hashing, Two-Factor Authentication (2FA), IP allowlisting, and automated brute-force rate-limiting.
          </p>
        </div>
      </div>

      {/* Proposal Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 to-rose-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl">
        <div className="max-w-2xl space-y-4">
          <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-rose-300">
            Project Genesis: Veltrix Stories Proposal
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Full-Spectrum E-Commerce Architecture
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Developed in accordance with the official 4-page development proposal for GraphicDen.in: delivering responsive UI/UX, product catalogue, shopping cart & checkout, payment gateway integration, order tracking, admin dashboard, and an enterprise security plan.
          </p>
          <div className="pt-2 flex gap-4">
            <button
              onClick={() => setCurrentView('store')}
              className="px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold border border-white/20 transition"
            >
              Inspect Admin Security
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export const ContactView = () => {
  const { addNotification } = useStore();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    addNotification('Inquiry Transmitted', `Thank you ${name}! Our gifting concierges will reach out on WhatsApp within 30 minutes.`, 'success', { whatsapp: true });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Contact details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Get in Touch</span>
            <h1 className="text-3xl font-black text-slate-900 mt-1">We’re Here to Help You Gift Better</h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Have a bulk corporate order, a custom design requirement, or a special anniversary request? Chat directly with our gifting artisans.
            </p>
          </div>

          <div className="space-y-4 text-xs text-slate-700">
            <a
              href="https://wa.me/919876543210?text=Hi%20GraphicDen!%20I%20have%20a%20question"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 hover:bg-emerald-100 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-emerald-950">Direct WhatsApp Concierge</p>
                <p className="text-emerald-700 font-mono">+91 98765 43210 (Mon-Sat, 9am - 9pm)</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Email Inquiries</p>
                <p className="text-slate-500 font-mono">support@graphicden.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Crafting Studio & Experience Center</p>
                <p className="text-slate-500">12B, Industrial Design Hub, Okhla Phase III, New Delhi - 110020</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          {submitted ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Message Received!</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Thank you, {name}. Our specialist will contact you on WhatsApp (+91 {phone}) with mockups and personalized quotes shortly.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-semibold hover:bg-slate-800 transition"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900">Send Us an Inquiry</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sen"
                    className="w-full px-3 py-2.5 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-medium mb-1">WhatsApp Mobile</label>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9811122334"
                    className="w-full px-3 py-2.5 border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-medium mb-1">Gift Inquiry / Custom Requirements</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking for (e.g. Custom Neon Sign for wedding stage, 50 employee hampers, customized photo lamps...)"
                  className="w-full px-3 py-2 text-xs border rounded-xl border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-md shadow-rose-500/20 transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry & Receive WhatsApp Mockup</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

