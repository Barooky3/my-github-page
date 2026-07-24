import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/return-policy')({
  head: () => ({ meta: [
    { title: 'Return Policy — Parfumistry' },
    { name: 'description', content: 'Return Policy page.' },
    { property: 'og:title', content: 'Return Policy — Parfumistry' },
    { property: 'og:description', content: 'Return Policy page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Return Policy</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
