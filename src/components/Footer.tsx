import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { InstagramIcon } from './Icons';
import confetti from 'canvas-confetti';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.9 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch {
        // ignore
      }
    }
  };

  return (
    <footer className="bg-[#FFF8F0] border-t-2 border-amber-200/60 pt-16 pb-12 overflow-hidden relative">
      
      {/* Decorative Mascot Peeker Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gradient-to-r from-[#2756E8] via-[#3B82F6] to-[#2756E8] rounded-4xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between">
          
          {/* Subtle background circles */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute left-1/4 -top-10 w-48 h-48 bg-[#FF2E7E]/20 rounded-full blur-xl pointer-events-none" />

          {/* Left Text */}
          <div className="relative z-10 max-w-xl text-center lg:text-left mb-8 lg:mb-0">
            <span className="inline-flex items-center space-x-1.5 px-3.5 py-1 rounded-full bg-white/20 text-[#FFD12F] text-xs font-heading font-extrabold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join The Stack'd Club</span>
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl leading-tight">
              Get 15% OFF your first stack!
            </h2>
            <p className="mt-2 text-blue-100 text-sm sm:text-base">
              Be the first to hear about secret chase blind box drops, limited plushies, and exclusive mascot stickers.
            </p>

            {/* Newsletter form */}
            <div className="mt-6">
              {subscribed ? (
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/30 text-white font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-[#06D6A0] flex-shrink-0" />
                  <span>Welcome to the crew! Use coupon code <strong className="text-[#FFD12F]">KEEPITSTACKED</strong> at checkout for 15% off.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-4 py-3 rounded-2xl bg-white text-slate-800 placeholder-slate-400 text-sm focus:outline-none focus:ring-3 focus:ring-[#FFD12F]"
                  />
                  <button
                    type="submit"
                    className="btn-3d btn-3d-yellow px-6 py-3 rounded-2xl font-heading font-bold text-sm flex items-center justify-center space-x-2"
                  >
                    <span>Join Club</span>
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Mascot Visual Group */}
          <div className="relative z-10 flex-shrink-0 flex items-center justify-center">
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-amber-50">
              <img
                src="/mascots/mascots-group.jpg"
                alt="Stack'd Mascots Tower"
                className="w-full h-full object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-amber-200/60">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden shadow-md ring-2 ring-[#2756E8]/30">
                <img
                  src="/stackd-logo.jpg"
                  alt="Stack'd Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-2xl tracking-tight text-[#2756E8]">
                  STACK'D
                </span>
                <span className="text-xs font-bold text-slate-500 font-heading">
                  A stack of things you'll want. :-)
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-600 max-w-sm">
              We design playful collectibles, mystery blind boxes, modular desk gear, and tactile accessories made to bring pure joy to your everyday life.
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <a
                href="https://www.instagram.com/keepitstackd/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-amber-200 text-slate-700 hover:text-[#FF2E7E] hover:border-[#FF2E7E] transition-all shadow-xs text-xs font-bold font-heading group"
              >
                <InstagramIcon className="w-4 h-4 text-[#FF2E7E] group-hover:scale-110 transition-transform" />
                <span>@keepitstackd</span>
              </a>
            </div>
          </div>

          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 tracking-wider uppercase">
              Shop The Stacks
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/shop" className="hover:text-[#2756E8] transition-colors">All Products</Link>
              </li>
              <li>
                <Link to="/shop?category=blind-boxes" className="hover:text-[#2756E8] transition-colors">Mystery Blind Boxes</Link>
              </li>
              <li>
                <Link to="/shop?category=figures" className="hover:text-[#2756E8] transition-colors">Vinyl Figures</Link>
              </li>
              <li>
                <Link to="/shop?category=plushies" className="hover:text-[#2756E8] transition-colors">Stackable Plushies</Link>
              </li>
              <li>
                <Link to="/shop?category=drinkware" className="hover:text-[#2756E8] transition-colors">Insulated Tumblers</Link>
              </li>
              <li>
                <Link to="/stack-builder" className="hover:text-[#2756E8] font-bold text-[#2756E8] flex items-center space-x-1">
                  <span>Stack & Save (-20%)</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: About & Community */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 tracking-wider uppercase">
              About Stack'd
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/about" className="hover:text-[#2756E8] transition-colors">Our Story & Mission</Link>
              </li>
              <li>
                <Link to="/about#mascots" className="hover:text-[#2756E8] transition-colors">Meet Blobby, Pip, Sunny & Minty</Link>
              </li>
              <li>
                <a href="https://www.instagram.com/keepitstackd/" target="_blank" rel="noopener noreferrer" className="hover:text-[#2756E8] transition-colors">
                  Instagram Community
                </a>
              </li>
              <li>
                <Link to="/wishlist" className="hover:text-[#2756E8] transition-colors">My Wishlist</Link>
              </li>
              <li>
                <Link to="/track-order" className="hover:text-[#2756E8] transition-colors">Track Your Order</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Help & Support */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-sm text-slate-900 tracking-wider uppercase">
              Customer Joy
            </h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link to="/contact" className="hover:text-[#2756E8] transition-colors">Contact Our Team</Link>
              </li>
              <li>
                <Link to="/contact#faq" className="hover:text-[#2756E8] transition-colors">Shipping & FAQ</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2756E8] transition-colors">30-Day Smile Guarantee</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#2756E8] transition-colors">Wholesale & Collabs</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-1">
            <span>© 2026 Stack'd Inc. Keep it Stacked. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-[#FF2E7E] fill-current" />
              <span>for collectors worldwide</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
