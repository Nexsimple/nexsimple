import { motion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Globe, Phone, ShoppingCart, Layout, Headphones, Building, Calendar, TrendingUp, Heart, BarChart, Sparkles, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AllInOneSolutions = () => {
  const [activeTab, setActiveTab] = useState("chatbots");

  const tabs = [
    { id: "chatbots", label: "Chatbots e IA" },
    { id: "sites", label: "Sites e Sistemas" },
    { id: "voice", label: "IA de Voz" },
  ];

  const solutions = {
    chatbots: [
      {
        icon: MessageSquare,
        title: "FAQ IA com Base de Conhecimento",
        description: "Respostas inteligentes e precisas 24/7",
      },
      {
        icon: Clock,
        title: "Atendente de Site 24 Horas",
        description: "Nunca perca um lead por falta de atendimento",
      },
      {
        icon: Users,
        title: "SDR e Qualificação de Leads",
        description: "Qualificação automática de potenciais clientes",
      },
      {
        icon: Calendar,
        title: "Agendamentos Automatizados",
        description: "Agenda inteligente integrada ao seu calendário",
      },
      {
        icon: TrendingUp,
        title: "Nutrição e Follow-up",
        description: "Relacionamento automatizado com leads",
      },
      {
        icon: Heart,
        title: "Pós-Venda e Fidelização",
        description: "Mantenha clientes engajados automaticamente",
      },
      {
        icon: BarChart,
        title: "Painel Administrativo",
        description: "Gestão e insights em tempo real",
      },
      {
        icon: Sparkles,
        title: "Premium: Multiagentes",
        description: "Áudio, imagem, documentos e integrações ilimitadas",
        featured: true,
      },
    ],
    sites: [
      {
        icon: ShoppingCart,
        title: "E-commerce Inteligente + IA",
        description: "Loja online com assistente de vendas IA",
      },
      {
        icon: Layout,
        title: "Landing Page de Conversão com SDR",
        description: "Páginas otimizadas com chatbot integrado",
      },
      {
        icon: Headphones,
        title: "Sistema de Atendimento 360°",
        description: "Plataforma completa de suporte ao cliente",
      },
      {
        icon: Building,
        title: "Portal Corporativo Inteligente",
        description: "Intranet com IA para sua empresa",
      },
      {
        icon: Calendar,
        title: "Plataforma de Agendamentos",
        description: "Sistema robusto de marcação e gestão",
      },
      {
        icon: ShoppingCart,
        title: "Sistema de Pedidos + Chat de Vendas",
        description: "Vendas integradas com IA conversacional",
      },
      {
        icon: BarChart,
        title: "Painel de Leads e CRM Inteligente",
        description: "Gestão completa com insights de IA",
      },
    ],
    voice: [
      {
        icon: Phone,
        title: "Receptivo Inteligente",
        description: "Atendimento telefônico automatizado",
      },
      {
        icon: Phone,
        title: "Ativo para Vendas",
        description: "Ligações automatizadas para prospecção",
      },
      {
        icon: Phone,
        title: "Follow-up Automatizado",
        description: "Acompanhamento de leads por voz",
      },
      {
        icon: Phone,
        title: "Pesquisas e NPS",
        description: "Coleta automática de feedback",
      },
    ],
  };

  return (
    <section className="section-corporate bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            Tudo que Seu Negócio Precisa em Um Só Lugar
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soluções completas de automação e IA
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              variant={activeTab === tab.id ? "default" : "outline"}
              className={
                activeTab === tab.id
                  ? "cta-button"
                  : "border-border hover:bg-card"
              }
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {solutions[activeTab as keyof typeof solutions].map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:scale-105 ${
                solution.featured
                  ? "bg-gradient-to-br from-accent/20 to-primary/20 border-accent/50 shadow-lg shadow-accent/20"
                  : "bg-card/50 backdrop-blur-sm border-border hover:border-primary/50 card-hover"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                solution.featured ? "bg-accent/20" : "bg-primary/10"
              }`}>
                <solution.icon className={`w-6 h-6 ${solution.featured ? "text-accent" : "text-primary"}`} />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{solution.title}</h3>
              <p className="text-sm text-muted-foreground">{solution.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllInOneSolutions;
