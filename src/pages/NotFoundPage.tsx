import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
      <div className="w-36 h-36 rounded-full overflow-hidden mx-auto bg-amber-50 p-2 shadow-xl border-4 border-amber-200">
        <img
          src="/mascots/mascot-yellow.jpg"
          alt="Lost Mascot"
          className="w-full h-full object-cover rounded-full animate-bounce-slight"
        />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-heading font-extrabold text-[#FF2E7E] uppercase tracking-wider">
          Error 404
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
          This stack tumbled down!
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 max-w-sm mx-auto">
          The page you are looking for doesn't exist or has wandered off to explore new mystery boxes.
        </p>
      </div>

      <div className="pt-2 flex justify-center gap-3">
        <Link
          to="/"
          className="btn-3d btn-3d-blue px-6 py-3 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2 shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
        <Link
          to="/shop"
          className="btn-3d btn-3d-yellow px-6 py-3 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2"
        >
          <span>Shop Goodies</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
