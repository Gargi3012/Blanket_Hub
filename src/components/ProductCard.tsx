import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/site";
import type { Product } from "@/lib/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const wishlist = useWishlist();
  const cart = useCart();
  const inWishlist = wishlist.has(product.id);

  return (
    <article className="group card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.is_new_arrival && (
            <span className="rounded-full bg-card/90 px-2.5 py-1 text-[10px] uppercase tracking-widest text-foreground">
              New
            </span>
          )}
          {product.is_bestseller && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[10px] uppercase tracking-widest text-primary-foreground">
              Bestseller
            </span>
          )}
        </div>
        <button
          onClick={() => {
            void wishlist.toggle(product.id);
            toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 transition-colors hover:bg-card"
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-gold text-gold")} />
        </button>
      </div>

      <div className="space-y-3 p-5">
        <p className="eyebrow">{product.category}</p>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-xl leading-snug">{product.name}</h3>
        </Link>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.short_description}</p>

        <div className="flex flex-wrap gap-1.5 text-[11px] text-muted-foreground">
          {product.sizes.slice(0, 2).map((s) => (
            <span key={s} className="rounded-full border border-border px-2 py-0.5">
              {s}
            </span>
          ))}
          <span className="rounded-full border border-border px-2 py-0.5">
            {product.colors.length} colours
          </span>
        </div>

        <div className="flex items-end justify-between border-t border-border pt-3">
          <div>
            <p className="text-lg text-foreground">{formatPrice(product.price)}</p>
            <p className="text-xs text-muted-foreground">
              Wholesale {formatPrice(product.wholesale_price)} · MOQ {product.moq}
            </p>
          </div>
          <span
            className={cn(
              "text-xs",
              product.stock > 0 ? "text-muted-foreground" : "text-destructive",
            )}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        <button
          onClick={() => {
            cart.add({
              productId: product.id,
              slug: product.slug,
              name: product.name,
              image: product.images[0],
              size: product.sizes[0] ?? "Standard",
              color: product.colors[0] ?? "Ivory",
              quantity: product.moq,
              unitPrice: product.wholesale_price,
              moq: product.moq,
            });
            toast.success(`${product.name} added to cart (${product.moq} pcs)`);
          }}
          disabled={product.stock === 0}
          className="w-full rounded-full border border-primary bg-primary py-2.5 text-sm text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
