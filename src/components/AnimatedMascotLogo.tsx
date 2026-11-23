import React from 'react';
import { Link } from 'react-router-dom';

interface AnimatedMascotLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnimatedMascotLogo: React.FC<AnimatedMascotLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-14 h-14 sm:w-16 sm:h-16',
    md: 'w-16 h-16 sm:w-20 sm:h-20',
    lg: 'w-20 h-20 sm:w-24 sm:h-24',
  }[size];

  return (
    <Link
      to="/"
      className={`group flex items-center justify-center select-none transition-transform hover:scale-105 active:scale-95 ${className}`}
      title="Stack'd - Keep it Stacked!"
    >
      {/* 
        Center Mascot Visual Logo (Zero text, 100% transparent video/GIF loop with 3s periodic break)
      */}
      <div className={`relative ${sizeClasses} flex items-center justify-center overflow-visible`}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-contain filter drop-shadow-md"
        >
          <source src="/mascots/navbar-mascots-flow.webm" type="video/webm" />
          <img
            src="/mascots/navbar-mascots-flow.gif"
            alt="Stack'd Mascots Animation"
            className="w-full h-full object-contain filter drop-shadow-md"
          />
        </video>
      </div>
    </Link>
  );
};
