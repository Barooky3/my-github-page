import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/privacy-policy')({
  head: () => ({ meta: [
    { title: 'Privacy Policy — Parfumistry' },
    { name: 'description', content: 'Privacy Policy page.' },
    { property: 'og:title', content: 'Privacy Policy — Parfumistry' },
    { property: 'og:description', content: 'Privacy Policy page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Privacy Policy</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
