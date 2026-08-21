# 📝 Premium Blanket Hub - Development Log

This document tracks the incremental design decisions, component implementations, and codebase architecture for the **Premium Blanket Hub** project.

---

## 📅 Log Entry: August 21, 2026

### 🚀 Phase 1: Project Initialization & Routing
*   **Boilerplate Selection**: Set up the project using a modern TanStack Start boilerplate with Vite and TypeScript.
*   **Routing Layout**: Defined the core TanStack routing tree under `src/routes/`:
    *   `__root.tsx`: Global layout, Header, Footer wrapper, and providers setup (Auth & Cart context providers).
    *   `index.tsx`: Main home page layout.
    *   `shop.tsx`: Catalog with full filter sidebar.
    *   `product.$slug.tsx`: Dynamic routing for item descriptions.
    *   `wholesale.tsx`: Large custom order request interface.
    *   `cart.tsx` & `checkout.tsx`: Complete checkout journey routes.
    *   `about.tsx`, `contact.tsx`: Supporting static informational pages.
    *   `account/`: Sub-routing folder containing `index.tsx` (profile) and `wishlist.tsx` (saved items).

### 🎨 Phase 2: Design System & Styling
*   **Color Palette Theme**: Designed an elegant warm-toned CSS system utilizing ivory/cream (`#FAF9F6`), soft beiges, gold borders (`#D4AF37` / `#C5A880`), and premium charcoal/brown typography to escape default template aesthetics.
*   **Tailwind CSS v4 Integration**: Used Tailwind v4 styling with clean custom CSS variables to control font spacing, card transitions, and micro-hover states.
*   **Responsive layouts**: Formatted mobile-first collapsible navigation and side-sheets for filters and shopping cart toggles.

### 🔐 Phase 3: Authentication Demo Configuration
*   **Mock Hook Implementation**: Structured `src/hooks/useAuth.tsx` with a mock anonymous session (`user: null`, `isAdmin: false`) for local demo usage, avoiding runtime connection blocks, while maintaining support for Supabase hook hooks for production.
*   **Auth UI Router**: Placed custom sign-in/registration panels at `/auth` showing responsive inputs, form states, and client-side feedback.

### 📦 Phase 4: Product Catalog & Advanced Search
*   **Product Model Structure**: Designed data schemas in `src/lib/products.ts` containing properties for GSM (blanket weights), materials (Mink, Fleece, Wool), size configurations (Single, Double, King), stock details, minimum order quantities (MOQ), and tier-based wholesale pricing matrices.
*   **Filtering Engine**: Built state-driven search query parsers alongside filters filtering by category, colors, dimensions, and materials.
*   **Sorting Controllers**: Coded high-to-low/low-to-high pricing and rating sort algorithms.

### 🛒 Phase 5: Cart & Checkout Pipelines
*   **Shopping Cart State**: Constructed a React Context-based Cart Provider with real-time computations:
    *   Quantity increment/decrement.
    *   Subtotal and tax tallies.
    *   MOQ warning notification when order counts fall below bulk limits.
*   **Checkout wizard**: Created steps for shipping addresses, invoice collection, and success redirection.

### 💬 Phase 6: Wholesale Custom Enquiry Forms
*   **Enquiry fields**: Created inputs at `/wholesale` to collect company credentials, blanket lines, quantities, and customizable branding guidelines (e.g. custom tags or logos).
*   **Toasts & validation**: Integrated Sonner notifications validating submissions and providing immediate premium feedback to users.

### ⚙️ Phase 7: Validation & Commits
*   **Clean Build Check**: Run `bun run build` successfully to confirm clean TypeScript, Nitro, and client environments compilation.
*   **Granular Commits**: Staged changes incrementally by feature (Auth, Shop, Cart/Checkout, Pages, Account, Core Layout) into Git.
