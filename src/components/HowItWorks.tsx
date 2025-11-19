import { motion } from 'framer-motion';
import { MessageCircle, FileText, Zap, Headphones } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: MessageCircle,
      number: '01',
      title: 'Conversa Inicial',
      description: 'Entendemos suas necessidades e desafios específicos em uma consultoria gratuita.',
    },
    {
      icon: FileText,
      number: '02',
      title: 'Análise e Proposta',
      description: 'Criamos uma proposta personalizada com soluções adequadas ao seu negócio.',
    },
    {
      icon: Zap,
      number: '03',
      title: 'Implementação',
      description: 'Desenvolvemos e integramos as soluções de IA de forma rápida e eficiente.',
    },
    {
      icon: Headphones,
      number: '04',
      title: 'Suporte Contínuo',
      description: 'Oferecemos treinamento completo e suporte dedicado para garantir o sucesso.',
    },
  ];

  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Processo Simples em 4 Etapas
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Do primeiro contato até o sucesso do seu projeto, estamos com você em cada passo
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Connection Line (desktop only) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-border -translate-x-1/2 z-0" />
              )}

              <div className="relative z-10 text-center">
                {/* Number Badge */}
                <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-6 relative">
                  <step.icon className="w-10 h-10 text-primary" />
                  <span className="absolute -top-2 -right-2 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
