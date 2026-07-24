import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  head: () => ({ meta: [
    { title: 'Contact — Parfumistry' },
    { name: 'description', content: 'Contact page.' },
    { property: 'og:title', content: 'Contact — Parfumistry' },
    { property: 'og:description', content: 'Contact page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Contact</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
