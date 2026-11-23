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
  return (
    <Link
      to="/"
      className={`group flex items-center justify-center select-none transition-transform hover:scale-105 active:scale-95 ${className}`}
      title="Stack'd - Keep it Stacked!"
    >
      {/* 
        Center Mascot Visual Logo (Zero text, 100% transparent video/GIF loop)
      */}
      <div className="relative w-32 h-16 sm:w-40 sm:h-20 flex items-center justify-center overflow-visible">
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
