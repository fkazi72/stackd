import React, { useState } from 'react';
import { Layers, Plus, Trash2, CheckCircle2, Sparkles, ArrowRight, Truck, ShoppingBag } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';

export const StackBuilderPage: React.FC = () => {
  const { addToCart, setCartOpen } = useCart();
  const [selectedItems, setSelectedItems] = useState<Product[]>([]);

  const handleAddItem = (product: Product) => {
    if (selectedItems.length >= 6) {
      alert("Your stack is already 6 tiers tall! That's a master skyscraper stack.");
      return;
    }
    setSelectedItems(prev => [...prev, product]);
  };

  const handleRemoveItem = (index: number) => {
    setSelectedItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearStack = () => {
    setSelectedItems([]);
  };

  // Calculations
  const rawSubtotal = selectedItems.reduce((acc, item) => acc + item.price, 0);
  let discountPercent = 0;
  if (selectedItems.length >= 5) {
    discountPercent = 20;
  } else if (selectedItems.length >= 3) {
    discountPercent = 10;
  }

  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100 * 100) / 100;
  const bundleTotal = Math.round((rawSubtotal - discountAmount) * 100) / 100;

  const handleAddStackToCart = () => {
    if (selectedItems.length === 0) return;

    selectedItems.forEach(item => {
      addToCart(item, 1, {}, false);
    });

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
      });
    } catch {}

    setCartOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-100/70 via-pink-100/60 to-blue-100/70 rounded-4xl p-8 sm:p-12 border border-amber-200 text-center space-y-4">
        <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-white text-[#2756E8] text-xs font-heading font-extrabold shadow-xs">
          <Layers className="w-4 h-4 text-[#FFD12F]" />
          <span>Interactive Bundle Builder</span>
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900">
          Build Your Custom Stack & Save!
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Pick your favorite mystery boxes, plushies, tumblers, and desk accessories. As your stack grows, unlock progressive discounts up to <strong className="text-[#FF2E7E]">20% OFF</strong>!
        </p>

        {/* Tier Milestones */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs font-bold">
          <div className={`px-4 py-2 rounded-2xl border transition-all ${
            selectedItems.length >= 3 ? 'bg-[#2756E8] text-white border-[#2756E8] shadow-sm' : 'bg-white text-slate-600 border-slate-200'
          }`}>
            <span>Tier 1 (3 Items): 10% OFF</span>
          </div>
          <div className={`px-4 py-2 rounded-2xl border transition-all ${
            selectedItems.length >= 5 ? 'bg-[#06D6A0] text-emerald-950 border-[#06D6A0] shadow-sm' : 'bg-white text-slate-600 border-slate-200'
          }`}>
            <span>Tier 2 (5+ Items): 20% OFF + Free Worldwide Shipping</span>
          </div>
        </div>
      </div>

      {/* Workspace Grid: Picker on Left, Visual Stack on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Product Picker */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <h3 className="font-heading font-extrabold text-xl text-slate-900">
              Select Goodies to Stack ({PRODUCTS_DATA.length})
            </h3>
            <span className="text-xs text-slate-400">Click to add to your tower</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PRODUCTS_DATA.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-3xl border border-amber-100 shadow-xs flex flex-col justify-between space-y-3 hover:border-blue-200 transition-all"
              >
                <div className="flex space-x-3 items-center">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-2xl border border-slate-100 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-slate-800 line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] text-slate-400">{product.categoryLabel}</p>
                    <span className="font-heading font-extrabold text-xs text-[#2756E8] mt-1 block">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleAddItem(product)}
                  className="w-full btn-3d btn-3d-blue py-2 px-3 rounded-xl font-heading font-bold text-xs flex items-center justify-center space-x-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add to Stack</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Visual Tower & Bundle Summary */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white p-6 sm:p-8 rounded-4xl border-2 border-amber-200 shadow-md space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Your Custom Tower
                </h3>
                <p className="text-xs text-slate-400">
                  {selectedItems.length} {selectedItems.length === 1 ? 'tier' : 'tiers'} tall
                </p>
              </div>

              {selectedItems.length > 0 && (
                <button
                  onClick={handleClearStack}
                  className="text-xs text-rose-500 font-bold hover:underline"
                >
                  Reset Tower
                </button>
              )}
            </div>

            {/* Visual Stack Container */}
            <div className="min-h-48 bg-amber-50/50 rounded-3xl border border-dashed border-amber-200 p-4 flex flex-col-reverse items-center justify-end space-y-reverse space-y-2 overflow-y-auto max-h-80">
              {selectedItems.length === 0 ? (
                <div className="h-40 flex flex-col items-center justify-center text-center space-y-2 text-slate-400">
                  <Layers className="w-8 h-8 opacity-40 animate-bounce-slight" />
                  <p className="text-xs font-bold">Your tower is empty!</p>
                  <p className="text-[11px]">Click "+ Add to Stack" on the left to start building.</p>
                </div>
              ) : (
                selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="w-full p-2.5 bg-white rounded-2xl border border-amber-200 shadow-xs flex items-center justify-between animate-in zoom-in-95 duration-150"
                  >
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-10 h-10 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                      />
                      <div className="text-left">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Tier {index + 1}</span>
                        <h5 className="font-heading font-bold text-xs text-slate-800 line-clamp-1">{item.name}</h5>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-bold text-[#2756E8]">${item.price.toFixed(2)}</span>
                      <button
                        onClick={() => handleRemoveItem(index)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        aria-label="Remove item from tower"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Discount unlocked badge */}
            {discountPercent > 0 && (
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center space-x-2 text-xs font-bold text-emerald-800">
                <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                <span>🎉 {discountPercent}% Stack Discount Unlocked! You save ${discountAmount.toFixed(2)}!</span>
              </div>
            )}

            {/* Pricing Summary */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-slate-800">${rawSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Stack & Save ({discountPercent}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="pt-2 border-t border-slate-100 flex justify-between text-lg font-heading font-extrabold text-slate-900">
                <span>Bundle Total</span>
                <span className="text-[#2756E8]">${bundleTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Add Stack to Cart CTA */}
            <button
              onClick={handleAddStackToCart}
              disabled={selectedItems.length === 0}
              className="w-full btn-3d btn-3d-yellow py-3.5 px-6 rounded-2xl font-heading font-extrabold text-base flex items-center justify-center space-x-2 shadow-lg disabled:opacity-40"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Add Entire Stack to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
