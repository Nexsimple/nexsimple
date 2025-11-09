import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const SectionsManager = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    if (data) {
      const settingsObj = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, any>);
      setSettings(settingsObj);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setLoading(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, category: 'content' });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Configurações atualizadas.'
      });
      await loadSettings();
    }
    setLoading(false);
  };

  const sections = [
    {
      title: 'Hero',
      description: 'Seção principal do topo',
      fields: [
        { key: 'hero_title', label: 'Título Principal', type: 'text', defaultValue: 'Sua Empresa Pode Economizar 40 Horas Semanais em Processos Manuais' },
        { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Descubra a tecnologia que grandes empresas usam para automatizar operações' },
        { key: 'hero_cta_primary', label: 'Texto do Botão Principal', type: 'text' },
        { key: 'hero_cta_secondary', label: 'Texto do Botão Secundário', type: 'text' },
        { key: 'hero_badge_text', label: 'Texto do Badge', type: 'text' },
        { key: 'hero_stat_1_number', label: 'Estatística 1 (Número/Texto)', type: 'text' },
        { key: 'hero_stat_1_label', label: 'Estatística 1 (Rótulo)', type: 'text' },
        { key: 'hero_stat_2_number', label: 'Estatística 2 (Número/Texto)', type: 'text' },
        { key: 'hero_stat_2_label', label: 'Estatística 2 (Rótulo)', type: 'text' },
        { key: 'hero_stat_3_number', label: 'Estatística 3 (Número/Texto)', type: 'text' },
        { key: 'hero_stat_3_label', label: 'Estatística 3 (Rótulo)', type: 'text' },
      ]
    },
    {
      title: 'Problemas',
      description: 'Seção de problemas que você resolve',
      fields: [
        { key: 'problem_title', label: 'Título', type: 'text' },
        { key: 'problem_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'problem_1_title', label: 'Problema 1 Título', type: 'text' },
        { key: 'problem_1_desc', label: 'Problema 1 Descrição', type: 'textarea' },
        { key: 'problem_2_title', label: 'Problema 2 Título', type: 'text' },
        { key: 'problem_2_desc', label: 'Problema 2 Descrição', type: 'textarea' },
        { key: 'problem_3_title', label: 'Problema 3 Título', type: 'text' },
        { key: 'problem_3_desc', label: 'Problema 3 Descrição', type: 'textarea' },
        { key: 'problem_4_title', label: 'Problema 4 Título', type: 'text' },
        { key: 'problem_4_desc', label: 'Problema 4 Descrição', type: 'textarea' },
      ]
    },
    {
      title: 'Soluções',
      description: 'Como você resolve os problemas',
      fields: [
        { key: 'solutions_title', label: 'Título', type: 'text' },
        { key: 'solutions_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'solution_1_title', label: 'Solução 1 Título', type: 'text' },
        { key: 'solution_1_desc', label: 'Solução 1 Descrição', type: 'textarea' },
        { key: 'solution_2_title', label: 'Solução 2 Título', type: 'text' },
        { key: 'solution_2_desc', label: 'Solução 2 Descrição', type: 'textarea' },
        { key: 'solution_3_title', label: 'Solução 3 Título', type: 'text' },
        { key: 'solution_3_desc', label: 'Solução 3 Descrição', type: 'textarea' },
        { key: 'solution_4_title', label: 'Solução 4 Título', type: 'text' },
        { key: 'solution_4_desc', label: 'Solução 4 Descrição', type: 'textarea' },
        { key: 'solution_5_title', label: 'Solução 5 Título', type: 'text' },
        { key: 'solution_5_desc', label: 'Solução 5 Descrição', type: 'textarea' },
        { key: 'solution_6_title', label: 'Solução 6 Título', type: 'text' },
        { key: 'solution_6_desc', label: 'Solução 6 Descrição', type: 'textarea' },
      ]
    },
    {
      title: 'Benefícios',
      description: 'Principais benefícios',
      fields: [
        { key: 'benefits_title', label: 'Título', type: 'text' },
        { key: 'benefits_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'benefit_1_icon', label: 'Benefício 1 Ícone (Nome Lucide-React)', type: 'text' },
        { key: 'benefit_1_metric', label: 'Benefício 1 Métrica (Ex: 90)', type: 'text' },
        { key: 'benefit_1_suffix', label: 'Benefício 1 Sufixo (Ex: %)', type: 'text' },
        { key: 'benefit_1_label', label: 'Benefício 1 Rótulo', type: 'text' },
        { key: 'benefit_1_desc', label: 'Benefício 1 Descrição', type: 'textarea' },
        { key: 'benefit_2_icon', label: 'Benefício 2 Ícone (Nome Lucide-React)', type: 'text' },
        { key: 'benefit_2_metric', label: 'Benefício 2 Métrica (Ex: 3)', type: 'text' },
        { key: 'benefit_2_suffix', label: 'Benefício 2 Sufixo (Ex: x)', type: 'text' },
        { key: 'benefit_2_label', label: 'Benefício 2 Rótulo', type: 'text' },
        { key: 'benefit_2_desc', label: 'Benefício 2 Descrição', type: 'textarea' },
        { key: 'benefit_3_icon', label: 'Benefício 3 Ícone (Nome Lucide-React)', type: 'text' },
        { key: 'benefit_3_metric', label: 'Benefício 3 Métrica (Ex: 24)', type: 'text' },
        { key: 'benefit_3_suffix', label: 'Benefício 3 Sufixo (Ex: /7)', type: 'text' },
        { key: 'benefit_3_label', label: 'Benefício 3 Rótulo', type: 'text' },
        { key: 'benefit_3_desc', label: 'Benefício 3 Descrição', type: 'textarea' },
        { key: 'benefit_4_icon', label: 'Benefício 4 Ícone (Nome Lucide-React)', type: 'text' },
        { key: 'benefit_4_metric', label: 'Benefício 4 Métrica (Ex: 20)', type: 'text' },
        { key: 'benefit_4_suffix', label: 'Benefício 4 Sufixo (Ex: k)', type: 'text' },
        { key: 'benefit_4_label', label: 'Benefício 4 Rótulo', type: 'text' },
        { key: 'benefit_4_desc', label: 'Benefício 4 Descrição', type: 'textarea' },
      ]
    },
    {
      title: 'Sobre',
      description: 'Sobre a empresa',
      fields: [
        { key: 'about_title', label: 'Título', type: 'text' },
        { key: 'about_text_1', label: 'Texto 1', type: 'textarea' },
        { key: 'about_text_2', label: 'Texto 2', type: 'textarea' },
        { key: 'about_stat_1_number', label: 'Estatística 1 (Número/Texto)', type: 'text' },
        { key: 'about_stat_1_label', label: 'Estatística 1 (Rótulo)', type: 'text' },
        { key: 'about_stat_2_number', label: 'Estatística 2 (Número/Texto)', type: 'text' },
        { key: 'about_stat_2_label', label: 'Estatística 2 (Rótulo)', type: 'text' },
        { key: 'about_stat_3_number', label: 'Estatística 3 (Número/Texto)', type: 'text' },
        { key: 'about_stat_3_label', label: 'Estatística 3 (Rótulo)', type: 'text' },
        { key: 'about_stat_4_number', label: 'Estatística 4 (Número/Texto)', type: 'text' },
        { key: 'about_stat_4_label', label: 'Estatística 4 (Rótulo)', type: 'text' },
      ]
    },
    {
      title: 'Demo Interativa',
      description: 'Seção de demonstração interativa',
      fields: [
        { key: 'demo_title', label: 'Título', type: 'text' },
        { key: 'demo_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'demo_feature_1_title', label: 'Recurso 1 Título', type: 'text' },
        { key: 'demo_feature_1_desc', label: 'Recurso 1 Descrição', type: 'textarea' },
        { key: 'demo_feature_2_title', label: 'Recurso 2 Título', type: 'text' },
        { key: 'demo_feature_2_desc', label: 'Recurso 2 Descrição', type: 'textarea' },
        { key: 'demo_feature_3_title', label: 'Recurso 3 Título', type: 'text' },
        { key: 'demo_feature_3_desc', label: 'Recurso 3 Descrição', type: 'textarea' },
        { key: 'demo_button_text', label: 'Texto do Botão da Demo', type: 'text' },
      ]
    },
    {
      title: 'FAQ',
      description: 'Seção de Perguntas Frequentes',
      fields: [
        { key: 'faq_title', label: 'Título', type: 'text' },
        { key: 'faq_subtitle', label: 'Subtítulo', type: 'textarea' },
      ]
    },
    {
      title: 'CTA Final',
      description: 'Chamada para ação no final da página',
      fields: [
        { key: 'final_cta_badge', label: 'Texto do Badge', type: 'text' },
        { key: 'final_cta_title', label: 'Título Principal', type: 'text' },
        { key: 'final_cta_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'final_cta_button_1', label: 'Texto do Botão 1', type: 'text' },
        { key: 'final_cta_button_2', label: 'Texto do Botão 2', type: 'text' },
        { key: 'final_cta_guarantee_1', label: 'Garantia 1', type: 'text' },
        { key: 'final_cta_guarantee_2', label: 'Garantia 2', type: 'text' },
        { key: 'final_cta_guarantee_3', label: 'Garantia 3', type: 'text' },
        { key: 'final_cta_urgency', label: 'Mensagem de Urgência', type: 'text' },
      ]
    },
    {
      title: 'Exit Popup',
      description: 'Configurações do popup de saída',
      fields: [
        { key: 'exit_popup_enabled', label: 'Ativar Popup de Saída (true/false)', type: 'text' },
        { key: 'exit_popup_title', label: 'Título do Popup', type: 'text' },
        { key: 'exit_popup_offer', label: 'Oferta do Popup', type: 'text' },
      ]
    },
    {
      title: 'Formulário de Contato',
      description: 'Configurações do formulário de contato',
      fields: [
        { key: 'contact_form_title', label: 'Título do Formulário', type: 'text' },
        { key: 'contact_form_subtitle', label: 'Subtítulo do Formulário', type: 'textarea' },
        { key: 'webhook_url', label: 'URL do Webhook para Leads', type: 'text' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.key}
                    value={settings[field.key] || field.defaultValue || ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={settings[field.key] || field.defaultValue || ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <Button 
              onClick={() => {
                section.fields.forEach(field => {
                  updateSetting(field.key, settings[field.key] || field.defaultValue);
                });
              }}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar {section.title}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};