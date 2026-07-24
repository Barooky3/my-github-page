import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { toast } from 'sonner';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';

export const Route = createFileRoute('/checkout')({
  head: () => ({
    meta: [
      { title: 'Checkout — Parfumistry' },
      { name: 'description', content: 'Secure checkout for your fragrance order.' },
      { property: 'og:title', content: 'Secure Checkout — Parfumistry' },
      { property: 'og:description', content: 'Complete your fragrance order with secure checkout.' },
    ],
  }),
  component: CheckoutPage,
});

type Payment = 'card' | 'paypal' | 'bank';

function CheckoutPage() {
  const { items, totalPrice, subtotalBeforeDiscount, freeItemDiscount, clearCart } = useCart();
  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [payment, setPayment] = useState<Payment>('card');
  const [processing, setProcessing] = useState(false);
  const [form, setForm] = useState({
    email: '', firstName: '', lastName: '',
    address: '', city: '', postalCode: '', country: 'Netherlands',
  });

  if (items.length === 0) {
    return (
      <div className="container py-20 max-w-lg text-center">
        <h1 className="font-display text-3xl mb-4">Your cart is empty</h1>
        <p className="text-sm text-muted-foreground mb-6">Add some fragrances to check out.</p>
        <Button asChild className="rounded-none"><Link to="/shop">Continue shopping</Link></Button>
      </div>
    );
  }

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.firstName || !form.lastName || !form.address || !form.city || !form.postalCode) {
      toast.error('Please fill in all required fields.');
      return;
    }
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 900));
    toast.success('Order placed! Confirmation sent to your email.');
    clearCart();
    setProcessing(false);
    navigate({ to: '/' });
  };

  return (
    <div className="container py-14 max-w-6xl">
      <h1 className="font-display text-3xl md:text-4xl mb-2 text-center">Secure Checkout</h1>
      <p className="text-sm text-muted-foreground text-center mb-10 flex items-center justify-center gap-2">
        <ShieldCheck className="h-4 w-4" /> SSL encrypted. Your details are safe.
      </p>

      <form onSubmit={onSubmit} className="grid lg:grid-cols-[1fr_400px] gap-10">
        {/* Form */}
        <div className="space-y-8">
          <section>
            <h2 className="font-display text-xl mb-4">Contact</h2>
            <div className="space-y-3">
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={form.email} onChange={set('email')} required className="rounded-none" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4 flex items-center gap-2">
              <Truck className="h-5 w-5" /> Shipping Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First name *</Label>
                <Input id="firstName" value={form.firstName} onChange={set('firstName')} required className="rounded-none" />
              </div>
              <div>
                <Label htmlFor="lastName">Last name *</Label>
                <Input id="lastName" value={form.lastName} onChange={set('lastName')} required className="rounded-none" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="address">Address *</Label>
                <Input id="address" value={form.address} onChange={set('address')} required className="rounded-none" />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" value={form.city} onChange={set('city')} required className="rounded-none" />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal code *</Label>
                <Input id="postalCode" value={form.postalCode} onChange={set('postalCode')} required className="rounded-none" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="country">Country *</Label>
                <Input id="country" value={form.country} onChange={set('country')} required className="rounded-none" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5" /> Payment
            </h2>
            <RadioGroup value={payment} onValueChange={(v) => setPayment(v as Payment)} className="space-y-2">
              {([
                { v: 'card', l: 'Credit / Debit Card', d: 'Visa, Mastercard, Amex' },
                { v: 'paypal', l: 'PayPal', d: 'Pay with your PayPal account' },
                { v: 'bank', l: 'Bank Transfer', d: 'Manual transfer (1–2 business days)' },
              ] as const).map((opt) => (
                <label
                  key={opt.v}
                  htmlFor={`pay-${opt.v}`}
                  className={`flex items-center gap-3 border p-4 cursor-pointer transition-colors ${
                    payment === opt.v ? 'border-primary bg-accent/10' : 'border-border'
                  }`}
                >
                  <RadioGroupItem value={opt.v} id={`pay-${opt.v}`} />
                  <div>
                    <p className="text-sm font-medium">{opt.l}</p>
                    <p className="text-xs text-muted-foreground">{opt.d}</p>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </section>
        </div>

        {/* Order Summary */}
        <aside className="bg-secondary/40 border border-border p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-display text-xl mb-4">Order Summary</h2>
          <div className="space-y-3 mb-4 max-h-80 overflow-auto">
            {items.map((i) => (
              <div key={`${i.product.id}-${i.selectedMl ?? ''}`} className="flex gap-3">
                <div className="h-14 w-14 bg-background border border-border flex-shrink-0">
                  <img src={i.product.image} alt={i.product.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground truncate">{i.product.brand}</p>
                  <p className="text-sm truncate">{i.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty {i.quantity}{i.selectedMl ? ` · ${i.selectedMl}ml` : ''}</p>
                </div>
                <p className="text-sm">{formatPrice((i.selectedPrice ?? i.product.price) * i.quantity)}</p>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span><span>{formatPrice(subtotalBeforeDiscount)}</span>
            </div>
            {freeItemDiscount > 0 && (
              <div className="flex justify-between text-accent">
                <span>Buy 3 Get 1 Free</span><span>−{formatPrice(freeItemDiscount)}</span>
              </div>
            )}
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span><span>{formatPrice(totalPrice)}</span>
          </div>
          <Button type="submit" disabled={processing} size="lg" className="w-full rounded-none mt-6 uppercase text-xs tracking-[0.15em]">
            {processing ? 'Processing…' : `Pay ${formatPrice(totalPrice)}`}
          </Button>
          <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
            <ShieldCheck className="h-3 w-3" /> Secure SSL Checkout
          </p>
        </aside>
      </form>
    </div>
  );
}
