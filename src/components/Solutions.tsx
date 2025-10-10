import { Brain, MessageSquare, Share2, BarChart3, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Brain,
    title: "Estrutura de IA",
    description: "Desenvolvimento de sites integrados com n8n para automação total de processos empresariais.",
  },
  {
    icon: MessageSquare,
    title: "Atendentes com IA",
    description: "Criação de bots de atendimento via chat e voz para oferecer suporte 24/7.",
  },
  {
    icon: Share2,
    title: "Automação de Redes Sociais",
    description: "Agendamento, respostas automáticas e análise de performance em suas redes.",
  },
  {
    icon: BarChart3,
    title: "Automação de Análise de Marketing",
    description: "Dashboards e insights automáticos com dados em tempo real.",
  },
  {
    icon: Database,
    title: "Agentes de Informação",
    description: "Centralização de dados internos para treinar e capacitar equipes.",
  },
  {
    icon: Zap,
    title: "Integrações com APIs Externas",
    description: "Conectamos seus sistemas e plataformas para um fluxo operacional unificado.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            Nossas Soluções
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos uma gama completa de serviços de automação com IA para transformar sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="border-2 hover:border-primary transition-all duration-300 hover:shadow-xl animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
