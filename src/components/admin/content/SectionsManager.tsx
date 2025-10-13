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
        { key: 'hero_title', label: 'Título Principal', type: 'text' },
        { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea' },
        { key: 'hero_cta_text', label: 'Texto do Botão', type: 'text' }
      ]
    },
    {
      title: 'Problemas',
      description: 'Seção de problemas que você resolve',
      fields: [
        { key: 'problems_title', label: 'Título', type: 'text' },
        { key: 'problems_subtitle', label: 'Subtítulo', type: 'textarea' }
      ]
    },
    {
      title: 'Soluções',
      description: 'Como você resolve os problemas',
      fields: [
        { key: 'solutions_title', label: 'Título', type: 'text' },
        { key: 'solutions_subtitle', label: 'Subtítulo', type: 'textarea' }
      ]
    },
    {
      title: 'Benefícios',
      description: 'Principais benefícios',
      fields: [
        { key: 'benefits_title', label: 'Título', type: 'text' },
        { key: 'benefits_subtitle', label: 'Subtítulo', type: 'textarea' }
      ]
    },
    {
      title: 'Sobre',
      description: 'Sobre a empresa',
      fields: [
        { key: 'about_title', label: 'Título', type: 'text' },
        { key: 'about_description', label: 'Descrição', type: 'textarea' }
      ]
    }
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
                    value={settings[field.key] || ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={settings[field.key] || ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <Button 
              onClick={() => {
                section.fields.forEach(field => {
                  updateSetting(field.key, settings[field.key]);
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
