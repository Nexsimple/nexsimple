import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const SEOManager = () => {
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

  const handleSave = async () => {
    setLoading(true);
    const updates = [
      { key: 'seo_title', value: settings.seo_title, category: 'seo' },
      { key: 'seo_description', value: settings.seo_description, category: 'seo' },
      { key: 'seo_keywords', value: settings.seo_keywords, category: 'seo' },
      { key: 'og_title', value: settings.og_title, category: 'seo' },
      { key: 'og_description', value: settings.og_description, category: 'seo' },
      { key: 'og_image', value: settings.og_image, category: 'seo' },
      { key: 'company_name', value: settings.company_name, category: 'seo' },
      { key: 'company_url', value: settings.company_url, category: 'seo' }
    ];

    const { error } = await supabase.from('site_settings').upsert(updates);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as configurações de SEO.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Configurações de SEO atualizadas.'
      });
      loadSettings();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Meta Tags Básicas</CardTitle>
          <CardDescription>Configure as tags principais para SEO</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo_title">Título da Página (max 60 caracteres)</Label>
            <Input
              id="seo_title"
              value={settings.seo_title || ''}
              onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(settings.seo_title || '').length}/60 caracteres
            </p>
          </div>
          <div>
            <Label htmlFor="seo_description">Meta Description (max 160 caracteres)</Label>
            <Textarea
              id="seo_description"
              value={settings.seo_description || ''}
              onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
              maxLength={160}
              rows={3}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {(settings.seo_description || '').length}/160 caracteres
            </p>
          </div>
          <div>
            <Label htmlFor="seo_keywords">Palavras-chave (separadas por vírgula)</Label>
            <Input
              id="seo_keywords"
              value={settings.seo_keywords || ''}
              onChange={(e) => setSettings({ ...settings, seo_keywords: e.target.value })}
              placeholder="consultoria, empresas, gestão"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Open Graph (Redes Sociais)</CardTitle>
          <CardDescription>Como seu site aparece quando compartilhado</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="og_title">Título OG</Label>
            <Input
              id="og_title"
              value={settings.og_title || ''}
              onChange={(e) => setSettings({ ...settings, og_title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="og_description">Descrição OG</Label>
            <Textarea
              id="og_description"
              value={settings.og_description || ''}
              onChange={(e) => setSettings({ ...settings, og_description: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="og_image">URL da Imagem OG (1200x630px)</Label>
            <Input
              id="og_image"
              value={settings.og_image || ''}
              onChange={(e) => setSettings({ ...settings, og_image: e.target.value })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schema.org (Organização)</CardTitle>
          <CardDescription>Dados estruturados para mecanismos de busca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="company_name">Nome da Empresa</Label>
            <Input
              id="company_name"
              value={settings.company_name || ''}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="company_url">URL da Empresa</Label>
            <Input
              id="company_url"
              value={settings.company_url || ''}
              onChange={(e) => setSettings({ ...settings, company_url: e.target.value })}
              placeholder="https://www.empresa.com.br"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Configurações de SEO
      </Button>
    </div>
  );
};
