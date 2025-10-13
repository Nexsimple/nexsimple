import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

export const CTAManager = () => {
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
      { key: 'final_cta_title', value: settings.final_cta_title, category: 'cta' },
      { key: 'final_cta_subtitle', value: settings.final_cta_subtitle, category: 'cta' },
      { key: 'final_cta_button_text', value: settings.final_cta_button_text, category: 'cta' },
      { key: 'whatsapp_enabled', value: settings.whatsapp_enabled, category: 'cta' },
      { key: 'whatsapp_number', value: settings.whatsapp_number, category: 'cta' },
      { key: 'whatsapp_message', value: settings.whatsapp_message, category: 'cta' }
    ];

    const { error } = await supabase.from('site_settings').upsert(updates);

    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as configurações.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Configurações de CTA atualizadas.'
      });
      loadSettings();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>CTA Final</CardTitle>
          <CardDescription>Chamada para ação no final da página</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="final_cta_title">Título</Label>
            <Input
              id="final_cta_title"
              value={settings.final_cta_title || ''}
              onChange={(e) => setSettings({ ...settings, final_cta_title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="final_cta_subtitle">Subtítulo</Label>
            <Textarea
              id="final_cta_subtitle"
              value={settings.final_cta_subtitle || ''}
              onChange={(e) => setSettings({ ...settings, final_cta_subtitle: e.target.value })}
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor="final_cta_button_text">Texto do Botão</Label>
            <Input
              id="final_cta_button_text"
              value={settings.final_cta_button_text || ''}
              onChange={(e) => setSettings({ ...settings, final_cta_button_text: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>WhatsApp Flutuante</CardTitle>
          <CardDescription>Botão de WhatsApp fixo na página</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="whatsapp_enabled">Ativar WhatsApp</Label>
            <Switch
              id="whatsapp_enabled"
              checked={settings.whatsapp_enabled || false}
              onCheckedChange={(checked) => setSettings({ ...settings, whatsapp_enabled: checked })}
            />
          </div>
          <div>
            <Label htmlFor="whatsapp_number">Número do WhatsApp</Label>
            <Input
              id="whatsapp_number"
              value={settings.whatsapp_number || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
              placeholder="5511999999999"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Formato: código do país + DDD + número (sem espaços ou símbolos)
            </p>
          </div>
          <div>
            <Label htmlFor="whatsapp_message">Mensagem Padrão</Label>
            <Textarea
              id="whatsapp_message"
              value={settings.whatsapp_message || ''}
              onChange={(e) => setSettings({ ...settings, whatsapp_message: e.target.value })}
              rows={3}
              placeholder="Olá! Gostaria de saber mais sobre..."
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Salvar Configurações
      </Button>
    </div>
  );
};
