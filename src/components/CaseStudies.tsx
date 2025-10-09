import { TrendingUp, Clock, Workflow } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const cases = [
  {
    icon: TrendingUp,
    metric: "60%",
    title: "Redução no tempo de resposta",
    description: "Automação completa do atendimento ao cliente com IA",
  },
  {
    icon: Workflow,
    metric: "100%",
    title: "Integração completa",
    description: "Marketing e CRM unificados via n8n",
  },
  {
    icon: Clock,
    metric: "40h",
    title: "Economia semanal",
    description: "Processos internos automatizados",
  },
];

const CaseStudies = () => {
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="cases" className="py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Resultados Reais de Nossos Clientes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Empresas que transformaram sua operação com nossas soluções de automação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {cases.map((caseStudy, index) => (
            <Card 
              key={index}
              className="text-center border-2 hover:border-primary transition-all duration-300 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardContent className="pt-8 pb-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <caseStudy.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-5xl font-bold text-primary mb-4">
                  {caseStudy.metric}
                </div>
                <h3 className="text-xl font-semibold text-secondary mb-3">
                  {caseStudy.title}
                </h3>
                <p className="text-muted-foreground">
                  {caseStudy.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 text-lg"
            onClick={scrollToContact}
          >
            Descubra como podemos otimizar sua empresa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
