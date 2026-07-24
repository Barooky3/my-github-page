import { useState, useEffect, useRef } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { ShoppingBag, Menu, X, User, ChevronDown, HelpCircle } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useCurrency, CURRENCIES } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/shop/men', key: 'nav.men' },
  { href: '/shop/women', key: 'nav.women' },
  { href: '/shop', key: 'nav.shopAll' },
  { href: '/contact', key: 'nav.contact' },
] as const;

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const { toggleCart, totalItems } = useCart();
  const { currency, setCurrency } = useCurrency();
  const { user } = useAuth();
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const currencyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target as Node)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <header
      className="fixed left-0 right-0 z-40 bg-background/40 backdrop-blur-md border-b border-border/30"
      style={{ top: 'var(--promo-banner-height, 0px)', transition: 'top 0.3s ease-out', marginBottom: '8px' }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center shrink-0">
            <span className="text-base sm:text-[1.35rem] md:text-xl font-semibold tracking-[0.15em] text-foreground uppercase">
              Parfumistry
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 ml-8 mr-auto">
            <a
              href="/#faq"
              className={cn(
                'relative flex items-center gap-1.5 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95',
                'bg-accent text-accent-foreground ring-2 ring-accent/40 ring-offset-2 ring-offset-background',
              )}
            >
              <HelpCircle className="h-3.5 w-3.5" strokeWidth={2.5} />
              FAQ
            </a>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-xs font-medium tracking-[0.15em] transition-colors hover:text-accent',
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground',
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className="md:hidden flex-1 flex items-center justify-center px-1 sm:px-2 min-w-0">
            <a
              href="/#faq"
              className="flex items-center gap-1 sm:gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase shadow-lg shadow-accent/25 ring-2 ring-accent/60 ring-offset-2 ring-offset-background transition-all active:scale-95 shrink-0 animate-pulse bg-accent text-accent-foreground"
              aria-label="FAQ"
            >
              <HelpCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={2.5} />
              <span>FAQ</span>
            </a>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-3 md:pl-6 shrink-0">
            <div ref={currencyRef} className="relative md:mr-1">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="flex items-center gap-0.5 sm:gap-1 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-3 md:py-1.5 border border-border rounded-sm text-[10px] md:text-xs font-medium text-foreground hover:border-foreground/50 transition-colors"
              >
                {currency}
                <ChevronDown className={cn('h-3 w-3 md:h-3.5 md:w-3.5 text-muted-foreground transition-transform', currencyOpen && 'rotate-180')} />
              </button>
              {currencyOpen && (
                <div className="absolute right-0 top-full mt-1 bg-background border border-border rounded-sm shadow-lg z-50 max-h-64 overflow-y-auto min-w-[100px]">
                  {CURRENCIES.map((c) => (
                    <button
                      key={c.code}
                      onClick={() => { setCurrency(c.code); setCurrencyOpen(false); }}
                      className={cn(
                        'w-full text-left px-3 py-2 text-xs font-medium transition-colors flex items-center gap-2',
                        currency === c.code ? 'bg-secondary text-foreground' : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                      )}
                    >
                      <span>{c.symbol}</span>
                      <span>{c.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-foreground hover:text-accent hover:bg-transparent" asChild>
              <Link to={user ? '/account' : '/login'} aria-label={user ? 'My Account' : 'Account'}>
                <User className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} />
              </Link>
            </Button>

            <Button
              variant="ghost" size="icon"
              className="relative h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10 text-foreground hover:text-accent hover:bg-transparent"
              onClick={toggleCart}
              aria-label="Open cart"
            >
              <ShoppingBag className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-0.5 -right-0.5 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-accent text-accent-foreground text-[9px] sm:text-[10px] flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              )}
            </Button>

            <Button
              variant="ghost" size="icon"
              className="md:hidden h-8 w-8 sm:h-9 sm:w-9 text-foreground hover:text-accent hover:bg-transparent"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} /> : <Menu className="h-[18px] w-[18px] sm:h-5 sm:w-5" strokeWidth={1.5} />}
            </Button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden absolute left-0 right-0 top-full bg-background border-b border-border overflow-hidden z-40">
          <nav className="container py-6 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-sm font-medium tracking-[0.1em] py-3 transition-colors border-b border-border block',
                  pathname === link.href ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {t(link.key)}
              </Link>
            ))}
            <Link
              to={user ? '/account' : '/login'}
              className="text-sm font-medium tracking-[0.1em] py-3 text-muted-foreground hover:text-foreground block"
            >
              {t(user ? 'nav.myAccount' : 'nav.account')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
