import { useState, useEffect, useRef, useCallback } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const CYCLE_MS = (2 * 24 + 20) * 60 * 60 * 1000;
const EPOCH = new Date('2025-01-01T00:00:00Z').getTime();
const pad = (n: number) => n.toString().padStart(2, '0');

function calc() {
  const remaining = CYCLE_MS - ((Date.now() - EPOCH) % CYCLE_MS);
  return {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    mins: Math.floor((remaining % 3600000) / 60000),
    secs: Math.floor((remaining % 60000) / 1000),
  };
}

const TimerDisplay = () => {
  const d = useRef<HTMLSpanElement>(null);
  const h = useRef<HTMLSpanElement>(null);
  const m = useRef<HTMLSpanElement>(null);
  const s = useRef<HTMLSpanElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const update = () => {
      const tl = calc();
      if (d.current) d.current.textContent = pad(tl.days);
      if (h.current) h.current.textContent = pad(tl.hours);
      if (m.current) m.current.textContent = pad(tl.mins);
      if (s.current) s.current.textContent = pad(tl.secs);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const init = calc();
  const cellCls = "bg-secondary text-secondary-foreground text-base sm:text-lg md:text-2xl font-bold w-10 sm:w-12 md:w-14 py-1.5 sm:py-2 rounded text-center tabular-nums";
  const lblCls = "text-[9px] sm:text-[10px] md:text-xs text-primary-foreground/60 mt-1 uppercase tracking-wide";

  return (
    <div className="flex items-start justify-center gap-1.5 sm:gap-2 md:gap-3">
      <div className="flex flex-col items-center"><span ref={d} className={cellCls}>{pad(init.days)}</span><span className={lblCls}>{t('promo.days')}</span></div>
      <span className="text-base sm:text-lg md:text-xl font-bold mt-1.5 sm:mt-2 text-primary-foreground/40">:</span>
      <div className="flex flex-col items-center"><span ref={h} className={cellCls}>{pad(init.hours)}</span><span className={lblCls}>{t('promo.hours')}</span></div>
      <span className="text-base sm:text-lg md:text-xl font-bold mt-1.5 sm:mt-2 text-primary-foreground/40">:</span>
      <div className="flex flex-col items-center"><span ref={m} className={cellCls}>{pad(init.mins)}</span><span className={lblCls}>{t('promo.mins')}</span></div>
      <span className="text-base sm:text-lg md:text-xl font-bold mt-1.5 sm:mt-2 text-primary-foreground/40">:</span>
      <div className="flex flex-col items-center"><span ref={s} className={cellCls}>{pad(init.secs)}</span><span className={lblCls}>{t('promo.secs')}</span></div>
    </div>
  );
};

export const PromoBanner = () => {
  const [visible, setVisible] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const update = () => {
      if (ref.current && visible) {
        document.documentElement.style.setProperty('--promo-banner-height', `${ref.current.offsetHeight}px`);
      } else {
        document.documentElement.style.setProperty('--promo-banner-height', '0px');
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [visible]);

  const close = useCallback(() => {
    setVisible(false);
    document.documentElement.style.setProperty('--promo-banner-height', '0px');
  }, []);

  if (!visible) return null;

  return (
    <div ref={ref} className="bg-primary text-primary-foreground py-3 sm:py-4 md:py-5 fixed top-0 left-0 right-0 z-50">
      <div className="container relative px-4">
        <button onClick={close} className="absolute right-2 sm:right-4 top-0 p-1.5 hover:opacity-70" aria-label="Close">
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <div className="text-center max-w-md mx-auto">
          <h3 className="text-xs sm:text-sm md:text-base font-bold tracking-wide uppercase mb-0.5 sm:mb-1 pr-6 sm:pr-0">{t('promo.title')}</h3>
          <p className="text-[10px] sm:text-xs md:text-sm text-primary-foreground/70 mb-3 sm:mb-4 leading-relaxed pr-6 sm:pr-0">{t('promo.subtitle')}</p>
          <TimerDisplay />
        </div>
      </div>
    </div>
  );
};
