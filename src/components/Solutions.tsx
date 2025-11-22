import { motion } from "framer-motion";
import { MessageSquare, Mic, Workflow, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";

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
      gradient: 'from-blue-500/20 to-cyan-500/20',
      iconColor: 'text-blue-500',
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
      gradient: 'from-purple-500/20 to-pink-500/20',
      iconColor: 'text-purple-500',
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
      gradient: 'from-amber-500/20 to-orange-500/20',
      iconColor: 'text-amber-500',
    },
  ];

  return (
    <section id="solutions" className="section-premium relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 dot-pattern opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />

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
            <span className="text-primary text-sm font-bold tracking-wide">Nossas Soluções</span>
          </motion.div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 text-foreground">
            Tecnologia que{' '}
            <span className="text-gradient">Impulsiona Resultados</span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Soluções completas de IA conversacional e automação para transformar sua operação
          </p>
        </motion.div>

        {/* Solutions Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="card-premium card-hover relative h-full flex flex-col overflow-hidden">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-6 relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-card to-card-foreground/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <solution.icon className={`w-8 h-8 ${solution.iconColor}`} />
                    </div>
                    <div className={`absolute inset-0 w-16 h-16 rounded-2xl ${solution.iconColor} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-gradient transition-all duration-300">
                    {solution.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {solution.features.map((feature, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-1 flex-shrink-0">
                          <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                        </div>
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="group/btn w-full justify-between text-primary hover:text-primary-foreground hover:bg-primary/10 transition-all duration-300"
                  >
                    <span>Saiba Mais</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                  </Button>
                </div>

                {/* Decorative Element */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-lg text-muted-foreground mb-6">
            Precisa de uma solução personalizada?
          </p>
          <Button className="btn-premium shine-effect">
            Falar com Especialista
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Solutions;
