import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";

const shopLinks = [
  { label: "Shop All Blankets", to: "/shop" },
  { label: "Wholesale & Bulk", to: "/wholesale" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const policyLinks = [
  { label: "Privacy Policy", to: "/policies/privacy" },
  { label: "Terms & Conditions", to: "/policies/terms" },
  { label: "Shipping Policy", to: "/policies/shipping" },
  { label: "Return Policy", to: "/policies/returns" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
            {site.name}
          </Link>
          <span className="gold-rule mt-3" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {site.shortDescription}
          </p>
          <div className="mt-5 flex gap-3">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
            <a
              href={whatsappLink("Hi, I'd like wholesale blanket details.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-gold hover:text-foreground"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">Quick Links</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {shopLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">Policies</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {policyLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">Get in Touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`tel:${site.phone}`}>{site.phone}</a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>{site.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <p>{site.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
