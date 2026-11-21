import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { PROMO_CODES } from '../data/reviews';
import confetti from 'canvas-confetti';

interface CartContextType {
  cart: CartItem[];
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, selectedVariants?: Record<string, string>, openDrawer?: boolean) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  appliedPromo: string | null;
  promoError: string | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  itemCount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  shippingProgressPercent: number;
  toastMessage: string | null;
  clearToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'stackd_cart_v1';
const PROMO_STORAGE_KEY = 'stackd_promo_v1';
const FREE_SHIPPING_THRESHOLD = 50;
const STANDARD_SHIPPING_FEE = 5.99;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [cartOpen, setCartOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PROMO_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [promoError, setPromoError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem(PROMO_STORAGE_KEY, appliedPromo);
      } else {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      }
    } catch (e) {
      console.error('Failed to save promo', e);
    }
  }, [appliedPromo]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const clearToast = () => setToastMessage(null);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedVariants: Record<string, string> = {},
    openDrawer = true
  ) => {
    // Generate a unique item id based on product and variant combinations
    const variantKey = Object.entries(selectedVariants)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const itemId = variantKey ? `${product.id}-${variantKey}` : product.id;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prev, { id: itemId, product, quantity, selectedVariants }];
      }
    });

    showToast(`Added "${product.name}" to your stack! 🎉`);

    if (openDrawer) {
      setCartOpen(true);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromo = (code: string): boolean => {
    const cleaned = code.trim().toUpperCase();
    if (PROMO_CODES[cleaned]) {
      setAppliedPromo(cleaned);
      setPromoError(null);
      showToast(`Promo code "${cleaned}" applied! ✨`);
      // Celebration confetti
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.8 },
          colors: ['#2756E8', '#FF2E7E', '#FFD12F', '#06D6A0'],
        });
      } catch {
        // ignore
      }
      return true;
    } else {
      setPromoError('Oops! That promo code is invalid or has expired.');
      return false;
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Progressive bundle discount if user stacks 3 or more items
  let bundleDiscountPercent = 0;
  if (itemCount >= 5) {
    bundleDiscountPercent = 20; // 20% off for 5+ items stacked
  } else if (itemCount >= 3) {
    bundleDiscountPercent = 10; // 10% off for 3+ items stacked
  }

  let promoDiscountPercent = 0;
  let hasFreeShippingPromo = false;

  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    promoDiscountPercent = PROMO_CODES[appliedPromo].discountPercent;
    if (PROMO_CODES[appliedPromo].freeShipping) {
      hasFreeShippingPromo = true;
    }
  }

  // Use higher discount between promo or stack bundle discount
  const activeDiscountPercent = Math.max(promoDiscountPercent, bundleDiscountPercent);
  const discount = Math.round((subtotal * activeDiscountPercent) / 100 * 100) / 100;

  const qualifiesForFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD || hasFreeShippingPromo;
  const shipping = subtotal === 0 ? 0 : (qualifiesForFreeShipping ? 0 : STANDARD_SHIPPING_FEE);
  const total = Math.max(0, Math.round((subtotal - discount + shipping) * 100) / 100);

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shippingProgressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        setCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        promoError,
        applyPromo,
        removePromo,
        subtotal,
        discount,
        shipping,
        total,
        itemCount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        shippingProgressPercent,
        toastMessage,
        clearToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
