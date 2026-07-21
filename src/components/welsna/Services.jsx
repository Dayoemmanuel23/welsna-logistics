import { Globe, Truck, Plane, Warehouse, Bike, Monitor, ArrowRight } from "lucide-react";
import deliveryImage from "./delivery.png";
import freightImage from "./freight-forwarding.jpg";
import inlandImage from "./inland-logistics.jpg";
import airImage from "./air-freight.jpg";
import warehouseImage from "./warehouse.jpg";
import operationsImage from "./operations-command.jpg";

const SERVICES = [

  {
    icon: Plane,
    title: "Air Freight",
    image: airImage,
    description:
      "Swift and reliable air cargo solutions connecting Nigeria to global markets. We manage the entire air freight process from booking to last-mile delivery.",
  },
  
  {
    icon: Globe,
    title: "Freight Forwarding",
    image: freightImage,
    description:
      "Global ocean and air freight solutions with a trusted network of carriers. We move your goods across borders with end-to-end visibility.",
  },
  {
    icon: Truck,
    title: "Inland Logistics",
    image: inlandImage,
    description:
      "Reliable overland transportation from port to final destination. Our fleet covers every state in Nigeria, delivering on schedule, every time.",
  },
  
  {
    icon: Bike,
    title: "Last-Mile Delivery",
    image: deliveryImage,
    description:
      "Reliable dispatch and final-mile delivery across Lagos and Nigeria. Our kitted dispatch team ensures your goods reach the final destination safely and on time.",
  },

  {
    icon: Warehouse,
    title: "Warehousing & Distribution",
    image: warehouseImage,
    description:
      "Secure storage and efficient distribution services. Our facilities are equipped to handle general cargo, electronics, and temperature-sensitive goods.",
  },
  {
    icon: Monitor,
    title: "Operations Command",
    image: operationsImage,
    description:
      "Our state-of-the-art operations center monitors every shipment in real-time, coordinating seamless logistics across air, sea, and inland routes 24/7.",
  },
];

export default function Services() {
  const scrollTo = (href) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-700 uppercase tracking-[0.2em] text-cyan-accent">Our Expertise</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-navy mt-3 mb-4">
            End-to-End Supply Chain Solutions
          </h2>
          <p className="text-slate-600 leading-relaxed">
            From the ports of Lagos to warehouses across Nigeria, Welsna delivers integrated logistics services built on
            deep local expertise and global best practices. We handle every link in your supply chain so you can focus on
            growing your business.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-2xl hover:border-cyan-accent/40 transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/20 to-transparent" />
                <div className={`absolute w-12 h-12 rounded-xl bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-lg ${service.title === "Last-Mile Delivery" ? "top-3 left-3" : "bottom-3 left-4"}`}>
                  <service.icon className="w-5 h-5 text-primary-blue" />
                </div>
                {(service.title === "Inland Logistics" || service.title === "Last-Mile Delivery") && (
                  <div className={`absolute bottom-3 ${service.title === "Last-Mile Delivery" ? "left-3" : "right-3"} px-2.5 py-1 rounded-full bg-navy/70 backdrop-blur-sm border border-white/15 text-[10px] font-600 text-white tracking-wide whitespace-nowrap`}>
                    Welsna Nigeria Ltd • RC 1015627
                  </div>
                )}
              </div>
              <div className="p-8">
                <h3 className="font-heading text-xl font-700 text-navy mb-3">{service.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6">{service.description}</p>
                <button
                  onClick={() => scrollTo("#contact")}
                  className="inline-flex items-center gap-2 text-sm font-600 text-primary-blue hover:text-cyan-accent transition-colors"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}