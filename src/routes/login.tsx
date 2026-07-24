import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [
    { title: 'Login — Parfumistry' },
    { name: 'description', content: 'Login page.' },
    { property: 'og:title', content: 'Login — Parfumistry' },
    { property: 'og:description', content: 'Login page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Login</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
