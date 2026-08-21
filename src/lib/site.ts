// ---------------------------------------------------------------------------
// Business information — edit everything here to rebrand the site.
// ---------------------------------------------------------------------------
export const site = {
  name: "CozyNest",
  tagline: "Premium blankets designed to bring warmth, comfort and style to every home.",
  shortDescription:
    "A luxury blanket brand crafting premium fleece, winter, and custom sizing blankets with elegant design accents.",
  phone: "+91 98765 43210",
  whatsapp: "919876543210", // digits only, with country code
  email: "sales@cozynest.com",
  address: "Plot 42, Textile Market Road, Panipat, Haryana 132103, India",
  mapQuery: "Textile Market Road, Panipat, Haryana",
  hours: "Mon – Sat, 9:30 AM – 7:00 PM",
  currency: "₹",
  freeShippingAbove: 999,
  shippingFlatRate: 150,
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const categories = [
  { name: "Winter Blankets", image: "/images/cat-winter.jpg" },
  { name: "Fleece Blankets", image: "/images/cat-fleece.jpg" },
  { name: "King Size", image: "/images/cat-double.jpg" },
  { name: "Queen Size", image: "/images/cat-premium.jpg" },
  { name: "Baby Blankets", image: "/images/cat-single.jpg" },
  { name: "Premium Collection", image: "/images/hero-blanket.jpg" },
] as const;

export function formatPrice(value: number) {
  return `${site.currency}${new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value)}`;
}
