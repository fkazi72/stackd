import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle2, Clock, MapPin, ArrowRight } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialOrderId = searchParams.get('orderId') || '';

  const [orderIdInput, setOrderIdInput] = useState(initialOrderId);
  const [searchedOrder, setSearchedOrder] = useState<string | null>(initialOrderId || null);

  useEffect(() => {
    if (initialOrderId) {
      setOrderIdInput(initialOrderId);
      setSearchedOrder(initialOrderId);
    }
  }, [initialOrderId]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderIdInput.trim()) {
      setSearchedOrder(orderIdInput.trim().toUpperCase());
    }
  };

  const handleSampleOrder = () => {
    const sampleId = 'STK-849201';
    setOrderIdInput(sampleId);
    setSearchedOrder(sampleId);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-10">
      
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="px-4 py-1.5 rounded-full bg-blue-100 text-[#2756E8] text-xs font-heading font-extrabold uppercase tracking-wider">
          Real-Time Tracking
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900">
          Track Your Stack
        </h1>
        <p className="text-sm text-slate-600">
          Enter your order reference number (e.g. STK-849201) to view real-time courier updates.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white p-6 sm:p-8 rounded-4xl border border-amber-200 shadow-sm space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            required
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            placeholder="Enter Order ID (e.g. STK-849201)..."
            className="flex-1 px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-semibold uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
          />
          <button
            type="submit"
            className="btn-3d btn-3d-blue px-8 py-3.5 rounded-2xl font-heading font-bold text-sm flex items-center justify-center space-x-2"
          >
            <Search className="w-4 h-4" />
            <span>Track Order</span>
          </button>
        </form>

        <div className="text-center text-xs text-slate-400">
          Want to test the tracker?{' '}
          <button
            type="button"
            onClick={handleSampleOrder}
            className="text-[#2756E8] font-bold underline"
          >
            Click here to preview sample order STK-849201
          </button>
        </div>
      </div>

      {/* Order Status Result */}
      {searchedOrder && (
        <div className="bg-white p-6 sm:p-10 rounded-4xl border-2 border-amber-200 shadow-md space-y-8 animate-in fade-in duration-300">
          
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <span className="text-xs text-slate-400 font-bold uppercase">Order Reference:</span>
              <h2 className="font-heading font-extrabold text-2xl text-[#2756E8]">{searchedOrder}</h2>
              <p className="text-xs text-slate-500 mt-0.5">Carrier: Stack'd Express Air Tracked</p>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-xs text-slate-400 font-bold uppercase">Estimated Arrival:</span>
              <p className="font-heading font-extrabold text-lg text-emerald-600">In 2–3 Business Days</p>
              <span className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                On Schedule
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="space-y-6">
            <h4 className="font-heading font-bold text-base text-slate-800">
              Shipment Progress
            </h4>

            <div className="relative pl-8 space-y-8 before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-slate-900">Order Confirmed</h5>
                  <p className="text-xs text-slate-500">Your goodies were reserved and payment processed.</p>
                  <span className="text-[10px] text-slate-400">Nov 21, 10:14 AM</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  ✓
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-slate-900">Packed by the Mascot Crew</h5>
                  <p className="text-xs text-slate-500">Blobby Blue balanced your stack in eco-cushioned packaging.</p>
                  <span className="text-[10px] text-slate-400">Nov 21, 02:40 PM</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-[#2756E8] text-white flex items-center justify-center font-bold text-xs shadow-md animate-pulse">
                  <Truck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-[#2756E8]">In Transit - California Air Hub</h5>
                  <p className="text-xs text-slate-600">Departed primary sorting facility; en route to local regional courier hub.</p>
                  <span className="text-[10px] text-blue-600 font-bold">Today, 06:15 PM (Latest Update)</span>
                </div>
              </div>

              {/* Step 4 */}
              <div className="relative opacity-40">
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                  4
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-slate-700">Out for Delivery</h5>
                  <p className="text-xs text-slate-400">With local delivery driver.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="relative opacity-40">
                <div className="absolute -left-8 top-0 w-7 h-7 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                  5
                </div>
                <div>
                  <h5 className="font-heading font-bold text-sm text-slate-700">Delivered</h5>
                  <p className="text-xs text-slate-400">Placed safely at your front door.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Need help footer */}
          <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">Need to change your delivery address or instructions?</span>
            <Link to="/contact" className="font-bold text-[#2756E8] hover:underline">
              Contact Support →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
