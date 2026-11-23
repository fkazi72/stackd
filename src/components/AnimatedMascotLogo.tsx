import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface AnimatedMascotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

type MascotStage = 
  | 'idle'
  | 'mascot1-in'    // Blobby Blue enters & waves
  | 'mascot1-out'   // Blobby Blue exits
  | 'mascot2-in'    // Minty Pop enters & jumps/shines
  | 'mascot2-out'   // Minty Pop exits
  | 'mascot3-in'    // Pip Pink enters & winks
  | 'mascot3-out'   // Pip Pink exits
  | 'mascot4-in'    // Sunny Cloud floats in & spins
  | 'mascot4-out'   // Sunny Cloud floats out
  | 'stacking'      // All 4 rush in and stack vertically
  | 'tower-jump'    // Synchronized celebration jump
  | 'final-logo';   // Complete 3D logo state

export const AnimatedMascotLogo: React.FC<AnimatedMascotLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [stage, setStage] = useState<MascotStage>('final-logo');
  const [isPlaying, setIsPlaying] = useState(false);

  const startChoreography = () => {
    if (isPlaying) return;
    setIsPlaying(true);

    // Timeline:
    // 0ms: Blobby Blue slides in & waves
    setStage('mascot1-in');

    // 1200ms: Blobby Blue slides out
    setTimeout(() => setStage('mascot1-out'), 1200);

    // 1500ms: Minty Pop bounces in & does shine jump
    setTimeout(() => setStage('mascot2-in'), 1500);

    // 2700ms: Minty Pop slides out
    setTimeout(() => setStage('mascot2-out'), 2700);

    // 3000ms: Pip Pink leaps in & winks
    setTimeout(() => setStage('mascot3-in'), 3000);

    // 4200ms: Pip Pink somersaults out
    setTimeout(() => setStage('mascot3-out'), 4200);

    // 4500ms: Sunny Cloud floats in & radiant spin
    setTimeout(() => setStage('mascot4-in'), 4500);

    // 5700ms: Sunny Cloud floats away
    setTimeout(() => setStage('mascot4-out'), 5700);

    // 6000ms: All 4 mascots enter together and stack into vertical tower
    setTimeout(() => setStage('stacking'), 6000);

    // 7200ms: Synchronized celebratory jump + confetti!
    setTimeout(() => {
      setStage('tower-jump');
      try {
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.15, x: 0.5 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch {}
    }, 7200);

    // 8200ms: Final glossy 3D STACK'D logo locks in
    setTimeout(() => {
      setStage('final-logo');
      setIsPlaying(false);
    }, 8200);
  };

  useEffect(() => {
    // Play on initial page load
    const timer = setTimeout(() => {
      startChoreography();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/"
      onClick={(e) => {
        if (!isPlaying) {
          e.preventDefault();
          startChoreography();
        }
      }}
      onMouseEnter={() => {
        if (!isPlaying) startChoreography();
      }}
      className={`group flex items-center space-x-3 select-none transition-transform hover:scale-102 ${className}`}
      title="Stack'd - Keep it Stacked! (Click to replay mascot sequence)"
    >
      {/* 
        Mascot Stage Arena:
        100% Transparent Background - No borders, no container fill
      */}
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center flex-shrink-0 overflow-visible">
        
        {/* MASCOT 1: Blobby Blue (Wave / Hi!) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ease-out pointer-events-none ${
            stage === 'mascot1-in'
              ? 'opacity-100 translate-x-0 scale-100'
              : stage === 'mascot1-out'
              ? 'opacity-0 translate-x-12 scale-90'
              : 'opacity-0 -translate-x-12 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-blue-transparent.png"
            alt="Blobby Blue"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-md animate-wiggle"
          />
          {stage === 'mascot1-in' && (
            <span className="absolute -top-3 bg-white/90 backdrop-blur-xs text-[#2756E8] text-[10px] font-heading font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-blue-200 animate-bounce">
              Hi! 👋
            </span>
          )}
        </div>

        {/* MASCOT 2: Minty Pop (Celebration Jump / Shine) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ease-out pointer-events-none ${
            stage === 'mascot2-in'
              ? 'opacity-100 translate-x-0 scale-100'
              : stage === 'mascot2-out'
              ? 'opacity-0 translate-x-12 scale-90'
              : 'opacity-0 -translate-x-12 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-mint-transparent.png"
            alt="Minty Pop"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-md animate-bounce-slight"
          />
          {stage === 'mascot2-in' && (
            <span className="absolute -top-3 bg-white/90 backdrop-blur-xs text-[#06D6A0] text-[10px] font-heading font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-emerald-200 animate-pulse">
              Shine! ✨
            </span>
          )}
        </div>

        {/* MASCOT 3: Pip Pink (Wink / Heart Pop) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ease-out pointer-events-none ${
            stage === 'mascot3-in'
              ? 'opacity-100 translate-x-0 scale-100'
              : stage === 'mascot3-out'
              ? 'opacity-0 translate-x-12 scale-90'
              : 'opacity-0 -translate-x-12 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-pink-transparent.png"
            alt="Pip Pink"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-md animate-wiggle"
          />
          {stage === 'mascot3-in' && (
            <span className="absolute -top-3 bg-white/90 backdrop-blur-xs text-[#FF2E7E] text-[10px] font-heading font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-pink-200 animate-bounce">
              Love! 💖
            </span>
          )}
        </div>

        {/* MASCOT 4: Sunny Cloud (Radiant Spin) */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-400 ease-out pointer-events-none ${
            stage === 'mascot4-in'
              ? 'opacity-100 translate-y-0 scale-100'
              : stage === 'mascot4-out'
              ? 'opacity-0 -translate-y-12 scale-90'
              : 'opacity-0 translate-y-12 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-yellow-transparent.png"
            alt="Sunny Cloud"
            className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-md animate-float"
          />
          {stage === 'mascot4-in' && (
            <span className="absolute -top-3 bg-white/90 backdrop-blur-xs text-amber-500 text-[10px] font-heading font-extrabold px-2 py-0.5 rounded-full shadow-xs border border-amber-200 animate-pulse">
              Yay! ☀️
            </span>
          )}
        </div>

        {/* FINALE: Stacking Vertical Tower */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ease-out pointer-events-none ${
            stage === 'stacking' || stage === 'tower-jump'
              ? 'opacity-100 scale-105'
              : 'opacity-0 scale-75'
          }`}
        >
          <img
            src="/mascots/mascots-group-transparent.png"
            alt="Mascots Vertical Tower"
            className={`w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-lg ${
              stage === 'tower-jump' ? 'animate-bounce' : 'animate-wiggle'
            }`}
          />
          {stage === 'tower-jump' && (
            <span className="absolute -top-4 bg-[#FF2E7E] text-white text-[10px] font-heading font-extrabold px-2.5 py-0.5 rounded-full shadow-md animate-ping">
              STACKED! 🎉
            </span>
          )}
        </div>

        {/* IDLE / FINAL STATE: Official Transparent Stack'd Logo */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out ${
            stage === 'final-logo' ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <img
            src="/stackd-logo-transparent.png"
            alt="Stack'd Official Logo"
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain filter drop-shadow-md group-hover:rotate-6 transition-transform duration-300"
          />
        </div>
      </div>

      {/* Brand Name Typography & Reactive Subtitle */}
      <div className="flex flex-col text-left">
        <div className="flex items-center space-x-1.5">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[#2756E8] drop-shadow-xs group-hover:text-blue-700 transition-colors">
            STACK'D
          </span>
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#FF2E7E] animate-ping" />
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-wider font-heading -mt-1">
          {isPlaying ? (
            <span className="text-[#FF2E7E] font-extrabold animate-pulse">
              {stage === 'mascot1-in' && 'Blobby says Hi! 👋'}
              {stage === 'mascot1-out' && '...next!'}
              {stage === 'mascot2-in' && 'Minty hops in! ✨'}
              {stage === 'mascot2-out' && '...next!'}
              {stage === 'mascot3-in' && 'Pip loves you! 💖'}
              {stage === 'mascot3-out' && '...next!'}
              {stage === 'mascot4-in' && 'Sunny shines bright! ☀️'}
              {stage === 'mascot4-out' && 'Forming tower...'}
              {stage === 'stacking' && 'Stacking the tower! 🏗️'}
              {stage === 'tower-jump' && 'All Stacked! 🎉'}
            </span>
          ) : (
            'Keep it Stacked! :-)'
          )}
        </span>
      </div>
    </Link>
  );
};
