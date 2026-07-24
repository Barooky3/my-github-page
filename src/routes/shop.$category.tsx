import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/shop/$category')({
  head: () => ({ meta: [
    { title: 'Shop — Parfumistry' },
    { name: 'description', content: 'Browse fragrances by category.' },
  ]}),
  component: () => {
    const { category } = Route.useParams();
    return (
      <div className="container py-20 text-center">
        <h1 className="font-display text-3xl mb-4 capitalize">{category}</h1>
        <p className="text-muted-foreground">Coming in the next update.</p>
      </div>
    );
  },
});
