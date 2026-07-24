import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/checkout')({
  head: () => ({ meta: [
    { title: 'Checkout — Parfumistry' },
    { name: 'description', content: 'Checkout page.' },
    { property: 'og:title', content: 'Checkout — Parfumistry' },
    { property: 'og:description', content: 'Checkout page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Checkout</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
