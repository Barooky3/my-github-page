import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/signup')({
  head: () => ({ meta: [
    { title: 'Signup — Parfumistry' },
    { name: 'description', content: 'Signup page.' },
    { property: 'og:title', content: 'Signup — Parfumistry' },
    { property: 'og:description', content: 'Signup page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Signup</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
