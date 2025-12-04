import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Square,
  Circle,
  Diamond,
  Hexagon,
  Pill,
  Trash2,
  Undo2,
  Redo2,
  Download,
  Image,
  FileJson,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid3X3,
  Link2,
  Unlink,
  Copy,
  Clipboard,
  Search,
  ChevronDown,
} from 'lucide-react';

interface MindMapToolbarProps {
  onAddNode: (shape: string) => void;
  onClearAll: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onExportPNG: () => void;
  onExportSVG: () => void;
  onExportJSON: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onFitView: () => void;
  onToggleGrid: () => void;
  showGrid: boolean;
  edgeType: string;
  onEdgeTypeChange: (type: string) => void;
  onCopyNodes: () => void;
  onPasteNodes: () => void;
  canPaste: boolean;
  nodeCount: number;
  edgeCount: number;
  onOpenSearch: () => void;
}

const ToolbarButton = ({ 
  onClick, 
  disabled, 
  title, 
  children, 
  variant = 'ghost',
  className = ''
}: {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  variant?: 'ghost' | 'outline' | 'default';
  className?: string;
}) => (
  <TooltipProvider delayDuration={300}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          onClick={onClick}
          disabled={disabled}
          className={`h-8 w-8 p-0 ${className}`}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p className="text-xs">{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const MindMapToolbar = ({
  onAddNode,
  onClearAll,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onExportPNG,
  onExportSVG,
  onExportJSON,
  onZoomIn,
  onZoomOut,
  onFitView,
  onToggleGrid,
  showGrid,
  edgeType,
  onEdgeTypeChange,
  onCopyNodes,
  onPasteNodes,
  canPaste,
  nodeCount,
  edgeCount,
  onOpenSearch,
}: MindMapToolbarProps) => {
  return (
    <div className="bg-card border-b p-2 flex gap-1 items-center flex-wrap">
      {/* Add Nodes */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Square className="h-4 w-4" />
            Adicionar
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onAddNode('default')}>
            <Square className="h-4 w-4 mr-2" />
            Retângulo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('pill')}>
            <Pill className="h-4 w-4 mr-2" />
            Pílula
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('circle')}>
            <Circle className="h-4 w-4 mr-2" />
            Círculo
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('diamond')}>
            <Diamond className="h-4 w-4 mr-2" />
            Diamante
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onAddNode('hexagon')}>
            <Hexagon className="h-4 w-4 mr-2" />
            Hexágono
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Undo/Redo */}
      <ToolbarButton onClick={onUndo} disabled={!canUndo} title="Desfazer (Ctrl+Z)">
        <Undo2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={onRedo} disabled={!canRedo} title="Refazer (Ctrl+Y)">
        <Redo2 className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Copy/Paste */}
      <ToolbarButton onClick={onCopyNodes} title="Copiar (Ctrl+C)">
        <Copy className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={onPasteNodes} disabled={!canPaste} title="Colar (Ctrl+V)">
        <Clipboard className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Zoom Controls */}
      <ToolbarButton onClick={onZoomOut} title="Diminuir Zoom">
        <ZoomOut className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={onZoomIn} title="Aumentar Zoom">
        <ZoomIn className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton onClick={onFitView} title="Ajustar à Tela">
        <Maximize2 className="h-4 w-4" />
      </ToolbarButton>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Grid Toggle */}
      <ToolbarButton 
        onClick={onToggleGrid} 
        title={showGrid ? "Ocultar Grade" : "Mostrar Grade"}
        className={showGrid ? 'bg-accent' : ''}
      >
        <Grid3X3 className="h-4 w-4" />
      </ToolbarButton>

      {/* Edge Type */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Link2 className="h-4 w-4" />
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => onEdgeTypeChange('default')}>
            Bezier (Curvo)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdgeTypeChange('straight')}>
            Reto
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdgeTypeChange('step')}>
            Degrau
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onEdgeTypeChange('smoothstep')}>
            Degrau Suave
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="w-px h-6 bg-border mx-1" />

      {/* Search */}
      <ToolbarButton onClick={onOpenSearch} title="Buscar Nós (Ctrl+F)">
        <Search className="h-4 w-4" />
      </ToolbarButton>

      {/* Export */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 gap-1">
            <Download className="h-4 w-4" />
            Exportar
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={onExportPNG}>
            <Image className="h-4 w-4 mr-2" />
            PNG (Imagem)
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onExportSVG}>
            <FileJson className="h-4 w-4 mr-2" />
            SVG (Vetorial)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onExportJSON}>
            <FileJson className="h-4 w-4 mr-2" />
            JSON (Dados)
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Clear All */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onClearAll}
        className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4 mr-1" />
        Limpar
      </Button>

      {/* Stats */}
      <div className="ml-auto flex gap-2 text-xs text-muted-foreground items-center bg-muted px-3 py-1.5 rounded-md">
        <span className="font-medium">{nodeCount}</span>
        <span>nós</span>
        <span className="text-border">•</span>
        <span className="font-medium">{edgeCount}</span>
        <span>conexões</span>
      </div>
    </div>
  );
};

export default MindMapToolbar;
