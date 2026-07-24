import { createFileRoute, Link } from '@tanstack/react-router';
import { getProductById } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/product/$id')({
  head: ({ params }) => {
    const p = getProductById(params.id);
    return {
      meta: [
        { title: p ? `${p.name} — ${p.brand} | Parfumistry` : 'Product — Parfumistry' },
        { name: 'description', content: p?.description ?? 'Premium fragrance.' },
        { property: 'og:title', content: p ? `${p.name} — ${p.brand}` : 'Parfumistry' },
        { property: 'og:description', content: p?.description ?? 'Premium fragrance.' },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Product not found</h1>
      <Button asChild><Link to="/shop">Back to shop</Link></Button>
    </div>
  ),
});

function ProductDetail() {
  const { id } = Route.useParams();
  const product = getProductById(id);
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl mb-4">Product not found</h1>
        <Button asChild><Link to="/shop">Back to shop</Link></Button>
      </div>
    );
  }

  return (
    <div className="container py-14">
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div className="aspect-square bg-secondary">
          <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">{product.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl mb-4">{product.name}</h1>
          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-2xl font-semibold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
          <Button size="lg" className="rounded-none bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-xs uppercase tracking-[0.15em]"
            onClick={() => addItem(product)}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
