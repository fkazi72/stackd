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
  // Stage 0: Intro / All Stacking
  // Stage 1: Blobby Blue appears and does thumbs up
  // Stage 2: Minty Pop bounces in and lands
  // Stage 3: Pip Pink leaps on top
  // Stage 4: Sunny Cloud floats and crowns the stack
  // Stage 5: Synchronized Jump
  // Stage 6: STACK'D Logo Text reveals
  const [stage, setStage] = useState(6);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);

  // Play animation sequence on mount and on user hover/click
  const playSequence = () => {
    if (isPlayingSequence) return;
    setIsPlayingSequence(true);
    setStage(1);

    setTimeout(() => setStage(2), 900);
    setTimeout(() => setStage(3), 1800);
    setTimeout(() => setStage(4), 2700);
    setTimeout(() => {
      setStage(5);
      // Small confetti pop on jump
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.12, x: 0.5 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch {}
    }, 3600);
    setTimeout(() => {
      setStage(6);
      setIsPlayingSequence(false);
    }, 4500);
  };

  useEffect(() => {
    // Run sequence once on initial mount
    const timer = setTimeout(() => {
      playSequence();
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Link
      to="/"
      onClick={() => {
        if (!isPlayingSequence) playSequence();
      }}
      onMouseEnter={() => {
        if (!isPlayingSequence) playSequence();
      }}
      className={`group flex items-center space-x-3 select-none transition-transform hover:scale-102 ${className}`}
      title="Stack'd - Keep it Stacked! (Click to play mascot stack!)"
    >
      {/* Animated Visual Mascot Tower Badge */}
      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-b from-amber-50 to-orange-50/40 p-1 border-2 border-[#2756E8]/30 shadow-md ring-2 ring-amber-100/80 flex items-center justify-center flex-shrink-0">
        
        {/* Stage 1: Blobby Blue */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            stage === 1
              ? 'opacity-100 scale-100 animate-wiggle'
              : stage > 1 && stage < 6
              ? 'opacity-0 scale-75'
              : 'opacity-0'
          }`}
        >
          <img
            src="/mascots/mascot-blue.jpg"
            alt="Blobby Blue"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Stage 2: Minty Pop */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            stage === 2
              ? 'opacity-100 scale-100 animate-bounce-slight'
              : 'opacity-0 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-mint.jpg"
            alt="Minty Pop"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Stage 3: Pip Pink */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            stage === 3
              ? 'opacity-100 scale-100 animate-wiggle'
              : 'opacity-0 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-pink.jpg"
            alt="Pip Pink"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Stage 4: Sunny Cloud */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            stage === 4
              ? 'opacity-100 scale-100 animate-float'
              : 'opacity-0 scale-75'
          }`}
        >
          <img
            src="/mascots/mascot-yellow.jpg"
            alt="Sunny Cloud"
            className="w-12 h-12 object-cover rounded-full"
          />
        </div>

        {/* Stage 5: Synchronized Jump */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            stage === 5
              ? 'opacity-100 scale-110 -translate-y-1'
              : 'opacity-0'
          }`}
        >
          <img
            src="/mascots/mascots-group.jpg"
            alt="Stacked Jump"
            className="w-full h-full object-cover rounded-full animate-bounce"
          />
        </div>

        {/* Stage 6 / Idle: Full Official Logo Badge */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
            stage === 6 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <img
            src="/stackd-logo.jpg"
            alt="Stack'd Logo"
            className="w-full h-full object-cover group-hover:rotate-6 transition-transform duration-300"
          />
        </div>

        {/* Subtle dynamic stage glow dot */}
        {isPlayingSequence && (
          <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#06D6A0] animate-ping" />
        )}
      </div>

      {/* Brand Typography & Tagline */}
      <div className="flex flex-col text-left">
        <div className="flex items-center space-x-1">
          <span className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-[#2756E8] drop-shadow-xs group-hover:text-blue-700 transition-colors">
            STACK'D
          </span>
          <span className="inline-block w-2 h-2 rounded-full bg-[#FF2E7E] animate-ping" />
        </div>
        <span className="text-[10px] sm:text-xs font-bold text-slate-500 tracking-wider uppercase -mt-1 font-heading">
          {isPlayingSequence ? (
            <span className="text-[#FF2E7E] font-extrabold animate-pulse">
              {stage === 1 && '1. Blobby arrives! 👍'}
              {stage === 2 && '2. Minty hops on! 🍃'}
              {stage === 3 && '3. Pip leaps up! 💖'}
              {stage === 4 && '4. Sunny floats on top! ☀️'}
              {stage === 5 && '5. Joyful Mascot Jump! ✨'}
              {stage === 6 && 'Keep it Stacked! :-) 🎁'}
            </span>
          ) : (
            'Keep it Stacked! :-)'
          )}
        </span>
      </div>
    </Link>
  );
};
