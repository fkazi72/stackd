import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, Truck, Sparkles, Tag, ShieldCheck, ShoppingBag, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TactileButton, TactileLink } from '../components/TactileButton';

export const CartPage: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
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

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const navigate = useNavigate();

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCodeInput.trim()) {
      const ok = applyPromo(promoCodeInput);
      if (ok) setPromoCodeInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-36 h-36 rounded-full overflow-hidden mx-auto bg-pink-50 p-2 shadow-inner border-2 border-pink-200">
          <img
            src="/mascots/mascot-pink.jpg"
            alt="Empty Stack Mascot"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-3xl text-slate-900">
            Your stack is empty!
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Stack up some joy with our collectible blind boxes, giant plushies, and desk setup accessories.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <TactileLink
            to="/shop"
            delayMs={160}
            className="btn-3d btn-3d-blue px-6 py-3 rounded-2xl font-heading font-bold text-sm w-full sm:w-auto text-center"
          >
            Explore All Goodies
          </TactileLink>
          <TactileLink
            to="/stack-builder"
            delayMs={160}
            className="btn-3d btn-3d-yellow px-6 py-3 rounded-2xl font-heading font-bold text-sm w-full sm:w-auto text-center"
          >
            Build Stack & Save (-20%)
          </TactileLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900">
            Shopping Stack
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review your goodies before our mascots pack and dispatch your order.
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:text-rose-700 underline self-start sm:self-auto"
        >
          Clear entire stack
        </button>
      </div>

      {/* Free Shipping & Progressive Bundle Strip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shipping Meter */}
        <div className="p-4 bg-white rounded-3xl border border-amber-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-slate-800">
            <span className="flex items-center space-x-1.5">
              <Truck className="w-4 h-4 text-[#2756E8]" />
              <span>
                {amountNeededForFreeShipping > 0
                  ? `Add ₹${Math.round(amountNeededForFreeShipping)} more for Free Delivery across India!`
                  : '🎉 Free Tracked Delivery Across India Unlocked!'}
              </span>
            </span>
            <span>{shippingProgressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-amber-100/70 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#2756E8] rounded-full transition-all duration-500"
              style={{ width: `${shippingProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Stack & Save Progress */}
        <div className="p-4 bg-white rounded-3xl border border-amber-200 shadow-xs flex items-center space-x-3">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-2xl flex-shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <h4 className="font-heading font-bold text-slate-800">
              Stack & Save Rewards ({itemCount} {itemCount === 1 ? 'item' : 'items'} in stack)
            </h4>
            <p className="text-slate-500 mt-0.5">
              {itemCount >= 5 ? (
                <strong className="text-emerald-600">🔥 Maximum 20% Stack Discount Active!</strong>
              ) : itemCount >= 3 ? (
                <strong className="text-[#2756E8]">✨ 10% Stack Discount Active! Add {5 - itemCount} more for 20% OFF!</strong>
              ) : (
                <span>Add {3 - itemCount} more items to unlock 10% off your whole order!</span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content: Item Table + Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Items list */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-4xl border border-amber-100 shadow-xs divide-y divide-slate-100 overflow-hidden">
            {cart.map((item) => (
              <div key={item.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-2xl border border-slate-100 flex-shrink-0"
                  />
                  <div className="space-y-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="font-heading font-bold text-base text-slate-900 hover:text-[#2756E8] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-slate-400 font-medium">
                        {Object.entries(item.selectedVariants)
                          .map(([_, v]) => v)
                          .join(' • ')}
                      </p>
                    )}
                    <p className="text-xs text-slate-500">
                      Unit Price: ₹{item.product.price.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-6">
                  {/* Quantity */}
                  <div className="flex items-center space-x-2 bg-slate-50 rounded-2xl p-1.5 border border-slate-200">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="p-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 shadow-xs"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-heading font-extrabold text-sm text-slate-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="p-1.5 rounded-xl bg-white text-slate-700 hover:bg-slate-100 shadow-xs"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total */}
                  <div className="text-right">
                    <span className="font-heading font-extrabold text-base sm:text-lg text-[#2756E8]">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-slate-400 hover:text-rose-500 rounded-xl transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
            <Link to="/shop" className="hover:text-[#2756E8] font-bold flex items-center space-x-1">
              <span>← Continue Shopping</span>
            </Link>
            <span>Standard dispatch: 24–48 hours</span>
          </div>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-4xl border border-amber-200 p-6 shadow-sm space-y-5">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            <div>
              {!appliedPromo ? (
                <form onSubmit={handleApplyCode} className="space-y-2">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      placeholder="Try STACK10 or KEEPITSTACKED"
                      className="flex-1 px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-slate-900 text-white text-xs font-bold rounded-2xl hover:bg-slate-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-500 font-bold">{promoError}</p>
                  )}
                </form>
              ) : (
                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-emerald-800">Code: {appliedPromo}</span>
                    <p className="text-[10px] text-emerald-600">Promo discount applied!</p>
                  </div>
                  <button
                    onClick={removePromo}
                    className="text-xs font-bold text-rose-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({itemCount} items)</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Stack & Save Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-slate-800">
                  {shipping === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `₹${shipping}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-lg font-heading font-extrabold text-slate-900">
                <span>Total</span>
                <span className="text-[#2756E8]">₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button with tactile press delay */}
            <TactileButton
              onClick={() => navigate('/checkout')}
              delayMs={180}
              className="w-full btn-3d btn-3d-blue py-4 px-6 rounded-2xl font-heading font-extrabold text-base flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </TactileButton>

            {/* Trust Assurance */}
            <div className="pt-2 flex items-center justify-center space-x-2 text-[11px] text-slate-400 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>30-Day Smile Guarantee • 100% Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
