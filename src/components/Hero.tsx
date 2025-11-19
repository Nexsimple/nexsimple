import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Play } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { getSetting, isLoading } = useSiteSettings();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center gradient-hero" />;
  }

  const stats = [
    { value: "500+", label: "Empresas Atendidas" },
    { value: "98%", label: "Satisfação do Cliente" },
    { value: "24/7", label: "Suporte Dedicado" },
  ];

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-32 pb-20 gradient-hero">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-primary-dark text-sm font-semibold">
              {getSetting('hero_badge_text', '🚀 IA Conversacional Empresarial')}
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-dark mb-6 leading-tight font-heading"
          >
            {getSetting('hero_title', 'Transforme Vendas e Atendimento com')}{' '}
            <span className="text-gradient">
              {getSetting('hero_title_highlight', 'IA Conversacional')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed"
          >
            {getSetting('hero_subtitle', 'Agentes de voz e chat que qualificam leads, fecham vendas e automatizam operações enquanto você escala seu negócio.')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              size="lg"
              className="btn-primary group"
              onClick={() => scrollToSection('contact')}
            >
              <Calendar className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              {getSetting('hero_cta_primary', 'Agendar Demonstração Gratuita')}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary group"
              onClick={() => scrollToSection('solutions')}
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              {getSetting('hero_cta_secondary', 'Ver Como Funciona')}
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Video Section (if exists) */}
          {getSetting('hero_video_id') && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-16 max-w-4xl mx-auto"
            >
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border border-border">
                <iframe
                  src={`https://www.youtube.com/embed/${getSetting('hero_video_id')}`}
                  title="Nexsimple Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;