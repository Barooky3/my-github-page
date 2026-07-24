import type { Product } from '@/types/product';
import lvCityOfStarsAsset from '@/assets/products/lv-city-of-stars.png.asset.json';
import invictusVictoryElixirAsset from '@/assets/products/invictus-victory-elixir.png.asset.json';
import exNihiloBlueTalismanAsset from '@/assets/products/ex-nihilo-blue-talisman.png.asset.json';
import aventusAsset from '@/assets/products/aventus-gallery.png.asset.json';
import baccaratRouge540Asset from '@/assets/products/baccarat-rouge-540-extrait.png.asset.json';
import delinaImage from '@/assets/products/delina-lifestyle.png';

export const products: Product[] = [
  {
    id: 'lv-city-of-stars',
    name: 'City of Stars',
    brand: 'Louis Vuitton',
    price: 89,
    originalPrice: 320,
    category: 'unisex',
    description: 'A luminous fragrance evoking a starlit night.',
    image: lvCityOfStarsAsset.url,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
    addedAt: '2026-05-01',
  },
  {
    id: 'invictus-victory-elixir',
    name: 'Invictus Victory Elixir',
    brand: 'Paco Rabanne',
    price: 65,
    originalPrice: 145,
    category: 'men',
    description: 'A powerful, warm oriental elixir.',
    image: invictusVictoryElixirAsset.url,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
    addedAt: '2026-04-20',
  },
  {
    id: 'ex-nihilo-blue-talisman',
    name: 'Blue Talisman',
    brand: 'Ex Nihilo',
    price: 79,
    originalPrice: 260,
    category: 'unisex',
    description: 'A vibrant fruity floral with mystical depth.',
    image: exNihiloBlueTalismanAsset.url,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
    addedAt: '2026-04-10',
  },
  {
    id: 'aventus-creed',
    name: 'Aventus',
    brand: 'Creed',
    price: 95,
    originalPrice: 380,
    category: 'men',
    description: 'The legendary pineapple opening; a modern classic.',
    image: aventusAsset.url,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
  },
  {
    id: 'baccarat-rouge-540',
    name: 'Baccarat Rouge 540 Extrait',
    brand: 'Maison Francis Kurkdjian',
    price: 129,
    originalPrice: 450,
    category: 'unisex',
    description: 'Amber, floral and woody. Icon.',
    image: baccaratRouge540Asset.url,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
  },
  {
    id: 'delina',
    name: 'Delina',
    brand: 'Parfums de Marly',
    price: 89,
    originalPrice: 340,
    category: 'women',
    description: 'Rose, lychee and vanilla — modern feminine.',
    image: delinaImage,
    affiliateUrl: '#',
    inStock: true,
    featured: true,
  },
];

export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getBestsellers = () => products.filter((p) => p.featured);
