import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

export type Language = 'EN' | 'NL' | 'DE' | 'FR' | 'ES' | 'IT' | 'CS' | 'PL' | 'PT' | 'SV' | 'DA' | 'RO' | 'TR' | 'RU' | 'NO' | 'HU' | 'EL' | 'BG' | 'HR' | 'SK';

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'NL', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'DE', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'FR', label: 'Français', flag: '🇫🇷' },
  { code: 'ES', label: 'Español', flag: '🇪🇸' },
  { code: 'IT', label: 'Italiano', flag: '🇮🇹' },
  { code: 'PT', label: 'Português', flag: '🇵🇹' },
  { code: 'TR', label: 'Türkçe', flag: '🇹🇷' },
  { code: 'RU', label: 'Русский', flag: '🇷🇺' },
  { code: 'PL', label: 'Polski', flag: '🇵🇱' },
  { code: 'CS', label: 'Čeština', flag: '🇨🇿' },
  { code: 'SV', label: 'Svenska', flag: '🇸🇪' },
  { code: 'DA', label: 'Dansk', flag: '🇩🇰' },
  { code: 'NO', label: 'Norsk', flag: '🇳🇴' },
  { code: 'RO', label: 'Română', flag: '🇷🇴' },
  { code: 'HU', label: 'Magyar', flag: '🇭🇺' },
  { code: 'EL', label: 'Ελληνικά', flag: '🇬🇷' },
  { code: 'BG', label: 'Български', flag: '🇧🇬' },
  { code: 'HR', label: 'Hrvatski', flag: '🇭🇷' },
  { code: 'SK', label: 'Slovenčina', flag: '🇸🇰' },
];

// Milestone 1: English strings only. Full multilingual dictionary (20 langs) restored in later milestone.
const en: Record<string, string> = {
  'nav.men': 'MEN',
  'nav.women': 'WOMEN',
  'nav.shopAll': 'SHOP ALL',
  'nav.contact': 'CONTACT',
  'nav.account': 'ACCOUNT',
  'nav.myAccount': 'MY ACCOUNT',
  'hero.shopNow': 'Shop Now',
  'hero.forHer': 'For Her',
  'hero.instantDelivery': 'Fast DHL Shipping',
  'hero.verifiedSellers': 'Verified Stock',
  'hero.premiumQuality': 'Ridiculous Prices',
  'home.currentBestSellers': 'Current Bestsellers',
  'home.viewAllProducts': 'View All Products',
  'home.exclusiveOffers': 'Exclusive offers and new arrivals, delivered to your inbox.',
  'home.enterEmail': 'Enter your email',
  'home.subscribe': 'Subscribe',
  'home.noSpam': 'No spam. Unsubscribe anytime.',
  'shop.searchPlaceholder': 'Search fragrances...',
  'promo.title': 'Limited-Time Fragrance Sale',
  'promo.subtitle': 'Save big on premium scents. Ends soon.',
  'promo.days': 'Days',
  'promo.hours': 'Hours',
  'promo.mins': 'Mins',
  'promo.secs': 'Secs',
  'cart.shoppingCart': 'Shopping Cart',
  'cart.empty': 'Your cart is empty',
  'cart.emptyDesc': 'Add some fragrances to get started.',
  'cart.startShopping': 'Start Shopping',
  'cart.remove': 'Remove',
  'cart.subtotal': 'Subtotal',
  'cart.total': 'Total',
  'cart.buy2get1': 'Buy 3 Get 1 Free',
  'cart.freeFragranceSave': 'free item — you save',
  'cart.freeDiscount': 'Free item discount',
  'cart.proceedCheckout': 'Proceed to Checkout',
  'cart.continueShopping': 'Continue Shopping',
  'footer.description': 'Premium fragrances for men and women. Quality scents at unbeatable prices.',
  'footer.shop': 'Shop',
  'footer.menCollection': "Men's Collection",
  'footer.womenCollection': "Women's Collection",
  'footer.allProducts': 'All Products',
  'footer.support': 'Support',
  'footer.contactUs': 'Contact Us',
  'footer.privacyPolicy': 'Privacy Policy',
  'footer.returnsRefunds': 'Returns & Refunds',
  'footer.termsOfService': 'Terms of Service',
  'footer.faq': 'FAQ',
  'footer.stayUpdated': 'Stay Updated',
  'footer.subscribeDesc': 'Sign up for exclusive drops and offers.',
  'footer.enterEmail': 'Enter your email',
  'footer.rights': 'All rights reserved.',
  'footer.secureCheckout': 'Secure Checkout',
};

interface LangCtx {
  language: Language;
  setLanguage: (l: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LangCtx | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const stored = localStorage.getItem('profparfums-language');
    if (stored) setLanguageState(stored as Language);
  }, []);

  const setLanguage = (l: Language) => {
    setLanguageState(l);
    localStorage.setItem('profparfums-language', l);
  };

  const t = (key: string) => en[key] ?? key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
