import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Infinity, BarChart, Shield } from "lucide-react";

const BenefitsNew = () => {
  const benefits = [
    {
      icon: TrendingUp,
      metric: "+45%",
      metricLabel: "conversão média",
      title: "Aumento de Conversão de 45%+",
      description: "Leads respondidos instantaneamente 24/7 se tornam clientes pagantes mais rápido.",
    },
    {
      icon: DollarSign,
      metric: "-60%",
      metricLabel: "custo operacional",
      title: "Redução de Custo de 60%",
      description: "Elimine custos com atendentes, infraestrutura e treinamento contínuo.",
    },
    {
      icon: Zap,
      metric: "<5s",
      metricLabel: "tempo resposta",
      title: "Velocidade de Resposta Instantânea",
      description: "Tempo médio reduzido de horas para segundos. Cliente engajado compra mais.",
    },
    {
      icon: Infinity,
      metric: "∞",
      metricLabel: "capacidade",
      title: "Escalabilidade Infinita",
      description: "Atenda 100, 1.000 ou 10.000 clientes simultaneamente sem aumentar custos.",
    },
    {
      icon: BarChart,
      metric: "100%",
      metricLabel: "visibilidade",
      title: "Insights em Tempo Real",
      description: "Dashboards que mostram o que funciona e onde otimizar continuamente.",
    },
    {
      icon: Shield,
      metric: "0",
      metricLabel: "erros humanos",
      title: "Consistência Garantida",
      description: "Zero erros humanos, zero dias ruins. Cada interação segue seu script perfeito.",
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
