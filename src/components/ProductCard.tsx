import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Plus, Sparkles, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFavorited = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const quantityInCart = cartItem ? cartItem.quantity : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first variant if exists
    const defaultVariants: Record<string, string> = {};
    if (product.variants && product.variants.length > 0) {
      product.variants.forEach(v => {
        defaultVariants[v.name] = v.options[0].value;
      });
    }
    addToCart(product, 1, defaultVariants, true);
  };

  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-[#2756E8] text-white';
      case 'Limited':
        return 'bg-[#FF2E7E] text-white';
      case 'New Drop':
        return 'bg-[#06D6A0] text-emerald-950';
      case 'Staff Favorite':
        return 'bg-[#FFD12F] text-amber-950';
      case 'Hot':
        return 'bg-gradient-to-r from-orange-500 to-pink-500 text-white';
      default:
        return 'bg-slate-800 text-white';
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-amber-100/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden relative">
      
      {/* Top Media Container */}
      <div className="relative aspect-square overflow-hidden bg-amber-50/40">
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3 z-10">
            <span className={`px-3 py-1 rounded-full text-xs font-heading font-extrabold shadow-sm flex items-center space-x-1 ${getBadgeStyle(product.badge)}`}>
              <Sparkles className="w-3 h-3" />
              <span>{product.badge}</span>
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isFavorited
              ? 'bg-[#FF2E7E] text-white'
              : 'bg-white/80 hover:bg-white text-slate-400 hover:text-[#FF2E7E]'
          }`}
          aria-label="Add to wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Link to detail */}
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Mascot Speech Bubble Pill */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-slate-100 shadow-xs flex items-center space-x-1.5 text-[11px] font-semibold text-slate-700 truncate">
            <img
              src={product.mascotQuote.mascotAvatar}
              alt={product.mascotQuote.mascot}
              className="w-4 h-4 rounded-full flex-shrink-0"
            />
            <span className="truncate">
              <strong>{product.mascotQuote.mascot.split(' ')[0]}:</strong> "{product.mascotQuote.quote}"
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
            <span>{product.categoryLabel}</span>
            <div className="flex items-center space-x-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({product.reviewsCount})</span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="font-heading font-bold text-base sm:text-lg text-slate-800 hover:text-[#2756E8] line-clamp-2 transition-colors"
          >
            {product.name}
          </Link>
          
          <p className="text-xs text-slate-500 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Bottom Price & Add to Stack CTA */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1.5">
              <span className="font-heading font-extrabold text-xl text-[#2756E8]">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {product.stockLeft && product.stockLeft < 10 && (
              <span className="text-[10px] font-bold text-rose-500">
                Only {product.stockLeft} left!
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`btn-3d px-3.5 py-2 rounded-2xl font-heading font-bold text-xs flex items-center space-x-1.5 shadow-sm transition-all ${
              quantityInCart > 0
                ? 'btn-3d-mint'
                : 'btn-3d-blue'
            }`}
            aria-label={`Add ${product.name} to stack`}
          >
            {quantityInCart > 0 ? (
              <>
                <Check className="w-4 h-4" />
                <span>Stacked ({quantityInCart})</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Stack It</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
