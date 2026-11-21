import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, ShieldCheck, ArrowRight, Layers, Smile, Package } from 'lucide-react';
import { InstagramIcon } from '../components/Icons';
import { MASCOTS_DATA } from '../data/mascots';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-blue-50/80 via-pink-50/50 to-transparent pt-12 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white text-[#2756E8] text-xs font-heading font-extrabold shadow-xs border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD12F]" />
            <span>The Story of Stack'd</span>
          </div>

          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl text-slate-900 leading-tight">
            Why keep things simple when you can{' '}
            <span className="text-[#2756E8] underline decoration-[#FF2E7E] decoration-wavy decoration-4">
              Keep it Stacked?
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stack'd was born from a simple belief: your desk, room, and daily rituals should be filled with tactile wonder, lovable characters, and things that make you smile every time you look at them.
          </p>

          <div className="pt-4 flex justify-center">
            <div className="w-56 h-56 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-amber-50">
              <img
                src="/mascots/mascots-group.jpg"
                alt="Stack'd Mascot Tower"
                className="w-full h-full object-cover animate-float"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Brand Philosophy: 3 Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-heading font-extrabold text-[#FF2E7E] uppercase tracking-wider">
            Our DNA
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            The Stacking Philosophy
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white p-8 rounded-4xl border border-amber-200/80 shadow-xs space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#2756E8] flex items-center justify-center mx-auto shadow-xs">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              1. Modular & Stackable
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Every figurine, desk caddy, and plushie is engineered with magnetic touchpoints and interlocking grooves so you can build your own vertical world.
            </p>
          </div>

          <div className="bg-white p-8 rounded-4xl border border-amber-200/80 shadow-xs space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-pink-100 text-[#FF2E7E] flex items-center justify-center mx-auto shadow-xs">
              <Smile className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              2. Tactile Claymation Soul
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We design in 3D clay style: soft curves, velvety finishes, friendly facial expressions, and vibrant saturated pastels that melt away workday stress.
            </p>
          </div>

          <div className="bg-white p-8 rounded-4xl border border-amber-200/80 shadow-xs space-y-4 text-center">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-[#06D6A0] flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              3. Ethical & Premium
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              No cheap, flimsy plastic here. We craft in high-grade non-toxic vinyl, 18/8 food safe steel, and recycled packaging printed with clean soy-based inks.
            </p>
          </div>
        </div>
      </section>

      {/* MEET EACH MASCOT IN DEPTH */}
      <section id="mascots" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#2756E8] text-xs font-heading font-extrabold uppercase tracking-wider">
            Character Bios
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Meet The 4 Foundational Mascots
          </h2>
          <p className="text-sm text-slate-600">
            Each mascot brings something unique to the team. Who is your spirit buddy?
          </p>
        </div>

        <div className="space-y-8">
          {MASCOTS_DATA.map((mascot, index) => (
            <div
              key={mascot.id}
              className={`bg-white rounded-4xl border-2 border-amber-100 p-6 sm:p-10 shadow-xs flex flex-col lg:flex-row items-center gap-8 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Mascot Photo */}
              <div className="w-60 h-60 sm:w-72 sm:h-72 rounded-3xl overflow-hidden border-4 border-white shadow-xl bg-amber-50 flex-shrink-0">
                <img
                  src={mascot.image}
                  alt={mascot.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Bio Details */}
              <div className="space-y-4 flex-1">
                <div>
                  <div className="flex items-center space-x-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-heading font-extrabold text-white"
                      style={{ backgroundColor: mascot.themeColor }}
                    >
                      {mascot.colorName}
                    </span>
                    <span className="text-xs text-slate-400 font-bold font-heading">{mascot.title}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
                    {mascot.name}
                  </h3>
                  <p className="font-heading font-bold text-base text-[#2756E8] mt-1">
                    "{mascot.tagline}"
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {mascot.personality}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3.5 bg-slate-50 rounded-2xl">
                    <span className="font-heading font-bold text-slate-800 block">Favorite Goodie:</span>
                    <span className="text-slate-600">{mascot.favoriteItem}</span>
                  </div>
                  <div className="p-3.5 bg-slate-50 rounded-2xl">
                    <span className="font-heading font-bold text-slate-800 block">Fun Fact:</span>
                    <span className="text-slate-600">{mascot.funFact}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="inline-block px-4 py-2 bg-amber-50 rounded-2xl text-xs font-heading font-bold text-slate-800 border border-amber-200">
                    Catchphrase: <strong className="text-[#FF2E7E]">{mascot.catchphrase}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INSTAGRAM BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-pink-50 via-amber-50 to-blue-50 rounded-4xl p-8 sm:p-12 border border-amber-200 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white text-[#FF2E7E] text-xs font-heading font-extrabold shadow-xs">
            <InstagramIcon className="w-4 h-4" />
            <span>@keepitstackd</span>
          </div>

          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Join the Keep it Stacked Community
          </h2>

          <p className="text-sm text-slate-600 max-w-lg mx-auto">
            Over 15,000 friends share unboxings, custom tower stacks, and daily desk setups on our Instagram. Follow along for secret discount drops!
          </p>

          <div>
            <a
              href="https://www.instagram.com/keepitstackd/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d btn-3d-pink px-8 py-3.5 rounded-2xl font-heading font-extrabold text-sm inline-flex items-center space-x-2 shadow-md"
            >
              <span>Follow @keepitstackd</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
