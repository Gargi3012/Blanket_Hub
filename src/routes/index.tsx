import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState, useRef } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Star,
  ShieldCheck,
  Sparkles,
  Truck,
  Heart,
  Sliders,
  Sparkle
} from "lucide-react";
import { productsQuery } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { site, whatsappLink, categories } from "@/lib/site";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: products = [], isLoading } = useQuery(productsQuery);
  const bestsellers = products.filter((p) => p.is_bestseller).slice(0, 6);
  const cart = useCart();
  const wishlist = useWishlist();

  // 1. Hero 3D Tilt state
  const [heroTilt, setHeroTilt] = useState({ x: 0, y: 0 });
  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroTilt({ x: x * 15, y: y * -15 });
  };
  const handleHeroMouseLeave = () => {
    setHeroTilt({ x: 0, y: 0 });
  };

  // Background carousel images state
  const [bgIdx, setBgIdx] = useState(0);
  const heroBgs = ["/images/hero-blanket.jpg", "/images/collection.jpg", "/images/cat-premium.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIdx((prev) => (prev + 1) % heroBgs.length);
    }, 7500);
    return () => clearInterval(interval);
  }, []);

  // 2. Customizer state
  const [customSize, setCustomSize] = useState("Double (200x220 cm)");
  const [customColor, setCustomColor] = useState("Warm Ivory");
  const [customPattern, setCustomPattern] = useState("Classic Herringbone");
  const [customMaterial, setCustomMaterial] = useState("Dense Cloud Flannel");
  const [customQuantity, setCustomQuantity] = useState(10);

  const sizePrices: Record<string, number> = {
    "Single (150x220 cm)": 1500,
    "Double (200x220 cm)": 2800,
    "King (220x240 cm)": 3900,
  };

  const materialMultiplier: Record<string, number> = {
    "Premium Polar Fleece": 1.0,
    "Dense Cloud Flannel": 1.25,
    "High-Pile Embossed Mink": 1.5,
  };

  const calculateCustomPrice = () => {
    const base = sizePrices[customSize] || 2500;
    const mult = materialMultiplier[customMaterial] || 1.0;
    const unitPrice = Math.round(base * mult);
    const subtotal = unitPrice * customQuantity;
    // Volume discount
    const discount = customQuantity >= 50 ? 0.15 : customQuantity >= 25 ? 0.08 : 0.0;
    return {
      unitPrice,
      subtotal: Math.round(subtotal * (1 - discount)),
      discountPct: Math.round(discount * 100),
    };
  };

  const customPriceResult = calculateCustomPrice();

  // 3. Featured product state
  const featuredProduct = products.find((p) => p.slug === "premium-king-size-blanket") || products[0];
  const [featSize, setFeatSize] = useState("");
  const [featColor, setFeatColor] = useState("");
  const [featQty, setFeatQty] = useState(8);

  useEffect(() => {
    if (featuredProduct) {
      setFeatSize(featuredProduct.sizes[0] || "Standard");
      setFeatColor(featuredProduct.colors[0] || "Default");
      setFeatQty(featuredProduct.moq || 5);
    }
  }, [featuredProduct]);

  // 4. Testimonial carousel state
  const testimonials = [
    {
      name: "Meera Sengupta",
      role: "Founder, Sengupta & Co.",
      text: "CozyNest has elevated our hotel bedding collection. The mink blankets are incredibly soft, heavy, and provide unmatched warmth. Our guests comment on them constantly.",
      location: "New Delhi",
      rating: 5,
      avatar: "/images/cat-mink.jpg",
    },
    {
      name: "Arjun Khanna",
      role: "Procurement Manager, Grand Stay Group",
      text: "The wholesale customizer tool was simple and accurate. Our custom border tags and embroidery orders arrived on time and matching our specifications.",
      location: "Mumbai",
      rating: 5,
      avatar: "/images/cat-fleece.jpg",
    },
    {
      name: "Dr. Sarah D'Souza",
      role: "Director, Oasis Wellness Center",
      text: "We ordered the cloud flannel blankets in bulk for our diagnostic clinics. The feel is cozy, luxury, and stands up to hot industrial washes perfectly.",
      location: "Bangalore",
      rating: 5,
      avatar: "/images/cat-single.jpg",
    },
    {
      name: "Kabir Malhotra",
      role: "Retail Owner, Bedding Boutique",
      text: "Panipat textile craftsmanship meets luxury B2B workflow. The margins are great, and support is quick. Cooperative accounts team.",
      location: "Jaipur",
      rating: 5,
      avatar: "/images/cat-premium.jpg",
    },
  ];

  const [testIdx, setTestIdx] = useState(0);
  const testInterval = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setTestIdx((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    testInterval.current = setInterval(nextTestimonial, 6000);
    return () => {
      if (testInterval.current) clearInterval(testInterval.current);
    };
  }, []);

  const handleTestimonialNav = (direction: "prev" | "next") => {
    if (testInterval.current) clearInterval(testInterval.current);
    if (direction === "prev") prevTestimonial();
    else nextTestimonial();
    testInterval.current = setInterval(nextTestimonial, 8000); // restart timer with higher interval
  };

  // Visual customizer helpers
  const customColorStyles: Record<string, { bg: string; border: string }> = {
    "Warm Ivory": { bg: "bg-[#faf8f4]", border: "border-[#e0d7c7]" },
    "Sage Green": { bg: "bg-[#e5ece9]", border: "border-[#bbcdc6]" },
    "Soft Camel": { bg: "bg-[#eedecf]", border: "border-[#cfbba6]" },
    "Peach Cream": { bg: "bg-[#fdf0e6]", border: "border-[#edd2be]" },
    "Warm Charcoal": { bg: "bg-[#d3d3d3]", border: "border-[#acacac]" },
  };

  return (
    <div className="flex flex-col overflow-x-hidden bg-[#FAF9F6] text-foreground min-h-screen">
      {/* 1. HERO SECTION */}
      <section
        className="relative h-screen min-h-[650px] w-full flex items-center overflow-hidden bg-black"
        onMouseMove={handleHeroMouseMove}
        onMouseLeave={handleHeroMouseLeave}
      >
        {/* Immersive Full-Bleed Carousel Background */}
        <div 
          className="absolute inset-0 z-0 select-none pointer-events-none transition-transform duration-500 ease-out"
          style={{
            transform: `translate3d(${heroTilt.x * 0.8}px, ${heroTilt.y * 0.8}px, 0) scale(1.04)`,
          }}
        >
          {heroBgs.map((img, index) => (
            <img
              key={img}
              src={img}
              alt=""
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-opacity duration-1500 ease-in-out",
                bgIdx === index ? "opacity-100 animate-ken-burns" : "opacity-0"
              )}
            />
          ))}
          {/* Subtle Dark/Cream Luxury Vignette Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/25 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/35 z-10" />
        </div>

        {/* Floating Glassmorphic Product Information Cards */}
        <div className="absolute top-[26%] right-[10%] hidden lg:flex flex-col gap-1.5 p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lift animate-float-slow z-20 max-w-[210px] pointer-events-none select-none">
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Standard Sizing</p>
          <h4 className="font-display text-sm font-semibold">AVAILABLE SIZES</h4>
          <p className="text-[10px] text-white/80 mt-0.5">Single • Queen • King</p>
        </div>

        <div className="absolute bottom-[28%] right-[14%] hidden lg:flex flex-col gap-1.5 p-5 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white shadow-lift animate-float-slow [animation-delay:2.5s] z-20 max-w-[190px] pointer-events-none select-none">
          <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Touch</p>
          <h4 className="font-display text-sm font-semibold">ULTRA SOFT</h4>
          <p className="text-[10px] text-white/80 mt-0.5">Heavyweight Mink Velvet</p>
        </div>

        {/* Content Centered/Aligned */}
        <div className="container-page relative z-20 w-full flex items-center justify-start py-20 mt-12">
          <div className="max-w-2xl space-y-8 animate-fade-in duration-1000">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold-soft/20 px-4 py-1.5 backdrop-blur-sm shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-soft">
                PREMIUM BLANKETS • MADE FOR COMFORT
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="font-display text-5xl leading-[1.05] text-white sm:text-7xl md:text-8xl font-light">
                Comfort, <br />
                <span className="italic font-normal text-white/95">Wrapped in Luxury.</span>
              </h1>
              <p className="max-w-xl text-base md:text-lg leading-relaxed text-white/80 font-light">
                Premium blankets crafted for warmth, softness and everyday comfort. Exquisitely woven using dense synthetic plush and natural cloud fiber blends.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="rounded-full bg-gold hover:bg-gold/90 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5"
              >
                Shop Collection
              </Link>
              <a
                href="#bestsellers"
                className="rounded-full border border-white/35 bg-white/5 hover:bg-white/15 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white shadow-soft transition-transform hover:-translate-y-0.5 backdrop-blur-sm"
              >
                Explore Collection
              </a>
            </div>

            <p className="text-[10px] text-white/55 tracking-widest uppercase font-light border-t border-white/10 pt-6 max-w-sm">
              Premium Quality • Soft Touch • Fast Delivery
            </p>
          </div>
        </div>

        {/* Minimal Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 z-20 text-center animate-pulse-slow pointer-events-none select-none">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/70">Scroll to Explore</p>
          <span className="text-white/85 text-xs block mt-1">↓</span>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="border-y border-border bg-card py-10">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="font-display text-lg text-foreground font-semibold">Premium Quality</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Flawless stitching & softness</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-lg text-foreground font-semibold">Soft & Comfortable</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Hypoallergenic acrylic-pile</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-lg text-foreground font-semibold">Fast Delivery</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Reliable dispatch timelines</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-display text-lg text-foreground font-semibold">Secure Payments</h3>
            <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Encrypted invoice gateway</p>
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section id="categories" className="py-20 md:py-28 bg-[#FAF9F6]">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Luxury Sizing & Style</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Shop CozyNest Collections</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
            {site.name === "CozyNest" &&
              categories.map((cat, idx) => (
                <Link
                  key={cat.name}
                  to="/shop"
                  search={{ category: cat.name }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-card shadow-soft hover:-translate-y-1 hover:shadow-lift transition-all duration-300 flex flex-col"
                >
                  <div className="relative aspect-4/5 overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0" />
                  </div>
                  <div className="p-4 bg-card text-center flex-1 flex flex-col justify-between">
                    <h3 className="font-display text-base text-foreground font-medium group-hover:text-gold transition-colors">
                      {cat.name}
                    </h3>
                    <span className="inline-flex items-center justify-center gap-1 text-[9px] font-semibold text-foreground uppercase tracking-widest pt-2 group-hover:gap-1.5 transition-all">
                      Explore <ArrowRight className="h-2.5 w-2.5 text-gold" />
                    </span>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* 4. BESTSELLERS SECTION */}
      <section id="bestsellers" className="py-20 md:py-28 border-t border-border bg-card">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">High Demand Designs</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Customer Bestsellers</h2>
            <div className="gold-rule mx-auto mt-4" />
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Explore our highest-rated blankets, combining luxurious visual designs with rich comfort weights.
            </p>
          </div>

          {isLoading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 w-full animate-pulse rounded-2xl bg-secondary" />
              ))}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {bestsellers.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-background transition-all hover:bg-foreground/90 hover:scale-102"
            >
              View Full Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FEATURED EDITORIAL SECTION */}
      {featuredProduct && (
        <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-border">
          <div className="container-page space-y-12">
            <div className="text-center space-y-3">
              <p className="eyebrow">Luxury Spotlight</p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Made for Your Cozy Moments</h2>
              <div className="gold-rule mx-auto mt-4" />
            </div>

            <div className="grid items-center gap-12 lg:grid-cols-12 bg-card rounded-3xl border border-border shadow-lift overflow-hidden">
              {/* Product Image Panel */}
              <div className="lg:col-span-6 relative aspect-4/3 lg:aspect-square h-full">
                <img
                  src={featuredProduct.images[0]}
                  alt={featuredProduct.name}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#35251a]/10 pointer-events-none" />
              </div>

              {/* Product Info Panel */}
              <div className="lg:col-span-6 p-8 md:p-12 space-y-6">
                <div>
                  <span className="eyebrow text-gold font-semibold">{featuredProduct.category}</span>
                  <h3 className="font-display text-3xl md:text-4xl text-foreground mt-2">
                    {featuredProduct.name}
                  </h3>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="flex text-gold">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground ml-1">4.9 (42 reviews)</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {featuredProduct.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-y border-border py-4 text-xs">
                  <div>
                    <span className="text-muted-foreground uppercase tracking-wider block">Material</span>
                    <span className="font-semibold text-foreground block mt-0.5">{featuredProduct.material}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground uppercase tracking-wider block">Blanket Weight</span>
                    <span className="font-semibold text-foreground block mt-0.5">{featuredProduct.weight}</span>
                  </div>
                </div>

                {/* Configurations */}
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">
                        Select Sizing
                      </label>
                      <select
                        value={featSize}
                        onChange={(e) => setFeatSize(e.target.value)}
                        className="w-full rounded-full border border-border bg-background px-4 py-2 text-xs focus:border-gold outline-none"
                      >
                        {featuredProduct.sizes.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">
                        Select Colour
                      </label>
                      <select
                        value={featColor}
                        onChange={(e) => setFeatColor(e.target.value)}
                        className="w-full rounded-full border border-border bg-background px-4 py-2 text-xs focus:border-gold outline-none"
                      >
                        {featuredProduct.colors.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block mb-1">
                        Wholesale Quantity
                      </label>
                      <div className="flex items-center rounded-full border border-border bg-background px-3 py-1">
                        <button
                          onClick={() => setFeatQty((q) => Math.max(featuredProduct.moq, q - 1))}
                          className="h-6 w-6 text-muted-foreground hover:text-foreground text-sm font-semibold"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-semibold">{featQty}</span>
                        <button
                          onClick={() => setFeatQty((q) => q + 1)}
                          className="h-6 w-6 text-muted-foreground hover:text-foreground text-sm font-semibold"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Order Subtotal</p>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-2xl font-bold text-foreground">
                          {site.currency}
                          {new Intl.NumberFormat("en-IN").format(featuredProduct.wholesale_price * featQty)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          ({featQty} pcs at {site.currency}
                          {featuredProduct.wholesale_price}/pc)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-2">
                  <button
                    onClick={() => {
                      cart.add({
                        productId: featuredProduct.id,
                        slug: featuredProduct.slug,
                        name: featuredProduct.name,
                        image: featuredProduct.images[0],
                        size: featSize,
                        color: featColor,
                        quantity: featQty,
                        unitPrice: featuredProduct.wholesale_price,
                        moq: featuredProduct.moq,
                      });
                      toast.success(`Added ${featQty} pcs of ${featuredProduct.name} to cart`);
                    }}
                    className="flex-1 rounded-full bg-primary py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift hover:bg-primary/95 transition-all"
                  >
                    Add to Cart
                  </button>
                  <Link
                    to="/cart"
                    onClick={() => {
                      cart.add({
                        productId: featuredProduct.id,
                        slug: featuredProduct.slug,
                        name: featuredProduct.name,
                        image: featuredProduct.images[0],
                        size: featSize,
                        color: featColor,
                        quantity: featQty,
                        unitPrice: featuredProduct.wholesale_price,
                        moq: featuredProduct.moq,
                      });
                    }}
                    className="flex-1 rounded-full border border-foreground bg-foreground text-center py-3.5 text-xs font-semibold uppercase tracking-widest text-background shadow-soft hover:bg-foreground/90 transition-all"
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. INTERACTIVE PRODUCT CUSTOMIZATION */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-border">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Visual Studio</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Custom Blanket Configurator</h2>
            <div className="gold-rule mx-auto mt-4" />
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Select your specifications below to configure your custom blanket build. View real-time pricing and bulk options.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-stretch">
            {/* Control Panel (left side) */}
            <div className="lg:col-span-7 bg-card border border-border/80 rounded-3xl p-8 space-y-8 flex flex-col justify-between shadow-soft">
              <div className="space-y-6">
                <div className="flex items-center gap-2 border-b border-border/60 pb-3">
                  <Sliders className="h-5 w-5 text-gold" />
                  <h3 className="font-display text-xl text-foreground">Blanket Options</h3>
                </div>

                {/* Size Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                    1. Blanket Sizing
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.keys(sizePrices).map((size) => (
                      <button
                        key={size}
                        onClick={() => setCustomSize(size)}
                        className={cn(
                          "rounded-xl border py-3 text-xs font-medium transition-all",
                          customSize === size
                            ? "border-gold bg-gold/5 text-foreground shadow-sm"
                            : "border-border/60 bg-background text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {size.split(" ")[0]}
                        <span className="block text-[9px] text-muted-foreground mt-0.5">
                          {size.match(/\((.*?)\)/)?.[1]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                    2. Colour Selection
                  </span>
                  <div className="flex flex-wrap gap-3">
                    {Object.keys(customColorStyles).map((color) => {
                      const colorInfo = customColorStyles[color];
                      return (
                        <button
                          key={color}
                          onClick={() => setCustomColor(color)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-full border px-4 py-2 text-xs transition-all",
                            customColor === color
                              ? "border-gold bg-gold/5 font-semibold"
                              : "border-border/60 bg-background text-muted-foreground hover:bg-secondary"
                          )}
                        >
                          <span
                            className={cn(
                              "h-3.5 w-3.5 rounded-full border shadow-sm",
                              colorInfo.bg,
                              colorInfo.border
                            )}
                          />
                          {color}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Pattern Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                    3. Textile Pattern
                  </span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["Classic Herringbone", "Diamond Quilt", "Floral Embossed", "Solid Minimalist"].map(
                      (pattern) => (
                        <button
                          key={pattern}
                          onClick={() => setCustomPattern(pattern)}
                          className={cn(
                            "rounded-xl border py-2.5 text-xs transition-all",
                            customPattern === pattern
                              ? "border-gold bg-gold/5 text-foreground font-semibold"
                              : "border-border/60 bg-background text-muted-foreground hover:bg-secondary"
                          )}
                        >
                          {pattern}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Material Selector */}
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground block">
                    4. Blanket Material Fabric
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    {Object.keys(materialMultiplier).map((material) => (
                      <button
                        key={material}
                        onClick={() => setCustomMaterial(material)}
                        className={cn(
                          "rounded-xl border py-3 text-xs transition-all text-center",
                          customMaterial === material
                            ? "border-gold bg-gold/5 text-foreground font-semibold"
                            : "border-border/60 bg-background text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {material}
                        <span className="block text-[9px] text-muted-foreground mt-0.5">
                          {material === "Premium Polar Fleece"
                            ? "Lightweight 240 GSM"
                            : material === "Dense Cloud Flannel"
                              ? "Medium 320 GSM"
                              : "Heavy 450 GSM"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      5. Quantity Setup
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      MOQ: 10 pcs • Volume Discount above 25 pcs
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="10"
                      max="200"
                      step="5"
                      value={customQuantity}
                      onChange={(e) => setCustomQuantity(Number(e.target.value))}
                      className="flex-1 accent-gold h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex items-center border border-border/80 bg-background rounded-xl px-3 py-1.5 shrink-0">
                      <span className="text-sm font-semibold w-12 text-center">{customQuantity} pcs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price subtotal summary */}
              <div className="border-t border-border/60 pt-6 mt-6 grid grid-cols-2 items-center gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">
                    Calculated Wholesale Rate
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-2xl font-bold text-foreground">
                      {site.currency}
                      {customPriceResult.unitPrice}
                    </span>
                    <span className="text-xs text-muted-foreground">/ pc</span>
                  </div>
                  {customPriceResult.discountPct > 0 && (
                    <span className="inline-block mt-1 text-[10px] bg-gold/20 text-[#A2821F] px-2 py-0.5 rounded-full font-semibold">
                      Volume Discount Applied: {customPriceResult.discountPct}%
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-muted-foreground block">
                    Estimated Subtotal
                  </span>
                  <p className="text-3xl font-semibold text-foreground mt-0.5">
                    {site.currency}
                    {new Intl.NumberFormat("en-IN").format(customPriceResult.subtotal)}
                  </p>
                  <button
                    onClick={() => {
                      cart.add({
                        productId: `custom-${Date.now()}`,
                        slug: "custom-blanket",
                        name: `Custom CozyNest Blanket (${customSize.split(" ")[0]})`,
                        image: "/images/cat-premium.jpg",
                        size: customSize,
                        color: `${customColor} (${customPattern})`,
                        quantity: customQuantity,
                        unitPrice: customPriceResult.unitPrice,
                        moq: 10,
                      });
                      toast.success(`Custom CozyNest Blanket added to cart (${customQuantity} pcs)`);
                    }}
                    className="mt-3 rounded-full bg-primary px-6 py-2 text-[10px] font-semibold uppercase tracking-widest text-primary-foreground transition-all hover:bg-primary/95"
                  >
                    Add Custom to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Live Canvas Preview Panel (right side) */}
            <div className="lg:col-span-5 bg-card border border-border/80 rounded-3xl p-8 flex flex-col justify-between items-center shadow-soft relative overflow-hidden">
              <div className="w-full text-center border-b border-border/60 pb-3">
                <p className="text-[9px] uppercase tracking-widest text-gold font-bold">Studio Preview</p>
                <h3 className="font-display text-xl text-foreground mt-0.5">Your CozyNest Blanket</h3>
              </div>

              {/* Visual Preview Box */}
              <div className="my-8 w-full max-w-[280px] aspect-square rounded-2xl border border-border/40 relative shadow-lift flex items-center justify-center overflow-hidden transition-all duration-500">
                {/* Dynamic colored background */}
                <div
                  className={cn(
                    "absolute inset-0 transition-colors duration-500",
                    customColorStyles[customColor]?.bg || "bg-background"
                  )}
                />

                {/* Pattern Texture Overlay */}
                <div
                  className={cn(
                    "absolute inset-0 opacity-[0.06] pointer-events-none",
                    customPattern === "Classic Herringbone"
                      ? "bg-[repeating-linear-gradient(45deg,#000,#000_10px,transparent_10px,transparent_20px)]"
                      : customPattern === "Diamond Quilt"
                        ? "bg-[linear-gradient(45deg,#000_25%,transparent_25%),linear-gradient(-45deg,#000_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#000_75%),linear-gradient(-45deg,transparent_75%,#000_75%)] bg-[size:20px_20px]"
                        : customPattern === "Floral Embossed"
                          ? "bg-[radial-gradient(circle_at_center,black_1px,transparent_1px)] bg-[size:16px_16px]"
                          : "bg-[repeating-linear-gradient(0deg,#000,#000_2px,transparent_2px,transparent_12px)]"
                  )}
                />

                {/* Fold/shadow rendering details */}
                <div className="absolute inset-y-0 left-1/2 w-[2px] bg-black/5 blur-[1px]" />
                <div className="absolute inset-y-0 left-1/4 w-[1px] bg-white/10 blur-[1px]" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/10 to-transparent" />

                {/* Center Badge label */}
                <div className="relative z-10 text-center text-foreground/75 px-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-2xl py-3 shadow-soft max-w-[200px]">
                  <p className="text-[9px] uppercase tracking-wider font-semibold text-gold">Spec Label</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">{customColor}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{customPattern}</p>
                </div>
              </div>

              {/* Spec sheet checklist summaries */}
              <div className="w-full space-y-3 border-t border-border/60 pt-6 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions</span>
                  <span className="font-semibold text-foreground">{customSize.split(" ")[0]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fabric & Structure</span>
                  <span className="font-semibold text-foreground">{customMaterial}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fabric Texture</span>
                  <span className="font-semibold text-foreground">{customPattern}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Volume Packaging</span>
                  <span className="font-semibold text-foreground">{customQuantity} pieces in bulk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-border">
        <div className="container-page space-y-16">
          <div className="text-center space-y-3">
            <p className="eyebrow">Luxury Manufacturing</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Why Choose CozyNest</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold border border-gold/10">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Premium Fabrics</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We spin dense microfiber and soft acrylic pile yarns for double-sided soft hand-touch that resists crushing.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold border border-gold/10">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Carefully Selected Designs</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Featuring classic floral, damask, geometric quilted, and modern minimal solid prints with gold trim accents.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold border border-gold/10">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Quality Checked</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Every carton undergoes individual inspection to verify seam integrity, weight parameters, and color dyes.
              </p>
            </div>

            <div className="text-center space-y-4 p-8 rounded-2xl bg-card border border-border/60 shadow-soft">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/40 text-gold border border-gold/10">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Customer First Support</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dedicated account managers, dispatch timelines coordination, and flexible MOQ setup for growing partners.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CLIENT REVIEWS CAROUSEL */}
      <section className="py-20 md:py-28 bg-card border-t border-border">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Client Feedback</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">Trusted by Home Designers</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <div className="relative max-w-4xl mx-auto border border-border rounded-3xl bg-background p-8 md:p-14 shadow-lift overflow-hidden">
            {/* Slides container */}
            <div className="relative overflow-hidden min-h-[160px] flex items-center justify-center">
              <div className="space-y-6 text-center animate-fade-in duration-500">
                <div className="flex justify-center text-gold">
                  {[...Array(testimonials[testIdx].rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>

                <p className="font-display text-xl md:text-2xl italic leading-relaxed text-foreground/90 px-4">
                  “{testimonials[testIdx].text}”
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="h-10 w-10 rounded-full border border-border/80 overflow-hidden shrink-0">
                    <img
                      src={testimonials[testIdx].avatar}
                      alt={testimonials[testIdx].name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-semibold text-foreground">{testimonials[testIdx].name}</h4>
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">
                      {testimonials[testIdx].role} · {testimonials[testIdx].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Arrows */}
            <div className="absolute inset-y-0 left-3 flex items-center">
              <button
                onClick={() => handleTestimonialNav("prev")}
                className="h-10 w-10 rounded-full border border-border/80 bg-card hover:bg-secondary flex items-center justify-center shadow-soft transition-all"
                aria-label="Previous review"
              >
                <ChevronLeft className="h-5 w-5 text-foreground" />
              </button>
            </div>

            <div className="absolute inset-y-0 right-3 flex items-center">
              <button
                onClick={() => handleTestimonialNav("next")}
                className="h-10 w-10 rounded-full border border-border/80 bg-card hover:bg-secondary flex items-center justify-center shadow-soft transition-all"
                aria-label="Next review"
              >
                <ChevronRight className="h-5 w-5 text-foreground" />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-1.5 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (testInterval.current) clearInterval(testInterval.current);
                    setTestIdx(idx);
                    testInterval.current = setInterval(nextTestimonial, 8000);
                  }}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    testIdx === idx ? "w-6 bg-gold" : "w-1.5 bg-border hover:bg-muted-foreground"
                  )}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. INSTAGRAM / LOOKBOOK SECTION */}
      <section className="py-20 md:py-28 bg-[#FAF9F6] border-t border-border">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Styled Spaces</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">CozyNest Lookbook</h2>
            <div className="gold-rule mx-auto mt-4" />
            <p className="mx-auto max-w-xl text-sm text-muted-foreground">
              Discover how our premium collection blankets add warmth, color, and layer aesthetics to real homes.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/images/cat-mink.jpg", label: "Master Bedroom Cozy" },
              { img: "/images/cat-fleece.jpg", label: "Living Room Throw Layer" },
              { img: "/images/cat-winter.jpg", label: "Double Quilt Warmth" },
              { img: "/images/collection.jpg", video: "/images/collection-video.mp4", label: "Textured Blanket Fold Stack" },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl border border-border/40 overflow-hidden shadow-soft"
              >
                {item.video ? (
                  <video
                    src={item.video}
                    poster={item.img}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                ) : (
                  <img
                    src={item.img}
                    alt={item.label}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-xs text-white font-medium uppercase tracking-wider">{item.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. NEWSLETTER */}
      <section className="py-20 md:py-24 bg-cream border-t border-border">
        <div className="container-page max-w-3xl text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gold-soft/40 text-gold">
              <Sparkle className="h-4 w-4 fill-current" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl text-foreground font-light">
              Get 10% OFF Your First Order
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground">
              Sign up with your business or personal email to receive exclusive CozyNest catalog catalogs, custom fabrics pricing updates, and initial code discounts.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("Thank you for subscribing! Check your inbox for the discount code.");
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address…"
              className="flex-1 rounded-full border border-border bg-background px-6 py-3 text-sm outline-none focus:border-gold"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift hover:bg-primary/95 transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* 11. FINAL WHOLESALE CTA */}
      <section className="py-20 bg-[#eae3da]/40 border-t border-border">
        <div className="container-page max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <p className="eyebrow">Direct Manufacturing</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground font-light">
              Partner with CozyNest in Bulk
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground mt-4">
              Access high-volume pricing grids, coordinate custom labeling, or schedule shipments directly from our Panipat production center.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/wholesale"
              className="rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift transition-all hover:bg-primary/95"
            >
              Get Wholesale Quote
            </Link>
            <a
              href={whatsappLink(
                `Hi CozyNest, I'm interested in receiving a wholesale quote for your luxury blanket collections.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[#25d366] bg-[#25d366]/10 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-[#128c7e] transition-all hover:bg-[#25d366]/20"
            >
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
