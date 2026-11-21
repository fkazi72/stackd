import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle2, Package, Truck, Home, Printer, ArrowRight, Sparkles, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

export const OrderSuccessPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<any>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Try loading order from localStorage
    try {
      const saved = localStorage.getItem(`stackd_order_${orderId}`);
      if (saved) {
        setOrderDetails(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }

    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
      });
    } catch {}
  }, [orderId]);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Top Celebratory Mascot Card */}
      <div className="bg-white rounded-4xl border-2 border-amber-200 p-8 sm:p-12 shadow-md text-center space-y-6 relative overflow-hidden">
        
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden mx-auto border-4 border-amber-200 shadow-xl bg-amber-50">
          <img
            src="/mascots/mascot-mint.jpg"
            alt="Celebrating mascot"
            className="w-full h-full object-cover animate-bounce-slight"
          />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-heading font-extrabold border border-emerald-200">
            <CheckCircle2 className="w-4 h-4 text-[#06D6A0]" />
            <span>Order Confirmed & Stacking</span>
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900">
            Woohoo! You're officially Stack'd! 🎉
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Thank you for shopping with Stack'd! Our mascot crew is currently gathering your goodies and packing them with care.
          </p>
        </div>

        <div className="inline-block bg-amber-50 px-6 py-3 rounded-2xl border border-amber-200 text-xs font-heading font-bold text-slate-700">
          <span>Order Reference: </span>
          <strong className="text-[#2756E8] text-base">{orderId}</strong>
        </div>
      </div>

      {/* Live Order Timeline Progress */}
      <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-100 shadow-xs space-y-6">
        <h3 className="font-heading font-extrabold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Live Stack Status Tracker
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
          
          <div className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 space-y-0 sm:space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold shadow-sm">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-slate-900">1. Order Placed</p>
              <p className="text-[10px] text-emerald-600 font-bold">Confirmed</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 space-y-0 sm:space-y-2">
            <div className="w-10 h-10 rounded-full bg-[#2756E8] text-white flex items-center justify-center font-bold shadow-md animate-pulse">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-[#2756E8]">2. Mascot Packing</p>
              <p className="text-[10px] text-blue-600 font-bold">In Progress</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-slate-700">3. In Transit</p>
              <p className="text-[10px] text-slate-400">Tracked Courier</p>
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:text-center space-x-3 sm:space-x-0 space-y-0 sm:space-y-2 opacity-50">
            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold">
              <Home className="w-5 h-5" />
            </div>
            <div>
              <p className="font-heading font-bold text-xs text-slate-700">4. Delivered</p>
              <p className="text-[10px] text-slate-400">At Your Door</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Details & Items Breakdown */}
      {orderDetails && (
        <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-100 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading font-extrabold text-lg text-slate-900">
              Purchased Goodies
            </h3>
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-1.5 text-xs font-bold text-slate-600 hover:text-[#2756E8]"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

          {/* Items Table */}
          <div className="divide-y divide-slate-100">
            {orderDetails.items?.map((item: any) => (
              <div key={item.id} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <img
                    src={item.product?.images?.[0]}
                    alt={item.product?.name}
                    className="w-12 h-12 object-cover rounded-xl border border-slate-100 flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-slate-800">{item.product?.name}</h4>
                    <p className="text-[11px] text-slate-400">Qty: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-slate-800">
                  ${(item.product?.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Totals */}
          <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-800">${orderDetails.subtotal?.toFixed(2)}</span>
            </div>
            {orderDetails.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount</span>
                <span>-${orderDetails.discount?.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping ({orderDetails.shippingMethod})</span>
              <span className="font-bold text-slate-800">
                {orderDetails.shipping === 0 ? 'FREE' : `$${orderDetails.shipping?.toFixed(2)}`}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex justify-between text-base font-heading font-extrabold text-slate-900">
              <span>Total Paid</span>
              <span className="text-[#2756E8]">${orderDetails.total?.toFixed(2)}</span>
            </div>
          </div>

          {/* Customer Address & Courier Info */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 rounded-2xl">
              <h5 className="font-heading font-bold text-slate-800 mb-1">Delivering To:</h5>
              <p className="text-slate-600">{orderDetails.customer?.firstName} {orderDetails.customer?.lastName}</p>
              <p className="text-slate-600">{orderDetails.customer?.address} {orderDetails.customer?.apartment}</p>
              <p className="text-slate-600">{orderDetails.customer?.city}, {orderDetails.customer?.state} {orderDetails.customer?.zipCode}</p>
              <p className="text-slate-600">{orderDetails.customer?.country}</p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl">
              <h5 className="font-heading font-bold text-slate-800 mb-1">Tracking Number:</h5>
              <p className="font-mono font-bold text-[#2756E8] text-sm">{orderDetails.trackingNumber}</p>
              <p className="text-[11px] text-slate-500 mt-1">Carrier: Stack'd Global Air Tracked</p>
              <Link
                to={`/track-order?orderId=${orderId}`}
                className="mt-2 inline-block text-[11px] font-bold text-[#FF2E7E] hover:underline"
              >
                Track live parcel location →
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Navigation */}
      <div className="text-center pt-4">
        <Link
          to="/shop"
          className="btn-3d btn-3d-blue px-8 py-3.5 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2 shadow-lg"
        >
          <span>Continue Exploring Stacks</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};
