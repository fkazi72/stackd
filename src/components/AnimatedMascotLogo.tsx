import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface AnimatedMascotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedMascotLogo: React.FC<AnimatedMascotLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);
  const [showFinaleLogo, setShowFinaleLogo] = useState(true);
  const [cacheBuster, setCacheBuster] = useState(Date.now());

  const triggerFlowSequence = () => {
    if (isPlayingFlow) return;
    setIsPlayingFlow(true);
    setShowFinaleLogo(false);
    setCacheBuster(Date.now());

    // When the continuous mascot flow finishes (12.5s for all 5 scenes), trigger celebration and lock in logo
    setTimeout(() => {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.15, x: 0.5 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch {}
      setShowFinaleLogo(true);
      setIsPlayingFlow(false);
    }, 12500);
  };

  useEffect(() => {
    // Initial auto-play on first load
    const timer = setTimeout(() => {
      triggerFlowSequence();
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/"
      onClick={(e) => {
        if (!isPlayingFlow) {
          e.preventDefault();
          triggerFlowSequence();
        }
      }}
      onMouseEnter={() => {
        if (!isPlayingFlow) triggerFlowSequence();
      }}
      className={`group flex items-center space-x-3 select-none transition-transform hover:scale-102 ${className}`}
      title="Stack'd - Keep it Stacked! (Click to replay mascot animation)"
    >
      {/* 
        Mascot Animation Stage:
        100% Transparent Background - Zero border, zero background fill
      */}
      <div className="relative w-20 h-16 sm:w-24 sm:h-18 flex items-center justify-center flex-shrink-0 overflow-visible">
        
        {/* Continuous Transparent Flow Animation from Google Flow (Zero Background) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${
            isPlayingFlow
              ? 'opacity-100 scale-100 pointer-events-auto'
              : 'opacity-0 scale-90 pointer-events-none'
          }`}
        >
          <video
            key={`video-${cacheBuster}`}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-contain filter drop-shadow-md"
          >
            <source src={`/mascots/navbar-mascots-flow.webm?v=${cacheBuster}`} type="video/webm" />
            <img
              src={`/mascots/navbar-mascots-flow.gif?v=${cacheBuster}`}
              alt="Stack'd Mascots Animated Flow"
              className="w-full h-full object-contain filter drop-shadow-md"
            />
          </video>
        </div>

        {/* Finale / Idle State: Official Transparent 3D Stack'd Logo */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-600 ease-out ${
            showFinaleLogo
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-90 pointer-events-none'
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
          {isPlayingFlow ? (
            <span className="text-[#FF2E7E] font-extrabold animate-pulse">
              Keep it Stacked! :-) ✨
            </span>
          ) : (
            'Keep it Stacked! :-)'
          )}
        </span>
      </div>
    </Link>
  );
};
