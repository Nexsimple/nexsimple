import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, MessageSquare, Briefcase, HelpCircle, Megaphone, Image as ImageIcon } from 'lucide-react';
import { SectionsManager } from '@/components/admin/content/SectionsManager';
import { TestimonialsManager } from '@/components/admin/content/TestimonialsManager';
import { CaseStudiesManager } from '@/components/admin/content/CaseStudiesManager';
import { FAQManager } from '@/components/admin/content/FAQManager';
import { SEOManager } from '@/components/admin/content/SEOManager';
import { CTAManager } from '@/components/admin/content/CTAManager';

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

      <Tabs defaultValue="sections" className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
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

        <TabsContent value="sections" className="space-y-6">
          <SectionsManager />
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-6">
          <TestimonialsManager />
        </TabsContent>

        <TabsContent value="cases" className="space-y-6">
          <CaseStudiesManager />
        </TabsContent>

        <TabsContent value="faq" className="space-y-6">
          <FAQManager />
        </TabsContent>

        <TabsContent value="cta" className="space-y-6">
          <CTAManager />
        </TabsContent>

        <TabsContent value="seo" className="space-y-6">
          <SEOManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}
