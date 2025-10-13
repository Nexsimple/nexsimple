import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Solutions from "@/components/Solutions";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import SocialProof from "@/components/SocialProof";
import { Testimonials } from "@/components/Testimonials";
import InteractiveDemo from "@/components/InteractiveDemo";
import CaseStudies from "@/components/CaseStudies";
import ROICalculator from "@/components/ROICalculator";
import { TrustSection } from "@/components/TrustSection";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { usePageTracking } from "@/hooks/usePageTracking";

const Index = () => {
  usePageTracking();

  return (
    <main className="min-h-screen">
      <SEOHead />
      <Hero />
      <ProblemSection />
      <Solutions />
      <Benefits />
      <About />
      <SocialProof />
      <Testimonials />
      <InteractiveDemo />
      <CaseStudies />
      <ROICalculator />
      <TrustSection />
      <FAQ />
      <FinalCTA />
      <ContactForm />
      <Footer />
      <FloatingWhatsApp />
      <ExitIntentPopup />
    </main>
  );
};

export default Index;
