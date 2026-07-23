import Header from "@/components/welsna/Header";
import Hero from "@/components/welsna/Hero";
import Services from "@/components/welsna/Services";
import CompanyVideo from "@/components/welsna/CompanyVideo";
import QuoteRequest from "@/components/welsna/QuoteRequest";
import ContactSection from "@/components/welsna/ContactSection";
import Testimonials from "@/components/welsna/Testimonials";
import FAQ from "@/components/welsna/FAQ";
import Footer from "@/components/welsna/Footer";
import WhatsAppButton from "@/components/welsna/WhatsAppButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        <Hero />

        <Services />

        <CompanyVideo />

        <QuoteRequest />

        {/* New Contact Section */}
        <ContactSection />

        <Testimonials />

        <FAQ />
      </main>

      <Footer />

      <WhatsAppButton />
    </div>
  );
}