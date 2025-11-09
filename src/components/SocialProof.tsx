import { motion } from "framer-motion";
import { Cpu, Zap, Server, InfinityIcon } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const SocialProof = () => {
  const { getSetting } = useSiteSettings();

  const techProofs = [
    {
      icon: Cpu,
      metric: getSetting('tech_proof_1_metric', '1000+'),
      label: getSetting('tech_proof_1_label', 'Interações Simultâneas Processadas por IA'),
    },
    {
      icon: Zap,
      metric: getSetting('tech_proof_2_metric', '< 2s'),
      label: getSetting('tech_proof_2_label', 'Tempo Médio de Resposta da Automação'),
    },
    {
      icon: Server,
      metric: getSetting('tech_proof_3_metric', '99.9%'),
      label: getSetting('tech_proof_3_label', 'Uptime Garantido em Contrato'),
    },
    {
      icon: InfinityIcon,
      metric: getSetting('tech_proof_4_metric', '+50'),
      label: getSetting('tech_proof_4_label', 'Plataformas Nativas para Integração'),
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {getSetting('social_proof_title', 'Tecnologia Testada e Aprovada')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('social_proof_subtitle', 'Nossa infraestrutura é construída para performance, escalabilidade e confiança.')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {techProofs.map((proof, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-lg border border-border/50 text-center hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-6">
                <proof.icon className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-secondary mb-2">{proof.metric}</div>
              <p className="text-muted-foreground">{proof.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;