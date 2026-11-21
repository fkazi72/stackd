import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Sparkles, ShieldCheck, Truck, Tag } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    itemCount,
    amountNeededForFreeShipping,
    shippingProgressPercent,
    appliedPromo,
    promoError,
    applyPromo,
    removePromo,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [showPromoBox, setShowPromoBox] = useState(false);
  const navigate = useNavigate();

  if (!cartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      const success = applyPromo(promoInput);
      if (success) {
        setPromoInput('');
      }
    }
  };

  const handleCheckoutClick = () => {
    setCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF9] shadow-2xl flex flex-col justify-between border-l border-amber-100 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-amber-100 flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <span className="font-heading font-extrabold text-xl text-slate-800">
                Your Stack
              </span>
              <span className="bg-[#2756E8] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="p-4 bg-amber-50/70 border-b border-amber-100">
            {amountNeededForFreeShipping > 0 ? (
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1.5">
                  <span className="flex items-center space-x-1.5">
                    <Truck className="w-4 h-4 text-[#2756E8]" />
                    <span>Add <strong className="text-[#2756E8]">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Worldwide Shipping!</span>
                  </span>
                  <span>{shippingProgressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-amber-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#2756E8] rounded-full transition-all duration-500"
                    style={{ width: `${shippingProgressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2 text-xs font-bold text-[#06D6A0] bg-emerald-50 py-1.5 px-3 rounded-xl border border-emerald-200">
                <Sparkles className="w-4 h-4 text-[#06D6A0]" />
                <span>🎉 Yay! You unlocked FREE Worldwide Shipping!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4 space-y-4">
                <div className="w-28 h-28 rounded-full overflow-hidden shadow-inner ring-4 ring-pink-100 bg-pink-50 p-2">
                  <img
                    src="/mascots/mascot-pink.jpg"
                    alt="Empty stack mascot"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-xl text-slate-800">
                    Your stack is empty!
                  </h3>
                  <p className="text-xs text-slate-500 max-w-xs">
                    The mascots are waiting to keep you company. Pick a mystery box or a cute desk buddy to start stacking!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/shop');
                  }}
                  className="btn-3d btn-3d-pink px-6 py-3 rounded-2xl font-heading font-bold text-sm shadow-md"
                >
                  Start Stacking
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs flex space-x-3.5 items-center group hover:border-blue-100 transition-colors"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/product/${item.product.id}`}
                      onClick={() => setCartOpen(false)}
                      className="font-heading font-bold text-sm text-slate-800 hover:text-[#2756E8] truncate block"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-[11px] text-slate-400 font-medium">
                        {Object.entries(item.selectedVariants)
                          .map(([k, v]) => `${v}`)
                          .join(' / ')}
                      </p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-[#2756E8]">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>

                      {/* Quantity Selector */}
                      <div className="flex items-center space-x-1.5 bg-slate-50 rounded-xl p-1 border border-slate-200">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          {item.quantity === 1 ? <Trash2 className="w-3.5 h-3.5 text-rose-500" /> : <Minus className="w-3.5 h-3.5" />}
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Summary */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-amber-100 space-y-4">
              
              {/* Promo Code section */}
              <div>
                {!appliedPromo ? (
                  showPromoBox ? (
                    <form onSubmit={handleApplyPromo} className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          placeholder="Try STACK10 or KEEPITSTACKED"
                          className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-slate-800 text-white text-xs font-bold rounded-xl hover:bg-slate-700 transition-colors"
                        >
                          Apply
                        </button>
                      </div>
                      {promoError && (
                        <p className="text-[11px] text-rose-500 font-semibold">{promoError}</p>
                      )}
                    </form>
                  ) : (
                    <button
                      onClick={() => setShowPromoBox(true)}
                      className="text-xs font-bold text-[#2756E8] flex items-center space-x-1.5 hover:underline"
                    >
                      <Tag className="w-3.5 h-3.5" />
                      <span>Have a promo code? (Click to enter)</span>
                    </button>
                  )
                ) : (
                  <div className="flex items-center justify-between bg-emerald-50 text-emerald-800 text-xs px-3 py-2 rounded-xl border border-emerald-200">
                    <span className="font-bold">Code applied: {appliedPromo}</span>
                    <button
                      onClick={removePromo}
                      className="text-emerald-700 hover:text-rose-600 font-bold ml-2 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Price Details */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Savings / Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-bold text-slate-800">
                    {shipping === 0 ? <span className="text-emerald-600 uppercase font-extrabold">FREE</span> : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-100 flex justify-between text-base font-extrabold text-slate-900 font-heading">
                  <span>Total</span>
                  <span className="text-[#2756E8]">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full btn-3d btn-3d-blue py-3.5 px-4 rounded-2xl font-heading font-bold text-base flex items-center justify-center space-x-2 shadow-lg"
                >
                  <span>Checkout Now</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    setCartOpen(false);
                    navigate('/cart');
                  }}
                  className="w-full py-2.5 text-center text-xs font-bold text-slate-600 hover:text-[#2756E8] hover:bg-slate-50 rounded-xl transition-colors"
                >
                  View Full Cart & Bundle Discounts
                </button>
              </div>

              {/* Safe Checkout Badges */}
              <div className="flex items-center justify-center space-x-3 text-[11px] text-slate-400 font-semibold pt-1">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>30-Day Smile Guarantee</span>
                </span>
                <span>•</span>
                <span>Fast Dispatch</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
