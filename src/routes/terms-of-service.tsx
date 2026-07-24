import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/terms-of-service')({
  head: () => ({ meta: [
    { title: 'Terms Of Service — Parfumistry' },
    { name: 'description', content: 'Terms Of Service page.' },
    { property: 'og:title', content: 'Terms Of Service — Parfumistry' },
    { property: 'og:description', content: 'Terms Of Service page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Terms Of Service</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
