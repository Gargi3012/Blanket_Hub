import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronRight, ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/auth")({
  component: Auth,
});

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !name)) {
      toast.error("Please fill out all fields.");
      return;
    }

    // Simulate login/signup success
    toast.success(isLogin ? "Welcome back to Loom & Luxe!" : "Account created successfully!");
    navigate({ to: "/" });
  };

  return (
    <div className="bg-background py-16">
      <div className="container-page max-w-md space-y-8">
        {/* Breadcrumb */}
        <nav className="flex items-center justify-center gap-2 text-xs text-muted-foreground uppercase tracking-widest">
          <a href="/" className="hover:text-foreground">Home</a>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground font-medium">B2B Portal</span>
        </nav>

        {/* Card Container */}
        <div className="border border-border/80 p-8 rounded-2xl bg-card shadow-lift space-y-6">
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl text-foreground">
              {isLogin ? "B2B Partner Sign In" : "Register B2B Account"}
            </h1>
            <p className="text-xs text-muted-foreground">
              {isLogin
                ? "Sign in to access corporate price tiers, MOQ lists and dispatch status."
                : "Register to unlock mill-direct pricing and corporate B2B features."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input (Register Only) */}
            {!isLogin && (
              <div className="space-y-1">
                <label htmlFor="auth-name" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Representative Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="auth-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-xs outline-none focus:border-gold"
                    required
                  />
                </div>
              </div>
            )}

            {/* Email Input */}
            <div className="space-y-1">
              <label htmlFor="auth-email" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Corporate Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-xs outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label htmlFor="auth-pass" className="text-[10px] font-semibold uppercase tracking-wider text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  id="auth-pass"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="h-11 w-full rounded-xl border border-input bg-background pl-10 pr-4 text-xs outline-none focus:border-gold"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground h-12 text-xs font-semibold uppercase tracking-widest transition-colors hover:bg-primary/95 shadow-lift"
            >
              {isLogin ? "Sign In" : "Register B2B Account"} <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center pt-2 border-t border-border/60">
            <button
              onClick={() => setIsLogin((v) => !v)}
              className="text-xs text-muted-foreground hover:text-gold transition-colors font-medium"
            >
              {isLogin ? "New partner? Request a B2B registration" : "Already registered? Sign in here"}
            </button>
          </div>
        </div>

        {/* B2B Sourcing Tagline */}
        <div className="flex justify-center gap-2 text-muted-foreground text-[10px] uppercase tracking-wider font-semibold">
          <ShieldCheck className="h-4 w-4 text-gold" />
          <span>Panipat Sourcing Verification Enabled</span>
        </div>
      </div>
    </div>
  );
}
