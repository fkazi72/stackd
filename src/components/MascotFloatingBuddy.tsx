import React, { useState } from 'react';
import { X, Sparkles, MessageCircle, Gift, ExternalLink } from 'lucide-react';
import { MASCOTS_DATA } from '../data/mascots';
import confetti from 'canvas-confetti';

export const MascotFloatingBuddy: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mascotIndex, setMascotIndex] = useState(0);

  const currentMascot = MASCOTS_DATA[mascotIndex];

  const handleNextMascot = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMascotIndex((prev) => (prev + 1) % MASCOTS_DATA.length);
  };

  const handleConfetti = () => {
    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { x: 0.9, y: 0.85 },
        colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
      });
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Speech Bubble Card when Open */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border-2 border-amber-200 p-5 animate-in slide-in-from-bottom-5 duration-200 relative">
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
            aria-label="Close mascot dialog"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Mascot Info Header */}
          <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#2756E8] shadow-xs flex-shrink-0">
              <img
                src={currentMascot.image}
                alt={currentMascot.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <h4 className="font-heading font-extrabold text-base text-slate-800">
                  {currentMascot.name}
                </h4>
                <span className="text-[10px] bg-blue-100 text-[#2756E8] font-bold px-1.5 py-0.5 rounded-full">
                  Crew
                </span>
              </div>
              <p className="text-xs text-slate-500">{currentMascot.title}</p>
            </div>
          </div>

          {/* Mascot Speech */}
          <div className="py-3 text-xs text-slate-700 space-y-2">
            <p className="font-medium italic bg-amber-50/80 p-3 rounded-2xl border border-amber-100/80">
              "{currentMascot.personality}"
            </p>
            
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Favorite: <strong>{currentMascot.favoriteItem.split('&')[0]}</strong></span>
            </div>
          </div>

          {/* Daily Treat Box */}
          <div className="bg-gradient-to-r from-blue-50 to-pink-50 p-3 rounded-2xl border border-blue-100/80 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-[#FF2E7E] flex-shrink-0" />
              <div className="text-[11px]">
                <span className="font-bold text-slate-800">Secret Code: </span>
                <code className="font-mono font-extrabold text-[#2756E8]">STACK10</code>
              </div>
            </div>
            <button
              onClick={handleConfetti}
              className="text-[10px] font-bold text-[#FF2E7E] bg-white px-2 py-1 rounded-lg border border-pink-200 shadow-xs hover:bg-pink-50"
            >
              Pop Confetti! 🎉
            </button>
          </div>

          {/* Footer actions */}
          <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={handleNextMascot}
              className="text-xs font-bold text-[#2756E8] hover:underline flex items-center space-x-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Talk to next buddy</span>
            </button>
            <a
              href="https://www.instagram.com/keepitstackd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-slate-600 hover:text-[#FF2E7E] flex items-center space-x-1"
            >
              <span>@keepitstackd</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center focus:outline-none"
        aria-label="Open mascot buddy"
      >
        <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#2756E8] to-[#FF2E7E] opacity-75 blur-xs group-hover:opacity-100 transition duration-300 animate-pulse-glow" />
        
        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-white shadow-xl bg-white hover:scale-105 transition-transform duration-200">
          <img
            src={currentMascot.image}
            alt="Mascot buddy"
            className="w-full h-full object-cover animate-bounce-slight"
          />
        </div>

        {/* Small Notification Dot */}
        {!isOpen && (
          <span className="absolute top-0 right-0 w-4 h-4 bg-[#06D6A0] rounded-full border-2 border-white shadow-xs flex items-center justify-center text-[9px] text-white font-bold">
            !
          </span>
        )}
      </button>
    </div>
  );
};
