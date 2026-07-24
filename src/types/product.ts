export type ProductCategory = 'men' | 'women' | 'unisex' | 'bundle';

export interface ProductVariant {
  ml: number;
  price: number;
  originalPrice?: number;
  inStock: boolean;
  label?: string;
  note?: string;
  galleryImage?: string;
}

export interface BundleFragrance {
  name: string;
  topNote: string;
  heartNote: string;
  baseNote: string;
  accentColor: string;
  affiliateUrl?: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  description: string;
  scentNotes?: { top: string[]; heart: string[]; base: string[] };
  scentNoteImages?: Record<string, string>;
  scentNotesImage?: string;
  accentColor?: string;
  image: string;
  additionalImages?: string[];
  affiliateUrl: string;
  inStock: boolean;
  featured?: boolean;
  variants?: ProductVariant[];
  isBundle?: boolean;
  bundleContents?: BundleFragrance[];
  imagePadding?: string;
  bundleImages?: string[];
  hotDeal?: boolean;
  addedAt?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMl?: number;
  selectedPrice?: number;
}
