import { motion } from "framer-motion";
import { TrendingDown, Clock, Users, AlertCircle } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ProblemSection = () => {
  const { getSetting } = useSiteSettings();

  const problems = [
    {
      icon: TrendingDown,
      title: getSetting('problem_1_title', 'Vendas Perdidas'),
      description: getSetting('problem_1_desc', 'Leads não respondidos fora do horário comercial representam receitas deixadas na mesa'),
    },
    {
      icon: Clock,
      title: getSetting('problem_2_title', 'Atendimento Lento'),
      description: getSetting('problem_2_desc', 'Tempo de resposta alto afasta clientes e reduz satisfação drasticamente'),
    },
    {
      icon: Users,
      title: getSetting('problem_3_title', 'Equipe Sobrecarregada'),
      description: getSetting('problem_3_desc', 'Time gasta tempo em tarefas repetitivas em vez de fechar negócios complexos'),
    },
    {
      icon: AlertCircle,
      title: getSetting('problem_4_title', 'Falta de Automação'),
      description: getSetting('problem_4_desc', 'Processos manuais geram erros, inconsistência e impossibilidade de escalar'),
    },
  ];

  return (
    <section id="problems" className="section-spacing bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {getSetting('problem_title', 'Os Desafios que Sua Empresa Enfrenta')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('problem_subtitle', 'Enquanto você dorme, seus concorrentes com IA já estão fechando vendas')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-corporate card-hover border-l-4 border-l-destructive"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block w-1 h-16 bg-gradient-to-b from-primary to-transparent mb-6"></div>
          <p className="text-xl md:text-2xl text-foreground">
            E se você pudesse resolver tudo isso com{' '}
            <span className="text-gradient font-bold">IA Conversacional</span>?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;