import Hero from "@/components/Hero";
import ProblemSection from "@/components/ProblemSection";
import Solutions from "@/components/Solutions";
import Benefits from "@/components/Benefits";
import About from "@/components/About";
import SocialProof from "@/components/SocialProof";
import InteractiveDemo from "@/components/InteractiveDemo";
import CaseStudies from "@/components/CaseStudies";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProblemSection />
      <Solutions />
      <Benefits />
      <About />
      <SocialProof />
      <InteractiveDemo />
      <CaseStudies />
      <FAQ />
      <FinalCTA />
      <ContactForm />
      <Footer />
    </main>
  );
};

export default Index;
