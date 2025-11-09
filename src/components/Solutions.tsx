import { motion } from "framer-motion";
import { Zap, Target, BarChart, Bot, Users, Shield } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Solutions = () => {
  const { getSetting } = useSiteSettings();

  const solutions = [
    {
      icon: Zap,
      title: getSetting('solution_1_title', 'Automação Inteligente de Processos'),
      description: getSetting('solution_1_desc', 'Elimine tarefas manuais, reduza erros e libere sua equipe para focar em atividades estratégicas que geram valor real.'),
    },
    {
      icon: Target,
      title: getSetting('solution_2_title', 'Gestão de Leads 24/7'),
      description: getSetting('solution_2_desc', 'Capture, qualifique e responda a leads instantaneamente, aumentando sua taxa de conversão e garantindo que nenhuma oportunidade seja perdida.'),
    },
    {
      icon: BarChart,
      title: getSetting('solution_3_title', 'Dashboards com Dados em Tempo Real'),
      description: getSetting('solution_3_desc', 'Tenha acesso a informações cruciais do seu negócio em tempo real para tomar decisões mais rápidas, inteligentes e lucrativas.'),
    },
    {
      icon: Bot,
      title: getSetting('solution_4_title', 'Assistentes de IA Personalizados'),
      description: getSetting('solution_4_desc', 'Crie assistentes virtuais treinados para o seu negócio, capazes de realizar atendimento, vendas e suporte de forma autônoma.'),
    },
    {
      icon: Users,
      title: getSetting('solution_5_title', 'Integração Total de Sistemas'),
      description: getSetting('solution_5_desc', 'Conecte todas as suas ferramentas (CRM, ERP, etc.) em um fluxo de trabalho unificado, eliminando silos de informação.'),
    },
    {
      icon: Shield,
      title: getSetting('solution_6_title', 'Segurança e Confiabilidade'),
      description: getSetting('solution_6_desc', 'Nossa infraestrutura garante 99.9% de uptime e segurança de nível empresarial para proteger seus dados e operações.'),
    },
  ];

  return (
    <section id="solutions" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {getSetting('solutions_title', 'Nossas Soluções: O Caminho para a Eficiência e o Crescimento')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('solutions_subtitle', 'Tecnologia de ponta e expertise para transformar seus desafios em resultados tangíveis.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border/50"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <solution.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-secondary">{solution.title}</h3>
              </div>
              <p className="text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;