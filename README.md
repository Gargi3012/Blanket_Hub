# 🛌 Premium Blanket Hub

Premium Blanket Hub is a luxury, modern, and fully responsive e-commerce web application built for a wholesale bedding and blanket enterprise. Designed with a sophisticated, warm color palette (ivory, cream, beige, soft brown, and subtle gold accents), it offers a premium, high-end shopping experience tailored for bulk buyers, retailers, and individual customers alike.

---

## ✨ Features

### 1. 🏡 Exquisite Homepage
*   **Hero Section**: Stunning layout with high-quality lifestyle imagery, elegant typography, trust badges, and direct call-to-actions (Shop Collection, Get Wholesale Quote).
*   **Featured Categories**: Grid layouts showcasing Mink, Fleece, Single Bed, Double Bed, and Premium collections.
*   **Trust Pillars**: Direct highlights on bulk ordering, wholesale rates, and global supply guarantees.
*   **Testimonials & FAQ**: Smooth accordion components to address common bulk order queries and build brand authority.

### 2. 🛍️ Advanced Product Catalog (`/shop`)
*   **Dynamic Searching & Filtering**: Search blankets by name or description. Filter by category, bed size (Single, Double, King), materials, colors, and interactive price sliders.
*   **Smart Sorting**: Sort products instantly by popularity, pricing (low-to-high, high-to-low), and top ratings.
*   **Bulk-Pricing Highlights**: Displays clear Minimum Order Quantity (MOQ) and tier-based wholesale pricing.

### 3. 🔍 Product Details Page (`/product/$slug`)
*   **Rich Image Gallery**: High-resolution zoomable images showing blanket textures.
*   **Interactive Configurator**: Select size, colors, and order quantity with immediate tier-based wholesale price updates.
*   **Technical Specifications**: Transparent details on GSM (density), material, wash care, and packaging.

### 4. 🛒 Interactive Cart & Checkout Layout (`/cart`, `/checkout`)
*   **Slide-over Shopping Cart**: Quick access to modify quantities, view subtotal, and track order MOQ requirements.
*   **Secure Multi-Step Checkout**: A streamlined checkout flow including shipping details, wholesale accounts verification, and order confirmation.

### 5. 📞 Wholesale Enquiry (`/wholesale`)
*   **Custom Bulk Enquiry Form**: Specifically designed for wholesale partners to request custom quotes, select blanket quantities, specify custom branding (logo embroidery), and submit requirements.

### 6. 👤 User Dashboard & Wishlist (`/account`, `/account/wishlist`)
*   **Account Settings**: Mock profile overview.
*   **Wishlist Tracker**: Save premium blankets for future bulk orders.

---

## 🛠️ Tech Stack

*   **Framework**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
*   **Routing**: [TanStack Start / React Router](https://tanstack.com/router)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using vanilla CSS theme overrides)
*   **State Management**: React Context, Memoized State
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **UI Components**: [Radix UI](https://www.radix-ui.com/) (Primitives) & [Sonner](https://sonner.emilkowal.ski/) (Toasts)

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Bun](https://bun.sh/) (recommended) or [Node.js](https://nodejs.org/) installed.

### Setup Instructions

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Gargi3012/Blanket_Hub.git
    cd Blanket_Hub
    ```

2.  **Install Dependencies**:
    ```bash
    bun install
    # or
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    bun run dev
    # or
    npm run dev
    ```
    Open `http://localhost:3000` (or the URL displayed in the terminal) to view the project in your browser.

4.  **Production Build**:
    ```bash
    bun run build
    # or
    npm run build
    ```
