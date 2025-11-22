import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ContactForm = () => {
  const { getSetting } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.phone) {
      toast.error("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Por favor, insira um e-mail válido");
      return;
    }

    setIsSubmitting(true);

    try {
      // Capturar UTM params do localStorage
      const getUTMParams = () => {
        try {
          const stored = localStorage.getItem('utm_params');
          return stored ? JSON.parse(stored) : {};
        } catch {
          return {};
        }
      };

      const utmParams = getUTMParams();
      
      // Buscar affiliate_id se utm_id estiver presente
      let affiliateId = null;
      if (utmParams.utm_id) {
        const { data: affiliate } = await supabase
          .from('affiliates')
          .select('id')
          .eq('affiliate_code', utmParams.utm_id)
          .single();
        
        if (affiliate) {
          affiliateId = affiliate.id;
        }
      }

      // Salvar no banco de dados com UTM params
      const { error: dbError } = await supabase
        .from('leads')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          source: 'website',
          utm_source: utmParams.utm_source,
          utm_medium: utmParams.utm_medium,
          utm_campaign: utmParams.utm_campaign,
          utm_id: utmParams.utm_id,
          affiliate_id: affiliateId,
        }]);

      if (dbError) throw dbError;

      // Exibir sucesso para o usuário imediatamente
      toast.success("✅ Obrigado! Um especialista da Nexsimple entrará em contato em breve.");
      
      const submittedData = { ...formData }; // Salva os dados para usar nas ações secundárias
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        message: "",
      });

      // Executar ações secundárias (rastreamento, webhooks) silenciosamente
      try {
        const facebookPixelId = getSetting('facebook_pixel_id', '');
        if (facebookPixelId && typeof window !== 'undefined' && (window as any).fbq) {
          (window as any).fbq('track', 'Lead', {
            content_name: 'Contact Form',
            content_category: 'Lead Generation',
            value: submittedData.company || submittedData.name,
            currency: 'BRL'
          });
        }

        const googleAdsConversionId = getSetting('google_ads_conversion_id', '');
        const googleAdsConversionLabel = getSetting('google_ads_conversion_label', '');
        if (googleAdsConversionId && googleAdsConversionLabel && typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            'send_to': `${googleAdsConversionId}/${googleAdsConversionLabel}`,
            'value': 1.0,
            'currency': 'BRL'
          });
        }

        const webhookUrl = getSetting('webhook_url', '');
        if (webhookUrl) {
          fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(submittedData),
          }).catch(webhookError => {
            console.error("Erro ao enviar para o webhook:", webhookError);
          });
        }
      } catch (trackingError) {
        console.error("Erro nas ações de rastreamento pós-envio:", trackingError);
      }

    } catch (error) {
      toast.error("❌ Algo deu errado. Tente novamente em instantes.");
      console.error("Erro ao salvar lead no banco de dados:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">
              {getSetting('contact_form_title', 'Agende Sua Análise Gratuita com Nossos Especialistas')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {getSetting('contact_form_subtitle', 'Preencha o formulário e descubra como a Nexsimple pode impulsionar a eficiência e o crescimento da sua empresa.')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-2xl shadow-xl border-2 border-border">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base font-semibold">
                Nome <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Seu nome completo"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-base font-semibold">
                Empresa
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                placeholder="Nome da sua empresa"
                value={formData.company}
                onChange={handleChange}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-semibold">
                E-mail <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold">
                Telefone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
                required
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-base font-semibold">
                Mensagem
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Conte-nos sobre seu projeto ou dúvida..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="text-base resize-none"
              />
            </div>

            <Button 
              type="submit" 
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg h-14"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Enviar Mensagem
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;