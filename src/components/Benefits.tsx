import { motion } from "framer-motion";
import { TrendingUp, Clock, DollarSign, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const iconMap: Record<string, any> = {
  TrendingUp,
  Clock,
  DollarSign,
  Zap,
};

const CountUpNumber = ({ target, suffix }: { target: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const numericTarget = parseFloat(target);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = numericTarget / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= numericTarget) {
        setCount(numericTarget);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [numericTarget]);

  return (
    <span className="text-5xl md:text-6xl font-bold text-white">
      {suffix === "k" ? Math.round(count) : Math.round(count)}
      {suffix}
    </span>
  );
};

const Benefits = () => {
  const settings = useSiteSettings();

  const benefits = [
    {
      icon: iconMap[settings.benefit_1_icon || 'TrendingUp'],
      metric: settings.benefit_1_metric || "90",
      suffix: settings.benefit_1_suffix || "%",
      label: settings.benefit_1_label || "Menos Trabalho Chato",
      description: settings.benefit_1_desc || "Sua equipe para de perder tempo e foca em VENDER. Resultado: +R$ 40.000/mês",
      color: "from-primary to-primary/80",
    },
    {
      icon: iconMap[settings.benefit_2_icon || 'Zap'],
      metric: settings.benefit_2_metric || "3",
      suffix: settings.benefit_2_suffix || "x",
      label: settings.benefit_2_label || "Mais Vendas",
      description: settings.benefit_2_desc || "Resposta instantânea + follow-up automático = cliente compra na hora",
      color: "from-accent to-accent/80",
    },
    {
      icon: iconMap[settings.benefit_3_icon || 'Clock'],
      metric: settings.benefit_3_metric || "24",
      suffix: settings.benefit_3_suffix || "/7",
      label: settings.benefit_3_label || "Nunca Perde Cliente",
      description: settings.benefit_3_desc || "Atendimento 24h sem pagar hora extra. Cliente feliz, carteira cheia",
      color: "from-secondary to-secondary/80",
    },
    {
      icon: iconMap[settings.benefit_4_icon || 'DollarSign'],
      metric: settings.benefit_4_metric || "20",
      suffix: settings.benefit_4_suffix || "k",
      label: settings.benefit_4_label || "Economia Por Mês",
      description: settings.benefit_4_desc || "Menos funcionários, zero erro, processos rápidos. Dinheiro no bolso",
      color: "from-primary to-accent",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,hsl(var(--primary)/0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,hsl(var(--accent)/0.1),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {settings.benefits_title || "Resultados Que Você Vai Ver em 30 Dias"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {settings.benefits_subtitle || "Clientes reais economizaram MUITO dinheiro"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="group cursor-pointer"
            >
              <div className={`relative bg-gradient-to-br ${benefit.color} rounded-3xl p-8 overflow-hidden`}>
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <benefit.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <div className="mb-4">
                    <CountUpNumber target={benefit.metric} suffix={benefit.suffix} />
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-3">
                    {benefit.label}
                  </h3>

                  <p className="text-white/90 leading-relaxed">
                    {benefit.description}
                  </p>

                  {/* Progress Bar */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                    className="mt-6 h-2 bg-white/30 rounded-full overflow-hidden"
                  >
                    <div className="h-full bg-white/80 rounded-full"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;