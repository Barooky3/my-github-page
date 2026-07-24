import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { cn } from '@/lib/utils';
import type { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
  imageBgClassName?: string;
  hideCategoryBadge?: boolean;
  imageWrapperClassName?: string;
  paddingContext?: string;
}

export const ProductCard = ({ product, imageBgClassName, imageWrapperClassName }: ProductCardProps) => {
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="group flex flex-col">
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className={cn(
          'relative aspect-[3/4] bg-secondary overflow-hidden mb-3',
          imageBgClassName,
          imageWrapperClassName,
        )}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="absolute top-2 left-2 bg-accent text-accent-foreground text-[9px] font-bold tracking-wider uppercase px-2 py-1">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </span>
        )}
      </Link>
      <div className="flex flex-col gap-1">
        <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{product.brand}</p>
        <Link
          to="/product/$id"
          params={{ id: product.id }}
          className="text-sm font-medium text-foreground hover:text-accent transition-colors line-clamp-2"
        >
          {product.name}
        </Link>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-semibold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
        <Button
          size="sm"
          className="h-9 mt-2 text-[10px] font-medium tracking-[0.15em] uppercase rounded-none bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => addItem(product)}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};
