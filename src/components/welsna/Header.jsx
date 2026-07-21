import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "./logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Track Shipment", href: "#track" },
  { label: "Get a Quote", href: "#quote" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg py-2" : "bg-white/95 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#home" className="flex items-center" onClick={(e) => { e.preventDefault(); handleNav("#home"); }}>
          <img
    src={logo}
    alt="Welsna Nigeria Limited"
    className="h-[80px] w-auto object-contain"
/>
        </a>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
              className="text-sm font-500 text-slate-700 hover:text-primary-blue transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          onClick={() => handleNav("#quote")}
          className="hidden lg:inline-flex items-center px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-600 hover:bg-cyan-accent hover:text-navy transition-all duration-300"
        >
          Get a Quote
        </button>

        <button
          className="lg:hidden p-2 text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNav(link.href); }}
                className="py-3 px-3 text-sm font-500 text-slate-700 hover:bg-slate-50 hover:text-primary-blue rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => handleNav("#quote")}
              className="mt-2 px-5 py-3 rounded-lg bg-navy text-white text-sm font-600"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}