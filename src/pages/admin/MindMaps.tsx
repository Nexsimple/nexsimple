import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
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

interface MindMap {
  id: string;
  title: string;
  description: string | null;
  nodes: any;
  edges: any;
  thumbnail_url: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

const MindMaps = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [mindMaps, setMindMaps] = useState<MindMap[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadMindMaps();
    }
  }, [isAdmin]);

  const loadMindMaps = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("mind_maps")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      setMindMaps(data || []);
    } catch (error) {
      console.error("Erro ao carregar mapas mentais:", error);
      toast.error("Erro ao carregar mapas mentais");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title) {
      toast.error("Título é obrigatório");
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase.from("mind_maps").insert([
        {
          user_id: user.id,
          title: formData.title,
          description: formData.description || null,
          nodes: [],
          edges: [],
        },
      ]);

      if (error) throw error;

      toast.success("Mapa mental criado com sucesso!");
      setDialogOpen(false);
      setFormData({ title: "", description: "" });
      loadMindMaps();
    } catch (error) {
      console.error("Erro ao criar mapa mental:", error);
      toast.error("Erro ao criar mapa mental");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este mapa mental?")) return;

    try {
      const { error } = await supabase.from("mind_maps").delete().eq("id", id);

      if (error) throw error;
      toast.success("Mapa mental excluído com sucesso!");
      loadMindMaps();
    } catch (error) {
      console.error("Erro ao excluir mapa mental:", error);
      toast.error("Erro ao excluir mapa mental");
    }
  };

  const openEditor = (id: string) => {
    navigate(`/admin/mind-maps/${id}/editor`);
  };

  if (authLoading || isLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Mapas Mentais</h1>
          <p className="text-muted-foreground mt-2">
            Organize ideias e projetos visualmente
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Mapa Mental
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {mindMaps.map((map) => (
          <Card key={map.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">{map.title}</CardTitle>
              {map.description && (
                <p className="text-sm text-muted-foreground mt-2">
                  {map.description}
                </p>
              )}
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <span>
                  {Array.isArray(map.nodes) ? map.nodes.length : 0} nós • {Array.isArray(map.edges) ? map.edges.length : 0} conexões
                </span>
                <span>
                  {new Date(map.updated_at).toLocaleDateString("pt-BR")}
                </span>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openEditor(map.id)}
                  className="flex-1"
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Editar
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(map.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {mindMaps.length === 0 && (
          <Card className="md:col-span-3">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">
                Nenhum mapa mental criado ainda.
              </p>
              <Button onClick={() => setDialogOpen(true)} className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Mapa Mental
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Mapa Mental</DialogTitle>
            <DialogDescription>
              Crie um novo mapa mental para organizar suas ideias
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <Label>Título *</Label>
              <Input
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                placeholder="Nome do mapa mental"
                required
              />
            </div>

            <div>
              <Label>Descrição</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descreva o propósito deste mapa..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setDialogOpen(false);
                  setFormData({ title: "", description: "" });
                }}
              >
                Cancelar
              </Button>
              <Button type="submit">Criar Mapa Mental</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MindMaps;
