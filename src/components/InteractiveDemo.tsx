import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "./ui/button";
import { Play, CheckCircle2, MessageSquare, BarChart3, Zap } from "lucide-react";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const InteractiveDemo = () => {
  const settings = useSiteSettings();

  const features = [
    {
      id: "chatbot",
      icon: MessageSquare,
      title: settings.demo_feature_1_title || "Chatbot Inteligente",
      description: settings.demo_feature_1_desc || "Experimente como a IA pode interagir com seus clientes, responder dúvidas e qualificar leads de forma autônoma.",
      demo: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&h=600&fit=crop",
    },
    {
      id: "analytics",
      icon: BarChart3,
      title: settings.demo_feature_2_title || "Análise de Dados Simplificada",
      description: settings.demo_feature_2_desc || "Visualize em tempo real os principais indicadores do seu negócio através de dashboards intuitivos e personalizados.",
      demo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
    },
    {
      id: "automation",
      icon: Zap,
      title: settings.demo_feature_3_title || "Fluxos de Automação Personalizados",
      description: settings.demo_feature_3_desc || "Entenda como criamos sequências de tarefas automatizadas que conectam seus sistemas e otimizam processos.",
      demo: "https://images.unsplash.com/photo-1460925895917-afdab27c52f?w=800&h=600&fit=crop",
    },
  ];

  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {settings.demo_title || "Veja a Automação em Ação: Simples e Poderosa"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {settings.demo_subtitle || "Descubra como nossas ferramentas transformam o dia a dia da sua empresa, mesmo sem conhecimento técnico avançado."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Feature Tabs */}
          <div className="lg:col-span-1 space-y-4">
            {features.map((feature, index) => (
              <motion.button
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setActiveFeature(feature)}
                className={`w-full text-left p-6 rounded-2xl transition-all duration-300 ${
                  activeFeature.id === feature.id
                    ? "bg-primary text-white shadow-xl scale-105"
                    : "bg-card border-2 border-border hover:border-primary/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      activeFeature.id === feature.id
                        ? "bg-white/20"
                        : "bg-primary/10"
                    }`}
                  >
                    <feature.icon
                      className={`w-6 h-6 ${
                        activeFeature.id === feature.id
                          ? "text-white"
                          : "text-primary"
                      }`}
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className={`text-lg font-semibold mb-1 ${
                        activeFeature.id === feature.id
                          ? "text-white"
                          : "text-secondary"
                      }`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`text-sm ${
                        activeFeature.id === feature.id
                          ? "text-white/90"
                          : "text-muted-foreground"
                      }`}
                    >
                      {feature.description}
                    </p>
                  </div>
                  {activeFeature.id === feature.id && (
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Demo Display */}
          <div className="lg:col-span-2">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-border">
                <img
                  src={activeFeature.demo}
                  alt={activeFeature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {activeFeature.title}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {activeFeature.description}
                    </p>
                    <Button
                      size="lg"
                      className="bg-white text-secondary hover:bg-white/90"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      {settings.demo_button_text || "Quero uma Demonstração Personalizada"}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-primary rounded-full blur-3xl opacity-50"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-full blur-3xl opacity-50"
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8 text-center"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8"
                asChild
              >
                <a
                  href="https://wa.me/556492698259"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Agendar Demo Personalizada
                </a>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;