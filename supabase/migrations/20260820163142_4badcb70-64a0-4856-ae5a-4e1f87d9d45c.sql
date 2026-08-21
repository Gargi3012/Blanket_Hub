
-- ROLES
CREATE TYPE public.app_role AS ENUM ('admin','customer');

CREATE TABLE public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null default 'customer',
  created_at timestamptz not null default now(),
  unique (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE POLICY "users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- PROFILES
CREATE TABLE public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  address text,
  city text,
  state text,
  pincode text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "own profile insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "own profile update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name', NEW.email, NEW.raw_user_meta_data->>'phone')
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'customer')
  ON CONFLICT (user_id, role) DO NOTHING;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- PRODUCTS
CREATE TABLE public.products (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  short_description text,
  description text,
  category text not null,
  material text,
  weight text,
  sizes text[] not null default '{}',
  colors text[] not null default '{}',
  designs text[] not null default '{}',
  price numeric not null,
  wholesale_price numeric not null,
  moq integer not null default 10,
  stock integer not null default 0,
  images text[] not null default '{}',
  is_bestseller boolean not null default false,
  is_new_arrival boolean not null default false,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.products TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT ALL ON public.products TO service_role;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "products public read" ON public.products FOR SELECT USING (true);
CREATE POLICY "products admin write" ON public.products FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- WISHLIST
CREATE TABLE public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);
GRANT SELECT, INSERT, DELETE ON public.wishlist_items TO authenticated;
GRANT ALL ON public.wishlist_items TO service_role;
ALTER TABLE public.wishlist_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own wishlist" ON public.wishlist_items FOR ALL TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- ORDERS
CREATE TABLE public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null unique default ('BL-' || upper(substr(md5(random()::text),1,8))),
  user_id uuid references auth.users(id) on delete set null,
  status text not null default 'processing',
  payment_status text not null default 'pending',
  payment_method text,
  payment_reference text,
  customer_name text not null,
  phone text not null,
  email text,
  address text not null,
  city text not null,
  state text not null,
  pincode text not null,
  notes text,
  subtotal numeric not null default 0,
  shipping numeric not null default 0,
  discount numeric not null default 0,
  total numeric not null default 0,
  created_at timestamptz not null default now()
);
GRANT SELECT, INSERT, UPDATE ON public.orders TO authenticated;
GRANT ALL ON public.orders TO service_role;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "orders own read" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "orders own insert" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "orders admin update" ON public.orders FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  name text not null,
  image text,
  size text,
  color text,
  quantity integer not null,
  unit_price numeric not null
);
GRANT SELECT, INSERT ON public.order_items TO authenticated;
GRANT ALL ON public.order_items TO service_role;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "order items read" ON public.order_items FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND (o.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "order items insert" ON public.order_items FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id AND o.user_id = auth.uid()));

-- WHOLESALE ENQUIRIES
CREATE TABLE public.wholesale_enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business_name text,
  phone text not null,
  whatsapp text,
  email text,
  city text,
  quantity text,
  products_required text,
  size text,
  color_preference text,
  delivery_location text,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);
GRANT INSERT ON public.wholesale_enquiries TO anon;
GRANT SELECT, INSERT, UPDATE ON public.wholesale_enquiries TO authenticated;
GRANT ALL ON public.wholesale_enquiries TO service_role;
ALTER TABLE public.wholesale_enquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "enquiry public insert" ON public.wholesale_enquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "enquiry admin read" ON public.wholesale_enquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "enquiry admin update" ON public.wholesale_enquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- REVIEWS
CREATE TABLE public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  author_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  image_url text,
  created_at timestamptz not null default now()
);
GRANT SELECT ON public.reviews TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "reviews public read" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "reviews own write" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews own update" ON public.reviews FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "reviews own delete" ON public.reviews FOR DELETE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));

-- SEED PRODUCTS
INSERT INTO public.products (slug,name,short_description,description,category,material,weight,sizes,colors,designs,price,wholesale_price,moq,stock,images,is_bestseller,is_new_arrival,is_featured) VALUES
('royal-mink-double-blanket','Royal Mink Double Blanket','Ultra-soft double-ply mink blanket with a silk-touch finish.','Woven with premium double-ply mink fibre, this blanket offers exceptional warmth without weight. Colour-fast, shrink resistant and finished with a neat overlock border — a consistent bestseller for wholesale buyers.','Mink Blankets','100% Polyester Mink','2.4 kg','{"Double (220x240 cm)","Queen (240x260 cm)"}','{"Ivory","Beige","Soft Brown","Blush"}','{"Solid","Embossed Floral"}',2499,1499,20,480,'{"/images/cat-mink.jpg","/images/cat-double.jpg","/images/collection.jpg"}',true,false,true),
('classic-fleece-single-blanket','Classic Fleece Single Blanket','Light, breathable fleece — ideal for hostels and hotels.','Anti-pill polar fleece with a smooth hand-feel, quick drying and easy to launder in bulk. A dependable volume line for institutional and retail buyers.','Fleece Blankets','Anti-pill Polar Fleece','1.1 kg','{"Single (150x220 cm)"}','{"Cream","Grey","Camel"}','{"Solid","Checks"}',899,549,50,1200,'{"/images/cat-fleece.jpg","/images/collection.jpg"}',true,false,true),
('heritage-woven-throw','Heritage Woven Throw','Handloom-inspired woven throw with fringed edges.','A textured cotton-blend throw with hand-knotted fringes. Designed for premium retail shelves and gifting ranges.','Premium Blankets','Cotton Blend','1.6 kg','{"Throw (130x170 cm)","Single (150x220 cm)"}','{"Ivory","Soft Brown"}','{"Herringbone"}',1899,1199,15,260,'{"/images/hero-blanket.jpg","/images/cat-premium.jpg"}',false,true,true),
('winter-sherpa-double-blanket','Winter Sherpa Double Blanket','Heavyweight sherpa-backed blanket for extreme winters.','Dual-layer construction with a plush sherpa reverse. Retains heat exceptionally well and holds its loft after repeated washes.','Winter Collection','Sherpa / Micro Polyester','3.2 kg','{"Double (220x240 cm)","King (260x280 cm)"}','{"Cream","Rust","Camel"}','{"Solid","Cable Knit"}',3299,2149,20,340,'{"/images/cat-winter.jpg","/images/cat-double.jpg"}',true,true,true),
('gold-thread-luxury-blanket','Gold Thread Luxury Blanket','Signature premium blanket with fine gold thread detailing.','Our flagship luxury line — a satin-touch face with subtle metallic thread work along the border. Presented in a premium gift box for retail.','Premium Blankets','Microfibre Satin Blend','2.0 kg','{"Double (220x240 cm)","Queen (240x260 cm)"}','{"Ivory","Champagne"}','{"Bordered","Solid"}',4499,2999,10,150,'{"/images/cat-premium.jpg","/images/hero-blanket.jpg"}',false,true,true),
('everyday-mink-single-blanket','Everyday Mink Single Blanket','Single-bed mink blanket at a sharp wholesale rate.','A high-turnover single-bed mink blanket built for value retail. Soft face, dense pile and excellent colour retention.','Single Bed Blankets','Polyester Mink','1.5 kg','{"Single (150x220 cm)"}','{"Beige","Ivory","Grey"}','{"Solid","Embossed"}',1299,799,30,900,'{"/images/cat-mink.jpg","/images/cat-single.jpg"}',true,false,false),
('hotel-grade-double-blanket','Hotel Grade Double Blanket','Institutional-grade blanket for hotels and resorts.','Engineered for commercial laundering with reinforced stitching and a low-lint finish. Available in neutral hospitality shades.','Double Bed Blankets','Micro Polyester','2.2 kg','{"Double (220x240 cm)"}','{"Ivory","Stone"}','{"Solid"}',1799,1049,50,760,'{"/images/cat-double.jpg","/images/collection.jpg"}',false,false,false),
('plush-fleece-double-blanket','Plush Fleece Double Blanket','Extra-plush fleece with a velvet-soft surface.','A thicker fleece variant with a brushed velvet face. Popular for festive season retail and corporate gifting.','Fleece Blankets','Coral Fleece','1.9 kg','{"Double (220x240 cm)"}','{"Cream","Blush","Camel"}','{"Solid","Printed"}',1599,989,25,540,'{"/images/cat-fleece.jpg","/images/cat-double.jpg"}',false,true,false),
('nordic-knit-blanket','Nordic Knit Blanket','Chunky knit blanket with a natural, artisanal look.','Chunky-gauge knit in undyed natural tones. A premium display piece for boutique home stores.','New Arrivals','Acrylic Wool Blend','2.6 kg','{"Throw (130x170 cm)","Double (220x240 cm)"}','{"Ivory","Oat"}','{"Cable Knit"}',2899,1849,10,180,'{"/images/cat-winter.jpg","/images/hero-blanket.jpg"}',false,true,true),
('soft-touch-baby-blanket','Soft Touch Baby Blanket','Skin-friendly baby blanket, certified soft yarns.','Gentle, hypoallergenic yarns with rounded edges and no loose fibres. Sold in mixed-colour cartons.','New Arrivals','Micro Fibre','0.4 kg','{"Baby (100x140 cm)"}','{"Ivory","Blush","Mint"}','{"Printed","Solid"}',699,399,50,1500,'{"/images/cat-fleece.jpg","/images/cat-mink.jpg"}',false,true,false),
('embossed-mink-queen-blanket','Embossed Mink Queen Blanket','Queen size mink blanket with embossed floral work.','Deep-pile mink with a pressed floral emboss across the face. A strong seller in the wedding and gifting segment.','Mink Blankets','Polyester Mink','2.8 kg','{"Queen (240x260 cm)","King (260x280 cm)"}','{"Beige","Soft Brown","Ivory"}','{"Embossed Floral"}',3499,2299,15,290,'{"/images/cat-mink.jpg","/images/cat-premium.jpg"}',true,false,true),
('travel-fleece-throw','Travel Fleece Throw','Compact fleece throw for travel and airline use.','Lightweight, foldable and individually packed. Ideal for travel retail, airlines and promotional distribution.','Best Sellers','Polar Fleece','0.5 kg','{"Throw (130x170 cm)"}','{"Grey","Cream","Camel"}','{"Solid"}',499,279,100,2400,'{"/images/cat-fleece.jpg","/images/collection.jpg"}',true,false,false);
