import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Building2, Share2, Search, Activity } from 'lucide-react';

interface Setting {
  id: string;
  key: string;
  value: any;
  category: string | null;
}

const Settings = () => {
  const { isLoading } = useAdminAuth();
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    if (error) {
      toast.error('Erro ao carregar configurações');
      console.error(error);
    } else {
      setSettings(data || []);
      const initialData: Record<string, any> = {};
      data?.forEach(setting => {
        initialData[setting.key] = setting.value;
      });
      setFormData(initialData);
    }
    setLoading(false);
  };

  const handleSave = async (category: string) => {
    const categorySettings = settings.filter(s => s.category === category);
    
    const updates = categorySettings.map(setting => 
      supabase
        .from('site_settings')
        .upsert({ key: setting.key, value: formData[setting.key] || setting.value, category: setting.category })
        .eq('id', setting.id)
    );

    const results = await Promise.all(updates);
    const hasError = results.some(r => r.error);

    if (hasError) {
      toast.error('Erro ao salvar configurações');
    } else {
      toast.success('Configurações salvas com sucesso');
      loadSettings();
    }
  };

  const updateValue = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const getSettingsByCategory = (category: string) => {
    return settings.filter(s => s.category === category);
  };

  if (isLoading || loading) {
    return <div className="flex items-center justify-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Gerencie as configurações do site</p>
      </div>

      <Tabs defaultValue="company" className="w-full">
        <TabsList>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="social">
            <Share2 className="h-4 w-4 mr-2" />
            Redes Sociais
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Search className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="tracking">
            <Activity className="h-4 w-4 mr-2" />
            Rastreamento
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Informações da Empresa</CardTitle>
              <CardDescription>
                Configure os dados da sua empresa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getSettingsByCategory('company').map(setting => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.key}>
                    {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                  <Input
                    id={setting.key}
                    value={formData[setting.key] || ''}
                    onChange={(e) => updateValue(setting.key, e.target.value)}
                    placeholder={`Digite ${setting.key.replace(/_/g, ' ')}`}
                  />
                </div>
              ))}
              <Button onClick={() => handleSave('company')}>
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Configure os links das redes sociais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getSettingsByCategory('social').map(setting => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.key}>
                    {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                  <Input
                    id={setting.key}
                    value={formData[setting.key] || ''}
                    onChange={(e) => updateValue(setting.key, e.target.value)}
                    placeholder={`https://...`}
                    type="url"
                  />
                </div>
              ))}
              <Button onClick={() => handleSave('social')}>
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <CardTitle>Configurações de SEO</CardTitle>
              <CardDescription>
                Otimize seu site para motores de busca
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {getSettingsByCategory('seo').map(setting => (
                <div key={setting.id} className="space-y-2">
                  <Label htmlFor={setting.key}>
                    {setting.key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Label>
                  <Input
                    id={setting.key}
                    value={formData[setting.key] || ''}
                    onChange={(e) => updateValue(setting.key, e.target.value)}
                    placeholder={`Digite ${setting.key.replace(/_/g, ' ')}`}
                  />
                </div>
              ))}
              <Button onClick={() => handleSave('seo')}>
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking">
          <Card>
            <CardHeader>
              <CardTitle>Rastreamento e Conversões</CardTitle>
              <CardDescription>
                Configure pixels e códigos de rastreamento para anúncios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_pixel_id">
                  Facebook/Meta Pixel ID
                </Label>
                <Input
                  id="facebook_pixel_id"
                  value={formData['facebook_pixel_id'] || ''}
                  onChange={(e) => updateValue('facebook_pixel_id', e.target.value)}
                  placeholder="123456789012345"
                />
                <p className="text-xs text-muted-foreground">
                  O Pixel será carregado automaticamente no site e rastreará conversões quando o formulário for enviado
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_ads_conversion_id">
                  Google Ads Conversion ID
                </Label>
                <Input
                  id="google_ads_conversion_id"
                  value={formData['google_ads_conversion_id'] || ''}
                  onChange={(e) => updateValue('google_ads_conversion_id', e.target.value)}
                  placeholder="AW-123456789"
                />
                <p className="text-xs text-muted-foreground">
                  ID de conversão do Google Ads para rastrear leads
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="google_ads_conversion_label">
                  Google Ads Conversion Label
                </Label>
                <Input
                  id="google_ads_conversion_label"
                  value={formData['google_ads_conversion_label'] || ''}
                  onChange={(e) => updateValue('google_ads_conversion_label', e.target.value)}
                  placeholder="abcDEfGhiJklMNOp"
                />
                <p className="text-xs text-muted-foreground">
                  Label da conversão do Google Ads
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook_url">
                  URL do Webhook para Leads
                </Label>
                <Input
                  id="webhook_url"
                  value={formData['webhook_url'] || ''}
                  onChange={(e) => updateValue('webhook_url', e.target.value)}
                  placeholder="https://seusite.com/webhook"
                />
                <p className="text-xs text-muted-foreground">
                  Envie dados do formulário de contato para um webhook externo (ex: n8n, Make)
                </p>
              </div>
              <Button onClick={() => handleSave('tracking')}>
                Salvar Alterações
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;