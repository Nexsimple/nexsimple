import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { MessageCircle, Shield, Clock, Users } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const FinalCTA = () => {
  const settings = useSiteSettings();

  const guarantees = [
    {
      icon: Shield,
      text: settings.final_cta_guarantee_1 || "Compromisso com Seus Resultados",
    },
    {
      icon: Clock,
      text: settings.final_cta_guarantee_2 || "Suporte Estratégico Contínuo",
    },
    {
      icon: Users,
      text: settings.final_cta_guarantee_3 || "Soluções Personalizadas para Seu Negócio",
    },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById("contact");
    contactSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(213, 73%, 15%) 0%, hsl(162, 65%, 47%) 100%)",
        }}
      />

      {/* Animated Background Elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <div className="w-2 h-2 bg-primary rounded-full animate-glow"></div>
            <span className="text-white text-sm font-medium">
              {settings.final_cta_badge || "Sua Próxima Grande Decisão"}
            </span>
          </motion.div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {settings.final_cta_title || "Pronto para Transformar Sua Empresa e Multiplicar Seus Resultados?"}
          </h2>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            {settings.final_cta_subtitle || "Junte-se a empresas que já estão colhendo os frutos da automação inteligente. Não deixe seu negócio para trás."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-white to-gray-200 text-secondary hover:from-white/90 hover:to-gray-100 font-semibold px-8 py-6 text-lg shadow-2xl shadow-white/50 w-full sm:w-auto group"
                asChild
              >
                <a
                  href="https://wa.me/556492698259"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-5 h-5 group-hover:animate-bounce" />
                  {settings.final_cta_button_1 || "Sim! Quero Minha Análise Gratuita!"}
                </a>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-secondary font-semibold px-8 py-6 text-lg w-full sm:w-auto"
                onClick={scrollToContact}
              >
                {settings.final_cta_button_2 || "Falar com um Especialista Agora"}
              </Button>
            </motion.div>
          </div>

          {/* Guarantees */}
          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-2 text-white/90"
              >
                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <guarantee.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{guarantee.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Urgency Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-white/60 text-sm mt-8"
          >
            {settings.final_cta_urgency || "Invista no futuro da sua empresa. As oportunidades não esperam."}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;