// Product types
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand?: string;
  description?: string;
  rating?: number;
  reviews?: number;
}

// Filter types
export interface Filters {
  category: string[];
  priceRange: [number, number];
  searchTerm: string;
  brand?: string[];
}

// Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
}

// Context types
export interface CartContextType {
  cart: Cart;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}
