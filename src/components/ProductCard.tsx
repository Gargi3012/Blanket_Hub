import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
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

  const discount = product.old_price
    ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
    : 0;

  return (
    <article className="group card-lift overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-lift transition-all duration-300">
      {/* Image container */}
      <div className="relative aspect-4/5 overflow-hidden bg-secondary">
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className={cn(
              "h-full w-full object-cover transition-all duration-700 ease-out group-hover:scale-108",
              product.images[1] && "group-hover:opacity-0"
            )}
          />
          {product.images[1] && (
            <img
              src={product.images[1]}
              alt={product.name}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-0 scale-102 transition-all duration-700 ease-out group-hover:opacity-100 group-hover:scale-108"
            />
          )}
        </Link>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-1.5 z-10">
          {product.is_new_arrival && (
            <span className="rounded-full bg-card/90 backdrop-blur-sm px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-foreground">
              New
            </span>
          )}
          {product.is_bestseller && (
            <span className="rounded-full bg-gold px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-primary-foreground">
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-destructive px-2.5 py-1 text-[9px] font-semibold uppercase tracking-widest text-destructive-foreground">
              -{discount}% Off
            </span>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={() => {
            void wishlist.toggle(product.id);
            toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label="Add to wishlist"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 backdrop-blur-sm z-10 transition-all hover:bg-card hover:scale-105"
        >
          <Heart className={cn("h-4 w-4 transition-colors", inWishlist && "fill-gold text-gold")} />
        </button>

        {/* Quick View Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10">
          <Link
            to="/product/$slug"
            params={{ slug: product.slug }}
            className="rounded-full bg-background/95 backdrop-blur-md px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-lift transition-transform duration-300 hover:scale-105"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Info container */}
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{product.category}</p>
          
          {/* Ratings */}
          <div className="flex items-center gap-1 text-[11px] font-medium text-muted-foreground">
            <Star className="h-3 w-3 fill-gold text-gold" />
            <span>{product.rating || 5.0}</span>
          </div>
        </div>

        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="font-display text-xl leading-snug group-hover:text-gold transition-colors duration-300">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-2 text-xs text-muted-foreground leading-relaxed">
          {product.short_description}
        </p>

        <div className="flex flex-wrap gap-1.5 text-[10px] text-muted-foreground">
          {product.sizes.slice(0, 2).map((s) => (
            <span key={s} className="rounded-full border border-border px-2.5 py-0.5">
              {s.split(" ")[0]}
            </span>
          ))}
          <span className="rounded-full border border-border px-2.5 py-0.5">
            {product.colors.length} colors
          </span>
        </div>

        {/* Prices */}
        <div className="flex items-end justify-between border-t border-border pt-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold text-foreground">
                {formatPrice(product.price)}
              </span>
              {product.old_price && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatPrice(product.old_price)}
                </span>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground mt-0.5">
              Wholesale {formatPrice(product.wholesale_price)} · MOQ {product.moq} pcs
            </p>
          </div>
          <span
            className={cn(
              "text-[10px] uppercase font-semibold tracking-wider",
              product.stock > 0 ? "text-muted-foreground" : "text-destructive"
            )}
          >
            {product.stock > 0 ? "In stock" : "Out of stock"}
          </span>
        </div>

        {/* Add to Cart Action */}
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
          className="w-full rounded-full border border-primary bg-primary py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/95 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
