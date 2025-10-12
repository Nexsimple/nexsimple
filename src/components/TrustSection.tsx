import { Shield, Lock, CheckCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSection = () => {
  const trustItems = [
    {
      icon: Shield,
      title: 'Garantia de 30 Dias',
      description: 'Não gostou? Devolvemos 100% do seu dinheiro'
    },
    {
      icon: Lock,
      title: 'Dados 100% Protegidos',
      description: 'Criptografia de nível bancário'
    },
    {
      icon: CheckCircle,
      title: 'Suporte Dedicado',
      description: 'Time sempre disponível para você'
    },
    {
      icon: Clock,
      title: 'Resultados em 30 Dias',
      description: 'Ou seu dinheiro de volta'
    }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-3">
            Seu Investimento Está 100% Seguro
          </h2>
          <p className="text-muted-foreground">
            Garantias que protegem você e seu negócio
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {trustItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-card rounded-lg border border-primary/20 hover:border-primary/40 transition-all"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};