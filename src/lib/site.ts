// ---------------------------------------------------------------------------
// Business information — edit everything here to rebrand the site.
// ---------------------------------------------------------------------------
export const site = {
  name: "Loom & Luxe",
  tagline: "Wholesale Blankets • Premium Quality • Competitive Prices",
  shortDescription:
    "A wholesale blanket supplier crafting premium mink, fleece and winter blankets for retailers, hotels and institutions worldwide.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, with country code
  email: "sales@loomandluxe.com",
  address: "Plot 42, Textile Market Road, Panipat, Haryana 132103, India",
  mapQuery: "Textile Market Road, Panipat, Haryana",
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  currency: "₹",
  freeShippingAbove: 25000,
  shippingFlatRate: 450,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const categories = [
  { name: "Mink Blankets", image: "/images/cat-mink.jpg" },
  { name: "Fleece Blankets", image: "/images/cat-fleece.jpg" },
  { name: "Double Bed Blankets", image: "/images/cat-double.jpg" },
  { name: "Single Bed Blankets", image: "/images/cat-single.jpg" },
  { name: "Premium Blankets", image: "/images/cat-premium.jpg" },
  { name: "Winter Collection", image: "/images/cat-winter.jpg" },
  { name: "New Arrivals", image: "/images/hero-blanket.jpg" },
  { name: "Best Sellers", image: "/images/collection.jpg" },
] as const;

export function formatPrice(value: number) {
  return `${site.currency}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}
