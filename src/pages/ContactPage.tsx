import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Clock, ChevronDown, ChevronUp, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { FAQ_DATA } from '../data/faqs';
import { TactileButton } from '../components/TactileButton';
import { useScrollReveal } from '../utils/useScrollReveal';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  useScrollReveal();
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formOrderNum, setFormOrderNum] = useState('');
  const [formSubject, setFormSubject] = useState('order-inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // FAQ open item tracker
  const [openFaq, setOpenFaq] = useState<string | null>('faq-1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formName.trim() && formEmail.trim() && formMessage.trim()) {
      setFormSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  const toggleFaq = (id: string) => {
    setOpenFaq(prev => prev === id ? null : id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#2756E8] text-xs font-heading font-extrabold uppercase tracking-wider">
          Mascot Support
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900">
          How Can We Help You?
        </h1>
        <p className="text-sm text-slate-600">
          Got a question about your order, tracking, or a specific blind box? Our customer joy crew is here for you!
        </p>
      </div>

      {/* Main Grid: Form & Contact Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-4xl border border-amber-200 shadow-sm space-y-6">
          <div className="space-y-1 border-b border-slate-100 pb-4">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
              Send us a message
            </h2>
            <p className="text-xs text-slate-500">
              Fill out the form below and we'll reply to your inbox within 24 hours.
            </p>
          </div>

          {formSubmitted ? (
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-200 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-emerald-950">
                Message Received!
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 max-w-sm mx-auto">
                Blobby Blue and the support crew are on it! We've sent a confirmation to <strong className="font-bold">{formEmail}</strong>.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="btn-3d btn-3d-blue px-6 py-2.5 rounded-2xl font-heading font-bold text-xs"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="Jessica Miller"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="jessica@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Order # (If applicable)</label>
                  <input
                    type="text"
                    value={formOrderNum}
                    onChange={(e) => setFormOrderNum(e.target.value)}
                    placeholder="e.g. STK-849201"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Topic *</label>
                  <select
                    value={formSubject}
                    onChange={(e) => setFormSubject(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  >
                    <option value="order-inquiry">Order Status / Tracking</option>
                    <option value="blind-box">Blind Box / Product Question</option>
                    <option value="returns">Returns / 30-Day Smile Guarantee</option>
                    <option value="collab">Creator Collab / Wholesale</option>
                    <option value="other">General Love Note / Feedback</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={5}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Tell us what's on your mind..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                />
              </div>

              <button
                type="submit"
                className="btn-3d btn-3d-blue py-3.5 px-8 rounded-2xl font-heading font-extrabold text-sm flex items-center space-x-2 shadow-md"
              >
                <span>Send Note to Support</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Right: Info Cards & Mascots */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Mascot Helper Badge */}
          <div className="p-6 bg-gradient-to-br from-blue-50 to-pink-50 rounded-4xl border border-amber-200/80 flex items-center space-x-4 shadow-xs">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#2756E8] flex-shrink-0 bg-white">
              <img
                src="/mascots/mascot-blue.jpg"
                alt="Blobby Blue Support"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Blobby Blue Support
              </h3>
              <p className="text-xs text-slate-600">
                "We pack with care and answer every email personally. No robotic runarounds!"
              </p>
              <div className="flex items-center space-x-1.5 text-[11px] text-emerald-600 font-bold pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>Typical response time: Under 2 hours</span>
              </div>
            </div>
          </div>

          {/* Quick Contact Links */}
          <div className="bg-white p-6 rounded-4xl border border-amber-100 shadow-xs space-y-4">
            
            <div className="flex items-center space-x-3 text-xs">
              <div className="p-3 bg-blue-50 text-[#2756E8] rounded-2xl">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-slate-800">Email Customer Care</p>
                <a href="mailto:hello@keepitstackd.com" className="text-slate-500 hover:text-[#2756E8]">
                  hello@keepitstackd.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="p-3 bg-pink-50 text-[#FF2E7E] rounded-2xl">
                <InstagramIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-slate-800">Instagram DM</p>
                <a
                  href="https://www.instagram.com/keepitstackd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-[#FF2E7E]"
                >
                  @keepitstackd (Official)
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="p-3 bg-amber-50 text-amber-800 rounded-2xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-slate-800">Hours of Dispatch</p>
                <p className="text-slate-500">Mon–Fri: 9:00 AM – 5:00 PM PST</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="font-heading font-bold text-slate-800">Fulfillment Hub</p>
                <p className="text-slate-500">Los Angeles, CA, USA</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <div id="faq" className="space-y-6 pt-8 border-t border-amber-200/60 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <span className="text-xs font-heading font-extrabold text-[#2756E8] uppercase tracking-wider">
            Quick Answers
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openFaq === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-white rounded-3xl border border-amber-100 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between font-heading font-bold text-sm sm:text-base text-slate-800 hover:text-[#2756E8]"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#2756E8] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
