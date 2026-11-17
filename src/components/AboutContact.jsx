import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Heart, Award, ShieldCheck, Phone, Mail, MapPin, Send
} from 'lucide-react';

export const AboutView = () => {
  const { setCurrentView } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Hero section */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="px-3.5 py-1 rounded-full bg-rose-100 text-[#b91c1c] text-xs font-bold uppercase tracking-wider">
          Our Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Where Thoughtful Gifts Meet Honest Craftsmanship
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          GraphicDen.in was founded to make emotional gifting simple, authentic, and memorable. From custom photo mugs to handcrafted cushions and memory frames, we help you celebrate life's most precious milestones.
        </p>
      </div>

      {/* 3 Story Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#b91c1c] flex items-center justify-center font-bold">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Customized With Soul</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every photo mug, memory frame, and personalized keepsake is individually printed and inspected. We take pride in creating gifts that last for years.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">High-Definition Photo Printing</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We use premium high-gloss ceramic coatings and fade-resistant pigment inks to guarantee vivid color reproduction and sharp photo details.
          </p>
        </div>

        <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">Safe Delivery Guarantee</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-layer protective bubble packaging with 100% damage replacement guarantee. Priority express air courier to your doorstep across India.
          </p>
        </div>
      </div>

      {/* Call to action */}
      <div className="bg-[#b91c1c] rounded-3xl p-8 sm:p-10 text-white shadow-md text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Ready to create something special?
        </h2>
        <p className="text-xs sm:text-sm text-red-100 max-w-lg mx-auto leading-relaxed">
          Upload your photo, preview how it looks in 3D on your selected gift, and order in under 2 minutes.
        </p>
        <button
          onClick={() => setCurrentView('store')}
          className="px-6 py-3 bg-white text-[#b91c1c] hover:bg-red-50 rounded-xl font-bold text-xs sm:text-sm transition shadow-sm"
        >
          Explore Gift Collection →
        </button>
      </div>

    </div>
  );
};

export const ContactView = () => {
  const { addNotification } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      addNotification('Details Required', 'Please complete all fields.', 'warning');
      return;
    }
    setSubmitted(true);
    addNotification('Message Sent', 'Thank you! Our gifting concierge will get back to you within 2 hours.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="px-3.5 py-1 rounded-full bg-rose-100 text-[#b91c1c] text-xs font-bold uppercase tracking-wider">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          We’d Love to Hear From You
        </h1>
        <p className="text-xs sm:text-sm text-slate-600">
          Have a question about photo customization, bulk corporate gifting, or order delivery? We are here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        
        {/* Contact Info */}
        <div className="lg:col-span-5 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          <h3 className="text-base font-bold text-slate-900">Studio & Support</h3>
          
          <div className="space-y-4 text-xs">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#b91c1c] flex items-center justify-center shrink-0 font-bold">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">GraphicDen Studio</p>
                <p className="text-slate-600">12-4-56 Hanamkonda Main Road, Warangal, Telangana - 506001</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#b91c1c] flex items-center justify-center shrink-0 font-bold">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Phone & WhatsApp</p>
                <p className="text-slate-600">+91 98765 43210 (Mon - Sat, 9am - 8pm)</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-rose-50 text-[#b91c1c] flex items-center justify-center shrink-0 font-bold">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Email Inquiries</p>
                <p className="text-slate-600">care@graphicden.in</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <a
              href="https://wa.me/919876543210?text=Hello%20GraphicDen!%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center justify-center text-center shadow-xs"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-4">Send us a message</h3>
          
          {submitted ? (
            <div className="py-12 text-center space-y-2">
              <h4 className="text-base font-bold text-slate-900">Message Received</h4>
              <p className="text-xs text-slate-600">We'll get back to you shortly at {email}.</p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-900 font-bold mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-slate-900 font-bold mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Order inquiry, bulk gifting, custom request..."
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400"
                />
              </div>

              <div>
                <label className="block text-slate-900 font-bold mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-400 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#b91c1c] hover:bg-[#991b1b] text-white rounded-xl text-xs font-bold transition shadow-xs text-center"
              >
                Send Message
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};
