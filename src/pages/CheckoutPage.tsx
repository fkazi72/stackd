import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Lock, CreditCard, Truck, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { TactileButton } from '../components/TactileButton';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, discount, shipping, total, clearCart, appliedPromo } = useCart();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('India');
  const [phone, setPhone] = useState('');

  // Shipping selection
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');

  // Payment selection
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-slate-800">Your Stack is Empty</h2>
        <p className="text-xs text-slate-500">Please add items to your stack before checking out.</p>
        <Link to="/shop" className="btn-3d btn-3d-blue px-6 py-2.5 rounded-2xl font-heading font-bold text-sm inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const expressExtra = shippingMethod === 'express' ? 70 : 0;
  const finalShipping = shipping + expressExtra;
  const finalTotal = Math.max(0, Math.round(subtotal - discount + finalShipping));

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate payment processing
    setTimeout(() => {
      const orderId = `STK-${Math.floor(100000 + Math.random() * 900000)}`;
      const trackingNumber = `TRK-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;

      const orderData = {
        orderId,
        orderDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        subtotal,
        discount,
        shipping: finalShipping,
        total: finalTotal,
        promoCode: appliedPromo,
        customer: {
          firstName,
          lastName,
          email,
          phone,
          address,
          apartment,
          city,
          state,
          zipCode,
          country,
        },
        shippingMethod: shippingMethod === 'express' ? 'Express Air Priority Dispatch (1-2 Days)' : 'Standard Tracked Delivery (3-5 Days)',
        paymentMethod: paymentMethod === 'card' ? `Credit Card (ending in ${cardNumber.slice(-4) || '4242'})` : 'PayPal',
        status: 'confirmed',
        trackingNumber,
      };

      try {
        localStorage.setItem(`stackd_order_${orderId}`, JSON.stringify(orderData));
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch (err) {
        console.error(err);
      }

      clearCart();
      setIsSubmitting(false);
      navigate(`/order-success/${orderId}`);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      
      {/* Checkout Header */}
      <div className="mb-8 flex items-center justify-between">
        <Link to="/cart" className="flex items-center space-x-1.5 text-xs font-bold text-[#2756E8] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Cart</span>
        </Link>
        <div className="flex items-center space-x-2 text-xs text-slate-500 font-semibold">
          <Lock className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-Bit Encrypted Secure Checkout</span>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Form: Contact, Shipping, Payment */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Contact Info */}
          <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                1. Contact Information
              </h3>
              <span className="text-xs text-slate-400">Step 1 of 3</span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">We will send your order confirmation and tracking number here.</span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 000-0000"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                />
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                2. Shipping Address
              </h3>
              <span className="text-xs text-slate-400">Step 2 of 3</span>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Jessica"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Miller"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Sunny Stacking Way"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Apartment, Suite, etc. (Optional)</label>
                <input
                  type="text"
                  value={apartment}
                  onChange={(e) => setApartment(e.target.value)}
                  placeholder="Apt 4B"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Los Angeles"
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="CA"
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">ZIP Code *</label>
                  <input
                    type="text"
                    required
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="90210"
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
              </div>

              {/* Shipping Speed Radios */}
              <div className="pt-3 space-y-2">
                <label className="block text-xs font-bold text-slate-700">Shipping Delivery Speed</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div
                    onClick={() => setShippingMethod('standard')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      shippingMethod === 'standard'
                        ? 'border-[#2756E8] bg-blue-50/70 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-800">Standard Delivery</p>
                      <p className="text-[11px] text-slate-500">3–5 Business Days</p>
                    </div>
                    <span className="font-bold text-xs text-slate-800">
                      {shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shipping}`}
                    </span>
                  </div>

                  <div
                    onClick={() => setShippingMethod('express')}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      shippingMethod === 'express'
                        ? 'border-[#2756E8] bg-blue-50/70 ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white'
                    }`}
                  >
                    <div>
                      <p className="font-heading font-bold text-xs text-slate-800">Express Priority</p>
                      <p className="text-[11px] text-slate-500">1–2 Business Days</p>
                    </div>
                    <span className="font-bold text-xs text-slate-800">
                      ₹{shipping + 70}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                3. Payment Details
              </h3>
              <span className="text-xs text-slate-400">Step 3 of 3</span>
            </div>

            {/* Payment Selector Tabs */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`py-3 px-4 rounded-2xl font-heading font-bold text-xs border flex items-center justify-center space-x-2 transition-all ${
                  paymentMethod === 'upi'
                    ? 'border-[#2756E8] bg-blue-50 text-[#2756E8] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span>⚡ UPI / GPay / Paytm</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-3 px-4 rounded-2xl font-heading font-bold text-xs border flex items-center justify-center space-x-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#2756E8] bg-blue-50 text-[#2756E8] shadow-xs'
                    : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card / NetBanking</span>
              </button>
            </div>

            {paymentMethod === 'upi' ? (
              <div className="p-5 bg-blue-50/60 rounded-2xl border border-blue-200 text-xs text-slate-600 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Instant UPI Payment</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Zero Fee</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Enter your UPI ID / VPA</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. yourname@okhdfcbank or yourname@paytm"
                    className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
                <p className="text-[11px] text-slate-400">Or scan QR code at the next step via any UPI app (GPay, PhonePe, Paytm, BHIM).</p>
              </div>
            ) : (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Card Number *</label>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 •••• •••• 4242"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Expiry Date *</label>
                    <input
                      type="text"
                      required
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">CVC Code *</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="123"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cardholder Name *</label>
                  <input
                    type="text"
                    required
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Name as it appears on card"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Order Summary Sticky Card */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-200 shadow-sm space-y-5">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 border-b border-slate-100 pb-3">
              Order Review ({cart.length} {cart.length === 1 ? 'item' : 'items'})
            </h3>

            {/* Compact items list */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1 divide-y divide-slate-100">
              {cart.map((item) => (
                <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-bold text-slate-800 line-clamp-1">{item.product.name}</h4>
                      <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations */}
            <div className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-slate-800">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Discount</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
                <span className="font-bold text-slate-800">
                  {finalShipping === 0 ? <strong className="text-emerald-600 uppercase">FREE</strong> : `₹${finalShipping}`}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-between text-xl font-heading font-extrabold text-slate-900">
                <span>Total to Pay</span>
                <span className="text-[#2756E8]">₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-3d btn-3d-blue py-4 px-6 rounded-2xl font-heading font-extrabold text-base flex items-center justify-center space-x-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Packing & Stacking Your Order...</span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 text-[#FFD12F]" />
                  <span>Place Order (₹{finalTotal.toLocaleString('en-IN')})</span>
                </>
              )}
            </button>

            {/* Assurance */}
            <div className="text-center space-y-1 text-[11px] text-slate-400">
              <p>By placing your order, you agree to Stack'd terms and 30-day smile policy.</p>
              <div className="flex items-center justify-center space-x-2 pt-1 font-semibold text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>30-Day Money-Back Smile Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
