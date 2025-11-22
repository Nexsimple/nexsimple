import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Play, Sparkles, ArrowRight, Zap } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Hero = () => {
  const { getSetting, isLoading } = useSiteSettings();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-background" />;
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-24">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background">
        {/* Animated Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[140px] animate-float" style={{ animationDelay: '1s', animationDuration: '4s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-dark/10 rounded-full blur-[160px] animate-glow" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container-premium relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 glass-effect rounded-full px-6 py-3 mb-8 group hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-primary text-sm font-bold tracking-wide bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {getSetting('hero_badge_text', '🚀 IA Conversacional Empresarial')}
            </span>
            <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-8 leading-[1.05] tracking-tight"
          >
            <span className="text-foreground">
              {getSetting('hero_title', 'Transforme Vendas e Atendimento com')}
            </span>
            <br />
            <span className="text-gradient shine-effect inline-block">
              {getSetting('hero_title_highlight', 'IA Conversacional')}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl sm:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed font-light"
          >
            {getSetting('hero_subtitle', 'Agentes de voz e chat que qualificam leads, fecham vendas e automatizam operações enquanto você escala seu negócio.')}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap justify-center gap-8 mb-14"
          >
            {[
              { value: '24/7', label: 'Atendimento' },
              { value: '10x', label: 'Mais Leads' },
              { value: '80%', label: 'Economia' },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
          >
            <Button
              size="lg"
              className="btn-premium group text-lg h-16 px-12 shine-effect"
              onClick={() => scrollToSection('contact')}
            >
              <Zap className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform" />
              {getSetting('hero_cta_primary', 'Agendar Demonstração Gratuita')}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="btn-outline-premium text-lg h-16 px-12 group"
              onClick={() => scrollToSection('solutions')}
            >
              <span className="flex items-center">
                <Play className="w-5 h-5 mr-3 group-hover:scale-125 transition-transform" />
                {getSetting('hero_cta_secondary', 'Ver Como Funciona')}
              </span>
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                    <span className="text-xs text-primary font-bold">✓</span>
                  </div>
                ))}
              </div>
              <span className="font-medium">Empresas confiam na Nexsimple</span>
            </div>
          </motion.div>

          {/* Video Section (if exists) */}
          {getSetting('hero_video_id') && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1 }}
              className="mt-20 max-w-5xl mx-auto"
            >
              <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl border border-border/50 card-glow group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
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

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
