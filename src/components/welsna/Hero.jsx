import ShipmentTracking from "./ShipmentTracking";

export default function Hero() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative overflow-hidden bg-navy pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Background overlays only */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-navy/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(11,21,38,0.45),transparent_70%)]" />
      </div>

      {/* Glow decorations */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-accent/20 rounded-full blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-accent/10 rounded-full blur-[140px] animate-pulse-glow" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(63,182,224,0.08),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
            <span className="text-xs font-600 text-cyan-accent tracking-wider uppercase">
              Nigeria's Trusted Logistics Partner
            </span>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-700 text-white leading-[1.1] mb-6">
            Seamless Logistics,{" "}
            <span className="bg-gradient-to-r from-cyan-accent to-yellow-accent bg-clip-text text-transparent">
              Clearing & Forwarding
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Welsna Nigeria Limited provides world-class supply chain solutions.
            Track your cargo in real-time and experience logistics without
            borders.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ShipmentTracking />
        </div>

        <div className="max-w-3xl mx-auto mt-8 flex flex-wrap justify-center gap-3">
          {["Ocean Freight", "Air Cargo", "Inland Transport"].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-500 text-slate-200 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}