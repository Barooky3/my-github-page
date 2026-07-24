import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product, CartItem } from '@/types/product';

interface CartState { items: CartItem[]; isOpen: boolean; }

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; selectedMl?: number; selectedPrice?: number } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number; selectedMl?: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType extends CartState {
  addItem: (product: Product, selectedMl?: number, selectedPrice?: number) => void;
  removeItem: (productId: string, selectedMl?: number) => void;
  updateQuantity: (productId: string, quantity: number, selectedMl?: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  totalPrice: number;
  subtotalBeforeDiscount: number;
  freeItemDiscount: number;
  freeItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'profparfums-cart';

const keyOf = (id: string, ml?: number) => (ml ? `${id}-${ml}` : id);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, selectedMl, selectedPrice } = action.payload;
      const cartKey = keyOf(product.id, selectedMl);
      const existing = state.items.find((i) => keyOf(i.product.id, i.selectedMl) === cartKey);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            keyOf(i.product.id, i.selectedMl) === cartKey ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { ...state, items: [...state.items, { product, quantity: 1, selectedMl, selectedPrice }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => keyOf(i.product.id, i.selectedMl) !== action.payload) };
    case 'UPDATE_QUANTITY': {
      const { productId, quantity, selectedMl } = action.payload;
      const cartKey = keyOf(productId, selectedMl);
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((i) => keyOf(i.product.id, i.selectedMl) !== cartKey) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          keyOf(i.product.id, i.selectedMl) === cartKey ? { ...i, quantity } : i,
        ),
      };
    }
    case 'CLEAR_CART': return { ...state, items: [] };
    case 'TOGGLE_CART': return { ...state, isOpen: !state.isOpen };
    case 'OPEN_CART': return { ...state, isOpen: true };
    case 'CLOSE_CART': return { ...state, isOpen: false };
    case 'LOAD_CART': return { ...state, items: action.payload };
    default: return state;
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(CART_STORAGE_KEY) : null;
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch (e) { console.error('cart load', e); }
  }, []);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } catch (e) { console.error('cart save', e); }
  }, [state.items]);

  const addItem = (product: Product, selectedMl?: number, selectedPrice?: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, selectedMl, selectedPrice } });
    dispatch({ type: 'OPEN_CART' });
  };
  const removeItem = (productId: string, selectedMl?: number) =>
    dispatch({ type: 'REMOVE_ITEM', payload: keyOf(productId, selectedMl) });
  const updateQuantity = (productId: string, quantity: number, selectedMl?: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity, selectedMl } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });
  const toggleCart = () => dispatch({ type: 'TOGGLE_CART' });
  const openCart = () => dispatch({ type: 'OPEN_CART' });
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });

  const totalItems = state.items.reduce((s, i) => s + i.quantity, 0);
  const subtotalBeforeDiscount = state.items.reduce(
    (s, i) => s + (i.selectedPrice || i.product.price) * i.quantity, 0,
  );

  const allPrices: number[] = [];
  state.items.forEach((i) => {
    const price = i.selectedPrice || i.product.price;
    for (let k = 0; k < i.quantity; k++) allPrices.push(price);
  });
  allPrices.sort((a, b) => a - b);
  const freeItemsCount = Math.floor(allPrices.length / 3);
  let freeItemDiscount = 0;
  for (let k = 0; k < freeItemsCount; k++) freeItemDiscount += allPrices[k];
  const totalPrice = subtotalBeforeDiscount - freeItemDiscount;

  return (
    <CartContext.Provider value={{
      ...state, addItem, removeItem, updateQuantity, clearCart, toggleCart, openCart, closeCart,
      totalItems, totalPrice, subtotalBeforeDiscount, freeItemDiscount, freeItemsCount,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
