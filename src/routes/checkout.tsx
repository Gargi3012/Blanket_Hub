import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, CheckCircle2, ShoppingBag, CreditCard, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { formatPrice, site } from "@/lib/site";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

function Checkout() {
  const cart = useCart();
  const [step, setStep] = useState<number>(1);
  const [completed, setCompleted] = useState<boolean>(false);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Simulated Order Details
  const [orderId, setOrderId] = useState("");
  const [estimatedDelivery, setEstimatedDelivery] = useState("");

  const handleNextStep = () => {
    if (step === 1 && (!name || !email || !phone)) return;
    if (step === 2 && (!address || !city || !state || !pincode)) return;
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handlePlaceOrder = () => {
    // Generate simulated order metadata
    setOrderId(`LL-B2B-${Math.floor(Math.random() * 900000) + 100000}`);
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 7);
    setEstimatedDelivery(deliveryDate.toLocaleDateString("en-IN", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    setCompleted(true);
    cart.clear(); // Clear local shopping cart
  };

  // If order completed successfully, show visual confirmation screen
  if (completed) {
    return (
      <div className="container-page py-20 max-w-2xl text-center space-y-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/30 text-gold animate-pulse">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-3">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-gold">Sourcing Complete</span>
          <h1 className="font-display text-4xl text-foreground">Order Confirmed! 🎉</h1>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Your bulk blanket request has been recorded. Our Panipat dispatch logistics desk will verify stock allotments immediately.
          </p>
        </div>

        <div className="border border-border p-6 rounded-2xl bg-card text-left space-y-4 text-xs text-muted-foreground shadow-lift">
          <div className="grid grid-cols-2 gap-y-2 border-b border-border/60 pb-3">
            <span className="font-semibold text-foreground">Order Reference ID:</span>
            <span className="text-right font-medium text-foreground">{orderId}</span>
            <span className="font-semibold text-foreground">Wholesale Payment Status:</span>
            <span className="text-right font-semibold text-gold uppercase tracking-wider">Simulated B2B Approved</span>
            <span className="font-semibold text-foreground">Total Sourced Value:</span>
            <span className="text-right font-semibold text-foreground">{formatPrice(cart.total || 38200)}</span>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-foreground">Cargo Delivery Destination:</p>
            <p>{name} · {phone}</p>
            <p>{address}, {city}, {state} - {pincode}</p>
          </div>

          <div className="border-t border-border/60 pt-3">
            <p className="font-semibold text-foreground">Estimated Truck Dispatch Arrival:</p>
            <p className="text-foreground font-medium mt-0.5">{estimatedDelivery}</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-all shadow-lift"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background py-12">
      <div className="container-page space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/cart" className="hover:text-foreground">Cart</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Checkout Setup</span>
        </nav>

        <h1 className="font-display text-4xl text-foreground">Wholesale Checkout</h1>

        {/* Steps Bar indicator */}
        <div className="grid grid-cols-4 gap-2 border-y border-border/60 py-4 text-center text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
          <span className={step >= 1 ? "text-foreground font-bold" : ""}>1. Customer Info</span>
          <span className={step >= 2 ? "text-foreground font-bold" : ""}>2. Cargo Address</span>
          <span className={step >= 3 ? "text-foreground font-bold" : ""}>3. Review Order</span>
          <span className={step >= 4 ? "text-foreground font-bold" : ""}>4. Payment Method</span>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Checkout Area */}
          <main className="lg:col-span-8 border border-border p-8 rounded-2xl bg-card shadow-soft">
            {/* Step 1: Customer Info */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-foreground">Corporate Customer Info</h2>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <label htmlFor="chk-name" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Contact Representative Name</label>
                    <input
                      id="chk-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jane Doe"
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1">
                      <label htmlFor="chk-email" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Email Address</label>
                      <input
                        id="chk-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rep@corporation.com"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="chk-phone" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Phone Number</label>
                      <input
                        id="chk-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-border/60">
                  <button
                    onClick={handleNextStep}
                    disabled={!name || !email || !phone}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                  >
                    Next Step <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Shipping address */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-foreground">Cargo Destination Address</h2>
                <div className="grid gap-4">
                  <div className="space-y-1">
                    <label htmlFor="chk-address" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Complete Street Address</label>
                    <input
                      id="chk-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Plot 105, Phase 2, Industrial Area"
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label htmlFor="chk-city" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">City</label>
                      <input
                        id="chk-city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Surat"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="chk-state" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">State</label>
                      <input
                        id="chk-state"
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="Gujarat"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label htmlFor="chk-pin" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Pincode</label>
                      <input
                        id="chk-pin"
                        type="text"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="395003"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="chk-notes" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Transport Order Notes</label>
                    <textarea
                      id="chk-notes"
                      rows={3}
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      placeholder="Gate instructions, warehouse timings, or transport vehicle preferences..."
                      className="w-full rounded-xl border border-input bg-background p-4 text-xs outline-none focus:border-gold resize-none"
                    />
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-border/60">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    disabled={!address || !city || !state || !pincode}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors disabled:opacity-50"
                  >
                    Next Step <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review Order */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-foreground">Review Order Details</h2>

                <div className="space-y-4">
                  <div className="border border-border/60 p-4 rounded-xl bg-background text-xs space-y-1 text-muted-foreground">
                    <p><strong className="text-foreground">Contact:</strong> {name} ({phone})</p>
                    <p><strong className="text-foreground">Cargo Destination:</strong> {address}, {city}, {state} - {pincode}</p>
                    {orderNotes && <p><strong className="text-foreground">Notes:</strong> {orderNotes}</p>}
                  </div>

                  <div className="space-y-2.5">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Sourcing Pack Items</p>
                    {cart.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs py-2 border-b border-border/60">
                        <span>{item.name} (x{item.quantity} pcs) <span className="text-[10px] text-muted-foreground uppercase">[{item.size}]</span></span>
                        <span className="font-medium text-foreground">{formatPrice(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between pt-4 border-t border-border/60">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <button
                    onClick={handleNextStep}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
                  >
                    Continue to Payment <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment Simulation */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="font-display text-2xl text-foreground">Select Sourcing Payment</h2>
                <div className="grid gap-4">
                  {[
                    { id: "upi", label: "UPI (Google Pay / PhonePe / Paytm)", desc: "Quick verification via UPI ID scan" },
                    { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay accepted" },
                    { id: "bank", label: "Net Banking", desc: "Direct B2B bank account wiring" },
                    { id: "terms", label: "Direct B2B Invoice Credit (30 Days Net)", desc: "Subject to prior accounting registration" },
                  ].map((method) => (
                    <label
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex gap-3 p-4 rounded-xl border cursor-pointer items-start transition-all ${paymentMethod === method.id ? "border-gold bg-gold-soft/10 ring-2 ring-gold/10" : "border-border hover:border-foreground"}`}
                    >
                      <input
                        type="radio"
                        name="pay-method"
                        checked={paymentMethod === method.id}
                        onChange={() => {}}
                        className="mt-1 accent-gold"
                      />
                      <div>
                        <p className="text-xs font-semibold text-foreground">{method.label}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{method.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between pt-4 border-t border-border/60">
                  <button
                    onClick={handlePrevStep}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground hover:bg-secondary transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="inline-flex items-center gap-1.5 rounded-full bg-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-gold/90 transition-colors shadow-lift"
                  >
                    Confirm Sourcing Order <Check className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </main>

          {/* Sourcing Summary Card */}
          <aside className="lg:col-span-4">
            <div className="border border-border p-6 rounded-2xl bg-card space-y-4 shadow-lift">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground pb-2 border-b border-border">Order Total</h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Cart Items Subtotal</span>
                  <span className="font-semibold text-foreground">{formatPrice(cart.subtotal || 38200)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Mill Cargo Carriage</span>
                  <span className="font-semibold text-foreground">
                    {cart.shipping === 0 ? "FREE" : formatPrice(cart.shipping || 0)}
                  </span>
                </div>
                <div className="border-t border-border/60 pt-3 flex justify-between text-sm font-semibold text-foreground">
                  <span>Final Bill Amount</span>
                  <span>{formatPrice(cart.total || 38200)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
