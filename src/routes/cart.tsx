import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Trash2, ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart, itemKey } from "@/hooks/useCart";
import { formatPrice } from "@/lib/site";

export const Route = createFileRoute("/cart")({
  component: Cart,
});

function Cart() {
  const { items, setQuantity, remove, subtotal, shipping, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-page py-24 text-center space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
          <ShoppingCart className="h-8 w-8" />
        </div>
        <div className="space-y-2">
          <h2 className="font-display text-3xl text-foreground">Your Cart is Empty</h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            You haven't added any wholesale blanket packs to your cart yet. Browse our premium collections to start sourcing.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
        >
          Explore Catalog <ArrowRight className="h-4 w-4" />
        </Link>
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
          <span className="text-foreground font-medium">Shopping Cart</span>
        </nav>

        <h1 className="font-display text-4xl text-foreground">Your Sourcing Cart</h1>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => {
              const key = itemKey(item);
              const isBelowMoq = item.quantity < item.moq;

              return (
                <div
                  key={key}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-border bg-card shadow-soft"
                >
                  {/* Item Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-xl object-cover border border-border"
                  />

                  {/* Details */}
                  <div className="flex-grow space-y-1">
                    <h3 className="font-display text-lg text-foreground leading-snug">
                      <Link to="/product/$slug" params={{ slug: item.slug }} className="hover:text-gold transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                    <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                      <span>Size: {item.size}</span>
                      <span>·</span>
                      <span>Colour: {item.color}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Wholesale Rate: <span className="font-semibold text-foreground">{formatPrice(item.unitPrice)}</span> · MOQ {item.moq} pcs
                    </div>
                  </div>

                  {/* Quantity Actions */}
                  <div className="flex flex-col items-start sm:items-center gap-1.5 shrink-0">
                    <div className="flex h-10 items-center border border-border bg-background rounded-full overflow-hidden">
                      <button
                        onClick={() => setQuantity(key, item.quantity - 1)}
                        disabled={item.quantity <= item.moq}
                        className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-10 text-center text-xs font-semibold text-foreground">{item.quantity}</span>
                      <button
                        onClick={() => setQuantity(key, item.quantity + 1)}
                        className="px-3 py-1.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {isBelowMoq && (
                      <span className="text-[9px] text-destructive uppercase tracking-widest font-semibold">
                        Below MOQ
                      </span>
                    )}
                  </div>

                  {/* Subtotal & Delete */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4 sm:gap-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-border/60 shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{formatPrice(item.unitPrice * item.quantity)}</p>
                      <p className="text-[10px] text-muted-foreground">Bulk Pack</p>
                    </div>
                    <button
                      onClick={() => remove(key)}
                      className="rounded-full p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
                      aria-label="Delete item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Card Summary */}
          <div className="lg:col-span-4">
            <div className="border border-border p-6 rounded-2xl bg-card space-y-6 shadow-lift">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground pb-3 border-b border-border">Order Summary</h3>

              <div className="space-y-3.5 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-foreground">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping (Mill Cargo)</span>
                  <span className="font-semibold text-foreground">
                    {shipping === 0 ? <span className="text-gold font-medium uppercase tracking-widest text-[10px]">Free Delivery</span> : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Add <strong>{formatPrice(25000 - subtotal)}</strong> more to unlock Free Mill Cargo shipping.
                  </p>
                )}
                <div className="border-t border-border pt-3.5 flex justify-between text-base font-semibold text-foreground">
                  <span>Total Amount</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  to="/checkout"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-primary/95 shadow-lift"
                >
                  Proceed to Checkout <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/shop"
                  className="w-full inline-flex items-center justify-center rounded-full border border-border bg-background text-foreground h-12 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-secondary"
                >
                  Continue Sourcing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
