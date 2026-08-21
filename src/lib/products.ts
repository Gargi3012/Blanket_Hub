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
  old_price?: number;
  rating?: number;
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
    slug: "luxury-soft-fleece-blanket",
    name: "Luxury Soft Fleece Blanket",
    short_description: "Ultra-soft and lightweight polar fleece blanket perfect for all-season comfort.",
    description: "Crafted from premium-grade microfiber polar fleece, this blanket offers outstanding warmth-to-weight ratio and a exceptionally soft pile. Features double-sided brushed anti-pill fibers that stay fluffy after washing. An excellent addition to luxury hotel supplies, hospital chains, and modern bedroom styling.",
    category: "Fleece Blankets",
    material: "Premium Polar Fleece",
    weight: "1.4 kg",
    sizes: ["Single (150x220 cm)", "Double (200x220 cm)"],
    colors: ["Warm Ivory", "Sage Green", "Soft Camel", "Dusty Rose"],
    designs: ["Brushed Plain", "Subtle Herringbone"],
    price: 1899,
    old_price: 2499,
    rating: 4.8,
    wholesale_price: 999,
    moq: 15,
    stock: 320,
    images: ["/images/cat-fleece.jpg", "/images/collection.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-01T00:00:00Z"
  },
  {
    id: "prod-2",
    slug: "premium-king-size-blanket",
    name: "Premium King Size Blanket",
    short_description: "Heavyweight high-pile embossed mink blanket designed for ultimate king-size bedding luxury.",
    description: "Our signature King Size Mink blanket features deep, ornate embossing on dual-sided ultra-thick pile. Meticulously bound with soft satin border trim to resist shedding. Keeps you exceptionally cozy in heavy winters while rendering a breathtaking visual profile to master bedrooms.",
    category: "King Size",
    material: "High-Pile Embossed Mink",
    weight: "4.8 kg",
    sizes: ["King (220x240 cm)"],
    colors: ["Champagne Gold", "Rich Espresso", "Pearl Cream"],
    designs: ["Royal Damask", "Solid Embossed"],
    price: 4299,
    old_price: 5499,
    rating: 4.9,
    wholesale_price: 2399,
    moq: 8,
    stock: 140,
    images: ["/images/cat-premium.jpg", "/images/hero-blanket.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-02T00:00:00Z"
  },
  {
    id: "prod-3",
    slug: "ultra-soft-winter-blanket",
    name: "Ultra Soft Winter Blanket",
    short_description: "Dual-layer velvet and heavy quilted sherpa blanket for sub-zero temperatures.",
    description: "Built for freezing winters, this heavyweight blanket marries a smooth velvet-touch face with a thick, cozy sherpa reverse. Box-quilted stitches keep the inner cloud-fill perfectly distributed. Delivers heavy warmth and a premium plush texture.",
    category: "Winter Blankets",
    material: "Sherpa & Luxury Velvet",
    weight: "5.2 kg",
    sizes: ["Double (220x240 cm)", "King (240x260 cm)"],
    colors: ["Warm Charcoal", "Chestnut", "Alabaster Cream"],
    designs: ["Quilted Diamond", "Classic Bordered"],
    price: 5199,
    old_price: 6999,
    rating: 4.9,
    wholesale_price: 2999,
    moq: 6,
    stock: 95,
    images: ["/images/cat-winter.jpg", "/images/cat-mink.jpg"],
    is_bestseller: true,
    is_new_arrival: true,
    is_featured: true,
    created_at: "2026-01-03T00:00:00Z"
  },
  {
    id: "prod-4",
    slug: "floral-comfort-blanket",
    name: "Floral Comfort Blanket",
    short_description: "Elegant mink blanket with classic floral layouts and high-end texture embossing.",
    description: "Bring nature-inspired comfort to your bedroom. Features classic rose and botanical patterns printed with high-saturated reactive dyes. Soft pile construction prevents static build-up and handles machine washes easily, keeping its colors and pile structure intact.",
    category: "Premium Collection",
    material: "Soft Microfiber Mink",
    weight: "3.8 kg",
    sizes: ["Double (200x220 cm)", "King (220x240 cm)"],
    colors: ["Vintage Rose", "Beige Bouquet", "Cream Lavender"],
    designs: ["Traditional Floral", "Contemporary Leaf"],
    price: 3499,
    old_price: 4499,
    rating: 4.7,
    wholesale_price: 1950,
    moq: 10,
    stock: 180,
    images: ["/images/hero-blanket.jpg", "/images/cat-mink.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
    created_at: "2026-01-04T00:00:00Z"
  },
  {
    id: "prod-5",
    slug: "kids-cozy-blanket",
    name: "Kids Cozy Blanket",
    short_description: "Super soft, organic flannel blanket featuring playful designs and hypoallergenic care.",
    description: "Woven specifically for sensitive skin. Made with hypoallergenic organic flannel cotton-blend yarns that feel like a gentle hug. Features playful starry and teddy designs that children adore. Warm, lightweight, and completely toxic-free.",
    category: "Baby Blankets",
    material: "Organic Cotton & Flannel",
    weight: "0.8 kg",
    sizes: ["Toddler (100x140 cm)"],
    colors: ["Soft Butter", "Powder Blue", "Peach Cream"],
    designs: ["Starry Night", "Playful Dots", "Teddy Embossed"],
    price: 1499,
    old_price: 1999,
    rating: 4.8,
    wholesale_price: 750,
    moq: 20,
    stock: 240,
    images: ["/images/cat-single.jpg", "/images/cat-fleece.jpg"],
    is_bestseller: true,
    is_new_arrival: true,
    is_featured: true,
    created_at: "2026-01-05T00:00:00Z"
  },
  {
    id: "prod-6",
    slug: "premium-double-bed-blanket",
    name: "Premium Double Bed Blanket",
    short_description: "Thick double bed blanket with a cloud-like touch and clean minimal aesthetics.",
    description: "Designed for modern living. Embraces a clean, rib-knitted finish and cloud-touch feel without busy patterns. Highly breathable yet retains body heat during chilly autumn and winter nights. An elegant asset for luxury rental stays and minimalist homes.",
    category: "Queen Size",
    material: "Dense Cloud Flannel",
    weight: "3.2 kg",
    sizes: ["Double (200x220 cm)"],
    colors: ["Taupe Sand", "Muted Gold", "Vanilla Cream"],
    designs: ["Subtle Ribbed", "Solid Plain"],
    price: 3199,
    old_price: 3999,
    rating: 4.6,
    wholesale_price: 1690,
    moq: 12,
    stock: 150,
    images: ["/images/cat-double.jpg", "/images/collection.jpg"],
    is_bestseller: true,
    is_new_arrival: false,
    is_featured: true,
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
