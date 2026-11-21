import React, { useState, useEffect } from 'react';
import { Sparkles, Truck, Gift, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const announcements = [
  { text: "FREE Worldwide Shipping on orders over $50! 🚀", icon: Truck },
  { text: "Stack & Save: Add 3+ items to unlock up to 20% OFF! 📦", icon: Gift },
  { text: "Use code STACK10 for 10% off your first order ✨", icon: Sparkles },
  { text: "Join 15,000+ friends on Instagram @keepitstackd 💖", icon: Heart, link: "https://www.instagram.com/keepitstackd/" }
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const current = announcements[index];
  const IconComponent = current.icon;

  return (
    <div className="bg-[#2756E8] text-white py-2 px-4 text-xs sm:text-sm font-medium tracking-wide">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="hidden md:flex items-center space-x-2 text-blue-200">
          <span className="w-2 h-2 rounded-full bg-[#06D6A0] animate-pulse"></span>
          <span>Official Stack'd Store</span>
        </div>

        <div className="flex-1 flex items-center justify-center text-center space-x-2 transition-all duration-300">
          <IconComponent className="w-4 h-4 text-[#FFD12F] animate-bounce-slight inline-block flex-shrink-0" />
          {current.link ? (
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center space-x-1 font-semibold"
            >
              <span>{current.text}</span>
            </a>
          ) : (
            <span className="font-semibold">{current.text}</span>
          )}
        </div>

        <div className="hidden md:flex items-center space-x-4 text-xs font-semibold text-blue-100">
          <Link to="/track-order" className="hover:text-white transition-colors">
            Track Order
          </Link>
          <span className="text-blue-300">|</span>
          <a
            href="https://www.instagram.com/keepitstackd/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>@keepitstackd</span>
          </a>
        </div>
      </div>
    </div>
  );
};
