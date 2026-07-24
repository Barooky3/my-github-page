import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product';
import type { ProductCategory } from '@/types/product';

const VALID: ProductCategory[] = ['men', 'women', 'unisex', 'bundle'];

const TITLES: Record<string, { title: string; desc: string }> = {
  men: { title: "Men's Fragrances", desc: 'Bold, refined scents for the modern man.' },
  women: { title: "Women's Fragrances", desc: 'Elegant, captivating scents for her.' },
  unisex: { title: 'Unisex Fragrances', desc: 'Scents that defy convention.' },
  bundle: { title: 'Fragrance Bundles', desc: 'Curated sets at unbeatable prices.' },
};

export const Route = createFileRoute('/shop/$category')({
  head: ({ params }) => {
    const meta = TITLES[params.category] ?? { title: 'Shop', desc: 'Browse fragrances.' };
    return {
      meta: [
        { title: `${meta.title} — Parfumistry` },
        { name: 'description', content: meta.desc },
        { property: 'og:title', content: `${meta.title} — Parfumistry` },
        { property: 'og:description', content: meta.desc },
      ],
    };
  },
  loader: ({ params }) => {
    if (!VALID.includes(params.category as ProductCategory)) throw notFound();
    return {};
  },
  notFoundComponent: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Category not found</h1>
      <Link to="/shop" className="text-sm underline">Browse all fragrances</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const meta = TITLES[category];
  const items = products.filter((p) => p.category === category);

  return (
    <div className="container py-14">
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl md:text-5xl mb-3">{meta.title}</h1>
        <p className="text-sm text-muted-foreground">{meta.desc}</p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground mb-4">No fragrances in this category yet.</p>
          <Link to="/shop" className="text-sm underline">Browse all</Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
