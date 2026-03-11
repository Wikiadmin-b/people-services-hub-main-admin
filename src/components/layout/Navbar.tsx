import { Link, useLocation } from "react-router-dom";
import { BookOpen, Home, Star, Clock, HelpCircle, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { to: "/favorites", label: "Favorites", icon: Star },
  { to: "/recent", label: "Recent", icon: Clock },
  { to: "/help", label: "Help", icon: HelpCircle },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-primary text-primary-foreground shadow-md">
      <div className="flex items-center justify-between px-4 py-3 max-w-[1400px] mx-auto md:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
          <BookOpen className="h-6 w-6" />
          <span className="hidden sm:inline">HR ScriptWiki</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "flex items-center gap-2 font-medium transition-opacity hover:opacity-80",
                  isActive && "opacity-100 border-b-2 border-primary-foreground pb-1"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-primary/80 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-primary border-t border-primary-foreground/20 animate-fade-in">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 font-medium transition-colors hover:bg-primary/80",
                  isActive && "bg-primary/70"
                )}
              >
                <Icon className="h-5 w-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
