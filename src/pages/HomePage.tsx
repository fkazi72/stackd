import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Truck, ShieldCheck, Heart, Layers, ArrowRight, Star, Gift, CheckCircle } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { PRODUCTS_DATA } from '../data/products';
import { MASCOTS_DATA } from '../data/mascots';
import { REVIEWS_DATA } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS_DATA.slice(0, 4);
  const bestsellers = PRODUCTS_DATA.filter(p => p.badge === 'Bestseller' || p.badge === 'Limited');

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 pb-12 sm:pb-20">
        
        {/* Soft background glow & shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100/60 rounded-full blur-3xl -z-10" />
          <div className="absolute top-20 right-10 w-80 h-80 bg-pink-100/60 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-10 left-1/3 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl -z-10" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              {/* Cute Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#2756E8] text-xs sm:text-sm font-heading font-extrabold tracking-wide shadow-xs">
                <Sparkles className="w-4 h-4 text-[#FFD12F]" />
                <span>Genesis Series 01 Collectibles Drop Is Live!</span>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-900 leading-[1.1]">
                  A stack of things{' '}
                  <span className="text-[#2756E8] underline decoration-[#FFD12F] decoration-wavy decoration-4">
                    you'll want.
                  </span>
                </h1>
                <p className="font-heading font-bold text-xl sm:text-2xl text-[#FF2E7E]">
                  Keep it Stacked! :-)
                </p>
              </div>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover super-tactile 3D vinyl art toys, surprise mystery blind boxes, modular desk gear, and cloud plushies designed to pile up happiness in your daily routine.
              </p>

              {/* CTA Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto btn-3d btn-3d-blue px-8 py-4 rounded-3xl font-heading font-extrabold text-base sm:text-lg flex items-center justify-center space-x-3 shadow-xl"
                >
                  <span>Explore The Stacks</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <Link
                  to="/stack-builder"
                  className="w-full sm:w-auto btn-3d btn-3d-yellow px-8 py-4 rounded-3xl font-heading font-extrabold text-base sm:text-lg flex items-center justify-center space-x-2 shadow-lg"
                >
                  <Layers className="w-5 h-5" />
                  <span>Build A Stack (-20%)</span>
                </Link>
              </div>

              {/* Social proof snippets */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-slate-500 font-semibold">
                <div className="flex items-center space-x-1.5">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-800 font-bold">4.9/5 Rating</span>
                  <span>(1,200+ Reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Truck className="w-4 h-4 text-[#06D6A0]" />
                  <span>Free Worldwide Shipping $50+</span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Showcase */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              
              {/* Outer decorative ring */}
              <div className="relative w-full max-w-md sm:max-w-lg aspect-square">
                
                {/* Floating Benefit Tag 1 */}
                <div className="absolute -top-4 -left-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-amber-200 flex items-center space-x-2 animate-float">
                  <div className="w-3 h-3 rounded-full bg-[#06D6A0] animate-ping" />
                  <span className="text-xs font-heading font-extrabold text-slate-800">
                    Interlocking Magnetic Base! 🧲
                  </span>
                </div>

                {/* Floating Benefit Tag 2 */}
                <div className="absolute -bottom-4 -right-4 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-xl border border-amber-200 flex items-center space-x-2 animate-bounce-slight">
                  <Sparkles className="w-4 h-4 text-[#FFD12F]" />
                  <span className="text-xs font-heading font-extrabold text-slate-800">
                    1/72 Secret Chase Odds! ✨
                  </span>
                </div>

                {/* Hero Mascot Stack Image */}
                <div className="w-full h-full rounded-4xl overflow-hidden border-4 border-white shadow-2xl bg-amber-50 group">
                  <img
                    src="/mascots/mascots-group.jpg"
                    alt="Stack'd 4 Mascots Tower"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Meet the mascots quick pill */}
                <Link
                  to="/about"
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-[#2756E8] text-white px-4 py-2 rounded-full font-heading font-bold text-xs shadow-lg hover:bg-blue-600 transition-colors flex items-center space-x-1.5"
                >
                  <span>Meet Blobby, Pip, Sunny & Minty</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS 4-CARD STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-6 rounded-3xl bg-blue-50/70 border border-blue-100/90 flex items-start space-x-4">
            <div className="p-3 bg-[#2756E8] text-white rounded-2xl shadow-xs flex-shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Free Worldwide Delivery</h3>
              <p className="text-xs text-slate-500 mt-1">Free tracked courier delivery on every order over $50.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-pink-50/70 border border-pink-100/90 flex items-start space-x-4">
            <div className="p-3 bg-[#FF2E7E] text-white rounded-2xl shadow-xs flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">100% Smile Guarantee</h3>
              <p className="text-xs text-slate-500 mt-1">30 days hassle-free returns & replacements if you don't love it.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-100/90 flex items-start space-x-4">
            <div className="p-3 bg-[#FFD12F] text-amber-950 rounded-2xl shadow-xs flex-shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Stack & Save Discounts</h3>
              <p className="text-xs text-slate-500 mt-1">Bundle 3 items for 10% off, or 5+ items for 20% off automatically.</p>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-100/90 flex items-start space-x-4">
            <div className="p-3 bg-[#06D6A0] text-emerald-950 rounded-2xl shadow-xs flex-shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-base text-slate-800">Ethical Collectible Vinyl</h3>
              <p className="text-xs text-slate-500 mt-1">100% BPA-free non-toxic materials with soy-ink recycled packaging.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MEET THE STACK'D CREW SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-4 py-1.5 rounded-full bg-pink-100 text-[#FF2E7E] text-xs font-heading font-extrabold uppercase tracking-wider">
            Official Mascots
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Meet The Stack'd Crew!
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Each character has their own personality, special talents, and favorite goodies they can't stop stacking.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MASCOTS_DATA.map((mascot) => (
            <div
              key={mascot.id}
              className="bg-white rounded-3xl border-2 border-amber-100 p-6 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Mascot Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-amber-50">
                <img
                  src={mascot.image}
                  alt={mascot.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span
                  className="absolute bottom-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-heading font-extrabold text-white shadow-xs"
                  style={{ backgroundColor: mascot.themeColor }}
                >
                  {mascot.colorName}
                </span>
              </div>

              {/* Info */}
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading font-extrabold text-xl text-slate-900">
                    {mascot.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400 font-heading">
                    {mascot.title}
                  </p>
                  <p className="text-xs text-slate-600 mt-2 line-clamp-3">
                    {mascot.personality}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 space-y-1">
                  <p className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">Catchphrase: </strong>
                    <span className="italic">{mascot.catchphrase}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/about"
            className="inline-flex items-center space-x-2 text-sm font-heading font-bold text-[#2756E8] hover:underline"
          >
            <span>Learn more about the Stack'd story & origins</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* FEATURED BESTSELLERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2756E8] text-xs font-heading font-extrabold uppercase tracking-wider">
              Fan Favorites
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-1">
              Top Rated Stacks
            </h2>
          </div>

          <Link
            to="/shop"
            className="btn-3d btn-3d-white px-5 py-2.5 rounded-2xl font-heading font-bold text-sm flex items-center space-x-2 border border-slate-200"
          >
            <span>View All ({PRODUCTS_DATA.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* LIFESTYLE ROOM BANNER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-4xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
          
          <img
            src="/mascots/hero-banner.jpg"
            alt="Stack'd Lifestyle Setup"
            className="w-full h-80 sm:h-96 lg:h-[420px] object-cover opacity-85 group-hover:scale-102 transition-transform duration-700"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex flex-col justify-end p-6 sm:p-12 text-white">
            <div className="max-w-xl space-y-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#FFD12F] text-xs font-heading font-extrabold uppercase tracking-wide">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Stack'd Aesthetic</span>
              </span>
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
                Turn your desk into your happy place.
              </h3>
              <p className="text-xs sm:text-sm text-slate-200">
                Mix and match modular drawers, cute vinyl companions, insulated tumblers, and desk pads for the ultimate cozy setup.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="btn-3d btn-3d-pink px-6 py-3 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2 shadow-lg"
                >
                  <span>Shop The Look</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STACK & SAVE BUNDLE CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FFD12F]/20 via-[#FFFDF9] to-[#06D6A0]/20 rounded-4xl p-8 sm:p-12 border-2 border-amber-200 shadow-md flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-xl space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-[#FFD12F] text-amber-950 text-xs font-heading font-extrabold">
              <Layers className="w-4 h-4" />
              <span>Custom Bundle Builder</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 leading-tight">
              Build your custom stack. Save up to 20%!
            </h2>
            <p className="text-sm text-slate-600">
              Pick 3 items to get 10% off instantly, or pick 5 items to get a massive 20% bundle discount plus free worldwide priority shipping!
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-bold text-slate-700 pt-2">
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-[#06D6A0]" />
                <span>Pick 3 = 10% OFF</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-[#06D6A0]" />
                <span>Pick 5 = 20% OFF</span>
              </span>
              <span className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-[#06D6A0]" />
                <span>Automatic at Checkout</span>
              </span>
            </div>
            <div className="pt-2">
              <Link
                to="/stack-builder"
                className="btn-3d btn-3d-blue px-7 py-3.5 rounded-2xl font-heading font-extrabold text-base inline-flex items-center space-x-2 shadow-lg"
              >
                <span>Launch Stack Builder</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-white flex-shrink-0">
            <img
              src="/products/mystery-box.jpg"
              alt="Custom stack mystery box"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* VERIFIED CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-heading font-extrabold uppercase tracking-wider">
            Real Reviews
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Loved by 15,000+ Stackers
          </h2>
          <p className="text-sm text-slate-600">
            Here is what our community is saying about their unboxings and daily stacks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS_DATA.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl border border-amber-100 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-lg transition-shadow"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{review.date}</span>
                </div>

                <h4 className="font-heading font-bold text-base text-slate-900">
                  "{review.title}"
                </h4>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-slate-800">{review.author}</p>
                  <p className="text-[11px] text-slate-400">{review.location}</p>
                </div>
                {review.verified && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                    Verified Buyer
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM COMMUNITY BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-4xl border-2 border-amber-100 p-8 sm:p-12 shadow-sm text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-pink-50 border border-pink-200 text-[#FF2E7E] text-xs font-heading font-extrabold">
            <InstagramIcon className="w-4 h-4" />
            <span>@keepitstackd on Instagram</span>
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
              Tag us in your stacks!
            </h2>
            <p className="text-sm text-slate-600">
              Share your unboxing reels, desk setup photos, and mascot stacks using <strong className="text-[#2756E8]">#KeepItStackd</strong> for a chance to win a free monthly mystery box!
            </p>
          </div>

          {/* Simulated Instagram Image Showcase */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto pt-2">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
              <img
                src="/mascots/mascot-pink.jpg"
                alt="Instagram post 1"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
              <img
                src="/products/tumbler.jpg"
                alt="Instagram post 2"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
              <img
                src="/products/vinyl-figures.jpg"
                alt="Instagram post 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xs border border-slate-100 group">
              <img
                src="/mascots/mascot-yellow.jpg"
                alt="Instagram post 4"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://www.instagram.com/keepitstackd/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d btn-3d-pink px-6 py-3 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2"
            >
              <InstagramIcon className="w-4 h-4" />
              <span>Follow @keepitstackd</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
