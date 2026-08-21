import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck, ShoppingBag, MapPin, Settings, LogOut, ArrowRight, User } from "lucide-react";
import { formatPrice } from "@/lib/site";

export const Route = createFileRoute("/account/")({
  component: AccountDashboard,
});

function AccountDashboard() {
  // Simulated partner profile
  const partner = {
    name: "Rajesh Mehta",
    company: "Mehta Home Textiles",
    email: "rajesh@mehtatextiles.in",
    phone: "+91 98765 43210",
    tier: "Gold Sourcing Partner",
    city: "New Delhi",
  };

  const orders = [
    {
      id: "LL-B2B-897120",
      date: "14 Aug 2026",
      status: "Shipped",
      total: 48500,
      items: "Luxury Mink (x12), Premium Fleece (x25)",
    },
    {
      id: "LL-B2B-823419",
      date: "28 Jul 2026",
      status: "Delivered",
      total: 32400,
      items: "Double Bed Blanket (x18)",
    },
  ];

  return (
    <div className="bg-background py-12">
      <div className="container-page space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">B2B Dashboard</span>
        </nav>

        <h1 className="font-display text-4xl text-foreground">B2B Partner Portal</h1>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Sidebar Menu */}
          <aside className="lg:col-span-3 space-y-2 border border-border/80 p-5 rounded-2xl bg-card shadow-soft h-fit">
            <div className="border-b border-border pb-4 mb-4 text-center sm:text-left space-y-1">
              <p className="font-display text-lg text-foreground font-bold">{partner.company}</p>
              <p className="text-[10px] text-gold font-bold uppercase tracking-wider">{partner.tier}</p>
            </div>

            <Link
              to="/account"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-gold bg-gold-soft/10"
            >
              <User className="h-4 w-4" /> Profile Dashboard
            </Link>
            <Link
              to="/account/wishlist"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <ShoppingBag className="h-4 w-4" /> B2B Wishlist
            </Link>
            <Link
              to="/"
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              <LogOut className="h-4 w-4" /> Sign Out
            </Link>
          </aside>

          {/* Main Dashboard Panel */}
          <main className="lg:col-span-9 space-y-8">
            {/* Summary Cards */}
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Active Orders</span>
                <p className="font-display text-3xl font-bold text-foreground">1 Cargo</p>
                <p className="text-[10px] text-gold font-medium">In Route from Panipat</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Yearly Sourced Value</span>
                <p className="font-display text-3xl font-bold text-foreground">₹2,84,500</p>
                <p className="text-[10px] text-muted-foreground">Across 6 wholesale contracts</p>
              </div>
              <div className="p-6 rounded-2xl border border-border bg-card shadow-soft space-y-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">B2B Sourcing Tier</span>
                <p className="font-display text-3xl font-bold text-foreground">Gold</p>
                <p className="text-[10px] text-gold font-semibold uppercase tracking-wider">Direct Mill Access</p>
              </div>
            </div>

            {/* Profile Info */}
            <div className="border border-border/80 p-6 rounded-2xl bg-card space-y-4">
              <h2 className="font-display text-2xl text-foreground pb-2 border-b border-border">Representative Profile</h2>
              <div className="grid gap-6 sm:grid-cols-2 text-xs">
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider font-semibold">Representative Contact</p>
                  <p className="text-foreground font-semibold mt-1 text-sm">{partner.name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider font-semibold">Associated Enterprise</p>
                  <p className="text-foreground font-semibold mt-1 text-sm">{partner.company}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider font-semibold">Corporate Email</p>
                  <p className="text-foreground font-semibold mt-1 text-sm">{partner.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase tracking-wider font-semibold">B2B Sourcing Address</p>
                  <p className="text-foreground font-semibold mt-1 text-sm">{partner.city}, India</p>
                </div>
              </div>
            </div>

            {/* Past Cargo Shipments */}
            <div className="border border-border/80 p-6 rounded-2xl bg-card space-y-4">
              <h2 className="font-display text-2xl text-foreground pb-2 border-b border-border font-medium">Recent Cargo Shipments</h2>
              <div className="space-y-4">
                {orders.map((ord, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-border/60 bg-background text-xs gap-3"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{ord.id} · <span className="font-normal text-muted-foreground">{ord.date}</span></p>
                      <p className="text-muted-foreground mt-1">Packs: {ord.items}</p>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 gap-2">
                      <p className="font-bold text-foreground">{formatPrice(ord.total)}</p>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-wider ${ord.status === "Shipped" ? "bg-gold-soft/30 text-foreground" : "bg-secondary text-muted-foreground"}`}
                      >
                        {ord.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
