import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Heart, Plus, Minus, ShoppingBag, ShieldCheck, Truck, Sparkles, Check, ArrowRight, Share2, Layers } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { REVIEWS_DATA } from '../data/reviews';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import confetti from 'canvas-confetti';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const product = PRODUCTS_DATA.find((p) => p.id === id);

  // States
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'mascot' | 'reviews'>('details');
  const [copiedLink, setCopiedLink] = useState(false);

  // New review form states
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Initialize selected variants
  useEffect(() => {
    if (product?.variants) {
      const initial: Record<string, string> = {};
      product.variants.forEach((v) => {
        initial[v.name] = v.options[0].value;
      });
      setSelectedVariants(initial);
    }
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-4">
        <h2 className="font-heading font-bold text-2xl text-slate-800">Product Not Found</h2>
        <p className="text-xs text-slate-500">The item you are looking for has floated away into the clouds.</p>
        <Link to="/shop" className="btn-3d btn-3d-blue px-6 py-2.5 rounded-2xl font-heading font-bold text-sm inline-block">
          Return to Shop
        </Link>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);
  const savings = product.originalPrice ? (product.originalPrice - product.price) : 0;
  const productReviews = REVIEWS_DATA.filter((r) => r.productId === product.id);
  const relatedProducts = PRODUCTS_DATA.filter((p) => p.id !== product.id).slice(0, 4);

  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants((prev) => ({ ...prev, [variantName]: value }));
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariants, true);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedVariants, false);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor.trim() && newReviewComment.trim()) {
      setReviewSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
        });
      } catch {}
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 space-y-12">
      
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-xs font-semibold text-slate-400">
        <Link to="/" className="hover:text-slate-800 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-slate-800 transition-colors">Shop</Link>
        <span>/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-slate-800 transition-colors">
          {product.categoryLabel}
        </Link>
        <span>/</span>
        <span className="text-slate-700 truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Grid: Gallery & Info */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Gallery */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Active Featured Image */}
          <div className="relative aspect-square rounded-4xl overflow-hidden border-2 border-amber-100 bg-white shadow-md">
            
            {product.badge && (
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-heading font-extrabold bg-[#2756E8] text-white shadow-sm flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{product.badge}</span>
                </span>
              </div>
            )}

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 z-10 p-3 rounded-full backdrop-blur-md transition-all shadow-sm ${
                isFavorited
                  ? 'bg-[#FF2E7E] text-white'
                  : 'bg-white/80 hover:bg-white text-slate-400 hover:text-[#FF2E7E]'
              }`}
              aria-label="Toggle wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
            </button>

            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          {/* Thumbnails row */}
          {product.images.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-white ${
                    selectedImage === idx
                      ? 'border-[#2756E8] ring-2 ring-blue-200 scale-102'
                      : 'border-slate-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing & Details */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Info */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
              <span className="text-[#2756E8] font-bold uppercase tracking-wider">{product.categoryLabel}</span>
              <button
                onClick={handleShare}
                className="hover:text-slate-700 flex items-center space-x-1 text-slate-400"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Copied Link!' : 'Share'}</span>
              </button>
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Reviews Count */}
            <div className="flex items-center space-x-2 pt-1">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="font-bold text-xs text-slate-800">{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 text-xs">({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Price & Savings */}
          <div className="p-4 bg-amber-50/60 rounded-3xl border border-amber-100/80 flex items-baseline justify-between">
            <div className="flex items-baseline space-x-3">
              <span className="font-heading font-extrabold text-3xl text-[#2756E8]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {savings > 0 && (
              <span className="bg-[#06D6A0] text-emerald-950 text-xs font-heading font-extrabold px-3 py-1 rounded-full shadow-xs">
                Save ${savings.toFixed(2)}
              </span>
            )}
          </div>

          {/* Mascot Speech Bubble Card */}
          <div className="p-4 bg-white rounded-3xl border border-amber-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-pink-200 flex-shrink-0 bg-pink-50">
              <img
                src={product.mascotQuote.mascotAvatar}
                alt={product.mascotQuote.mascot}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-xs">
              <p className="font-bold text-slate-800 font-heading">
                {product.mascotQuote.mascot}'s Review:
              </p>
              <p className="italic text-slate-600 mt-0.5">
                "{product.mascotQuote.quote}"
              </p>
            </div>
          </div>

          {/* Variants Selection */}
          {product.variants && product.variants.map((variant) => (
            <div key={variant.name} className="space-y-2">
              <label className="text-xs font-bold text-slate-800 font-heading flex justify-between">
                <span>Select {variant.name}:</span>
                <span className="text-slate-500 font-normal">
                  {variant.options.find(o => o.value === selectedVariants[variant.name])?.label}
                </span>
              </label>

              <div className="flex flex-wrap gap-2">
                {variant.options.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => handleVariantSelect(variant.name, opt.value)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-heading font-bold border transition-all flex items-center space-x-2 ${
                      selectedVariants[variant.name] === opt.value
                        ? 'border-[#2756E8] bg-blue-50 text-[#2756E8] shadow-xs ring-2 ring-blue-100'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {opt.colorHex && (
                      <span
                        className="w-3 h-3 rounded-full border border-black/10 inline-block"
                        style={{ backgroundColor: opt.colorHex }}
                      />
                    )}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Stock Urgency Status */}
          {product.stockLeft && product.stockLeft < 15 && (
            <div className="flex items-center space-x-2 text-xs font-bold text-rose-600 bg-rose-50 px-3.5 py-2 rounded-2xl border border-rose-200">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              <span>Only {product.stockLeft} items left in this stack batch! Order soon.</span>
            </div>
          )}

          {/* Quantity and Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center space-x-3">
              {/* Quantity selector */}
              <div className="flex items-center space-x-2 bg-slate-100 rounded-2xl p-1.5 border border-slate-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-xl bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-heading font-extrabold text-sm text-slate-800">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-xl bg-white text-slate-700 hover:bg-slate-50 shadow-xs"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Stack Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 btn-3d btn-3d-blue py-3.5 px-6 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-lg"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Stack</span>
              </button>
            </div>

            {/* Buy Now Button */}
            <button
              onClick={handleBuyNow}
              className="w-full btn-3d btn-3d-pink py-3.5 px-6 rounded-2xl font-heading font-extrabold text-sm sm:text-base flex items-center justify-center space-x-2 shadow-md"
            >
              <span>Instant Buy Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Benefits Trust Strip */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-600 font-semibold">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-[#2756E8] flex-shrink-0" />
              <span>Free Worldwide Shipping $50+</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-[#06D6A0] flex-shrink-0" />
              <span>30-Day Smile Guarantee</span>
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION: Details, Specs, Mascot Story, Reviews */}
      <div className="pt-8 border-t border-amber-100">
        
        {/* Tab Headers */}
        <div className="flex items-center space-x-3 border-b border-amber-200/60 pb-3 overflow-x-auto">
          {[
            { id: 'details', label: 'Overview & Highlights' },
            { id: 'specs', label: 'Dimensions & Specs' },
            { id: 'mascot', label: 'Character Lore' },
            { id: 'reviews', label: `Customer Reviews (${product.reviewsCount})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-2xl font-heading font-bold text-xs sm:text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#2756E8] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Details */}
        {activeTab === 'details' && (
          <div className="py-8 space-y-6 max-w-3xl animate-in fade-in duration-200">
            <div className="space-y-3">
              <h3 className="font-heading font-extrabold text-xl text-slate-900">
                Product Description
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-heading font-bold text-base text-slate-900">
                Key Features
              </h4>
              <ul className="space-y-2">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-[#06D6A0] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Specs */}
        {activeTab === 'specs' && (
          <div className="py-8 max-w-2xl animate-in fade-in duration-200">
            <h3 className="font-heading font-extrabold text-xl text-slate-900 mb-4">
              Technical Specifications
            </h3>
            <div className="divide-y divide-slate-100 bg-white rounded-3xl border border-slate-200 overflow-hidden">
              {Object.entries(product.specifications).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between p-4 text-xs sm:text-sm">
                  <span className="font-bold text-slate-500">{key}</span>
                  <span className="font-semibold text-slate-800 text-right">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Mascot Lore */}
        {activeTab === 'mascot' && (
          <div className="py-8 max-w-2xl space-y-4 animate-in fade-in duration-200">
            <div className="bg-amber-50 rounded-3xl p-6 border border-amber-200/80 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#2756E8] flex-shrink-0">
                <img src={product.mascotQuote.mascotAvatar} alt="Mascot" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-heading font-extrabold text-lg text-slate-900">
                  {product.mascotQuote.mascot}
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  "Every Stack'd design goes through rigorous fun testing. If it doesn't spark pure joy when you unbox it, we go back to the drawing board!"
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Reviews */}
        {activeTab === 'reviews' && (
          <div className="py-8 space-y-8 animate-in fade-in duration-200">
            
            {/* Reviews List */}
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center justify-between">
                <h3 className="font-heading font-extrabold text-xl text-slate-900">
                  Community Verified Feedback
                </h3>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  100% Verified Purchases
                </span>
              </div>

              {productReviews.length > 0 ? (
                productReviews.map((rev) => (
                  <div key={rev.id} className="p-5 bg-white rounded-3xl border border-slate-200 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>
                    <h5 className="font-heading font-bold text-sm text-slate-900">"{rev.title}"</h5>
                    <p className="text-xs text-slate-600 leading-relaxed">{rev.comment}</p>
                    <p className="text-[11px] text-slate-400 font-bold pt-1">— {rev.author} ({rev.location})</p>
                  </div>
                ))
              ) : (
                <div className="p-5 bg-white rounded-3xl border border-slate-200 text-xs text-slate-500">
                  Be the first to leave a review for this stack item!
                </div>
              )}
            </div>

            {/* Write a review form */}
            <div className="max-w-xl bg-white p-6 rounded-3xl border border-amber-200/80 shadow-xs space-y-4">
              <h4 className="font-heading font-extrabold text-lg text-slate-900">
                Write a Review
              </h4>

              {reviewSubmitted ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 font-bold">
                  🎉 Thank you for your review! Our mascot team has approved and posted your review.
                </div>
              ) : (
                <form onSubmit={handleReviewSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="e.g. Jessica T."
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Rating</label>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ 5 Stars (Obsessed!)</option>
                      <option value={4}>⭐⭐⭐⭐ 4 Stars (Great!)</option>
                      <option value={3}>⭐⭐⭐ 3 Stars (Average)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Review Headline</label>
                    <input
                      type="text"
                      required
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="e.g. Cutest desk addition ever!"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Review</label>
                    <textarea
                      required
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="Share your unboxing thoughts, build quality, and stack setup..."
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2756E8]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-3d btn-3d-blue px-6 py-2.5 rounded-xl font-heading font-bold text-xs"
                  >
                    Submit Review
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>

      {/* FREQUENTLY STACKED TOGETHER */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="px-3 py-1 rounded-full bg-blue-100 text-[#2756E8] text-xs font-heading font-extrabold uppercase tracking-wider">
              Pair & Stack
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1">
              Complete Your Stack Setup
            </h3>
          </div>
          <Link to="/shop" className="text-xs font-heading font-bold text-[#2756E8] hover:underline flex items-center space-x-1">
            <span>View Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};
