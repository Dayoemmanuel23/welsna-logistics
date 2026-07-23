import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Instagram,
} from "lucide-react";
import logo from "./logo.jpeg";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Track Shipment", href: "#track" },
  { label: "Get a Quote", href: "#quote" },
  { label: "FAQ", href: "#faq" },
];

const SERVICE_LINKS = [
  "Customs Clearing",
  "Freight Forwarding",
  "Inland Logistics",
  "Ocean Freight",
  "Air Cargo",
];

export default function Footer() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <footer
  id="footer"
  className="bg-navy text-slate-300 pt-16 pb-8 relative overflow-hidden"
>
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-accent/5 rounded-full blur-[120px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">

          {/* Company */}

          <div>

            <img
    src={logo}
    alt="Welsna Nigeria Limited"
    className="h-[80px] w-auto object-contain"
/>

            <p className="text-sm text-slate-400 leading-relaxed">
              Welsna Nigeria Limited is a trusted logistics company
              providing freight forwarding, customs clearing,
              haulage, warehousing and supply chain solutions
              across Nigeria and internationally.
            </p>

            {/* Social Icons */}

            <div className="flex items-center gap-4 mt-6">

              <a
                href="https://wa.me/2349038381600"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 hover:text-white transition flex items-center justify-center"
              >
                <MessageCircle size={18} />
              </a>

              <a
                href="https://www.instagram.com/welsnaltd?igsh=c3FwM2V4Yzg4OGs3"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 hover:text-white transition flex items-center justify-center"
              >
                <Instagram size={18} />
              </a>

              <a
                href="mailto:info@welsnanigerialtd.com"
                aria-label="Email"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-cyan-accent hover:text-navy transition flex items-center justify-center"
              >
                <Mail size={18} />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h4 className="font-heading text-white uppercase text-sm tracking-wider mb-5">
              Quick Links
            </h4>

            <ul className="space-y-3">

              {QUICK_LINKS.map((link) => (

                <li key={link.href}>

                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(link.href);
                    }}
                    className="text-sm text-slate-400 hover:text-cyan-accent transition"
                  >
                    {link.label}
                  </a>

                </li>

              ))}

            </ul>

          </div>

          {/* Services */}

          <div>

            <h4 className="font-heading text-white uppercase text-sm tracking-wider mb-5">
              Services
            </h4>

            <ul className="space-y-3">

              {SERVICE_LINKS.map((service) => (

                <li key={service}>

                  <button
                    onClick={() => scrollTo("#services")}
                    className="text-sm text-slate-400 hover:text-cyan-accent transition text-left"
                  >
                    {service}
                  </button>

                </li>

              ))}

            </ul>

          </div>

          {/* Contact */}

          <div>

            <h4 className="font-heading text-white uppercase text-sm tracking-wider mb-5">
              Contact Us
            </h4>

            <ul className="space-y-4">

              <li className="flex gap-3">

                <Phone className="w-4 h-4 text-cyan-accent mt-1" />

                <a
                  href="tel:+2349038381600"
                  className="text-sm text-slate-400 hover:text-cyan-accent"
                >
                  +234 903 838 1600
                </a>

              </li>

              <li className="flex gap-3">

                <Mail className="w-4 h-4 text-cyan-accent mt-1" />

                <a
                  href="mailto:info@welsnanigerialtd.com"
                  className="text-sm text-slate-400 hover:text-cyan-accent"
                >
                  info@welsnanigerialtd.com
                </a>

              </li>

              <li className="flex gap-3">

                <Instagram className="w-4 h-4 text-cyan-accent mt-1" />

                <a
                  href="https://www.instagram.com/welsnaltd?igsh=c3FwM2V4Yzg4OGs3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-400 hover:text-cyan-accent"
                >
                  @welsnaltd
                </a>

              </li>

              <li className="flex gap-3">

                <MapPin className="w-4 h-4 text-cyan-accent mt-1" />

                <span className="text-sm text-slate-400">
                  23 Martina Ifediora Street,
                  <br />
                  Majek First Gate,
                  <br />
                  Ibeju-Lekki,
                  Lagos, Nigeria
                </span>

              </li>

            </ul>

          </div>

        </div>

        {/* Bottom */}

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-slate-500 text-center md:text-left">
            © {new Date().getFullYear()} Welsna Nigeria Limited.
            All Rights Reserved.
          </p>

          <p className="text-xs text-slate-500 text-center md:text-right">
            Seamless Logistics • Freight Forwarding • Customs Clearing
          </p>

        </div>

      </div>

    </footer>
  );
}