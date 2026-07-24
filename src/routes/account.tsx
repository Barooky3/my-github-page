import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/account')({
  head: () => ({ meta: [
    { title: 'Account — Parfumistry' },
    { name: 'description', content: 'Account page.' },
    { property: 'og:title', content: 'Account — Parfumistry' },
    { property: 'og:description', content: 'Account page.' },
  ]}),
  component: () => (
    <div className="container py-20 text-center">
      <h1 className="font-display text-3xl mb-4">Account</h1>
      <p className="text-muted-foreground">Coming in the next update.</p>
    </div>
  ),
});
