import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowDown } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { getSetting, isLoading } = useSiteSettings();

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-secondary" />;
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213, 73%, 15%) 0%, hsl(162, 65%, 47%) 100%)",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
            <span className="text-white text-sm font-medium">
              {getSetting('hero_badge_text', 'Inovação Comprovada em Automação e IA')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            {getSetting('hero_title', 'Sua Empresa Pode Economizar 40 Horas Semanais')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {getSetting('hero_subtitle', 'Descubra a tecnologia que grandes empresas usam para automatizar operações e multiplicar resultados.')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-cta-orange text-white hover:bg-cta-orange/90 font-semibold px-8 py-6 text-lg shadow-2xl shadow-cta-orange/50 w-full sm:w-auto group relative overflow-hidden"
                asChild
              >
                <a
                  href={getSetting('whatsapp_link', 'https://wa.me/556492698259')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                  {getSetting('hero_cta_primary', 'Agendar Análise Gratuita 🔥')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {getSetting('hero_video_id') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative aspect-video w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 mt-16"
            >
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${getSetting('hero_video_id')}?autoplay=0&modestbranding=1&rel=0`}
                title="Vídeo Explicativo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors cursor-pointer"
              onClick={scrollToContact}
            >
              <span className="text-sm font-medium">Descubra como</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;