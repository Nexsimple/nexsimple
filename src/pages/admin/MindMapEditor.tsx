import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Save, 
  Square, 
  Circle, 
  Diamond, 
  Trash2,
} from "lucide-react";
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
import CustomNode from "@/components/admin/CustomNode";

const nodeTypes = {
  custom: CustomNode,
};

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
      
      const nodesList = Array.isArray(data.nodes) ? data.nodes as unknown as Node[] : [];
      const edgesList = Array.isArray(data.edges) ? data.edges as unknown as Edge[] : [];
      
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

  const handleLabelChange = (nodeId: string, newLabel: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  };

  const handleColorChange = (nodeId: string, newColor: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, color: newColor } }
          : node
      )
    );
  };

  const handleDeleteNode = (nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
  };

  const addNode = (shape: 'default' | 'circle' | 'diamond' = 'default') => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "custom",
      position: { 
        x: 250 + Math.random() * 200, 
        y: 100 + Math.random() * 200 
      },
      data: { 
        label: "Novo Nó",
        color: "#3b82f6",
        shape,
        onLabelChange: handleLabelChange,
        onColorChange: handleColorChange,
        onDelete: handleDeleteNode,
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const clearAll = () => {
    if (confirm("Tem certeza que deseja limpar todo o mapa?")) {
      setNodes([]);
      setEdges([]);
    }
  };

  // Atualizar callbacks nos nós existentes quando carregar
  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          onLabelChange: handleLabelChange,
          onColorChange: handleColorChange,
          onDelete: handleDeleteNode,
        },
      }))
    );
  }, []);

  if (authLoading) {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b p-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/admin/mind-maps")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold text-foreground">{mapTitle}</h1>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90"
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-card border-b p-2 flex gap-2 items-center shadow-sm">
        <div className="flex gap-1 border-r pr-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode('default')}
            title="Adicionar nó retangular"
          >
            <Square className="h-4 w-4 mr-1" />
            Retângulo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode('circle')}
            title="Adicionar nó circular"
          >
            <Circle className="h-4 w-4 mr-1" />
            Círculo
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addNode('diamond')}
            title="Adicionar nó diamante"
          >
            <Diamond className="h-4 w-4 mr-1" />
            Diamante
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={clearAll}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Limpar Tudo
        </Button>

        <div className="ml-auto flex gap-2 text-xs text-muted-foreground items-center bg-muted px-3 py-1 rounded">
          <span>{nodes.length} nós</span>
          <span>•</span>
          <span>{edges.length} conexões</span>
        </div>
      </div>

      {/* React Flow Canvas */}
      <div className="flex-1 bg-muted/30">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          defaultEdgeOptions={{
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
          }}
        >
          <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              return node.data.color || '#3b82f6';
            }}
            className="bg-background border border-border"
          />
        </ReactFlow>
      </div>

      {/* Instruções */}
      <div className="bg-card border-t p-2 text-xs text-muted-foreground flex gap-4">
        <span>💡 <strong>Dica:</strong> Clique duas vezes em um nó para editar o texto</span>
        <span>•</span>
        <span>Arraste nós para posicioná-los</span>
        <span>•</span>
        <span>Conecte nós arrastando das bordas</span>
      </div>
    </div>
  );
};

export default MindMapEditor;
