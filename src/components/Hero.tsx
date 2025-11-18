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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-24 bg-background">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-secondary to-background" />
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse-slow"></div>
            <span className="text-foreground text-sm font-medium">
              {getSetting('hero_badge_text', 'IA Conversacional de Próxima Geração')}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
          >
            {getSetting('hero_title', 'Transforme Vendas e Atendimento com')}{' '}
            <span className="text-gradient">
              {getSetting('hero_title_highlight', 'IA Conversacional Empresarial')}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {getSetting('hero_subtitle', 'Agentes de voz e chat que qualificam leads, fecham vendas e automatizam operações enquanto você escala seu negócio.')}
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
                className="cta-button w-full sm:w-auto"
                asChild
              >
                <a
                  href={getSetting('whatsapp_link', 'https://wa.me/556492698259')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  {getSetting('hero_cta_primary', 'Agendar Demo Gratuita')}
                  <span className="ml-2">→</span>
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/30 hover:bg-primary/10 font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                asChild
              >
                <a href="#demo" className="flex items-center gap-2">
                  <span>▶</span>
                  {getSetting('hero_cta_secondary', 'Ver Como Funciona')}
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              { metric: '+45%', label: 'Conversão', sublabel: 'em média' },
              { metric: '60%', label: 'Redução de Custo', sublabel: 'operacional' },
              { metric: '24/7', label: 'Disponibilidade', sublabel: 'sem pausas' },
              { metric: '2-4 semanas', label: 'Implementação', sublabel: 'em média' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                className="text-center bg-card/50 backdrop-blur-sm rounded-xl p-4 border border-border/50"
              >
                <div className="text-3xl font-bold text-primary mb-1">{stat.metric}</div>
                <div className="text-foreground font-semibold text-sm">{stat.label}</div>
                <div className="text-muted-foreground text-xs">{stat.sublabel}</div>
              </motion.div>
            ))}
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