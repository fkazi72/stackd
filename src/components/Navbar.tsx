import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, Search, Menu, X, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { PRODUCTS_DATA } from '../data/products';
import { AnimatedMascotLogo } from './AnimatedMascotLogo';
import { TactileButton, TactileLink } from './TactileButton';

export const Navbar: React.FC = () => {
  const { cartOpen, setCartOpen, itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Search filtering
  const searchResults = searchQuery.trim() === ''
    ? []
    : PRODUCTS_DATA.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      ).slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-amber-100/90 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Navbar Grid: Left Links, Center Logo, Right Actions */}
        <div className="flex items-center justify-between h-20 sm:h-24">
          
          {/* LEFT: Desktop Navigation Links / Mobile Toggle */}
          <div className="flex items-center flex-1 justify-start">
            
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-2xl bg-amber-50 text-slate-700 hover:bg-amber-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Left Nav */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <TactileLink
                to="/shop"
                className={`px-3.5 py-2 rounded-full font-heading font-semibold text-xs xl:text-sm transition-all ${
                  location.pathname === '/shop' && !location.search
                    ? 'bg-[#2756E8] text-white shadow-xs'
                    : 'text-slate-700 hover:text-[#2756E8] hover:bg-blue-50'
                }`}
              >
                All Goodies
              </TactileLink>

              <TactileLink
                to="/shop?category=stationery"
                className="px-3.5 py-2 rounded-full font-heading font-semibold text-xs xl:text-sm text-slate-700 hover:text-[#FF2E7E] hover:bg-pink-50 transition-all flex items-center space-x-1"
              >
                <span>Stationery & Gifts</span>
              </TactileLink>

              <TactileLink
                to="/shop?category=blind-boxes"
                className="px-3.5 py-2 rounded-full font-heading font-semibold text-xs xl:text-sm text-slate-700 hover:text-[#06D6A0] hover:bg-emerald-50 transition-all flex items-center space-x-1"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#06D6A0]" />
                <span>Blind Boxes</span>
              </TactileLink>

              <TactileLink
                to="/stack-builder"
                className="px-3 py-2 rounded-full font-heading font-semibold text-xs xl:text-sm text-[#2756E8] bg-blue-50 hover:bg-blue-100 transition-all flex items-center space-x-1.5 border border-blue-200/60"
              >
                <Layers className="w-3.5 h-3.5 text-[#2756E8]" />
                <span>Stack & Save</span>
                <span className="bg-[#FF2E7E] text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                  -20%
                </span>
              </TactileLink>
            </nav>
          </div>

          {/* CENTER: Animated Sequenced Mascot Logo */}
          <div className="flex items-center justify-center flex-shrink-0 px-2">
            <AnimatedMascotLogo />
          </div>

          {/* RIGHT: Actions (Currency badge, Search, Wishlist, Cart) */}
          <div className="flex items-center flex-1 justify-end space-x-2 sm:space-x-3">
            
            {/* Currency Pill Indicator (Indian Rupees) */}
            <div
              title="Official Indian Store (INR ₹)"
              className="hidden sm:inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-2xl bg-amber-50/80 border border-amber-200/70 text-slate-700 text-xs font-bold font-heading select-none"
            >
              <span className="w-2 h-2 rounded-full bg-[#06D6A0]" />
              <span className="font-extrabold text-[#2756E8]">₹ INR</span>
            </div>

            {/* Search Button */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-[#2756E8] transition-all flex items-center"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Search Dropdown Modal */}
              {searchOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <form onSubmit={handleSearchSubmit} className="relative">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search gel pens, diaries, blind boxes..."
                      className="w-full pl-10 pr-10 py-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#2756E8] text-slate-800"
                    />
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </form>

                  {/* Search Results Preview */}
                  {searchResults.length > 0 && (
                    <div className="mt-3 divide-y divide-slate-100">
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 font-heading">
                        Matching Items
                      </p>
                      {searchResults.map((item) => (
                        <Link
                          key={item.id}
                          to={`/product/${item.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="flex items-center py-2.5 px-2 hover:bg-blue-50/60 rounded-xl transition-colors group"
                        >
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-10 h-10 object-cover rounded-xl border border-slate-100 mr-3 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-[#2756E8]">
                              {item.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 font-semibold">
                              ₹{item.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#2756E8] transition-colors" />
                        </Link>
                      ))}
                      <button
                        onClick={handleSearchSubmit}
                        className="w-full mt-2 py-2 text-center text-xs font-bold text-[#2756E8] hover:underline"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    </div>
                  )}

                  {searchQuery && searchResults.length === 0 && (
                    <div className="py-4 text-center text-xs text-slate-500">
                      No matching goodies found. Try searching for "pens", "journal", or "plushie"!
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <TactileLink
              to="/wishlist"
              className="relative p-2.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-slate-700 hover:text-[#FF2E7E] transition-all inline-block"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF2E7E] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#FFFDF9] shadow-xs animate-bounce-slight">
                  {wishlistCount}
                </span>
              )}
            </TactileLink>

            {/* Cart Button with Tactile Push Feedback */}
            <TactileButton
              onClick={() => setCartOpen(true)}
              className="btn-3d btn-3d-blue flex items-center space-x-2 px-3.5 sm:px-4 py-2.5 rounded-2xl font-heading font-bold text-xs sm:text-sm shadow-md"
              aria-label="Open Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Stack</span>
              <span className="bg-white text-[#2756E8] text-xs font-extrabold px-2 py-0.5 rounded-full shadow-inner">
                {itemCount}
              </span>
            </TactileButton>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-amber-100 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col space-y-2">
            <TactileLink
              to="/shop"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-blue-50 hover:text-[#2756E8]"
            >
              <span>All Products & Collectibles</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </TactileLink>

            <TactileLink
              to="/shop?category=stationery"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-pink-50 hover:text-[#FF2E7E]"
            >
              <span>Cute Stationery & Pens</span>
              <span className="text-[10px] bg-[#FF2E7E] text-white font-bold px-2 py-0.5 rounded-full">New</span>
            </TactileLink>

            <TactileLink
              to="/shop?category=gifting"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-amber-50 hover:text-amber-800"
            >
              <span>Gifting Hampers & Diaries</span>
              <span className="text-[10px] bg-[#FFD12F] text-amber-950 font-bold px-2 py-0.5 rounded-full">Gift Ready</span>
            </TactileLink>

            <TactileLink
              to="/shop?category=blind-boxes"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-pink-50 hover:text-[#FF2E7E]"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FF2E7E]" />
                <span>Mystery Blind Boxes</span>
              </span>
              <span className="text-xs bg-[#FF2E7E] text-white font-bold px-2 py-0.5 rounded-full">Hot</span>
            </TactileLink>

            <TactileLink
              to="/stack-builder"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-[#2756E8] bg-blue-50"
            >
              <span className="flex items-center space-x-2">
                <Layers className="w-4 h-4" />
                <span>Custom Stack & Save (Build Bundle)</span>
              </span>
              <span className="text-xs bg-[#2756E8] text-white font-bold px-2 py-0.5 rounded-full">-20%</span>
            </TactileLink>

            <TactileLink
              to="/about"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-amber-50"
            >
              <span>Meet The Mascots</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </TactileLink>

            <TactileLink
              to="/contact"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-amber-50"
            >
              <span>Contact & FAQ</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </TactileLink>

            <TactileLink
              to="/track-order"
              className="flex items-center justify-between p-3 rounded-2xl font-heading font-bold text-slate-800 hover:bg-amber-50"
            >
              <span>Track Your Order</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </TactileLink>
          </div>

          <div className="pt-4 border-t border-amber-100 flex items-center justify-between">
            <a
              href="https://www.instagram.com/keepitstackd/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-[#2756E8] hover:underline"
            >
              Instagram: @keepitstackd
            </a>
            <span className="text-xs font-bold text-[#FF2E7E]">Pricing: ₹ INR</span>
          </div>
        </div>
      )}
    </header>
  );
};
