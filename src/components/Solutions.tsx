import { motion } from "framer-motion";
import { MessageSquare, Mic, Workflow, Check } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Solutions = () => {
  const { getSetting } = useSiteSettings();

  const solutions = [
    {
      icon: MessageSquare,
      title: getSetting('solution_1_title', 'Agentes de Chat IA'),
      description: getSetting('solution_1_desc', 'Desenvolvemos agentes de IA treinados especificamente para o seu negócio, integrando-se perfeitamente aos seus processos existentes'),
      features: [
        'Resposta instantânea 24/7',
        'Qualificação automática de leads',
        'Multi-canal integrado',
      ],
    },
    {
      icon: Mic,
      title: getSetting('solution_2_title', 'Agentes de Voz IA'),
      description: getSetting('solution_2_desc', 'Ligações automatizadas humanizadas que confirmam agendamentos, fazem follow-ups e realizam pesquisas de satisfação'),
      features: [
        'Conversas naturais e humanas',
        'Escala ilimitada de atendimento',
        'Redução de custo em 80%',
      ],
    },
    {
      icon: Workflow,
      title: getSetting('solution_3_title', 'Automação Híbrida'),
      description: getSetting('solution_3_desc', 'Workflows inteligentes que combinam IA + humanos nos momentos certos, garantindo eficiência sem perder o toque pessoal'),
      features: [
        'Melhor dos dois mundos',
        'Transição suave IA-Humano',
        'ROI maximizado',
      ],
    },
  ];

  return (
    <section id="solutions" className="section-spacing bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 rounded-full px-6 py-2 mb-6">
            <span className="text-accent text-sm font-semibold">✨ Nossa Solução Principal</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Soluções Completas em{' '}
            <span className="text-gradient">IA e Automação</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('solutions_subtitle', 'Desenvolvemos agentes de IA treinados especificamente para o seu negócio')}
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
              className="card-corporate card-hover text-center"
            >
              <div className="w-20 h-20 rounded-2xl gradient-corporate flex items-center justify-center mb-6 mx-auto">
                <solution.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-4">{solution.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{solution.description}</p>
              <ul className="space-y-3 text-left">
                {solution.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{feature}</span>
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