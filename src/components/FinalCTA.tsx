import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const FinalCTA = () => {
  const { getSetting } = useSiteSettings();

  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213, 73%, 15%) 0%, hsl(162, 65%, 47%) 100%)",
        }}
      />
      <div className="absolute inset-0 z-0 opacity-10 bg-[url('/grid.svg')]" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-cta-orange rounded-full animate-ping"></div>
            <span className="text-white text-sm font-medium">
              {getSetting('final_cta_badge', 'Sua Próxima Grande Decisão')}
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {getSetting('final_cta_title', 'Pronto para Transformar Sua Empresa?')}
          </h2>

          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {getSetting('final_cta_subtitle', 'Não deixe a concorrência ditar o ritmo. A automação não é mais o futuro, é o presente. O momento de agir é agora.')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-cta-orange text-white hover:bg-cta-orange/90 font-semibold px-8 py-6 text-lg shadow-2xl shadow-cta-orange/50 w-full sm:w-auto group"
                asChild
              >
                <a
                  href={getSetting('whatsapp_link', 'https://wa.me/556492698259')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                  {getSetting('final_cta_button_1', 'Sim! Quero Minha Análise Gratuita!')}
                </a>
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex items-center justify-center gap-2 text-white/80"
          >
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="font-medium">{getSetting('final_cta_guarantee_1', 'Análise de Risco Zero e 100% Confidencial')}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;