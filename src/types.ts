export interface ProductRating {
  rate: number;
  count: number;
}

export interface ProductItem {
  id?: number | string;
  title: string;
  price: number | string;
  originalPrice?: number;
  description?: string;
  category?: string;
  image: string;
  rating?: ProductRating;
  inStock?: boolean;
  isFeatured?: boolean;
  colors?: string[];
  sizes?: string[];
}

export interface CartItem extends ProductItem {
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'card';
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export type ViewMode =
  | 'home'
  | 'add-product'
  | 'favorites'
  | 'orders'
  | 'login'
  | 'about'
  | 'contact';

export type Language = 'ar' | 'en';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
