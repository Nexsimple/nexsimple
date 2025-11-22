import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const FAQ = () => {
  const { getSetting } = useSiteSettings();

  const faqs = [
    {
      question: getSetting('faq_q1', 'Quanto tempo leva para ver os resultados?'),
      answer: getSetting('faq_a1', 'Nossa metodologia ágil permite a implementação da primeira fase em poucas semanas. Você começará a ver o retorno sobre o investimento, como economia de tempo e redução de erros, em menos de 30 dias.'),
    },
    {
      question: getSetting('faq_q2', 'Isso é muito caro para minha empresa?'),
      answer: getSetting('faq_a2', 'O investimento na automação é significativamente menor do que o custo da ineficiência. Nossos planos são flexíveis e o foco é sempre no ROI. A economia gerada pela automação paga o investimento em poucos meses.'),
    },
    {
      question: getSetting('faq_q3', 'Preciso de conhecimento técnico para usar a solução?'),
      answer: getSetting('faq_a3', 'Absolutamente não. Nós cuidamos de toda a complexidade técnica, desde o planejamento e desenvolvimento até a implementação e o suporte. Sua equipe só precisa se preocupar em usar a nova eficiência para crescer.'),
    },
    {
      question: getSetting('faq_q4', 'Meu processo é muito específico. A automação pode ser personalizada?'),
      answer: getSetting('faq_a4', 'Sim. Nossa especialidade é criar soluções de automação e IA 100% personalizadas. Analisamos seus processos em detalhes para construir uma solução que se encaixa perfeitamente nas suas necessidades.'),
    },
    {
      question: getSetting('faq_q5', 'A automação é segura para os dados da minha empresa?'),
      answer: getSetting('faq_a5', 'A segurança é nossa prioridade máxima. Utilizamos as melhores práticas de segurança do mercado, criptografia de ponta a ponta e seguimos rigorosos protocolos para garantir que seus dados estejam sempre protegidos.'),
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            {getSetting('faq_title', 'Suas Perguntas, Nossas Respostas')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getSetting('faq_subtitle', 'Esclareça suas dúvidas e veja como a Nexsimple pode resolver seus desafios mais urgentes.')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;