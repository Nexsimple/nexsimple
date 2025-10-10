import { motion } from "framer-motion";
import { Clock, UserX, TrendingDown, Unplug } from "lucide-react";

const problems = [
  {
    icon: Clock,
    title: "Processos Manuais Demorados",
    description: "Sua equipe perde horas em tarefas repetitivas que poderiam ser automatizadas, reduzindo produtividade e aumentando custos.",
  },
  {
    icon: UserX,
    title: "Atendimento Ineficiente",
    description: "Clientes esperam muito tempo por respostas, gerando insatisfação e perda de oportunidades de negócio.",
  },
  {
    icon: TrendingDown,
    title: "Baixa Conversão de Vendas",
    description: "Falta de follow-up automatizado e processos desorganizados fazem você perder vendas todos os dias.",
  },
  {
    icon: Unplug,
    title: "Sistemas Desconectados",
    description: "Dados espalhados em múltiplas plataformas sem integração, dificultando análises e tomada de decisões.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Esses problemas estão custando caro para sua empresa
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Você não está sozinho. Milhares de empresas enfrentam os mesmos desafios todos os dias.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group"
            >
              <div className="bg-card border-2 border-destructive/20 rounded-2xl p-6 h-full hover:border-destructive/40 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center mb-4 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-7 h-7 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {problem.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-lg font-semibold text-secondary">
            Mas existe uma solução... 👇
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;