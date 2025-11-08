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
      { key: 'seo_author', value: settings.seo_author, category: 'seo' },
      { key: 'seo_robots', value: settings.seo_robots, category: 'seo' },
      { key: 'seo_canonical_url', value: settings.seo_canonical_url, category: 'seo' },
      { key: 'seo_locale', value: settings.seo_locale, category: 'seo' },
      { key: 'seo_twitter_card', value: settings.seo_twitter_card, category: 'seo' },
      { key: 'seo_twitter_site', value: settings.seo_twitter_site, category: 'seo' },
      { key: 'og_title', value: settings.og_title, category: 'seo' },
      { key: 'og_description', value: settings.og_description, category: 'seo' },
      { key: 'og_image', value: settings.og_image, category: 'seo' },
      { key: 'schema_org_type', value: settings.schema_org_type, category: 'seo' },
      { key: 'schema_org_name', value: settings.schema_org_name, category: 'seo' },
      { key: 'schema_org_description', value: settings.schema_org_description, category: 'seo' },
      { key: 'schema_org_logo', value: settings.schema_org_logo, category: 'seo' },
      { key: 'schema_org_contact_phone', value: settings.schema_org_contact_phone, category: 'seo' },
      { key: 'schema_org_contact_email', value: settings.schema_org_contact_email, category: 'seo' },
      { key: 'schema_org_address_street', value: settings.schema_org_address_street, category: 'seo' },
      { key: 'schema_org_address_city', value: settings.schema_org_address_city, category: 'seo' },
      { key: 'schema_org_address_state', value: settings.schema_org_address_state, category: 'seo' },
      { key: 'schema_org_address_postal_code', value: settings.schema_org_address_postal_code, category: 'seo' },
      { key: 'schema_org_social_instagram', value: settings.schema_org_social_instagram, category: 'seo' },
      { key: 'schema_org_social_facebook', value: settings.schema_org_social_facebook, category: 'seo' },
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
          <div>
            <Label htmlFor="seo_author">Autor</Label>
            <Input
              id="seo_author"
              value={settings.seo_author || ''}
              onChange={(e) => setSettings({ ...settings, seo_author: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="seo_robots">Robots (index, follow)</Label>
            <Input
              id="seo_robots"
              value={settings.seo_robots || ''}
              onChange={(e) => setSettings({ ...settings, seo_robots: e.target.value })}
              placeholder="index, follow"
            />
          </div>
          <div>
            <Label htmlFor="seo_canonical_url">URL Canônica</Label>
            <Input
              id="seo_canonical_url"
              value={settings.seo_canonical_url || ''}
              onChange={(e) => setSettings({ ...settings, seo_canonical_url: e.target.value })}
              placeholder="https://seusite.com"
            />
          </div>
          <div>
            <Label htmlFor="seo_locale">Localidade (Ex: pt_BR)</Label>
            <Input
              id="seo_locale"
              value={settings.seo_locale || ''}
              onChange={(e) => setSettings({ ...settings, seo_locale: e.target.value })}
              placeholder="pt_BR"
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
          <CardTitle>Twitter Cards</CardTitle>
          <CardDescription>Como seu site aparece no Twitter</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="seo_twitter_card">Tipo de Card (summary, summary_large_image)</Label>
            <Input
              id="seo_twitter_card"
              value={settings.seo_twitter_card || ''}
              onChange={(e) => setSettings({ ...settings, seo_twitter_card: e.target.value })}
              placeholder="summary_large_image"
            />
          </div>
          <div>
            <Label htmlFor="seo_twitter_site">Twitter @username</Label>
            <Input
              id="seo_twitter_site"
              value={settings.seo_twitter_site || ''}
              onChange={(e) => setSettings({ ...settings, seo_twitter_site: e.target.value })}
              placeholder="@seunome"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schema.org (Dados Estruturados)</CardTitle>
          <CardDescription>Informações para mecanismos de busca</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="schema_org_type">Tipo (Organization, LocalBusiness, etc.)</Label>
            <Input
              id="schema_org_type"
              value={settings.schema_org_type || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_type: e.target.value })}
              placeholder="Organization"
            />
          </div>
          <div>
            <Label htmlFor="schema_org_name">Nome da Entidade</Label>
            <Input
              id="schema_org_name"
              value={settings.schema_org_name || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="schema_org_description">Descrição da Entidade</Label>
            <Textarea
              id="schema_org_description"
              value={settings.schema_org_description || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_description: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="schema_org_logo">URL do Logo</Label>
            <Input
              id="schema_org_logo"
              value={settings.schema_org_logo || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_logo: e.target.value })}
              placeholder="https://seusite.com/logo.png"
            />
          </div>
          <div>
            <Label htmlFor="schema_org_contact_phone">Telefone de Contato</Label>
            <Input
              id="schema_org_contact_phone"
              value={settings.schema_org_contact_phone || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_contact_phone: e.target.value })}
              placeholder="+55 (XX) XXXX-XXXX"
            />
          </div>
          <div>
            <Label htmlFor="schema_org_contact_email">Email de Contato</Label>
            <Input
              id="schema_org_contact_email"
              value={settings.schema_org_contact_email || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_contact_email: e.target.value })}
              placeholder="contato@seunome.com"
            />
          </div>
          <h4 className="font-semibold mt-4">Endereço</h4>
          <div>
            <Label htmlFor="schema_org_address_street">Rua e Número</Label>
            <Input
              id="schema_org_address_street"
              value={settings.schema_org_address_street || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_address_street: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="schema_org_address_city">Cidade</Label>
            <Input
              id="schema_org_address_city"
              value={settings.schema_org_address_city || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_address_city: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="schema_org_address_state">Estado</Label>
            <Input
              id="schema_org_address_state"
              value={settings.schema_org_address_state || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_address_state: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="schema_org_address_postal_code">CEP</Label>
            <Input
              id="schema_org_address_postal_code"
              value={settings.schema_org_address_postal_code || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_address_postal_code: e.target.value })}
            />
          </div>
          <h4 className="font-semibold mt-4">Redes Sociais (Schema)</h4>
          <div>
            <Label htmlFor="schema_org_social_instagram">Instagram URL</Label>
            <Input
              id="schema_org_social_instagram"
              value={settings.schema_org_social_instagram || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_social_instagram: e.target.value })}
              placeholder="https://instagram.com/seunome"
            />
          </div>
          <div>
            <Label htmlFor="schema_org_social_facebook">Facebook URL</Label>
            <Input
              id="schema_org_social_facebook"
              value={settings.schema_org_social_facebook || ''}
              onChange={(e) => setSettings({ ...settings, schema_org_social_facebook: e.target.value })}
              placeholder="https://facebook.com/seunome"
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