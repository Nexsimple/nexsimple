import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Infinity, BarChart, Shield } from "lucide-react";

const BenefitsNew = () => {
  const benefits = [
    {
      icon: TrendingUp,
      metric: "24/7",
      metricLabel: "disponível",
      title: "Aumento de Conversão",
      description: "Leads respondidos instantaneamente 24/7 aumentam suas chances de conversão.",
    },
    {
      icon: DollarSign,
      metric: "↓",
      metricLabel: "custos",
      title: "Redução de Custos Operacionais",
      description: "Automatize processos e reduza custos com atendimento manual.",
    },
    {
      icon: Zap,
      metric: "<5s",
      metricLabel: "tempo resposta",
      title: "Respostas Instantâneas",
      description: "Atendimento em segundos. Cliente engajado converte melhor.",
    },
    {
      icon: Infinity,
      metric: "∞",
      metricLabel: "capacidade",
      title: "Escalabilidade Infinita",
      description: "Atenda dezenas, centenas ou milhares de clientes simultaneamente.",
    },
    {
      icon: BarChart,
      metric: "100%",
      metricLabel: "visibilidade",
      title: "Insights em Tempo Real",
      description: "Dashboards que mostram métricas e ajudam a otimizar continuamente.",
    },
    {
      icon: Shield,
      metric: "0",
      metricLabel: "erros",
      title: "Consistência Garantida",
      description: "Elimine erros humanos. Cada interação segue o padrão definido.",
    },
  ];

  return (
    <section id="benefits" className="section-spacing gradient-corporate relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />
      
      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Benefícios que Transformam Seu Negócio
          </h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Resultados reais e mensuráveis desde a primeira semana
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-white">{benefit.metric}</div>
                  <div className="text-xs text-white/80">{benefit.metricLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
              <p className="text-white/80 text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsNew;
