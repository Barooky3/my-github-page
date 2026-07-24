import { createFileRoute, Link } from '@tanstack/react-router';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { toast } from 'sonner';

export const Route = createFileRoute('/custom-bundle')({
  head: () => ({
    meta: [
      { title: 'Build Your Bundle — Parfumistry' },
      { name: 'description', content: 'Pick 3 fragrances, get one free. Build your own custom bundle.' },
      { property: 'og:title', content: 'Build Your Custom Bundle — Parfumistry' },
      { property: 'og:description', content: 'Buy 3, get 1 free. Design your own fragrance bundle.' },
    ],
  }),
  component: CustomBundle,
});

function CustomBundle() {
  const [selected, setSelected] = useState<string[]>([]);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const toggle = (id: string) => {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : s.length >= 4 ? s : [...s, id]));
  };

  const total = selected.reduce((sum, id) => sum + (products.find((p) => p.id === id)?.price ?? 0), 0);

  const addBundle = () => {
    if (selected.length < 3) {
      toast.error('Please select at least 3 fragrances.');
      return;
    }
    selected.forEach((id) => {
      const p = products.find((x) => x.id === id);
      if (p) addItem(p);
    });
    toast.success('Bundle added to cart!');
    setSelected([]);
  };

  return (
    <div className="container py-14 max-w-6xl">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Build Your Bundle</h1>
        <p className="text-sm text-muted-foreground">Pick 3 fragrances, get 1 free.</p>
      </div>

      <div className="sticky top-20 z-10 bg-background/95 backdrop-blur border-b border-border py-4 mb-8 flex items-center justify-between">
        <p className="text-sm">
          <span className="font-semibold">{selected.length}/4</span> selected
          {selected.length >= 3 && <span className="ml-3 text-accent">🎁 Free item unlocked</span>}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{formatPrice(total)}</span>
          <Button
            onClick={addBundle}
            disabled={selected.length < 3}
            className="rounded-none uppercase text-xs tracking-[0.15em]"
          >
            Add Bundle
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((p) => {
          const isSelected = selected.includes(p.id);
          return (
            <button
              key={p.id}
              onClick={() => toggle(p.id)}
              className={`relative text-left group ${isSelected ? 'ring-2 ring-accent' : ''}`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 z-10 h-8 w-8 rounded-full bg-accent text-accent-foreground flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              )}
              <div className="aspect-square bg-secondary overflow-hidden mb-3">
                <img src={p.image} alt={p.name} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground">{p.brand}</p>
              <p className="text-sm">{p.name}</p>
              <p className="text-sm font-semibold mt-1">{formatPrice(p.price)}</p>
            </button>
          );
        })}
      </div>

      <div className="text-center mt-10">
        <Link to="/shop" className="text-sm underline text-muted-foreground">Or browse individual fragrances</Link>
      </div>
    </div>
  );
}
