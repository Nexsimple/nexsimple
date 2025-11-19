import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Solutions from "@/components/Solutions";
import BenefitsNew from "@/components/BenefitsNew";
import AllInOneSolutions from "@/components/AllInOneSolutions";
import About from "@/components/About";
import ROICalculator from "@/components/ROICalculator";
import { TrustSection } from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  usePageTracking();

  return (
    <main className="min-h-screen bg-background">
      <SEOHead />
      <Hero />
      <ProblemSection />
      <Solutions />
      <BenefitsNew />
      <AllInOneSolutions />
      <About />
      <ROICalculator />
      <TrustSection />
      <FAQ />
      <FinalCTA />
      <ContactForm />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
};

export default Index;