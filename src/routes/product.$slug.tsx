import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { ChevronRight, Heart, Info, MessageCircle, Minus, Plus, ShoppingBag, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { productQuery, productsQuery } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice, whatsappLink } from "@/lib/site";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

export const Route = createFileRoute("/product/$slug")({
  component: ProductDetails,
});

function ProductDetails() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  // Queries
  const { data: product, isLoading, isError } = useQuery(productQuery(slug));
  const { data: allProducts = [] } = useQuery(productsQuery);
  const cart = useCart();
  const wishlist = useWishlist();

  // Selected Option States
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImageIdx, setSelectedImageIdx] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"spec" | "shipping" | "reviews">("spec");

  // Set default selection state when product loads
  useMemo(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
      setQuantity(product.moq);
    }
  }, [product]);

  // Wishlist state
  const inWishlist = product ? wishlist.has(product.id) : false;

  // Filter out related items
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return allProducts
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 3);
  }, [allProducts, product]);

  if (isLoading) {
    return (
      <div className="container-page py-20 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gold border-t-transparent" />
        <p className="mt-4 text-sm text-muted-foreground">Loading product details...</p>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="container-page py-20 text-center space-y-4">
        <h2 className="font-display text-2xl text-foreground">Product Not Found</h2>
        <p className="text-sm text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/shop"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
        >
          Return to Catalog
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (val: number) => {
    // Cannot set quantity lower than MOQ
    setQuantity((prev) => Math.max(product.moq, prev + val));
  };

  const handleAddToCart = () => {
    cart.add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.images[0] || "/images/cat-mink.jpg",
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
      unitPrice: product.wholesale_price,
      moq: product.moq,
    });
    toast.success(`${product.name} added to cart (${quantity} pcs)`);
  };

  // Compose dynamic WhatsApp message
  const handleWhatsAppEnquiry = () => {
    const message = `Hi Loom & Luxe, I'm interested in receiving a custom wholesale quote for the following:\n\n*Product:* ${product.name}\n*Size:* ${selectedSize}\n*Colour:* ${selectedColor}\n*Quantity:* ${quantity} pcs\n\nPlease share availability and delivery estimates.`;
    window.open(whatsappLink(message), "_blank");
  };

  return (
    <div className="bg-background py-12">
      <div className="container-page space-y-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/shop" className="hover:text-foreground">Collections</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Side: Images Section */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-4/5 overflow-hidden rounded-2xl border border-border bg-secondary">
              <img
                src={product.images[selectedImageIdx] || "/images/cat-mink.jpg"}
                alt={`${product.name} alternate view`}
                className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-102"
              />
              <button
                onClick={() => {
                  void wishlist.toggle(product.id);
                  toast.success(inWishlist ? "Removed from wishlist" : "Added to wishlist");
                }}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-card/90 shadow-soft transition-colors hover:bg-card"
                aria-label="Wishlist toggle"
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-gold text-gold" : "text-foreground"}`} />
              </button>
            </div>

            {/* Thumbnail selector */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIdx(idx)}
                    className={`relative aspect-square w-20 overflow-hidden rounded-xl border transition-all ${selectedImageIdx === idx ? "border-gold ring-2 ring-gold/20" : "border-border hover:border-foreground"}`}
                  >
                    <img src={img} alt="Thumbnail view" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Configuration Section */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <span className="eyebrow">{product.category}</span>
              <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">{product.name}</h1>

              <div className="flex items-center gap-4 pt-1">
                <span className="text-2xl text-foreground font-semibold">{formatPrice(product.price)} <span className="text-xs font-normal text-muted-foreground">M.R.P.</span></span>
                <span className="rounded-full bg-gold-soft/30 px-3 py-1 text-xs font-medium text-foreground">
                  Wholesale Rate: {formatPrice(product.wholesale_price)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {product.description || product.short_description}
              </p>
            </div>

            {/* Options Selection */}
            <div className="space-y-6 border-t border-border pt-6">
              {/* Size Select */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Select Size</label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${selectedSize === s ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Select */}
              <div className="space-y-3">
                <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Select Colour</label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`rounded-full border px-4 py-2 text-xs font-medium transition-all ${selectedColor === c ? "border-foreground bg-foreground text-background" : "border-border bg-card text-foreground hover:border-foreground"}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector (Enforces MOQ) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-foreground">Order Quantity</label>
                  <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Info className="h-3.5 w-3.5 text-gold" /> Minimum Order Quantity (MOQ): {product.moq} pcs
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 items-center border border-border bg-card rounded-full overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= product.moq}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-12 text-center text-sm font-medium text-foreground">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Estimated Wholesale Price: <span className="font-semibold text-foreground">{formatPrice(product.wholesale_price * quantity)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground text-background h-14 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </button>
              <button
                onClick={handleWhatsAppEnquiry}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full border border-[#25d366] bg-[#25d366]/5 text-[#128c7e] h-14 text-sm font-semibold uppercase tracking-widest transition-all duration-300 hover:bg-[#25d366]/10"
              >
                <MessageCircle className="h-4.5 w-4.5" /> WhatsApp Quote
              </button>
            </div>

            {/* Safe Shipping Note */}
            <div className="flex gap-3 border border-border/80 bg-card p-4 rounded-2xl items-start">
              <ShieldCheck className="h-5 w-5 shrink-0 text-gold mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-foreground">Sourcing Guarantee</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Direct Panipat mill-to-dock shipping. Premium quality fabrics undergo double inspection before transit packing.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specs, Shipping & Policies Tabs */}
        <section className="border-t border-border pt-12 space-y-6">
          <div className="flex border-b border-border gap-6">
            {[
              { id: "spec", label: "Specifications" },
              { id: "shipping", label: "Shipping & MOQ" },
              { id: "reviews", label: "Client Feedback" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs font-semibold uppercase tracking-widest transition-all ${activeTab === tab.id ? "border-b-2 border-gold text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-sm leading-relaxed text-muted-foreground max-w-3xl">
            {activeTab === "spec" && (
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex justify-between py-2 border-b border-border/60">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Fabric Material</span>
                  <span>{product.material || "100% Microfiber Polyester"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/60">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Blanket Weight</span>
                  <span>{product.weight || "3.5 kg"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/60">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Designs Available</span>
                  <span>{product.designs?.join(", ") || "Solid Colors, Embossed patterns"}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border/60">
                  <span className="font-semibold text-foreground text-xs uppercase tracking-wider">Wash Care</span>
                  <span>Machine Washable (Gentle Cycle), Tumble Dry Low</span>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4 text-xs">
                <p>
                  <strong>Packaging:</strong> All wholesale orders are compressed and packed in heavy-duty HDPE bags or customized corrugated cardboard master cartons to protect them from moisture and transit damage.
                </p>
                <p>
                  <strong>Logistics & Lead Time:</strong> Ready inventory ships within 3-5 working days from our Panipat hub. Custom printed production runs take 15-20 working days.
                </p>
                <p>
                  <strong>Shipping Charges:</strong> Free delivery on wholesale orders exceeding ₹25,000 across India. Flat rate charges apply for smaller shipments.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl text-foreground font-semibold">5.0</span>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <StarRatingKey key={i} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">(Verified Wholesale Distributors Only)</span>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed border-l-2 border-gold pl-3">
                  “Consistent stitching strength and flawless soft pile. Loom & Luxe blankets have become a signature item in our winter catalog.” — Gupta Bedding Emporium, pan-India retailer.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-border pt-16 space-y-8">
            <div className="text-center space-y-2">
              <h2 className="font-display text-3xl text-foreground">You May Also Like</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest">Related Wholesale Collections</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

function StarRatingKey() {
  return <Heart className="h-3.5 w-3.5 fill-gold text-gold" />;
}
