export type Product = {
  id: string;
  slug: string;
  name: string;
  short_description: string | null;
  description: string | null;
  category: string;
  material: string | null;
  weight: string | null;
  sizes: string[];
  colors: string[];
  designs: string[];
  price: number;
  wholesale_price: number;
  moq: number;
  stock: number;
  images: string[];
  is_bestseller: boolean;
  is_new_arrival: boolean;
  is_featured: boolean;
  created_at: string;
};

const MOCK_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    slug: "luxury-mink-blanket",
    name: "Luxury Mink Blanket",
    short_description: "Ultra-soft double-ply mink blanket designed for heavy winter warmth and plush comfort.",
    description: "Crafted from high-density microfiber yarns, our Luxury Mink Blanket provides unmatched insulation and a silky-smooth hand feel. Features beautiful deep embossing and double-sided pile for lasting softness. Perfect for premium retail catalogs, boutique hospitality, and gift buyers who demand the absolute best in home comfort.",
    category: "Mink Blankets",
    material: "100% Microfiber Polyester",
    weight: "4.5 kg",
    sizes: ["Double (220 x 240 cm)", "Single (150 x 220 cm)"],
    colors: ["Ivory Cream", "Warm Sand", "Soft Taupe", "Rich Cocoa"],
    designs: ["Floral Embossed", "Geometric Classic", "Solid Plain"],
    price: 4200,
    wholesale_price: 2400,
    moq: 10,
    stock: 150,
    images: ["/images/cat-mink.jpg", "/images/collection.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "prod-2",
    slug: "premium-fleece-blanket",
    name: "Premium Fleece Blanket",
    short_description: "Lightweight, breathable, and highly durable fleece throw ideal for all-season cozy comfort.",
    description: "Our Premium Fleece Blanket features anti-pilling polar fleece technology that retains its fluffy texture even after multiple washes. Lightweight yet thermally efficient, it is a versatile addition to any bedroom or living room setup. Popular for hotel supplies, institutional orders, and corporate gifting.",
    category: "Fleece Blankets",
    material: "100% Polar Fleece",
    weight: "1.2 kg",
    sizes: ["Single (150 x 220 cm)", "Double (200 x 220 cm)"],
    colors: ["Warm Beige", "Soft Cream", "Champagne Gold"],
    designs: ["Solid Plain", "Subtle Herringbone"],
    price: 1800,
    wholesale_price: 950,
    moq: 20,
    stock: 300,
    images: ["/images/cat-fleece.jpg", "/images/hero-blanket.jpg"],
    is_bestseller: false,
    is_new_arrival: true,
    is_featured: true,
    created_at: "2026-01-02T00:00:00Z"
  },
  {
    id: "prod-3",
    slug: "winter-comfort-blanket",
    name: "Winter Comfort Blanket",
    short_description: "Heavyweight quilted thermal blanket engineered for freezing temperatures and deep sleep.",
    description: "Designed specifically for harsh winter months, the Winter Comfort Blanket combines a thick sherpa reverse with a brushed velvet face. Fully quilted channels ensure the warm micro-filling stays evenly distributed. The ultimate blend of luxury, elegance, and extreme warmth.",
    category: "Winter Collection",
    material: "Sherpa & Velvet Blend",
    weight: "5.0 kg",
    sizes: ["Double (220 x 240 cm)"],
    colors: ["Rich Cocoa", "Soft Taupe", "Ivory Cream"],
    designs: ["Classic Diamond Quilt", "Solid Elegance"],
    price: 5500,
    wholesale_price: 3200,
    moq: 8,
    stock: 80,
    images: ["/images/cat-winter.jpg", "/images/collection.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-03T00:00:00Z"
  },
  {
    id: "prod-4",
    slug: "soft-double-bed-blanket",
    name: "Soft Double Bed Blanket",
    short_description: "Premium large-size blanket offering cloud-like softness for couples and family beds.",
    description: "Wrap yourself in cloud-like comfort with our Soft Double Bed Blanket. Sized generously to cover King and Queen beds with elegant drape. It uses low-twist yarn technology to maximize loft and skin friendliness. A staple product line for regular retail inventory.",
    category: "Double Bed Blankets",
    material: "Flannel Fleece",
    weight: "2.8 kg",
    sizes: ["Double (220 x 240 cm)"],
    colors: ["Warm Sand", "Ivory Cream", "Soft Taupe"],
    designs: ["Solid Plain", "Classic Bordered"],
    price: 3200,
    wholesale_price: 1800,
    moq: 12,
    stock: 120,
    images: ["/images/cat-double.jpg", "/images/hero-blanket.jpg"],
    is_bestseller: false,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-04T00:00:00Z"
  },
  {
    id: "prod-5",
    slug: "premium-printed-blanket",
    name: "Premium Printed Blanket",
    short_description: "Exquisite jacquard printed blanket with elegant classical patterns and gold-accent borders.",
    description: "Designed to elevate room interiors, our Premium Printed Blanket features elegant, classical jacquard patterns finished with custom border binding. The colors are deeply saturated and designed not to fade. Ideal for premium home decor boutiques and luxury gift collections.",
    category: "Premium Blankets",
    material: "Luxury Flannel & Mink",
    weight: "3.5 kg",
    sizes: ["Double (220 x 240 cm)"],
    colors: ["Champagne Gold", "Warm Beige", "Rich Cocoa"],
    designs: ["Classical Jacquard", "Gold Accent Floral"],
    price: 4800,
    wholesale_price: 2800,
    moq: 10,
    stock: 95,
    images: ["/images/cat-premium.jpg", "/images/collection.jpg"],
    is_bestseller: true,
    is_new_arrival: true,
    is_featured: true,
    created_at: "2026-01-05T00:00:00Z"
  },
  {
    id: "prod-6",
    slug: "classic-single-bed-blanket",
    name: "Classic Single Bed Blanket",
    short_description: "Durable and cozy single bed blanket, perfect for hostels, guesthouses, and everyday home use.",
    description: "Our Classic Single Bed Blanket is designed for individual comfort and robust utility. Offering great warmth-to-weight ratio and compact storage size. Extremely easy to care for, machine washable, and built to survive frequent industrial laundering, making it the choice for hostelry and large bulk contracts.",
    category: "Single Bed Blankets",
    material: "Micro-Flannel",
    weight: "1.5 kg",
    sizes: ["Single (150 x 220 cm)"],
    colors: ["Soft Cream", "Warm Sand", "Warm Beige"],
    designs: ["Solid Plain", "Classic Striped"],
    price: 1500,
    wholesale_price: 750,
    moq: 25,
    stock: 250,
    images: ["/images/cat-single.jpg", "/images/hero-blanket.jpg"],
    is_bestseller: false,
    is_new_arrival: false,
    is_featured: false,
    created_at: "2026-01-06T00:00:00Z"
  }
];

export async function fetchProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export const productsQuery = {
  queryKey: ["products"],
  queryFn: fetchProducts,
  staleTime: 60_000,
};

export const productQuery = (slug: string) => ({
  queryKey: ["product", slug],
  queryFn: () => fetchProductBySlug(slug),
  staleTime: 60_000,
});
