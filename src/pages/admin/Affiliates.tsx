import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Link2, BarChart3 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  email: string | null;
  phone: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  status: string;
  commission_rate: number | null;
  notes: string | null;
  created_at: string;
}

const Affiliates = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
  const [formData, setFormData] = useState({
    affiliate_code: "",
    name: "",
    email: "",
    phone: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    status: "active",
    commission_rate: "",
    notes: "",
  });

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
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setAffiliates(data || []);
    } catch (error) {
      console.error("Erro ao carregar afiliados:", error);
      toast.error("Erro ao carregar afiliados");
    } finally {
      setIsLoading(false);
    }
  };

  const generateAffiliateCode = () => {
    const code = `AFF${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    setFormData(prev => ({ ...prev, affiliate_code: code }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.affiliate_code || !formData.name) {
      toast.error("Código e nome são obrigatórios");
      return;
    }

    try {
      const affiliateData = {
        affiliate_code: formData.affiliate_code,
        name: formData.name,
        email: formData.email || null,
        phone: formData.phone || null,
        utm_source: formData.utm_source || null,
        utm_medium: formData.utm_medium || null,
        utm_campaign: formData.utm_campaign || null,
        status: formData.status,
        commission_rate: formData.commission_rate ? parseFloat(formData.commission_rate) : null,
        notes: formData.notes || null,
      };

      if (editingAffiliate) {
        const { error } = await supabase
          .from("affiliates")
          .update(affiliateData)
          .eq("id", editingAffiliate.id);

        if (error) throw error;
        toast.success("Afiliado atualizado com sucesso!");
      } else {
        const { error } = await supabase
          .from("affiliates")
          .insert([affiliateData]);

        if (error) throw error;
        toast.success("Afiliado criado com sucesso!");
      }

      setDialogOpen(false);
      resetForm();
      loadAffiliates();
    } catch (error: any) {
      console.error("Erro ao salvar afiliado:", error);
      toast.error(error.message || "Erro ao salvar afiliado");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este afiliado?")) return;

    try {
      const { error } = await supabase
        .from("affiliates")
        .delete()
        .eq("id", id);

      if (error) throw error;
      toast.success("Afiliado excluído com sucesso!");
      loadAffiliates();
    } catch (error) {
      console.error("Erro ao excluir afiliado:", error);
      toast.error("Erro ao excluir afiliado");
    }
  };

  const startEdit = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate);
    setFormData({
      affiliate_code: affiliate.affiliate_code,
      name: affiliate.name,
      email: affiliate.email || "",
      phone: affiliate.phone || "",
      utm_source: affiliate.utm_source || "",
      utm_medium: affiliate.utm_medium || "",
      utm_campaign: affiliate.utm_campaign || "",
      status: affiliate.status,
      commission_rate: affiliate.commission_rate?.toString() || "",
      notes: affiliate.notes || "",
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingAffiliate(null);
    setFormData({
      affiliate_code: "",
      name: "",
      email: "",
      phone: "",
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      status: "active",
      commission_rate: "",
      notes: "",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500 border-green-500/20";
      case "inactive":
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
      case "suspended":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "suspended":
        return "Suspenso";
      default:
        return status;
    }
  };

  if (authLoading || isLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Afiliados</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie afiliados e rastreie conversões
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate("/admin/affiliates/link-generator")}
            variant="outline"
          >
            <Link2 className="mr-2 h-4 w-4" />
            Gerador de Links
          </Button>
          <Button
            onClick={() => navigate("/admin/affiliates/analytics")}
            variant="outline"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </Button>
          <Button onClick={() => {
            resetForm();
            generateAffiliateCode();
            setDialogOpen(true);
          }}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Afiliado
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {affiliates.map((affiliate) => (
          <Card key={affiliate.id}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{affiliate.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Código: <span className="font-mono font-semibold">{affiliate.affiliate_code}</span>
                  </p>
                </div>
                <Badge className={getStatusColor(affiliate.status)}>
                  {getStatusLabel(affiliate.status)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {affiliate.email && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{affiliate.email}</p>
                  </div>
                )}
                {affiliate.phone && (
                  <div>
                    <p className="text-sm text-muted-foreground">Telefone</p>
                    <p className="font-medium">{affiliate.phone}</p>
                  </div>
                )}
                {affiliate.commission_rate && (
                  <div>
                    <p className="text-sm text-muted-foreground">Comissão</p>
                    <p className="font-medium">{affiliate.commission_rate}%</p>
                  </div>
                )}
              </div>

              {(affiliate.utm_source || affiliate.utm_medium || affiliate.utm_campaign) && (
                <div className="bg-muted/50 p-3 rounded-lg mb-4">
                  <p className="text-sm font-medium mb-2">Parâmetros UTM:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                    {affiliate.utm_source && <p><span className="text-muted-foreground">Source:</span> {affiliate.utm_source}</p>}
                    {affiliate.utm_medium && <p><span className="text-muted-foreground">Medium:</span> {affiliate.utm_medium}</p>}
                    {affiliate.utm_campaign && <p><span className="text-muted-foreground">Campaign:</span> {affiliate.utm_campaign}</p>}
                  </div>
                </div>
              )}

              {affiliate.notes && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Observações</p>
                  <p className="text-sm">{affiliate.notes}</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(affiliate)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(affiliate.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Excluir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {affiliates.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Nenhum afiliado cadastrado ainda.
              </p>
              <Button
                onClick={() => {
                  resetForm();
                  generateAffiliateCode();
                  setDialogOpen(true);
                }}
                className="mt-4"
              >
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Afiliado
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingAffiliate ? "Editar Afiliado" : "Novo Afiliado"}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do afiliado para rastreamento
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Código do Afiliado *</Label>
                <div className="flex gap-2">
                  <Input
                    value={formData.affiliate_code}
                    onChange={(e) =>
                      setFormData({ ...formData, affiliate_code: e.target.value })
                    }
                    placeholder="AFF001"
                    required
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={generateAffiliateCode}
                  >
                    Gerar
                  </Button>
                </div>
              </div>

              <div>
                <Label>Nome *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome do afiliado"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@exemplo.com"
                />
              </div>

              <div>
                <Label>Telefone</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>UTM Source</Label>
                <Input
                  value={formData.utm_source}
                  onChange={(e) =>
                    setFormData({ ...formData, utm_source: e.target.value })
                  }
                  placeholder="Ex: instagram"
                />
              </div>

              <div>
                <Label>UTM Medium</Label>
                <Input
                  value={formData.utm_medium}
                  onChange={(e) =>
                    setFormData({ ...formData, utm_medium: e.target.value })
                  }
                  placeholder="Ex: whatsapp"
                />
              </div>

              <div>
                <Label>UTM Campaign</Label>
                <Input
                  value={formData.utm_campaign}
                  onChange={(e) =>
                    setFormData({ ...formData, utm_campaign: e.target.value })
                  }
                  placeholder="Ex: promo-verao"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                    <SelectItem value="suspended">Suspenso</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Taxa de Comissão (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.commission_rate}
                  onChange={(e) =>
                    setFormData({ ...formData, commission_rate: e.target.value })
                  }
                  placeholder="10.00"
                />
              </div>
            </div>

            <div>
              <Label>Observações</Label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Notas adicionais sobre o afiliado..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {editingAffiliate ? "Atualizar" : "Criar"} Afiliado
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Affiliates;
