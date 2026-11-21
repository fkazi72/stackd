export interface Product {
  id: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  category: 'blind-boxes' | 'figures' | 'plushies' | 'drinkware' | 'stationery' | 'desk-tech';
  categoryLabel: string;
  badge?: 'Bestseller' | 'New Drop' | 'Limited' | 'Staff Favorite' | 'Rare' | 'Hot';
  images: string[];
  description: string;
  mascotQuote: {
    mascot: string;
    quote: string;
    mascotAvatar: string;
    color: string;
  };
  features: string[];
  specifications: Record<string, string>;
  inStock: boolean;
  stockLeft?: number;
  variants?: {
    name: string;
    options: {
      label: string;
      value: string;
      inStock?: boolean;
      colorHex?: string;
    }[];
  }[];
  isStackable: boolean;
  tags: string[];
}

export interface CartItem {
  id: string; // unique item id (productId + selected variants)
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

export interface Mascot {
  id: string;
  name: string;
  title: string;
  tagline: string;
  colorName: string;
  themeColor: string;
  bgLight: string;
  borderColor: string;
  personality: string;
  favoriteItem: string;
  funFact: string;
  catchphrase: string;
  image: string;
}

export interface Review {
  id: string;
  productId?: string;
  author: string;
  location?: string;
  verified: boolean;
  rating: number;
  title: string;
  comment: string;
  date: string;
  helpfulCount: number;
  productName?: string;
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingMethod: string;
  paymentMethod: string;
  status: 'confirmed' | 'packing' | 'shipping' | 'delivered';
  trackingNumber: string;
}
