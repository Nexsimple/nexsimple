import { Brain, MessageSquare, Share2, BarChart3, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Services = () => {
  const settings = useSiteSettings();

  const services = [
    {
      icon: Brain,
      title: settings.solution_1_title || "Atendimento Inteligente 24/7",
      description: settings.solution_1_desc || "Implementamos chatbots com IA que respondem a clientes e qualificam leads automaticamente, garantindo que nenhuma oportunidade seja perdida.",
    },
    {
      icon: MessageSquare,
      title: settings.solution_2_title || "Automação de Vendas e Marketing",
      description: settings.solution_2_desc || "Crie fluxos automatizados para nutrir leads, gerenciar campanhas e otimizar a comunicação, impulsionando suas vendas.",
    },
    {
      icon: Share2,
      title: settings.solution_3_title || "Integração de Sistemas Essenciais",
      description: settings.solution_3_desc || "Conectamos seu CRM, ERP e outras plataformas, eliminando silos de informação e garantindo a fluidez dos dados.",
    },
    {
      icon: BarChart3,
      title: settings.solution_4_title || "Dashboards de Performance em Tempo Real",
      description: settings.solution_4_desc || "Tenha uma visão clara e instantânea dos seus indicadores de negócio, permitindo decisões rápidas e assertivas.",
    },
    {
      icon: Database,
      title: settings.solution_5_title || "Otimização de Processos Internos",
      description: settings.solution_5_desc || "Automatizamos tarefas administrativas e operacionais, liberando sua equipe para focar em inovação e valor estratégico.",
    },
    {
      icon: Zap,
      title: settings.solution_6_title || "Consultoria Estratégica em IA",
      description: settings.solution_6_desc || "Nossos especialistas guiam sua empresa na adoção de IA, identificando as melhores aplicações para seus objetivos de negócio.",
    },
  ];
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {settings.solutions_title || "Nossas Soluções: O Caminho para a Eficiência e o Crescimento"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {settings.solutions_subtitle || "Tecnologia de ponta e expertise para transformar seus desafios em resultados tangíveis."}
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