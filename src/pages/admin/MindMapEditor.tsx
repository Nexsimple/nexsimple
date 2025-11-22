import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Save, Download } from "lucide-react";
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  BackgroundVariant,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";

const MindMapEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [mapTitle, setMapTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      navigate("/admin/login");
    }
  }, [isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (isAdmin && id) {
      loadMindMap();
    }
  }, [isAdmin, id]);

  const loadMindMap = async () => {
    try {
      const { data, error } = await supabase
        .from("mind_maps")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setMapTitle(data.title);
      
      const nodesList = Array.isArray(data.nodes) ? data.nodes as Node[] : [];
      const edgesList = Array.isArray(data.edges) ? data.edges as Edge[] : [];
      
      setNodes(nodesList);
      setEdges(edgesList);
    } catch (error) {
      console.error("Erro ao carregar mapa mental:", error);
      toast.error("Erro ao carregar mapa mental");
      navigate("/admin/mind-maps");
    }
  };

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from("mind_maps")
        .update({
          nodes: nodes as any,
          edges: edges as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      toast.success("Mapa mental salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar mapa mental:", error);
      toast.error("Erro ao salvar mapa mental");
    } finally {
      setIsSaving(false);
    }
  };

  const addNode = () => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "default",
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: "Novo Nó" },
      style: {
        background: "#3b82f6",
        color: "#fff",
        border: "2px solid #1e40af",
        borderRadius: "8px",
        padding: "10px",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  if (authLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-background border-b p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/mind-maps")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold">{mapTitle}</h1>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={addNode}>
            Adicionar Nó
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background variant={BackgroundVariant.Dots} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default MindMapEditor;
