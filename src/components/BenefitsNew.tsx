import { motion } from "framer-motion";
import { TrendingUp, DollarSign, Zap, Infinity, BarChart, Shield, Sparkles } from "lucide-react";

const BenefitsNew = () => {
  const benefits = [
    {
      icon: TrendingUp,
      metric: "24/7",
      metricLabel: "disponível",
      title: "Aumento de Conversão",
      description: "Leads respondidos instantaneamente 24/7 aumentam suas chances de conversão.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: DollarSign,
      metric: "80%",
      metricLabel: "economia",
      title: "Redução de Custos",
      description: "Automatize processos e reduza custos com atendimento manual.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Zap,
      metric: "<5s",
      metricLabel: "resposta",
      title: "Respostas Instantâneas",
      description: "Atendimento em segundos. Cliente engajado converte melhor.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Infinity,
      metric: "∞",
      metricLabel: "capacidade",
      title: "Escalabilidade Infinita",
      description: "Atenda dezenas, centenas ou milhares de clientes simultaneamente.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: BarChart,
      metric: "100%",
      metricLabel: "visibilidade",
      title: "Insights em Tempo Real",
      description: "Dashboards que mostram métricas e ajudam a otimizar continuamente.",
      color: "from-indigo-500 to-blue-500",
    },
    {
      icon: Shield,
      metric: "0",
      metricLabel: "erros",
      title: "Consistência Garantida",
      description: "Elimine erros humanos. Cada interação segue o padrão definido.",
      color: "from-red-500 to-rose-500",
    },
  ];

  return (
    <section id="benefits" className="section-premium relative overflow-hidden bg-gradient-to-b from-background via-background/95 to-card">
      {/* Background Effects */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px]" />
      
      <div className="container-premium relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 glass-effect rounded-full px-6 py-3 mb-6"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-primary text-sm font-bold tracking-wide">Benefícios</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            Por que Escolher{' '}
            <span className="text-gradient">Nexsimple</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Transforme sua operação com tecnologia de ponta e resultados comprovados
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="card-premium card-hover relative h-full overflow-hidden">
                {/* Gradient Accent */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${benefit.color}`} />
                
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon & Metric */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${benefit.color} opacity-10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`} />
                      <benefit.icon className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-3xl font-bold bg-gradient-to-r ${benefit.color} bg-clip-text text-transparent`}>
                        {benefit.metric}
                      </div>
                      <div className="text-xs text-muted-foreground font-medium tracking-wide uppercase">
                        {benefit.metricLabel}
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-gradient transition-all duration-300">
                    {benefit.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                {/* Decorative Element */}
                <div className={`absolute -bottom-12 -right-12 w-40 h-40 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-5 blur-3xl transition-all duration-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-20 glass-effect rounded-3xl p-12"
        >
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { value: '500+', label: 'Empresas Atendidas' },
              { value: '99.9%', label: 'Uptime' },
              { value: '10x', label: 'Mais Produtividade' },
              { value: '24/7', label: 'Suporte' },
            ].map((stat, i) => (
              <div key={i} className="relative group">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium tracking-wide">
                  {stat.label}
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsNew;
