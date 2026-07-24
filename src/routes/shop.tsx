import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';

type Filter = 'all' | 'men' | 'women' | 'unisex';

export const Route = createFileRoute('/shop')({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || '' }),
  head: () => ({
    meta: [
      { title: 'Shop All Fragrances — Parfumistry' },
      { name: 'description', content: 'Browse our full collection of premium fragrances for men, women, and unisex.' },
      { property: 'og:title', content: 'Shop All Fragrances — Parfumistry' },
      { property: 'og:description', content: 'Browse our full collection of premium fragrances.' },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const { q } = Route.useSearch();
  const { t } = useLanguage();
  const [search, setSearch] = useState(q);
  const [filter, setFilter] = useState<Filter>('all');

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (filter !== 'all' && p.category !== filter) return false;
      if (search && !`${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, filter]);

  const tabs: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'men', label: 'Men' },
    { key: 'women', label: 'Women' },
    { key: 'unisex', label: 'Unisex' },
  ];

  return (
    <div className="container py-14">
      <div className="text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl mb-3">Shop All</h1>
        <p className="text-sm text-muted-foreground">Discover our curated collection.</p>
      </div>

      <div className="max-w-xl mx-auto mb-8 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t('shop.searchPlaceholder')}
          className="pl-10 h-11 rounded-none"
        />
      </div>

      <div className="flex justify-center gap-2 mb-10 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-5 h-10 text-xs uppercase tracking-[0.15em] border transition-colors ${
              filter === tab.key
                ? 'bg-primary text-primary-foreground border-primary'
                : 'bg-background text-foreground border-border hover:bg-accent hover:text-accent-foreground'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">No fragrances match your search.</p>
          <Link to="/shop" className="text-sm underline">Reset filters</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
