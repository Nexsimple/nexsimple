import { Brain, MessageSquare, Share2, BarChart3, Database, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSiteSettings } from '@/hooks/useSiteSettings';

const Services = () => {
  const settings = useSiteSettings();

  const services = [
    {
      icon: Brain,
      title: settings.solution_1_title || "Robô que Trabalha 24h por Você",
      description: settings.solution_1_desc || "IA responde clientes automaticamente",
    },
    {
      icon: MessageSquare,
      title: settings.solution_2_title || "Atendente Digital Incansável",
      description: settings.solution_2_desc || "Seu time nunca mais perde um lead",
    },
    {
      icon: Share2,
      title: settings.solution_3_title || "Redes Sociais no Piloto Automático",
      description: settings.solution_3_desc || "Poste e venda automaticamente",
    },
    {
      icon: BarChart3,
      title: settings.solution_4_title || "Painel do Dinheiro em Tempo Real",
      description: settings.solution_4_desc || "Veja de onde vem cada centavo",
    },
    {
      icon: Database,
      title: settings.solution_5_title || "Cérebro Digital da Empresa",
      description: settings.solution_5_desc || "Todas as informações em um só lugar",
    },
    {
      icon: Zap,
      title: settings.solution_6_title || "Tudo Conectado, Zero Trabalho Manual",
      description: settings.solution_6_desc || "Seus sistemas conversam sozinhos",
    },
  ];
  return (
    <section id="services" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
            {settings.solutions_title || "Como a Nexsimple Multiplica Seus Lucros"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {settings.solutions_subtitle || "Tecnologia que faz seu dinheiro trabalhar por você"}
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
