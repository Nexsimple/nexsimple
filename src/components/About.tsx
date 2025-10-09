import { CheckCircle2, Rocket, Shield, Sparkles } from "lucide-react";

const differentials = [
  {
    icon: CheckCircle2,
    title: "+50 automações implementadas",
    description: "Experiência comprovada em diversos setores",
  },
  {
    icon: Rocket,
    title: "+100 mil processos otimizados",
    description: "Escala e eficiência garantidas",
  },
  {
    icon: Shield,
    title: "+20 empresas transformadas",
    description: "Resultados reais e mensuráveis",
  },
  {
    icon: Sparkles,
    title: "Integração total n8n",
    description: "Do frontend ao backend sem fricção",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-6">
              Por que escolher a Nexsimple?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              A Nexsimple une tecnologia e automação para oferecer controle total dos seus processos. 
              Atuamos do frontend ao backend, integrando sistemas via n8n e soluções com Inteligência 
              Artificial que realmente executam.
            </p>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Nossa missão é transformar empresas através da automação inteligente, permitindo que você 
              foque no que realmente importa: crescer e inovar.
            </p>

            {/* Differentials Grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {differentials.map((item, index) => (
                <div 
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-secondary mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image/Visual */}
          <div className="relative animate-slide-up">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div 
                className="aspect-square bg-gradient-to-br from-secondary via-primary to-secondary/80 flex items-center justify-center"
              >
                <div className="text-center text-white p-12">
                  <div className="text-6xl font-bold mb-4">IA</div>
                  <div className="text-2xl font-semibold mb-2">+</div>
                  <div className="text-6xl font-bold">n8n</div>
                  <div className="mt-8 text-lg opacity-90">
                    Automação Completa
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-secondary/20 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
