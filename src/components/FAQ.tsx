import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é o n8n e como ele ajuda minha empresa?",
    answer: "n8n é uma plataforma de automação de fluxo de trabalho que permite conectar diferentes ferramentas e sistemas. Nós utilizamos para integrar todos os setores da sua empresa, eliminando tarefas repetitivas e aumentando a eficiência operacional.",
  },
  {
    question: "A IA pode ser usada em qualquer tipo de negócio?",
    answer: "Sim! A Inteligência Artificial pode ser aplicada em diversos setores: atendimento ao cliente, análise de dados, marketing, vendas, RH e muito mais. Personalizamos a solução de acordo com as necessidades específicas do seu negócio.",
  },
  {
    question: "Quais setores da empresa podem ser automatizados?",
    answer: "Praticamente todos: marketing, vendas, atendimento, financeiro, RH, operações e logística. Identificamos os processos que geram mais trabalho manual e criamos automações inteligentes para otimizá-los.",
  },
  {
    question: "Quanto tempo leva para implantar uma solução Nexsimple?",
    answer: "Depende da complexidade do projeto. Soluções simples podem estar rodando em poucos dias, enquanto integrações mais complexas podem levar algumas semanas. Durante a consultoria inicial, apresentamos um cronograma detalhado.",
  },
  {
    question: "Posso integrar com meus sistemas atuais?",
    answer: "Sim! Trabalhamos com APIs e integrações personalizadas para conectar seus sistemas existentes (CRM, ERP, plataformas de e-commerce, etc.) com as nossas soluções de automação e IA.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-lg text-muted-foreground">
              Tire suas dúvidas sobre nossas soluções de automação
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-2 border-border rounded-xl px-6 hover:border-primary transition-colors"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-secondary hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-2 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
