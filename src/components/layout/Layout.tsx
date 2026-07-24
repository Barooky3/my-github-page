import type { ReactNode } from 'react';
import { PromoBanner } from './PromoBanner';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';

export const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col bg-background">
    <PromoBanner />
    <Header />
    <main className="flex-1" style={{ paddingTop: 'calc(var(--promo-banner-height, 0px) + 64px)' }}>
      {children}
    </main>
    <Footer />
    <CartDrawer />
  </div>
);
