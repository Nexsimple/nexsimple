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
    <section id="problems" className="py-24 bg-gray-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {getSetting('problem_title', 'Seu Negócio Está Perdendo Oportunidades')}
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
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
              className="bg-gray-900/50 p-8 rounded-2xl border border-red-900/30 hover:border-red-800/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-red-900/20 flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                  <p className="text-gray-400">{problem.description}</p>
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
          <div className="inline-block w-1 h-16 bg-gradient-to-b from-blue-500 to-transparent mb-6"></div>
          <p className="text-xl md:text-2xl text-white">
            E se você pudesse resolver tudo isso com{' '}
            <span className="text-blue-500 font-bold">IA Conversacional</span>?
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;