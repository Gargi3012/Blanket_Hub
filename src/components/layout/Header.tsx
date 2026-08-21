import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { site } from "@/lib/site";
import { productsQuery, type Product } from "@/lib/products";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Home", to: "/" as const },
  { label: "Shop", to: "/shop" as const },
  { label: "Collections", to: "/shop" as const, search: { category: "Premium Collection" } },
  { label: "About Us", to: "/about" as const },
  { label: "Contact", to: "/contact" as const },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [focused, setFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { count } = useCart();
  const { user, isAdmin } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { data: products = [] } = useQuery(productsQuery);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const suggestions = useMemo<Product[]>(() => {
    const q = term.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter((p) =>
        [p.name, p.category, p.material ?? "", ...p.sizes, ...p.colors]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 6);
  }, [term, products]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setFocused(false);
    navigate({ to: "/shop", search: { q: term.trim() || undefined } });
  };

  return (
    <header className={cn("sticky top-0 z-40 border-b transition-all duration-300", isScrolled ? "border-border bg-background/95 shadow-soft" : "border-border/70 bg-background/85 backdrop-blur-md")}>
      <div className="bg-primary text-primary-foreground">
        <div className="container-page flex items-center justify-center gap-3 py-2 text-center text-[11px] tracking-[0.15em] uppercase font-semibold">
          FREE SHIPPING ON ORDERS ABOVE ₹999 • EASY RETURNS • PREMIUM QUALITY
        </div>
      </div>

      <div className={cn("container-page flex items-center gap-4 transition-all duration-300", isScrolled ? "py-2.5" : "py-4.5")}>
        <button
          className="lg:hidden"
          aria-label="Open menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Menu className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link to="/" className="mr-2 shrink-0">
          <span className={cn("font-display leading-none tracking-tight transition-all duration-300", isScrolled ? "text-xl md:text-2xl" : "text-2xl md:text-[1.7rem]")}>
            {site.name}
          </span>
          <span className="hidden text-[10px] uppercase tracking-[0.28em] text-muted-foreground sm:block">
            Wholesale Blankets
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.label}
              to={n.to}
              search={n.search as any}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground animate-fade-in"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div ref={boxRef} className="relative ml-auto hidden max-w-sm flex-1 md:block">
          <form onSubmit={submit}>
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 150)}
              placeholder="Search blankets, sizes, colours…"
              aria-label="Search products"
              className="h-10 w-full rounded-full border border-input bg-card pl-9 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
            />
          </form>
          {focused && suggestions.length > 0 && (
            <ul className="absolute left-0 right-0 top-12 overflow-hidden rounded-xl border border-border bg-popover shadow-lift">
              {suggestions.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/product/$slug"
                    params={{ slug: s.slug }}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                  >
                    <img
                      src={s.images[0]}
                      alt={s.name}
                      loading="lazy"
                      className="h-10 w-10 rounded-md object-cover"
                    />
                    <span className="flex-1">
                      <span className="block">{s.name}</span>
                      <span className="block text-xs text-muted-foreground">{s.category}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link
            to="/wholesale"
            className="hidden rounded-full bg-primary px-5 py-2 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-primary/90 md:inline-flex mr-2"
          >
            Get Wholesale Quote
          </Link>
          <Link
            to="/account/wishlist"
            aria-label="Wishlist"
            className="rounded-full p-2.5 transition-colors hover:bg-secondary"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            to={user ? "/account" : "/auth"}
            aria-label="Account"
            className="rounded-full p-2.5 transition-colors hover:bg-secondary"
          >
            <User className="h-5 w-5" />
          </Link>
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2.5 transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-medium text-primary-foreground">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        <nav className="container-page flex flex-col py-3">
          <form onSubmit={submit} className="relative mb-2 md:hidden">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search blankets…"
              aria-label="Search products"
              className="h-11 w-full rounded-full border border-input bg-card pl-9 pr-4 text-sm outline-none focus:border-gold"
            />
          </form>
          {nav.map((n) => (
            <Link key={n.label} to={n.to} search={n.search as any} className="py-3 text-base">
              {n.label}
            </Link>
          ))}
          <Link
            to="/wholesale"
            className="mt-2 text-center rounded-full bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-all duration-300 hover:bg-primary/90"
          >
            Get Wholesale Quote
          </Link>
          {isAdmin && (
            <Link to="/admin" className="py-3 text-base">
              Admin Panel
            </Link>
          )}
          <button
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 py-3 text-sm text-muted-foreground"
          >
            <X className="h-4 w-4" /> Close
          </button>
        </nav>
      </div>
    </header>
  );
}
