import { Quote } from "lucide-react";

const TESTIMONIALS = [
  {
    quote:
      "Welsna cleared our containers at Apapa port faster than any forwarder we've used. Their customs expertise cut our lead times by 30% — that's real money saved for our business.",
    author: "Mojisola Odemo",
    role: "Import Director, Atlas System",
    initials: "MO",
  },
  {
    quote:
      "The real-time tracking gives us total peace of mind. We always know exactly where our high-value electronics shipments are, from origin to our warehouse in Lagos.",
    author: "Abusara Majed",
    role: "Classique Companies",
    initials: "AM",
  },
  {
    quote:
      "Their inland logistics network is unmatched. Every shipment from Lagos port arrives at our Abuja warehouses on schedule. Welsna is a partner we genuinely rely on.",
    author: "Mathew Igoche",
    role: "Exporter, Icon Logistics Services",
    initials: "MI",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-navy to-[#16233d] relative overflow-hidden">
      <div className="absolute top-0 left-1/3 w-80 h-80 bg-cyan-accent/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-accent/5 rounded-full blur-[140px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-700 uppercase tracking-[0.2em] text-cyan-accent">Client Stories</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-white mt-3 mb-4">
            Trusted by Businesses Across Nigeria
          </h2>
          <p className="text-slate-400 leading-relaxed">
            From import directors to export operators, companies rely on Welsna to move their cargo reliably.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 hover:border-cyan-accent/30 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-cyan-accent/40 mb-4" />
              <p className="text-sm text-slate-200 leading-relaxed mb-6">"{t.quote}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-accent to-primary-blue flex items-center justify-center">
                  <span className="text-sm font-700 text-white">{t.initials}</span>
                </div>
                <div>
                  <p className="text-sm font-600 text-white">{t.author}</p>
                  <p className="text-xs text-slate-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}