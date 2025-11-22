import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Copy, ExternalLink, ArrowLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Affiliate {
  id: string;
  affiliate_code: string;
  name: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}

const LinkGenerator = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [selectedAffiliate, setSelectedAffiliate] = useState<string>("");
  const [baseUrl, setBaseUrl] = useState("https://nexsimple.com");
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadAffiliates();
    }
  }, [isAdmin]);

  const loadAffiliates = async () => {
    try {
      const { data, error } = await supabase
        .from("affiliates")
        .select("id, affiliate_code, name, utm_source, utm_medium, utm_campaign")
        .eq("status", "active")
        .order("name");

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error) {
      console.error("Erro ao carregar afiliados:", error);
      toast.error("Erro ao carregar afiliados");
    }
  };

  const handleAffiliateSelect = (affiliateId: string) => {
    setSelectedAffiliate(affiliateId);
    const affiliate = affiliates.find((a) => a.id === affiliateId);
    if (affiliate) {
      setUtmSource(affiliate.utm_source || "");
      setUtmMedium(affiliate.utm_medium || "");
      setUtmCampaign(affiliate.utm_campaign || affiliate.name);
    }
  };

  const generateLink = () => {
    const affiliate = affiliates.find((a) => a.id === selectedAffiliate);
    if (!affiliate) {
      toast.error("Selecione um afiliado");
      return;
    }

    const params = new URLSearchParams();
    
    if (utmSource) params.append("utm_source", utmSource);
    if (utmMedium) params.append("utm_medium", utmMedium);
    if (utmCampaign) params.append("utm_campaign", utmCampaign);
    params.append("utm_id", affiliate.affiliate_code);
    if (utmTerm) params.append("utm_term", utmTerm);
    if (utmContent) params.append("utm_content", utmContent);

    const link = `${baseUrl}?${params.toString()}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    toast.success("Link copiado para a área de transferência!");
  };

  if (authLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/affiliates")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gerador de Links UTM</h1>
          <p className="text-muted-foreground mt-2">
            Crie links de rastreamento para afiliados
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Configurar Link</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Selecionar Afiliado *</Label>
              <Select value={selectedAffiliate} onValueChange={handleAffiliateSelect}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha um afiliado" />
                </SelectTrigger>
                <SelectContent>
                  {affiliates.map((affiliate) => (
                    <SelectItem key={affiliate.id} value={affiliate.id}>
                      {affiliate.name} ({affiliate.affiliate_code})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>URL Base *</Label>
              <Input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                placeholder="https://nexsimple.com"
              />
              <p className="text-xs text-muted-foreground mt-1">
                URL do seu site sem parâmetros
              </p>
            </div>

            <div>
              <Label>Campaign Source (utm_source)</Label>
              <Input
                value={utmSource}
                onChange={(e) => setUtmSource(e.target.value)}
                placeholder="Ex: instagram, google, facebook"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Origem do tráfego
              </p>
            </div>

            <div>
              <Label>Campaign Medium (utm_medium)</Label>
              <Input
                value={utmMedium}
                onChange={(e) => setUtmMedium(e.target.value)}
                placeholder="Ex: whatsapp, email, banner"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Tipo de mídia
              </p>
            </div>

            <div>
              <Label>Campaign Name (utm_campaign)</Label>
              <Input
                value={utmCampaign}
                onChange={(e) => setUtmCampaign(e.target.value)}
                placeholder="Ex: promo-verao-2024"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Nome da campanha
              </p>
            </div>

            <div>
              <Label>Campaign Term (utm_term) - Opcional</Label>
              <Input
                value={utmTerm}
                onChange={(e) => setUtmTerm(e.target.value)}
                placeholder="Ex: chatbot+ia"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Palavras-chave pagas
              </p>
            </div>

            <div>
              <Label>Campaign Content (utm_content) - Opcional</Label>
              <Input
                value={utmContent}
                onChange={(e) => setUtmContent(e.target.value)}
                placeholder="Ex: banner-topo"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Identificar variações de anúncio
              </p>
            </div>

            <Button onClick={generateLink} className="w-full">
              Gerar Link
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Link Gerado</CardTitle>
          </CardHeader>
          <CardContent>
            {generatedLink ? (
              <div className="space-y-4">
                <div className="bg-muted p-4 rounded-lg break-all font-mono text-sm">
                  {generatedLink}
                </div>

                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} className="flex-1">
                    <Copy className="mr-2 h-4 w-4" />
                    Copiar Link
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(generatedLink, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-semibold mb-3">Parâmetros UTM:</h3>
                  <div className="space-y-2 text-sm">
                    {utmSource && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_source:</span>
                        <span className="font-medium">{utmSource}</span>
                      </div>
                    )}
                    {utmMedium && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_medium:</span>
                        <span className="font-medium">{utmMedium}</span>
                      </div>
                    )}
                    {utmCampaign && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_campaign:</span>
                        <span className="font-medium">{utmCampaign}</span>
                      </div>
                    )}
                    {selectedAffiliate && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_id:</span>
                        <span className="font-medium font-mono">
                          {affiliates.find((a) => a.id === selectedAffiliate)?.affiliate_code}
                        </span>
                      </div>
                    )}
                    {utmTerm && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_term:</span>
                        <span className="font-medium">{utmTerm}</span>
                      </div>
                    )}
                    {utmContent && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">utm_content:</span>
                        <span className="font-medium">{utmContent}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>Configure os parâmetros e clique em "Gerar Link"</p>
                <p className="text-sm mt-2">
                  O link aparecerá aqui com todos os parâmetros UTM
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LinkGenerator;
