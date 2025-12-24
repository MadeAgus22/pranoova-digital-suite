import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui/button";

const navLinks = [
  { href: "/#", label: "Home" },
  { href: "/#services", label: "Layanan" },
  { href: "/#about", label: "Tentang" },
  { href: "/#contact", label: "Kontak" },
  { href: "/blog", label: "Blog" }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="/" className="flex items-center">
          <Logo className="h-7 md:h-8" />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button variant="hero" size="default">
            Hubungi Kami
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button variant="hero" size="lg" className="w-full mt-2">
              Hubungi Kami
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
