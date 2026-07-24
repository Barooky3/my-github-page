import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/shop')({
  validateSearch: (s: Record<string, unknown>) => ({ q: (s.q as string) || '' }),
  head: () => ({ meta: [
    { title: 'Shop All Fragrances — Parfumistry' },
    { name: 'description', content: 'Browse our full collection of premium fragrances.' },
    { property: 'og:title', content: 'Shop All Fragrances — Parfumistry' },
    { property: 'og:description', content: 'Browse our full collection of premium fragrances.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Shop</h1>
      <p className="text-muted-foreground">Full shop coming in the next update.</p>
    </div>
  ),
});
