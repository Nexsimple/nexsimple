import { useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Palette, FileText, MessageSquare, Briefcase, HelpCircle, Megaphone, Image as ImageIcon } from 'lucide-react';

export default function AdminContent() {
  const { isLoading } = useAdminAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-secondary mb-2">Gestão de Conteúdo</h1>
        <p className="text-muted-foreground">Edite todas as seções do site de forma centralizada</p>
      </div>

      <Tabs defaultValue="visual" className="w-full">
        <TabsList className="grid w-full grid-cols-7 mb-8">
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Visual
          </TabsTrigger>
          <TabsTrigger value="sections" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Seções
          </TabsTrigger>
          <TabsTrigger value="testimonials" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Depoimentos
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Cases
          </TabsTrigger>
          <TabsTrigger value="faq" className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </TabsTrigger>
          <TabsTrigger value="cta" className="flex items-center gap-2">
            <Megaphone className="w-4 h-4" />
            CTA
          </TabsTrigger>
          <TabsTrigger value="seo" className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4" />
            SEO
          </TabsTrigger>
        </TabsList>

        <TabsContent value="visual" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Identidade Visual</h2>
            <p className="text-muted-foreground">
              Em breve: Upload de logo, favicon e gerenciamento de cores.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="sections" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Seções do Site</h2>
            <p className="text-muted-foreground">
              Em breve: Edição de Hero, Problemas, Soluções, Benefícios, Sobre e Demonstração.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Depoimentos</h2>
            <p className="text-muted-foreground">
              Em breve: Gerenciamento completo de depoimentos de clientes.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Cases de Sucesso</h2>
            <p className="text-muted-foreground">
              Em breve: Gerenciamento de cases com métricas e resultados.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Perguntas Frequentes</h2>
            <p className="text-muted-foreground">
              Em breve: CRUD completo de perguntas e respostas.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="cta" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">Chamadas para Ação</h2>
            <p className="text-muted-foreground">
              Em breve: Edição de CTAs finais e botões.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">SEO e Meta Tags</h2>
            <p className="text-muted-foreground">
              Em breve: Configuração completa de SEO, Open Graph e Schema.org.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
