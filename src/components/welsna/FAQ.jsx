import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What documents are required for customs clearance in Nigeria?",
    answer:
      "The standard documents include the Bill of Lading or Airway Bill, Commercial Invoice, Packing List, Form M, and PAAR (Pre-Arrival Assessment Report). Depending on the goods, you may also need permits such as NAFDAC for food/drugs or SONCAP for regulated products. Our team handles all documentation on your behalf.",
  },
  {
    question: "How long does customs clearance typically take?",
    answer:
      "For sea freight, customs clearance usually takes 3–7 business days after all documentation is complete. For air freight, it's typically 1–3 business days. Delays can occur if documents are incomplete or if cargo requires additional inspection, but our proactive approach minimizes these.",
  },
  {
    question: "Do you handle both import and export shipments?",
    answer:
      "Yes, we handle both import and export shipments. Whether you're bringing goods into Nigeria or exporting to global markets, Welsna provides end-to-end clearing, forwarding, and logistics services for both directions.",
  },
  {
    question: "How can I track my shipment?",
    answer:
      "Use the Track Shipment feature at the top of this page. Enter your tracking number (e.g. WL-12345) and click 'Track Shipment' to see real-time status updates including current location, customs status, and estimated delivery.",
  },
  {
    question: "What happens if my cargo is delayed?",
    answer:
      "Our operations team continuously monitors every shipment. If there's a delay, we proactively notify you with updates and the reason for the delay, along with a revised estimated delivery time. We work quickly to resolve any issues and keep your supply chain moving.",
  },
];

function FaqItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-5 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm sm:text-base font-600 text-navy">{faq.question}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary-blue flex-shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 sm:px-6 pb-5 text-sm text-slate-600 leading-relaxed">{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" className="py-20 sm:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-xs font-700 uppercase tracking-[0.2em] text-cyan-accent">Got Questions?</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-700 text-navy mt-3 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Everything you need to know about clearing, forwarding, and logistics with Welsna.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={idx}
              faq={faq}
              isOpen={openIdx === idx}
              onToggle={() => setOpenIdx(openIdx === idx ? -1 : idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}