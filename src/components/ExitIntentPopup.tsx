import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Gift } from 'lucide-react';

export const ExitIntentPopup = () => {
  const settings = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const enabled = settings.exit_popup_enabled === 'true'; // Parse as boolean
  const title = settings.exit_popup_title || 'Não Vá Embora Sem Este Conteúdo Exclusivo!';
  const offer = settings.exit_popup_offer || 'E-book Grátis: O Guia Essencial para Automação Inteligente em Empresas';

  useEffect(() => {
    if (!enabled || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [enabled, hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { error } = await supabase.from('leads').insert({
      name,
      email,
      source: 'exit_popup',
      status: 'new',
      message: `Interesse em: ${offer}`
    });

    if (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Sucesso!",
        description: "Você receberá o material em breve no seu email."
      });
      setIsOpen(false);
    }
  };

  if (!enabled) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Gift className="w-8 h-8 text-primary" />
            <DialogTitle className="text-2xl">{title}</DialogTitle>
          </div>
        </DialogHeader>
        
        <div className="bg-primary/10 p-4 rounded-lg mb-4">
          <p className="font-bold text-lg text-center">{offer}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="email"
            placeholder="Seu melhor email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="w-full" size="lg">
            Quero Receber Grátis!
          </Button>
        </form>

        <p className="text-xs text-center text-muted-foreground">
          Sem spam. Apenas conteúdo de valor para empresários.
        </p>
      </DialogContent>
    </Dialog>
  );
};