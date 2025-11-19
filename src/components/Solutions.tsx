import { motion } from "framer-motion";
import { MessageSquare, Mic, Workflow, Check } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const Solutions = () => {
  const { getSetting } = useSiteSettings();

  const solutions = [
    {
      icon: MessageSquare,
      title: getSetting('solution_1_title', 'Chatbots Inteligentes'),
      description: getSetting('solution_1_desc', 'Chatbots com IA que atendem seus clientes via WhatsApp, site e redes sociais. Qualificam leads, respondem dúvidas e automatizam atendimento 24/7.'),
      features: [
        'Atendimento automático 24/7',
        'Qualificação inteligente de leads',
        'Integração multi-plataforma',
      ],
    },
    {
      icon: Mic,
      title: getSetting('solution_2_title', 'IA de Voz'),
      description: getSetting('solution_2_desc', 'Agentes de voz com IA que fazem ligações automatizadas para confirmação de agendamentos, follow-ups comerciais e pesquisas de satisfação.'),
      features: [
        'Voz natural e humanizada',
        'Confirmação de agendamentos',
        'Follow-ups automáticos',
      ],
    },
    {
      icon: Workflow,
      title: getSetting('solution_3_title', 'Criação de Sites'),
      description: getSetting('solution_3_desc', 'Desenvolvemos sites profissionais, responsivos e otimizados para conversão. Integrados com suas automações e ferramentas de IA.'),
      features: [
        'Design moderno e responsivo',
        'Otimizado para SEO',
        'Integração com automações',
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Nossas{' '}
            <span className="text-gradient">Soluções Principais</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('solutions_subtitle', 'Chatbots de IA, Criação de Sites e Soluções de Voz com Inteligência Artificial')}
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