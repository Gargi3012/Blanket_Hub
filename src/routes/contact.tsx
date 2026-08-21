import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Mail, MapPin, MessageCircle, Phone, Clock, ArrowRight } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: Contact,
});

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSent(true);
  };

  return (
    <div className="bg-background py-16">
      <div className="container-page space-y-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">Contact Us</span>
        </nav>

        {/* Header */}
        <div className="space-y-3">
          <h1 className="font-display text-4xl sm:text-5xl text-foreground">Get In Touch</h1>
          <p className="text-sm text-muted-foreground max-w-xl">
            We are here to assist with catalog details, custom order requests, shipping estimates, and partnerships.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Phone Card */}
            <div className="flex gap-4 p-6 rounded-2xl border border-border/60 bg-card shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold shrink-0">
                <Phone className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-foreground font-semibold">Phone Support</h3>
                <p className="text-sm text-muted-foreground"><a href={`tel:${site.phone}`}>{site.phone}</a></p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">General Inquiries</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex gap-4 p-6 rounded-2xl border border-border/60 bg-card shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold shrink-0">
                <Mail className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-foreground font-semibold">Corporate Email</h3>
                <p className="text-sm text-muted-foreground"><a href={`mailto:${site.email}`}>{site.email}</a></p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">Purchasing Desk</p>
              </div>
            </div>

            {/* Address Card */}
            <div className="flex gap-4 p-6 rounded-2xl border border-border/60 bg-card shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-foreground font-semibold">HQ Address</h3>
                <p className="text-sm text-muted-foreground">{site.address}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">Panipat Hub</p>
              </div>
            </div>

            {/* Clock Card */}
            <div className="flex gap-4 p-6 rounded-2xl border border-border/60 bg-card shadow-soft">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-soft/30 text-gold shrink-0">
                <Clock className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-lg text-foreground font-semibold">Business Hours</h3>
                <p className="text-sm text-muted-foreground">{site.hours}</p>
                <p className="text-[11px] text-muted-foreground uppercase tracking-widest">Standard Office Hours</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Map Placeholder & Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Styled Map Placeholder */}
            <div className="relative h-[250px] w-full rounded-2xl border border-border overflow-hidden bg-sand/30 shadow-soft">
              {/* Overlay graphics resembling map contours */}
              <div className="absolute inset-0 bg-[radial-gradient(#eae0d5_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center space-y-4">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lift animate-bounce">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-foreground">{site.name} Mill Outlet</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5">Panipat, Haryana, India</p>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-background shadow-soft hover:bg-foreground/90 transition-colors"
                >
                  Get Directions <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            {/* General contact form */}
            <div className="border border-border/80 p-6 rounded-2xl bg-card">
              {sent ? (
                <div className="text-center py-8 space-y-3">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-gold-soft/30 text-gold">
                    <Clock className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl text-foreground font-semibold">Message Received!</h3>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                    Thanks for writing, <strong>{name}</strong>. We will reply to your enquiry via email ({email}) shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="font-display text-lg text-foreground font-semibold">Send a Quick Message</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                      required
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="h-11 w-full rounded-xl border border-input bg-background px-4 text-xs outline-none focus:border-gold"
                      required
                    />
                  </div>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help you?"
                    className="w-full rounded-xl border border-input bg-background p-4 text-xs outline-none focus:border-gold resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground hover:bg-primary/95 transition-colors"
                  >
                    Send Message
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
