import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Heart, Sparkles, Trophy, Award, Landmark } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="bg-background py-16">
      <div className="container-page space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">About Us</span>
        </nav>

        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-foreground">
              <Landmark className="h-3.5 w-3.5 text-gold" /> TEXTILE HERITAGE
            </div>
            <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
              Our Journey of Crafting <br />
              <span className="italic text-foreground/80">Warmth and Comfort</span>
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Based in the historic city of Panipat, India—known globally as the <em>City of Weavers</em>—Loom & Luxe has grown from a humble family-run weaving mill into a premier supplier of high-end mink, fleece, and quilted winter blankets.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We stand at the unique crossroads of artisanal pride and state-of-the-art synthetic fiber spinning. By managing the supply chain end-to-end, we ensure that every box delivered to our B2B partners matches the exact touch, density, and color profile we designed at our loom.
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-border shadow-lift aspect-square bg-secondary">
              <img
                src="/images/cat-premium.jpg"
                alt="Luxury fabrics closeup loom and luxe about page"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-10 border-t border-border pt-16">
          <div className="text-center space-y-2">
            <h2 className="font-display text-3xl text-foreground">Our Sourcing Pillars</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">Principles Behind Loom & Luxe</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {/* Pillar 1 */}
            <div className="p-8 rounded-2xl border border-border/60 bg-card space-y-4 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Unmatched Softness</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We select high-density microfibers that undergo multiple embossing washes, ensuring that the final blanket feel remains cloud-like after years of use.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-8 rounded-2xl border border-border/60 bg-card space-y-4 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Stitching Integrity</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All borders are hemmed with double-track locking stitches to withstand commercial laundries, preventing structural tears or unraveling.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-8 rounded-2xl border border-border/60 bg-card space-y-4 shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                <Trophy className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl text-foreground font-semibold">Wholesale Trust</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We respect deadlines. Staggered logistics planning ensures that container loads leave our Panipat docks exactly as promised in B2B accounts.
              </p>
            </div>
          </div>
        </div>

        {/* History / Vision Callout */}
        <div className="rounded-2xl border border-border p-8 md:p-12 bg-cream text-center space-y-4 max-w-4xl mx-auto shadow-lift">
          <span className="eyebrow">Our Vision</span>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">Bringing Warmth to Every Space</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            “Loom & Luxe was born out of a desire to make premium comfort accessible. We strive to be the most trusted supply partner for hotels, retail chains, and distributors by upholding rigorous Indian textile craftsmanship.”
          </p>
          <div className="pt-2">
            <Link
              to="/wholesale"
              className="rounded-full bg-primary px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
