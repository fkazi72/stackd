import React from 'react';
import { useCart } from '../context/CartContext';
import { Sparkles, X } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage, clearToast } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-200">
      <div className="bg-slate-900/90 text-white backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-slate-700/80 flex items-center space-x-3 text-xs sm:text-sm font-semibold max-w-md">
        <Sparkles className="w-4 h-4 text-[#FFD12F] flex-shrink-0 animate-bounce-slight" />
        <span className="flex-1">{toastMessage}</span>
        <button
          onClick={clearToast}
          className="text-slate-400 hover:text-white p-1 rounded-lg"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
