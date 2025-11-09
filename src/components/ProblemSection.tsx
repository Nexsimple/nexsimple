import { motion } from "framer-motion";
import { Clock, TrendingDown, AlertTriangle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ProblemSection = () => {
  const { getSetting } = useSiteSettings();

  const problems = [
    {
      icon: Clock,
      title: getSetting('problem_1_title', 'Perda de Tempo e Dinheiro com Tarefas Manuais'),
      description: getSetting('problem_1_desc', 'Sua equipe gasta até 40 horas semanais em tarefas repetitivas, custando milhares de reais e atrasando o crescimento.'),
    },
    {
      icon: TrendingDown,
      title: getSetting('problem_2_title', 'Oportunidades de Venda Perdidas Diariamente'),
      description: getSetting('problem_2_desc', 'A demora no atendimento e follow-up de leads resulta em 30% menos conversões e clientes insatisfeitos.'),
    },
    {
      icon: AlertTriangle,
      title: getSetting('problem_3_title', 'Decisões Lentas e Custosas por Falta de Dados'),
      description: getSetting('problem_3_desc', 'Informações desorganizadas impedem decisões rápidas, gerando prejuízos de até 15% no faturamento anual.'),
    },
  ];

  return (
    <section id="problems" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {getSetting('problem_title', 'Desafios Comuns que Estão Custando Caro à Sua Empresa')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('problem_subtitle', 'Identifique os gargalos que impedem sua equipe de alcançar o máximo potencial e geram perdas financeiras.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                <problem.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;