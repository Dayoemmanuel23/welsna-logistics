import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">

      {/* Tooltip */}

      <div
        className="
          absolute
          right-16
          top-1/2
          -translate-y-1/2
          bg-white
          text-slate-700
          text-sm
          font-medium
          px-4
          py-2
          rounded-lg
          shadow-xl
          whitespace-nowrap
          opacity-0
          translate-x-2
          pointer-events-none
          group-hover:opacity-100
          group-hover:translate-x-0
          transition-all
          duration-300
        "
      >
        Chat with Welsna Logistics
      </div>

      {/* Pulse Ring */}

      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />

      {/* WhatsApp Button */}

      <a
        href="https://wa.me/2349038381600"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="
          relative
          flex
          items-center
          justify-center
          w-16
          h-16
          rounded-full
          bg-[#25D366]
          text-white
          shadow-2xl
          transition-all
          duration-300
          hover:scale-110
          hover:shadow-green-500/40
          hover:bg-[#20ba5a]
        "
      >
        <MessageCircle className="w-8 h-8" />
      </a>

    </div>
  );
}