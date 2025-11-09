import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from '@/hooks/useSiteSettings';

interface Faq {
  id: string;
  question: string;
  answer: string;
  order_index: number;
  active: boolean;
}

const FAQ = () => {
  const settings = useSiteSettings();
  const [faqs, setFaqs] = useState<Faq[]>([]);

  useEffect(() => {
    loadFaqs();

    const channel = supabase
      .channel('faqs_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'faqs',
        },
        () => {
          loadFaqs();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadFaqs = async () => {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .eq('active', true)
      .order('order_index', { ascending: true });

    if (data) {
      setFaqs(data);
    }
  };

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
              {settings.faq_title || "Suas Perguntas, Nossas Respostas: Desbloqueie o Potencial da Automação"}
            </h2>
            <p className="text-lg text-muted-foreground">
              {settings.faq_subtitle || "Esclareça suas dúvidas e veja como a Nexsimple pode resolver seus desafios mais urgentes."}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={faq.id} 
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