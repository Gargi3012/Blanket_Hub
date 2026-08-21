import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronRight, X } from "lucide-react";
import { productsQuery } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { formatPrice } from "@/lib/site";

// Search params definition for strict typing
type ShopSearch = {
  category?: string;
  q?: string;
};

export const Route = createFileRoute("/shop")({
  component: Shop,
  validateSearch: (search: Record<string, unknown>): ShopSearch => {
    return {
      category: (search.category as string) || undefined,
      q: (search.q as string) || undefined,
    };
  },
});

function Shop() {
  const { category, q } = Route.useSearch();
  const { data: products = [], isLoading } = useQuery(productsQuery);

  // Filters State
  const [selectedCat, setSelectedCat] = useState<string | null>(category || null);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [sortBy, setSortBy] = useState<string>("featured");

  // Get distinct categories
  const categoriesList = useMemo(() => {
    const cats = products.map((p) => p.category);
    return Array.from(new Set(cats));
  }, [products]);

  // Filtered and Sorted products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query filter
    if (q) {
      const term = q.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          (p.short_description && p.short_description.toLowerCase().includes(term)),
      );
    }

    // Category filter
    if (selectedCat) {
      result = result.filter((p) => p.category === selectedCat);
    }

    // Price filter
    result = result.filter((p) => p.wholesale_price <= maxPrice);

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.wholesale_price - b.wholesale_price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.wholesale_price - a.wholesale_price);
    } else if (sortBy === "moq-asc") {
      result.sort((a, b) => a.moq - b.moq);
    }

    return result;
  }, [products, q, selectedCat, maxPrice, sortBy]);

  const clearFilters = () => {
    setSelectedCat(null);
    setMaxPrice(6000);
    setSortBy("featured");
  };

  return (
    <div className="bg-background py-12">
      <div className="container-page space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Collections</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground">Our Collections</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            Browse Panipat's premium wholesale blankets, curated for supreme comfort, exquisite styles, and long-term durability.
          </p>
        </div>

        {/* Layout */}
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Filters Sidebar */}
          <aside className="space-y-8 lg:col-span-1 border border-border/70 p-6 rounded-2xl bg-card">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground">
                <SlidersHorizontal className="h-4 w-4" /> Filters
              </span>
              <button
                onClick={clearFilters}
                className="text-[11px] font-semibold text-gold uppercase tracking-widest hover:text-gold/80 transition-colors"
              >
                Reset
              </button>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Categories</h3>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setSelectedCat(null)}
                  className={`text-left text-sm py-1 transition-colors ${!selectedCat ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"}`}
                >
                  All Categories
                </button>
                {categoriesList.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCat(cat)}
                    className={`text-left text-sm py-1 transition-colors ${selectedCat === cat ? "text-gold font-medium" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="space-y-4 border-t border-border pt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Max Wholesale Price</h3>
                <span className="text-sm font-medium text-foreground">{formatPrice(maxPrice)}</span>
              </div>
              <input
                type="range"
                min="500"
                max="6000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-primary bg-secondary h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>{formatPrice(500)}</span>
                <span>{formatPrice(6000)}</span>
              </div>
            </div>

            {/* Sourcing Trust Seal */}
            <div className="border-t border-border pt-6 text-center space-y-2">
              <p className="text-xs font-medium text-foreground uppercase tracking-wider">Wholesale Benefits</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                Direct manufacturing prices, reliable delivery, and custom shipping bundles.
              </p>
            </div>
          </aside>

          {/* Catalog Area */}
          <main className="lg:col-span-3 space-y-6">
            {/* Sorting & Stats */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border border-border/70 p-4 rounded-2xl bg-card">
              <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                Showing {filteredProducts.length} of {products.length} Products
              </p>
              <div className="flex items-center gap-3">
                <label htmlFor="sort" className="text-xs text-muted-foreground uppercase tracking-wider font-medium">Sort By:</label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-xs text-foreground outline-none focus:border-gold"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="moq-asc">MOQ: Low to High</option>
                </select>
              </div>
            </div>

            {/* Active search tag */}
            {q && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span>Search results for: <strong>"{q}"</strong></span>
                <Link to="/shop" className="rounded-full bg-secondary p-1 hover:bg-muted transition-colors">
                  <X className="h-3 w-3" />
                </Link>
              </div>
            )}

            {/* Products Grid */}
            {isLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 w-full animate-pulse rounded-2xl bg-secondary" />
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-20 border border-dashed border-border rounded-2xl">
                <p className="text-lg font-medium text-foreground">No Products Found</p>
                <p className="text-sm text-muted-foreground mt-1">Try resetting the filters or modifying your search query.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
