import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, Search } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/product';
import { getBestsellers, products } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import heroImage from '@/assets/hero-perfumes.webp';
import logo from '@/assets/logo.png';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Parfumistry — Premium Fragrances at Unbeatable Prices' },
      { name: 'description', content: 'Discover premium fragrances for men and women. Fast DHL shipping, verified stock, ridiculous prices.' },
      { property: 'og:title', content: 'Parfumistry — Premium Fragrances' },
      { property: 'og:description', content: 'Fragrances at unbeatable grey market prices.' },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const bestsellers = getBestsellers();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = searchQuery.trim()
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()))
    : bestsellers;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate({ to: '/shop', search: { q: searchQuery.trim() } });
    }
  };

  const features = [
    { label: t('hero.instantDelivery') },
    { label: t('hero.verifiedSellers') },
    { label: t('hero.premiumQuality') },
  ];

  return (
    <div className="min-h-screen">
      <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 overflow-hidden hero-bg-animate">
          <img src={heroImage} alt="" role="presentation" width={1920} height={1080}
            className="w-full h-full object-cover object-center blur-[2px]" />
        </div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 45%, transparent 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.85) 100%)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80" />

        <div className="container relative z-10 text-center">
          <div className="max-w-2xl mx-auto hero-content-animate">
            <div className="relative -mt-4 hero-logo-animate">
              <div className="absolute -inset-8 blur-[100px] hero-glow-pulse"
                style={{ background: 'radial-gradient(circle at 50% 50%, hsl(345 60% 40% / 0.8), hsl(345 40% 25% / 0.4) 50%, transparent 75%)' }} />
              <div className="absolute -inset-24 blur-[150px] hero-glow-pulse-secondary"
                style={{ background: 'radial-gradient(circle at 50% 50%, hsl(345 50% 50% / 0.6), transparent 60%)' }} />
              <img src={logo} alt="Parfumistry" width={800} height={533}
                className="h-auto w-[540px] md:w-[700px] lg:w-[920px] mx-auto relative z-10 brightness-0 invert drop-shadow-2xl object-contain" />
            </div>
            <p className="font-display text-xs md:text-sm lg:text-base text-white/70 tracking-[0.2em] uppercase -mt-10 md:-mt-14 lg:-mt-20 mb-6">
              The Fragrance Library
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 hero-buttons-animate">
              <Button size="lg"
                className="h-12 px-10 text-[11px] font-medium tracking-[0.15em] uppercase bg-accent text-accent-foreground hover:bg-accent/90 rounded-none"
                onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}>
                {t('hero.shopNow')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
              <Button variant="outline" size="lg"
                className="h-12 px-10 text-[11px] font-medium tracking-[0.15em] uppercase border-white/40 text-white bg-transparent hover:bg-white/10 hover:border-white/60 rounded-none"
                asChild>
                <Link to="/shop/women">{t('hero.forHer')}</Link>
              </Button>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 mt-8 hero-trust-animate">
              {features.map((f, i) => (
                <span key={i} className="text-[10px] tracking-[0.15em] text-white/50 font-light uppercase">{f.label}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hero-scroll-animate">
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/40 to-transparent" />
        </div>
      </section>

      <section id="bestsellers" className="pt-14 md:pt-20 pb-14 md:pb-20 bg-background">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 md:mb-12">
            <h2 className="font-display text-2xl md:text-3xl lg:text-4xl text-foreground">
              {t('home.currentBestSellers')}
            </h2>
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input type="text" placeholder={t('shop.searchPlaceholder')}
                value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-10 rounded-none border-border bg-background text-sm" />
            </form>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-5">
            {filtered.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {searchQuery.trim() && filtered.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No fragrances found matching "{searchQuery}"
            </p>
          )}

          <div className="text-center mt-10">
            <Button size="lg"
              className="h-12 px-10 text-[11px] font-medium tracking-[0.12em] uppercase rounded-none bg-accent text-accent-foreground hover:bg-accent/90"
              asChild>
              <Link to="/shop">
                {t('home.viewAllProducts')}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="faq" className="py-14 md:py-20 bg-secondary">
        <div className="container max-w-3xl mx-auto text-center">
          <img src={logo} alt="Parfumistry" width={800} height={533}
            className="h-14 md:h-16 w-auto mx-auto mb-5 opacity-80" />
          <h2 className="font-display text-xl md:text-2xl lg:text-3xl text-foreground mb-3">Join Parfumistry</h2>
          <p className="text-sm text-muted-foreground mb-6">{t('home.exclusiveOffers')}</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder={t('home.enterEmail')}
              className="flex-1 h-11 px-4 bg-background text-foreground text-sm border border-border focus:outline-none focus:border-foreground placeholder:text-muted-foreground transition-colors" />
            <Button type="submit"
              className="h-11 px-6 text-[11px] font-medium tracking-[0.1em] uppercase bg-primary hover:bg-primary/90 text-primary-foreground rounded-none">
              {t('home.subscribe')}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4">{t('home.noSpam')}</p>
        </div>
      </section>
    </div>
  );
}
