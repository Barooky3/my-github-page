import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export type Currency =
  | 'EUR' | 'GBP' | 'USD' | 'CHF' | 'SEK' | 'DKK' | 'NOK' | 'ISK'
  | 'PLN' | 'CZK' | 'HUF' | 'RON' | 'HRK' | 'TRY' | 'RUB' | 'UAH'
  | 'CAD' | 'MXN' | 'BRL' | 'ARS' | 'CLP' | 'COP' | 'PEN'
  | 'JPY' | 'KRW' | 'CNY' | 'INR' | 'THB' | 'VND' | 'IDR' | 'MYR' | 'SGD' | 'PHP' | 'AED' | 'SAR'
  | 'AUD' | 'NZD' | 'ZAR' | 'EGP' | 'MAD' | 'NGN';

interface CurrencyInfo { code: Currency; symbol: string; rate: number; locale: string; }

export const CURRENCIES: CurrencyInfo[] = [
  { code: 'EUR', symbol: '€', rate: 1, locale: 'nl-NL' },
  { code: 'GBP', symbol: '£', rate: 0.864, locale: 'en-GB' },
  { code: 'USD', symbol: '$', rate: 1.163, locale: 'en-US' },
  { code: 'CHF', symbol: 'CHF', rate: 0.914, locale: 'de-CH' },
  { code: 'SEK', symbol: 'kr', rate: 10.82, locale: 'sv-SE' },
  { code: 'DKK', symbol: 'kr', rate: 7.47, locale: 'da-DK' },
  { code: 'NOK', symbol: 'kr', rate: 10.77, locale: 'nb-NO' },
  { code: 'PLN', symbol: 'zł', rate: 4.23, locale: 'pl-PL' },
  { code: 'CZK', symbol: 'Kč', rate: 24.26, locale: 'cs-CZ' },
  { code: 'HUF', symbol: 'Ft', rate: 355, locale: 'hu-HU' },
  { code: 'RON', symbol: 'lei', rate: 5.24, locale: 'ro-RO' },
  { code: 'HRK', symbol: 'kn', rate: 7.53, locale: 'hr-HR' },
  { code: 'ISK', symbol: 'kr', rate: 143.6, locale: 'is-IS' },
  { code: 'TRY', symbol: '₺', rate: 53.4, locale: 'tr-TR' },
  { code: 'RUB', symbol: '₽', rate: 83.7, locale: 'ru-RU' },
  { code: 'UAH', symbol: '₴', rate: 51.5, locale: 'uk-UA' },
  { code: 'CAD', symbol: 'C$', rate: 1.607, locale: 'en-CA' },
  { code: 'MXN', symbol: 'MX$', rate: 20.11, locale: 'es-MX' },
  { code: 'BRL', symbol: 'R$', rate: 5.84, locale: 'pt-BR' },
  { code: 'ARS', symbol: 'ARS', rate: 1638, locale: 'es-AR' },
  { code: 'CLP', symbol: 'CLP', rate: 1043, locale: 'es-CL' },
  { code: 'COP', symbol: 'COP', rate: 4244, locale: 'es-CO' },
  { code: 'PEN', symbol: 'S/', rate: 3.96, locale: 'es-PE' },
  { code: 'JPY', symbol: '¥', rate: 185, locale: 'ja-JP' },
  { code: 'KRW', symbol: '₩', rate: 1751, locale: 'ko-KR' },
  { code: 'CNY', symbol: '¥', rate: 7.89, locale: 'zh-CN' },
  { code: 'INR', symbol: '₹', rate: 111.3, locale: 'en-IN' },
  { code: 'THB', symbol: '฿', rate: 38.0, locale: 'th-TH' },
  { code: 'VND', symbol: '₫', rate: 30416, locale: 'vi-VN' },
  { code: 'IDR', symbol: 'Rp', rate: 20749, locale: 'id-ID' },
  { code: 'MYR', symbol: 'RM', rate: 4.61, locale: 'ms-MY' },
  { code: 'SGD', symbol: 'S$', rate: 1.49, locale: 'en-SG' },
  { code: 'PHP', symbol: '₱', rate: 71.6, locale: 'en-PH' },
  { code: 'AED', symbol: 'د.إ', rate: 4.27, locale: 'ar-AE' },
  { code: 'SAR', symbol: 'ر.س', rate: 4.36, locale: 'ar-SA' },
  { code: 'AUD', symbol: 'A$', rate: 1.624, locale: 'en-AU' },
  { code: 'NZD', symbol: 'NZ$', rate: 1.99, locale: 'en-NZ' },
  { code: 'ZAR', symbol: 'R', rate: 19.03, locale: 'en-ZA' },
  { code: 'EGP', symbol: 'E£', rate: 60.8, locale: 'ar-EG' },
  { code: 'MAD', symbol: 'MAD', rate: 10.69, locale: 'ar-MA' },
  { code: 'NGN', symbol: '₦', rate: 1582, locale: 'en-NG' },
];

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInEur: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>('EUR');

  useEffect(() => {
    const stored = localStorage.getItem('profparfums-currency');
    if (stored) setCurrencyState(stored as Currency);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('profparfums-currency', c);
  };

  const formatPrice = useCallback((priceInEur: number) => {
    const info = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
    const converted = priceInEur * info.rate;
    const zero = ['JPY', 'KRW', 'VND', 'IDR', 'CLP', 'COP', 'HUF', 'ISK'];
    const isZero = zero.includes(info.code);
    const final = priceInEur === 0 ? 0 : (isZero ? converted : Math.floor(converted) + 0.99);
    return new Intl.NumberFormat(info.locale, {
      style: 'currency',
      currency: info.code,
      minimumFractionDigits: isZero ? 0 : 2,
      maximumFractionDigits: isZero ? 0 : 2,
    }).format(final);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
};
