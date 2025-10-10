import { useEffect, useState } from 'react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Building2, Share2, Search } from 'lucide-react';

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
        .update({ value: formData[setting.key] || setting.value })
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
      </Tabs>
    </div>
  );
};

export default Settings;
