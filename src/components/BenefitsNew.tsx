import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Infinity, BarChart, Shield } from "lucide-react";

const BenefitsNew = () => {
  const benefits = [
    {
      icon: TrendingUp,
      metric: "+45%",
      metricLabel: "conversão, média",
      title: "Aumento de Conversão de 45%+",
      description: "Leads respondidos instantaneamente 24/7 se tornam clientes pagantes mais rápido. Nenhuma oportunidade perdida por falta de resposta.",
    },
    {
      icon: DollarSign,
      metric: "-60%",
      metricLabel: "custo operacional",
      title: "Redução de Custo de 60%",
      description: "Elimine custos com atendentes, infra-estrutura e treinamento. IA opera por fração do custo de equipe humana.",
    },
    {
      icon: Zap,
      metric: "<5s",
      metricLabel: "tempo de resposta",
      title: "Velocidade de Resposta Instantânea",
      description: "Tempo médio de resposta reduzido de horas para segundos. Cliente engajado = cliente que compra.",
    },
    {
      icon: Infinity,
      metric: "∞",
      metricLabel: "capacidade",
      title: "Escalabilidade Infinita",
      description: "Atenda 100, 1.000 ou 10.000 clientes simultaneamente sem aumentar custos ou perder qualidade.",
    },
    {
      icon: BarChart,
      metric: "100%",
      metricLabel: "visibilidade",
      title: "Insights e Analytics em Tempo Real",
      description: "Dashboards que mostram exatamente o que está funcionando, quais leads são quentes e onde otimizar.",
    },
    {
      icon: Shield,
      metric: "0",
      metricLabel: "erros humanos",
      title: "Consistência e Qualidade Garantidas",
      description: "Zero erros humanos, zero dias ruins. Cada interação segue seu script perfeito e aprende continuamente.",
    },
  ];

  return (
    <section className="section-corporate bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Benefícios que Transformam Seu Negócio
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
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
              className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border card-hover"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-primary">{benefit.metric}</div>
                  <div className="text-xs text-muted-foreground">{benefit.metricLabel}</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsNew;
