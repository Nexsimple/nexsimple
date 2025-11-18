import { motion } from "framer-motion";
import { MessageSquare, Mic, Workflow, Check } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Solutions = () => {
  const { getSetting } = useSiteSettings();

  const solutions = [
    {
      icon: MessageSquare,
      title: getSetting('solution_1_title', 'Agentes de Chat IA'),
      description: getSetting('solution_1_desc', 'Desenvolvemos agentes de IA treinados especificamente para o seu negócio, integrando-se perfeitamente aos seus processos existentes para maximizar resultados'),
      features: [
        'Resposta instantânea',
        'Qualificação automática',
        'Multi-canal',
      ],
    },
    {
      icon: Mic,
      title: getSetting('solution_2_title', 'Agentes de Voz IA'),
      description: getSetting('solution_2_desc', 'Ligações automatizadas humanizadas que confirmam agendamentos, fazem follow-ups, realizam pesquisas de satisfação e até pré-vendem serviços.'),
      features: [
        'Conversas naturais',
        'Escala ilimitada',
        'Redução de custo 80%',
      ],
    },
    {
      icon: Workflow,
      title: getSetting('solution_3_title', 'Automação Híbrida'),
      description: getSetting('solution_3_desc', 'Workflows inteligentes que combinam IA + humanos nos momentos certos, garantindo eficiência sem perder o toque pessoal que fecha negócios.'),
      features: [
        'Melhor dos dois mundos',
        'Transição suave',
        'ROI maximizado',
      ],
    },
  ];

  return (
    <section id="solutions" className="section-corporate bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-2 mb-6">
            <span className="text-accent text-sm font-medium">✨ Nossa Solução Principal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            IA Conversacional{' '}
            <span className="text-gradient">Personalizada para Seu Negócio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('solutions_subtitle', 'Desenvolvemos agentes de IA treinados especificamente para o seu negócio, integrando-se perfeitamente aos seus processos existentes para maximizar resultados')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card/50 backdrop-blur-sm p-8 rounded-2xl border border-border card-hover"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 mx-auto shadow-lg shadow-primary/30">
                <solution.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4 text-center">{solution.title}</h3>
              <p className="text-muted-foreground mb-6 text-center">{solution.description}</p>
              <ul className="space-y-3">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-foreground">
                    <Check className="w-5 h-5 text-corporate-success flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Solutions;