import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, ChevronRight, MessageCircle, Send, Sparkles, AlertCircle } from "lucide-react";
import { formatPrice, site, whatsappLink } from "@/lib/site";

export const Route = createFileRoute("/wholesale")({
  component: Wholesale,
});

function Wholesale() {
  // Form State
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [quantity, setQuantity] = useState("100");
  const [productsRequired, setProductsRequired] = useState("Mink Blankets");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name || !businessName || !phone || !email || !city || !quantity) {
      setError("Please fill out all mandatory fields.");
      return;
    }

    // Success Simulation
    setSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setBusinessName("");
    setPhone("");
    setEmail("");
    setCity("");
    setQuantity("100");
    setProductsRequired("Mink Blankets");
    setMessage("");
    setSubmitted(false);
  };

  return (
    <div className="bg-background py-8 md:py-12">
      <div className="container-page space-y-8 md:space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <a href="/" className="hover:text-foreground">Home</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Wholesale Quotes</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Sourcing Information */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-soft/20 px-3 py-1 text-[10px] font-semibold tracking-wider text-foreground">
                <Sparkles className="h-3.5 w-3.5 text-gold" /> B2B PARTNERSHIP
              </div>
              <h1 className="font-display text-4xl sm:text-5xl text-foreground leading-tight">
                Wholesale Blankets <br />
                <span className="italic text-foreground/80">at Factory Prices</span>
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connect directly with Panipat's leading home textile network. We supply premium bedding products engineered to maintain plush pile density, lightweight insulation, and superior stitching finishes over long-term commercial washing cycles.
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-4">
              {[
                {
                  title: "Direct Factory Pricing",
                  desc: "Cut out middlemen margins with transparent wholesale price lists straight from the Panipat mills.",
                },
                {
                  title: "Flexible Carton MOQs",
                  desc: "Start small and scale with flexible, pre-packed volume packages suited for boutique hotel owners and small B2B retailers.",
                },
                {
                  title: "Global Supply Networks",
                  desc: "Robust supply chains, structured logistics packaging, and fast dock dispatch ensure orders ship safely.",
                },
                {
                  title: "Custom Printing & Branding",
                  desc: "Inquire about custom tags, printed labels, and corporate blanket designs tailored to your brand identity.",
                },
              ].map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <CheckCircle2 className="h-5.5 w-5.5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-display text-lg text-foreground font-medium">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Immediate Help */}
            <div className="border-t border-border pt-8 space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-foreground">Need Urgent Assistance?</h3>
              <p className="text-xs text-muted-foreground">
                Get connected to our corporate accounts desk immediately to discuss custom weights, designs, and volume discounts.
              </p>
              <a
                href={whatsappLink("Hi CozyNest, I need an urgent wholesale price list for mink and fleece blankets.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white shadow-soft hover:bg-[#25d366]/90 transition-colors"
              >
                <MessageCircle className="h-4.5 w-4.5" /> Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* Right Column: High Fidelity Quote Form */}
          <div className="lg:col-span-7">
            <div className="border border-border/80 p-8 rounded-2xl bg-card shadow-lift">
              {submitted ? (
                // Success Simulation Modal inside card
                <div className="text-center py-12 space-y-6">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-display text-3xl text-foreground">Quote Request Received!</h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      Thank you for contacting <strong>{site.name}</strong>. Our B2B corporate desk will email the wholesale price catalog within 2-4 business hours.
                    </p>
                  </div>
                  <div className="border border-border/70 p-4 rounded-xl bg-background max-w-sm mx-auto text-left text-xs space-y-1.5 text-muted-foreground">
                    <p><strong>Reference ID:</strong> B2B-{Math.floor(Math.random() * 90000) + 10000}</p>
                    <p><strong>Products Requested:</strong> {productsRequired}</p>
                    <p><strong>Requested Volume:</strong> {quantity} pcs</p>
                    <p><strong>Contact Desk:</strong> {email}</p>
                  </div>
                  <button
                    onClick={resetForm}
                    className="rounded-full bg-primary px-8 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                // Form Display
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <h2 className="font-display text-2xl text-foreground">Request Wholesale Quote</h2>
                    <p className="text-xs text-muted-foreground">
                      Fields marked with <span className="text-gold">*</span> are required for corporate approvals.
                    </p>
                  </div>

                  {error && (
                    <div className="flex gap-2.5 items-center p-4 border border-destructive/20 bg-destructive/5 text-destructive rounded-xl text-xs">
                      <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Contact Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-foreground">Full Name <span className="text-gold">*</span></label>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>

                    {/* Business Name */}
                    <div className="space-y-2">
                      <label htmlFor="business" className="text-xs font-semibold uppercase tracking-wider text-foreground">Business Name <span className="text-gold">*</span></label>
                      <input
                        id="business"
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="ABC Bedding Retailers"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Mobile Number */}
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-foreground">Phone Number <span className="text-gold">*</span></label>
                      <input
                        id="phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-foreground">Corporate Email <span className="text-gold">*</span></label>
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="purchasing@business.com"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Destination City */}
                    <div className="space-y-2">
                      <label htmlFor="city" className="text-xs font-semibold uppercase tracking-wider text-foreground">Destination City <span className="text-gold">*</span></label>
                      <input
                        id="city"
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Mumbai, Maharashtra"
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>

                    {/* Required Quantity */}
                    <div className="space-y-2">
                      <label htmlFor="quantity" className="text-xs font-semibold uppercase tracking-wider text-foreground">Required Quantity <span className="text-gold">*</span></label>
                      <input
                        id="quantity"
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold"
                        required
                      />
                    </div>
                  </div>

                  {/* Products Selection */}
                  <div className="space-y-2">
                    <label htmlFor="products" className="text-xs font-semibold uppercase tracking-wider text-foreground">Products Required</label>
                    <select
                      id="products"
                      value={productsRequired}
                      onChange={(e) => setProductsRequired(e.target.value)}
                      className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold appearance-none"
                    >
                      <option>Mink Blankets</option>
                      <option>Fleece Blankets</option>
                      <option>Double Bed Blankets</option>
                      <option>Single Bed Blankets</option>
                      <option>Premium Blankets</option>
                      <option>Winter Collection</option>
                      <option>Mixed Assorted Batch</option>
                    </select>
                  </div>

                  {/* Detailed Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-foreground">Message / Custom Requirements</label>
                    <textarea
                      id="message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Share design patterns, specific color batches, or timeline limitations..."
                      className="w-full rounded-xl border border-input bg-background p-4 text-sm outline-none focus:border-gold resize-none"
                    />
                  </div>

                  {/* Action */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-14 text-sm font-semibold uppercase tracking-widest transition-colors hover:bg-primary/95 shadow-lift"
                  >
                    <Send className="h-4 w-4" /> Request Wholesale Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
