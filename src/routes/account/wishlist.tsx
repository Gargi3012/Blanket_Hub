import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { ChevronRight, Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { productsQuery } from "@/lib/products";
import { useWishlist } from "@/hooks/useWishlist";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/site";

export const Route = createFileRoute("/account/wishlist")({
  component: Wishlist,
});

function Wishlist() {
  const wishlist = useWishlist();
  const cart = useCart();
  const { data: products = [], isLoading } = useQuery(productsQuery);

  // Filter products in wishlist
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlist.has(p.id));
  }, [products, wishlist]);

  const handleAddToCart = (product: any) => {
    cart.add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] || "/images/cat-mink.jpg",
      size: product.sizes[0] || "Double (220 x 240 cm)",
      color: product.colors[0] || "Ivory Cream",
      quantity: product.moq,
      unitPrice: product.wholesale_price,
      moq: product.moq,
    });
    toast.success(`${product.name} added to cart (${product.moq} pcs)`);
  };

  return (
    <div className="bg-background py-12">
      <div className="container-page space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/account" className="hover:text-foreground">B2B Portal</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Wholesale Wishlist</span>
        </nav>

        <h1 className="font-display text-4xl text-foreground">Your Sourcing Wishlist</h1>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          </div>
        ) : wishlistedProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border rounded-2xl space-y-6">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-muted-foreground">
              <Heart className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display text-2xl text-foreground">Wishlist is Empty</h2>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                No wholesale items have been marked. Browse our catalogs to track premium stock lines.
              </p>
            </div>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
            >
              Explore Collections
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="group border border-border bg-card rounded-2xl overflow-hidden shadow-soft flex flex-col justify-between"
              >
                {/* Visual */}
                <div className="relative aspect-4/5 overflow-hidden bg-secondary">
                  <Link to="/product/$slug" params={{ slug: product.slug }}>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-75 group-hover:scale-103"
                    />
                  </Link>
                  <button
                    onClick={() => {
                      void wishlist.toggle(product.id);
                      toast.success("Removed from wishlist");
                    }}
                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-card/90 shadow-soft hover:bg-card text-destructive transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="eyebrow">{product.category}</span>
                    <h3 className="font-display text-xl text-foreground leading-snug">
                      <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-gold transition-colors">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{product.short_description}</p>
                  </div>

                  <div className="border-t border-border pt-3 space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{formatPrice(product.wholesale_price)}</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Wholesale Price</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-foreground">{product.moq} pcs</p>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Min. Order (MOQ)</p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-11 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-primary/95"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add to Cart (MOQ)
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
