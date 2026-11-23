import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../data/products';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { TactileLink } from '../components/TactileButton';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const savedProducts = PRODUCTS_DATA.filter((p) => wishlist.includes(p.id));

  if (savedProducts.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto bg-pink-50 p-2 shadow-inner border-2 border-pink-200">
          <img
            src="/mascots/mascot-pink.jpg"
            alt="Empty wishlist mascot"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-3xl text-slate-900">
            Your Wishlist is Empty
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            Tap the heart icon on any collectible or accessory to save it for your dream stack!
          </p>
        </div>
        <div>
          <TactileLink
            to="/shop"
            delayMs={160}
            className="btn-3d btn-3d-blue px-8 py-3.5 rounded-2xl font-heading font-bold text-sm inline-flex items-center space-x-2"
          >
            <span>Explore Goodies</span>
            <ArrowRight className="w-4 h-4" />
          </TactileLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-amber-200/60 pb-6">
        <div>
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#FF2E7E] text-xs font-heading font-extrabold">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Saved Favorites</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-2">
            My Wishlist ({savedProducts.length})
          </h1>
        </div>

        <Link
          to="/shop"
          className="btn-3d btn-3d-white px-5 py-2.5 rounded-2xl font-heading font-bold text-xs border border-slate-200 self-start sm:self-auto"
        >
          <span>Continue Shopping</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {savedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
