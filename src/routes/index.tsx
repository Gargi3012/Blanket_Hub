import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowRight, CheckCircle2, MessageCircle, Star, ShieldCheck, Sparkles, Truck, Users } from "lucide-react";
import { productsQuery } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const { data: products = [], isLoading } = useQuery(productsQuery);
  const featuredProducts = products.filter(p => p.is_featured).slice(0, 6);

  // Dynamic rotating 3D product card stack in Hero
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Luxury Mink Blanket",
      subtitle: "Super Soft Embossed Mink",
      image: "/images/cat-mink.jpg",
    },
    {
      id: 2,
      title: "Premium Fleece Blanket",
      subtitle: "All-Season Cozy Fleece",
      image: "/images/cat-fleece.jpg",
    },
    {
      id: 3,
      title: "Winter Comfort Blanket",
      subtitle: "Sherpa & Velvet Diamond Quilt",
      image: "/images/cat-winter.jpg",
    },
  ]);

  const cycleStack = () => {
    setCards((prev) => {
      const next = [...prev];
      const last = next.pop(); // Remove the top card
      if (last) next.unshift(last); // Push it to the bottom
      return next;
    });
  };

  const getCardStyles = (index: number) => {
    switch (index) {
      case 0: // Bottom Card
        return {
          zIndex: 10,
          transform: "translateY(24px) scale(0.9) rotate(2deg)",
          opacity: 0.7,
          bottom: "16px",
          left: "24px",
          right: "24px",
        };
      case 1: // Middle Card
        return {
          zIndex: 20,
          transform: "translateY(12px) scale(0.95) rotate(-1deg)",
          opacity: 0.95,
          bottom: "48px",
          left: "12px",
          right: "12px",
        };
      case 2: // Top Card
        return {
          zIndex: 30,
          transform: "translateY(0px) scale(1) rotate(0deg)",
          opacity: 1,
          bottom: "80px",
          left: "0px",
          right: "0px",
        };
      default:
        return {};
    }
  };

  const testimonials = [
    {
      name: "Rajesh Mehta",
      role: "Owner, Mehta Home Textiles",
      text: "Excellent quality and very good finishing. The blankets look premium and feel extremely soft. Our customers absolutely love them, and the repeat orders speak for themselves.",
      rating: 5,
    },
    {
      name: "Ananya Sharma",
      role: "Procurement Lead, Grand Plaza Hotels",
      text: "Great variety and smooth wholesale experience. Loom & Luxe provided custom sizes and custom packaging for our boutique hotels. Highly recommended for commercial sourcing.",
      rating: 5,
    },
    {
      name: "Vikram Malhotra",
      role: "Distributor, Northern Bedding Supplies",
      text: "Quality products and reliable service. Panipat's finest craftsmanship delivered with consistent quality and dependable dispatch times. A truly professional experience.",
      rating: 5,
    },
  ];

  const collections = [
    {
      name: "Mink Blankets",
      desc: "Soft · Warm · Premium",
      image: "/images/cat-mink.jpg",
      slug: "mink-blankets",
    },
    {
      name: "Fleece Blankets",
      desc: "Lightweight · Comfortable · Cozy",
      image: "/images/cat-fleece.jpg",
      slug: "fleece-blankets",
    },
    {
      name: "Double Bed Blankets",
      desc: "Large · Soft · Everyday Comfort",
      image: "/images/cat-double.jpg",
      slug: "double-bed-blankets",
    },
    {
      name: "Single Bed Blankets",
      desc: "Comfortable · Practical · Stylish",
      image: "/images/cat-single.jpg",
      slug: "single-bed-blankets",
    },
    {
      name: "Premium Collection",
      desc: "Luxury · Premium Finish · Elegant Designs",
      image: "/images/cat-premium.jpg",
      slug: "premium-blankets",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-cream py-20 lg:py-32">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          {/* Hero Left Text */}
          <div className="space-y-8 lg:col-span-7">
            <div className="fade-up inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/20 px-3.5 py-1.5">
              <Sparkles className="h-3.5 w-3.5 text-gold" />
              <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-foreground">
                ESTABLISHED EXCELLENCE IN PANIPAT
              </span>
            </div>

            <div className="fade-up space-y-4">
              <h1 className="font-display text-5xl leading-tight text-foreground sm:text-6xl md:text-7xl">
                Wrap Your World <br />
                <span className="italic text-foreground/80">in Comfort</span>
              </h1>
              <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
                Discover premium blankets crafted for comfort, warmth and everyday luxury — available for wholesale orders. Designed to elevate retail shelves and hospitality experiences alike.
              </p>
            </div>

            <div className="fade-up flex flex-wrap gap-4 pt-2">
              <Link
                to="/shop"
                className="rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-primary/95"
              >
                Explore Collection
              </Link>
              <Link
                to="/wholesale"
                className="rounded-full border border-border bg-card px-8 py-4 text-xs font-semibold uppercase tracking-widest text-foreground shadow-soft transition-transform hover:-translate-y-0.5 hover:bg-secondary"
              >
                Get Wholesale Quote
              </Link>
            </div>

            <div className="fade-up grid grid-cols-3 border-t border-border/70 pt-8 gap-4 max-w-lg">
              <div>
                <p className="font-display text-2xl font-semibold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Premium Quality</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-foreground">Direct</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Wholesale Pricing</p>
              </div>
              <div>
                <p className="font-display text-2xl font-semibold text-foreground">Flexible</p>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-1">Bulk Orders</p>
              </div>
            </div>
          </div>

          {/* Hero Right: 3D Layered Product Stack */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative h-[380px] w-full max-w-[340px] md:h-[420px] md:max-w-[380px]">
              {/* Stack Background Glow */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gold/5 blur-3xl" />

              {/* Dynamic Stack Cards */}
              {cards.map((card, index) => {
                const styles = getCardStyles(index);
                return (
                  <div
                    key={card.id}
                    onClick={cycleStack}
                    style={styles}
                    className="absolute h-[270px] rounded-2xl border border-border bg-[#fcfbf8] shadow-lift transition-all duration-500 ease-in-out overflow-hidden cursor-pointer select-none group"
                  >
                    <img
                      src={card.image}
                      alt={card.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                      <span className="text-[10px] uppercase tracking-widest text-gold-soft">
                        {card.subtitle}
                      </span>
                      <h3 className="font-display text-lg mt-0.5">{card.title}</h3>
                    </div>

                    {/* Hint overlay visible on top card hover */}
                    {index === 2 && (
                      <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] text-white/90 uppercase tracking-wider font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Click to cycle
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTIONS SECTION */}
      <section id="collections" className="py-24 bg-card">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Exquisite Range</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Explore Our Blanket Collections</h2>
            <div className="gold-rule mx-auto mt-4" />
            <p className="mx-auto max-w-xl text-sm text-muted-foreground mt-4">
              Premium comfort engineered for every season, size preference, and space requirement.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {collections.map((col, idx) => (
              <Link
                key={idx}
                to="/shop"
                search={{ category: col.name }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-background shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
              >
                <div className="relative aspect-4/5 overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="p-5 space-y-1 bg-background text-center">
                  <h3 className="font-display text-lg text-foreground group-hover:text-gold transition-colors">{col.name}</h3>
                  <p className="text-[11px] text-muted-foreground tracking-wide">{col.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-foreground uppercase tracking-widest pt-2 group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-3 w-3 text-gold" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 bg-background">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Selected Highlights</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Featured Blanket Collection</h2>
            <div className="gold-rule mx-auto mt-4" />
            <p className="mx-auto max-w-xl text-sm text-muted-foreground mt-4">
              High-demand wholesale styles, crafted with state-of-the-art weaving techniques and rich materials.
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
              {featuredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          <div className="text-center pt-4">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-foreground bg-foreground px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-background transition-colors hover:bg-foreground/90"
            >
              View Full Catalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHOLESALE SECTION */}
      <section id="wholesale" className="py-24 bg-cream">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          {/* Visual Left */}
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift aspect-4/3">
            <img
              src="/images/collection.jpg"
              alt="Premium wholesale blanket stack warehousing"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </div>

          {/* Content Right */}
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="eyebrow">Sourcing Partner</p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground">Built for Wholesale. <br />Designed for Quality.</h2>
              <div className="gold-rule mt-4" />
              <p className="text-sm leading-relaxed text-muted-foreground mt-4">
                From individual bedding retailers and boutique hotels to massive volume distributors, we provide premium woven blankets backed by reliable industrial supply, competitive direct-factory pricing, and expert logistics.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-lg text-foreground font-medium">Flexible MOQ Packaging</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Flexible carton requirements structured specifically for growing businesses and hotels.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-lg text-foreground font-medium">Tiered Volume Pricing</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">The larger your wholesale contract, the greater the competitive margin we return to your business.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <CheckCircle2 className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <h3 className="font-display text-lg text-foreground font-medium">Panipat Sourcing Integrity</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">Dependable quality control from the historic textile capital of India, shipping globally.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/wholesale"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift transition-colors hover:bg-primary/95"
              >
                Request Wholesale Quote <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-card border-y border-border/50">
        <div className="container-page space-y-16">
          <div className="text-center space-y-3">
            <p className="eyebrow">Craftsmanship & Service</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Quality You Can Feel</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center space-y-4 p-6 rounded-2xl bg-background border border-border/40 shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">Premium Quality</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Carefully selected microfiber polyester and natural reverse fibers for lasting plush feel and structure.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-background border border-border/40 shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">Wide Variety</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Dozens of high-embossed prints, classical floral designs, modern solids, and varied bed sizes.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-background border border-border/40 shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">Wholesale Focused</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Direct-factory workflows, custom export packing, and dedicated accounts setup.
              </p>
            </div>

            <div className="text-center space-y-4 p-6 rounded-2xl bg-background border border-border/40 shadow-soft">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground">Reliable Dispatch</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Staggered supply chain logistics ensuring order packages leave Panipat docks exactly on deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-background">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          {/* Content Left */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-3">
              <p className="eyebrow">Our Legacy</p>
              <h2 className="font-display text-4xl sm:text-5xl text-foreground">Comfort. Quality. Trust.</h2>
              <div className="gold-rule mt-4" />
              <p className="text-sm leading-relaxed text-muted-foreground mt-4">
                For generations, Loom & Luxe has stood at the intersection of traditional weaving heritage and modern textile engineering. Operating from Panipat, India, we have supplied thousands of retail units and commercial networks with heavy-duty warmth and luxurious bed aesthetics.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                We believe a blanket is more than just home utility; it is a canvas of coziness and peace. That is why we monitor every step—from microfiber raw spinning to the final embossing wash—to guarantee absolute brand consistency.
              </p>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-foreground shadow-soft transition-colors hover:bg-secondary"
              >
                Know More About Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Visual Right */}
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift aspect-4/3 order-1 lg:order-2">
            <img
              src="/images/cat-premium.jpg"
              alt="Artisanal luxury blanket manufacture details"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-103"
            />
          </div>
        </div>
      </section>

      {/* PREMIUM IMAGE BREAK */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/collection.jpg"
            alt="Full-width luxury interior textured blanket backdrop"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#423126]/60 backdrop-blur-[2px]" />
        </div>
        <div className="relative text-center space-y-4 px-4 max-w-xl text-white">
          <h2 className="font-display text-4xl sm:text-5xl tracking-wide text-[#fcfbf8]">Comfort That Speaks for Itself.</h2>
          <p className="text-xs uppercase tracking-[0.2em] text-[#d6c7b9]">Premium blankets for homes, retailers, and boutique hotels.</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-card">
        <div className="container-page space-y-12">
          <div className="text-center space-y-3">
            <p className="eyebrow">Client Voices</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Trusted by Our Customers</h2>
            <div className="gold-rule mx-auto mt-4" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((test, idx) => (
              <div
                key={idx}
                className="space-y-6 p-8 rounded-2xl border border-border bg-background shadow-soft transition-all duration-300 hover:translate-y-[-4px] hover:shadow-lift"
              >
                <div className="flex gap-0.5">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-muted-foreground">“{test.text}”</p>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{test.name}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground mt-0.5">{test.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-[#eae3da]/40 border-t border-border/40">
        <div className="container-page max-w-4xl text-center space-y-8">
          <div className="space-y-4">
            <p className="eyebrow">Partner with Us</p>
            <h2 className="font-display text-4xl sm:text-5xl text-foreground">Looking for Premium Blankets in Bulk?</h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground mt-4">
              Connect with our team to discover pricing tiers, custom fabrication options, and shipping timelines directly to your warehouses.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/wholesale"
              className="rounded-full bg-primary px-8 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground shadow-lift transition-transform hover:-translate-y-0.5 hover:bg-primary/95"
            >
              Get Wholesale Quote
            </Link>
            <a
              href={whatsappLink(`Hi Loom & Luxe, I'm interested in receiving a wholesale quote for your blanket collections.`)}
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
