import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Save, 
  Maximize,
  Minimize,
  Edit2,
  Check,
  X,
  Loader2,
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
  useReactFlow,
  ReactFlowProvider,
  Panel,
  MarkerType,
  ConnectionMode,
  EdgeTypes,
  getBezierPath,
  getStraightPath,
  getSmoothStepPath,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "@/components/admin/CustomNode";
import MindMapToolbar from "@/components/admin/mindmap/MindMapToolbar";
import SearchDialog from "@/components/admin/mindmap/SearchDialog";
import { useMindMapHistory } from "@/hooks/useMindMapHistory";
import { toPng, toSvg } from 'html-to-image';

const nodeTypes = {
  custom: CustomNode,
};

const MindMapEditorContent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, isLoading: authLoading } = useAdminAuth();
  const [mapTitle, setMapTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [edgeType, setEdgeType] = useState('default');
  const [searchOpen, setSearchOpen] = useState(false);
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView, zoomIn, zoomOut, setCenter, getNodes } = useReactFlow();
  
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const { pushState, undo, redo, canUndo, canRedo, reset } = useMindMapHistory();

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

  // Auto-save functionality
  useEffect(() => {
    if (hasUnsavedChanges && nodes.length > 0) {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
      
      const timer = setTimeout(() => {
        handleSave(true);
      }, 30000); // Auto-save after 30 seconds of inactivity
      
      setAutoSaveTimer(timer);
    }
    
    return () => {
      if (autoSaveTimer) clearTimeout(autoSaveTimer);
    };
  }, [nodes, edges, hasUnsavedChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case 's':
            e.preventDefault();
            handleSave();
            break;
          case 'f':
            e.preventDefault();
            setSearchOpen(true);
            break;
          case 'c':
            handleCopyNodes();
            break;
          case 'v':
            handlePasteNodes();
            break;
        }
      }
      
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Delete is handled by React Flow
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, canUndo, canRedo, copiedNodes]);

  const loadMindMap = async () => {
    try {
      const { data, error } = await supabase
        .from("mind_maps")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      setMapTitle(data.title);
      setTempTitle(data.title);
      
      const nodesList = Array.isArray(data.nodes) ? data.nodes as unknown as Node[] : [];
      const edgesList = Array.isArray(data.edges) ? data.edges as unknown as Edge[] : [];
      
      // Update nodes with callbacks
      const nodesWithCallbacks = nodesList.map(node => ({
        ...node,
        data: {
          ...node.data,
          onLabelChange: handleLabelChange,
          onColorChange: handleColorChange,
          onDelete: handleDeleteNode,
        },
      }));
      
      setNodes(nodesWithCallbacks);
      setEdges(edgesList);
      reset(nodesWithCallbacks, edgesList);
    } catch (error) {
      console.error("Erro ao carregar mapa mental:", error);
      toast.error("Erro ao carregar mapa mental");
      navigate("/admin/mind-maps");
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = {
        ...params,
        type: edgeType,
        animated: true,
        style: { stroke: '#6366f1', strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
      };
      setEdges((eds) => {
        const newEdges = addEdge(newEdge, eds);
        setHasUnsavedChanges(true);
        return newEdges;
      });
    },
    [setEdges, edgeType]
  );

  const handleNodesChange = useCallback((changes: any) => {
    onNodesChange(changes);
    setHasUnsavedChanges(true);
  }, [onNodesChange]);

  const handleEdgesChange = useCallback((changes: any) => {
    onEdgesChange(changes);
    setHasUnsavedChanges(true);
  }, [onEdgesChange]);

  const handleSave = async (isAutoSave = false) => {
    setIsSaving(true);
    try {
      // Clean nodes before saving (remove callback functions)
      const cleanNodes = nodes.map(({ data, ...rest }) => ({
        ...rest,
        data: {
          label: data.label,
          description: data.description,
          color: data.color,
          shape: data.shape,
          fontSize: data.fontSize,
        },
      }));

      const { error } = await supabase
        .from("mind_maps")
        .update({
          title: mapTitle,
          nodes: cleanNodes as any,
          edges: edges as any,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      
      setHasUnsavedChanges(false);
      pushState(nodes, edges);
      
      if (!isAutoSave) {
        toast.success("Mapa mental salvo com sucesso!");
      }
    } catch (error) {
      console.error("Erro ao salvar mapa mental:", error);
      toast.error("Erro ao salvar mapa mental");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLabelChange = useCallback((nodeId: string, newLabel: string, newDescription?: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { 
              ...node, 
              data: { 
                ...node.data, 
                label: newLabel,
                description: newDescription || node.data.description,
              } 
            }
          : node
      )
    );
    setHasUnsavedChanges(true);
  }, [setNodes]);

  const handleColorChange = useCallback((nodeId: string, newColor: string) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, color: newColor } }
          : node
      )
    );
    setHasUnsavedChanges(true);
  }, [setNodes]);

  const handleDeleteNode = useCallback((nodeId: string) => {
    setNodes((nds) => nds.filter((node) => node.id !== nodeId));
    setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    setHasUnsavedChanges(true);
  }, [setNodes, setEdges]);

  const addNode = (shape: string = 'default') => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: "custom",
      position: { 
        x: 250 + Math.random() * 300, 
        y: 100 + Math.random() * 300 
      },
      data: { 
        label: "Novo Nó",
        description: "",
        color: "#3b82f6",
        shape,
        fontSize: 'medium',
        onLabelChange: handleLabelChange,
        onColorChange: handleColorChange,
        onDelete: handleDeleteNode,
      },
    };
    setNodes((nds) => [...nds, newNode]);
    setHasUnsavedChanges(true);
  };

  const clearAll = () => {
    if (confirm("Tem certeza que deseja limpar todo o mapa? Esta ação não pode ser desfeita.")) {
      pushState(nodes, edges);
      setNodes([]);
      setEdges([]);
      setHasUnsavedChanges(true);
    }
  };

  const handleUndo = () => {
    const state = undo();
    if (state) {
      const nodesWithCallbacks = state.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onLabelChange: handleLabelChange,
          onColorChange: handleColorChange,
          onDelete: handleDeleteNode,
        },
      }));
      setNodes(nodesWithCallbacks);
      setEdges(state.edges);
      setHasUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    const state = redo();
    if (state) {
      const nodesWithCallbacks = state.nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          onLabelChange: handleLabelChange,
          onColorChange: handleColorChange,
          onDelete: handleDeleteNode,
        },
      }));
      setNodes(nodesWithCallbacks);
      setEdges(state.edges);
      setHasUnsavedChanges(true);
    }
  };

  const handleCopyNodes = () => {
    const selectedNodes = nodes.filter(node => node.selected);
    if (selectedNodes.length > 0) {
      setCopiedNodes(selectedNodes);
      toast.success(`${selectedNodes.length} nó(s) copiado(s)`);
    }
  };

  const handlePasteNodes = () => {
    if (copiedNodes.length === 0) return;

    const newNodes = copiedNodes.map(node => ({
      ...node,
      id: `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      position: {
        x: node.position.x + 50,
        y: node.position.y + 50,
      },
      selected: false,
      data: {
        ...node.data,
        onLabelChange: handleLabelChange,
        onColorChange: handleColorChange,
        onDelete: handleDeleteNode,
      },
    }));

    setNodes((nds) => [...nds, ...newNodes]);
    setHasUnsavedChanges(true);
    toast.success(`${newNodes.length} nó(s) colado(s)`);
  };

  const handleExportPNG = async () => {
    if (!reactFlowWrapper.current) return;
    
    try {
      const viewport = reactFlowWrapper.current.querySelector('.react-flow__viewport') as HTMLElement;
      if (!viewport) return;

      const dataUrl = await toPng(viewport, {
        backgroundColor: '#1a1a2e',
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `${mapTitle || 'mindmap'}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Imagem PNG exportada!');
    } catch (error) {
      console.error('Erro ao exportar PNG:', error);
      toast.error('Erro ao exportar imagem');
    }
  };

  const handleExportSVG = async () => {
    if (!reactFlowWrapper.current) return;
    
    try {
      const viewport = reactFlowWrapper.current.querySelector('.react-flow__viewport') as HTMLElement;
      if (!viewport) return;

      const dataUrl = await toSvg(viewport, {
        backgroundColor: '#1a1a2e',
      });

      const link = document.createElement('a');
      link.download = `${mapTitle || 'mindmap'}.svg`;
      link.href = dataUrl;
      link.click();
      
      toast.success('SVG exportado!');
    } catch (error) {
      console.error('Erro ao exportar SVG:', error);
      toast.error('Erro ao exportar SVG');
    }
  };

  const handleExportJSON = () => {
    const cleanNodes = nodes.map(({ data, ...rest }) => ({
      ...rest,
      data: {
        label: data.label,
        description: data.description,
        color: data.color,
        shape: data.shape,
      },
    }));

    const exportData = {
      title: mapTitle,
      nodes: cleanNodes,
      edges,
      exportedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `${mapTitle || 'mindmap'}.json`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success('JSON exportado!');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleSelectNode = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    if (node) {
      setCenter(node.position.x + 75, node.position.y + 50, { zoom: 1.5, duration: 500 });
      setNodes((nds) => nds.map(n => ({ ...n, selected: n.id === nodeId })));
    }
  };

  const handleTitleSave = async () => {
    if (tempTitle.trim()) {
      setMapTitle(tempTitle);
      setIsEditingTitle(false);
      
      try {
        await supabase
          .from("mind_maps")
          .update({ title: tempTitle })
          .eq("id", id);
      } catch (error) {
        console.error("Erro ao salvar título:", error);
      }
    }
  };

  // Update nodes with callbacks when handlers change
  useEffect(() => {
    if (nodes.length > 0) {
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
    }
  }, [handleLabelChange, handleColorChange, handleDeleteNode]);

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-2 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/mind-maps")}
            className="h-8"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Voltar
          </Button>
          
          <div className="h-6 w-px bg-border" />
          
          {isEditingTitle ? (
            <div className="flex items-center gap-2">
              <Input
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                className="h-8 w-64"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleTitleSave();
                  if (e.key === 'Escape') setIsEditingTitle(false);
                }}
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleTitleSave} className="h-8 w-8 p-0">
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setIsEditingTitle(false)} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div 
              className="flex items-center gap-2 cursor-pointer hover:bg-muted px-2 py-1 rounded"
              onClick={() => {
                setTempTitle(mapTitle);
                setIsEditingTitle(true);
              }}
            >
              <h1 className="text-lg font-semibold text-foreground">{mapTitle}</h1>
              <Edit2 className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          )}
          
          {hasUnsavedChanges && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">
              Alterações não salvas
            </span>
          )}
        </div>

        <div className="flex gap-2 items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleFullscreen}
            className="h-8 w-8 p-0"
          >
            {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </Button>
          
          <Button
            size="sm"
            onClick={() => handleSave()}
            disabled={isSaving}
            className="h-8"
          >
            {isSaving ? (
              <Loader2 className="mr-1 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-1 h-4 w-4" />
            )}
            {isSaving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <MindMapToolbar
        onAddNode={addNode}
        onClearAll={clearAll}
        onUndo={handleUndo}
        onRedo={handleRedo}
        canUndo={canUndo}
        canRedo={canRedo}
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
        onExportJSON={handleExportJSON}
        onZoomIn={() => zoomIn()}
        onZoomOut={() => zoomOut()}
        onFitView={() => fitView({ padding: 0.2, duration: 500 })}
        onToggleGrid={() => setShowGrid(!showGrid)}
        showGrid={showGrid}
        edgeType={edgeType}
        onEdgeTypeChange={setEdgeType}
        onCopyNodes={handleCopyNodes}
        onPasteNodes={handlePasteNodes}
        canPaste={copiedNodes.length > 0}
        nodeCount={nodes.length}
        edgeCount={edges.length}
        onOpenSearch={() => setSearchOpen(true)}
      />

      {/* React Flow Canvas */}
      <div className="flex-1" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          connectionMode={ConnectionMode.Loose}
          defaultEdgeOptions={{
            type: edgeType,
            animated: true,
            style: { stroke: '#6366f1', strokeWidth: 2 },
            markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
          }}
          deleteKeyCode={['Backspace', 'Delete']}
          multiSelectionKeyCode={['Shift']}
          selectionOnDrag
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          minZoom={0.1}
          maxZoom={4}
        >
          {showGrid && (
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1.5}
              color="hsl(var(--muted-foreground) / 0.2)"
            />
          )}
          <Controls 
            showInteractive={false}
            className="!bg-card !border-border !shadow-lg"
          />
          <MiniMap
            nodeColor={(node) => node.data.color || '#3b82f6'}
            className="!bg-card !border !border-border !rounded-lg"
            maskColor="rgba(0, 0, 0, 0.5)"
          />
          
          <Panel position="bottom-center" className="!mb-4">
            <div className="bg-card/90 backdrop-blur-sm border px-4 py-2 rounded-lg shadow-lg text-xs text-muted-foreground flex gap-4">
              <span>🖱️ <strong>Duplo clique</strong> para editar</span>
              <span>•</span>
              <span><strong>Arraste</strong> das bordas para conectar</span>
              <span>•</span>
              <span><strong>Shift + Arrastar</strong> para selecionar múltiplos</span>
              <span>•</span>
              <span><strong>Ctrl+S</strong> para salvar</span>
            </div>
          </Panel>
        </ReactFlow>
      </div>

      {/* Search Dialog */}
      <SearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        nodes={nodes}
        onSelectNode={handleSelectNode}
      />
    </div>
  );
};

const MindMapEditor = () => (
  <ReactFlowProvider>
    <MindMapEditorContent />
  </ReactFlowProvider>
);

export default MindMapEditor;
