import { motion } from "framer-motion";
import { useState } from "react";
import { MessageSquare, Globe, Phone, ShoppingCart, Layout, Headphones, Building, Calendar, TrendingUp, Heart, BarChart, Sparkles, Clock, Users } from "lucide-react";

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
        description: "Respostas inteligentes 24/7",
      },
      {
        icon: Clock,
        title: "Atendente de Site 24 Horas",
        description: "Nunca perca um lead",
      },
      {
        icon: Users,
        title: "SDR e Qualificação de Leads",
        description: "Qualificação automática",
      },
      {
        icon: Calendar,
        title: "Agendamentos Automatizados",
        description: "Agenda inteligente integrada",
      },
      {
        icon: TrendingUp,
        title: "Nutrição e Follow-up",
        description: "Relacionamento automatizado",
      },
      {
        icon: Heart,
        title: "Pós-Venda e Fidelização",
        description: "Clientes sempre engajados",
      },
      {
        icon: BarChart,
        title: "Painel Administrativo",
        description: "Gestão em tempo real",
      },
      {
        icon: Sparkles,
        title: "Premium: Multiagentes",
        description: "Áudio, imagem, documentos",
        featured: true,
      },
    ],
    sites: [
      {
        icon: ShoppingCart,
        title: "E-commerce Inteligente + IA",
        description: "Loja com assistente de vendas",
      },
      {
        icon: Layout,
        title: "Landing Page com SDR",
        description: "Páginas otimizadas",
      },
      {
        icon: Headphones,
        title: "Sistema de Atendimento 360°",
        description: "Plataforma completa",
      },
      {
        icon: Building,
        title: "Portal Corporativo Inteligente",
        description: "Intranet com IA",
      },
      {
        icon: Calendar,
        title: "Plataforma de Agendamentos",
        description: "Sistema robusto de gestão",
      },
      {
        icon: ShoppingCart,
        title: "Sistema de Pedidos + Chat",
        description: "Vendas com IA integrada",
      },
      {
        icon: BarChart,
        title: "Painel de Leads e CRM",
        description: "Gestão com insights IA",
      },
    ],
    voice: [
      {
        icon: Phone,
        title: "Receptivo Inteligente",
        description: "Atendimento telefônico IA",
      },
      {
        icon: Phone,
        title: "Ativo para Vendas",
        description: "Prospecção automatizada",
      },
      {
        icon: Phone,
        title: "Follow-up Automatizado",
        description: "Acompanhamento por voz",
      },
      {
        icon: Phone,
        title: "Pesquisas e NPS",
        description: "Feedback automático",
      },
    ],
  };

  return (
    <section className="section-spacing bg-muted/30">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Tudo que Você Precisa em Uma Plataforma
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Soluções integradas e completas para transformar seu negócio
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-card text-foreground hover:bg-card/80 border border-border'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Solutions Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {solutions[activeTab as keyof typeof solutions].map((solution, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className={`card-corporate text-center ${
                solution.featured ? 'border-accent border-2' : ''
              } hover:scale-105 transition-transform duration-300`}
            >
              <div className={`w-14 h-14 rounded-xl ${
                solution.featured ? 'bg-accent/20' : 'bg-primary/10'
              } flex items-center justify-center mb-4 mx-auto`}>
                <solution.icon className={`w-7 h-7 ${
                  solution.featured ? 'text-accent' : 'text-primary'
                }`} />
              </div>
              <h3 className="font-bold text-foreground mb-2 text-sm leading-tight">
                {solution.title}
              </h3>
              <p className="text-xs text-muted-foreground">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllInOneSolutions;
