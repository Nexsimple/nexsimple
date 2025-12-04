import { memo, useState, useRef, useEffect } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Trash2, Edit2, Check, GripVertical, Image, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', 
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
  '#14b8a6', '#a855f7', '#22c55e', '#eab308', '#dc2626'
];

const CustomNode = memo(({ data, id, selected }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Novo Nó');
  const [description, setDescription] = useState(data.description || '');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (data.onLabelChange) {
      data.onLabelChange(id, label, description);
    }
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  const handleColorChange = (color: string) => {
    if (data.onColorChange) {
      data.onColorChange(id, color);
    }
    setShowColorPicker(false);
  };

  const nodeColor = data.color || '#3b82f6';
  const shape = data.shape || 'default';
  const fontSize = data.fontSize || 'medium';
  const hasDescription = description && description.trim().length > 0;

  const getShapeStyles = () => {
    const baseStyles = {
      backgroundColor: nodeColor,
      borderColor: selected ? '#fff' : nodeColor,
      boxShadow: selected 
        ? `0 0 0 2px ${nodeColor}, 0 10px 30px -10px rgba(0,0,0,0.3)` 
        : '0 4px 20px -5px rgba(0,0,0,0.2)',
    };

    switch (shape) {
      case 'circle':
        return {
          ...baseStyles,
          borderRadius: '50%',
          minWidth: '120px',
          minHeight: '120px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        };
      case 'diamond':
        return {
          ...baseStyles,
          transform: 'rotate(45deg)',
          minWidth: '100px',
          minHeight: '100px',
        };
      case 'hexagon':
        return {
          ...baseStyles,
          clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
          minWidth: '130px',
          minHeight: '100px',
        };
      case 'pill':
        return {
          ...baseStyles,
          borderRadius: '50px',
          minWidth: '150px',
        };
      default:
        return {
          ...baseStyles,
          borderRadius: '12px',
          minWidth: '160px',
        };
    }
  };

  const getFontSize = () => {
    switch (fontSize) {
      case 'small': return 'text-xs';
      case 'large': return 'text-lg';
      default: return 'text-sm';
    }
  };

  const contentStyle = shape === 'diamond' ? { transform: 'rotate(-45deg)' } : {};

  return (
    <div
      className="relative group transition-all duration-200"
      style={getShapeStyles()}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className="!w-3 !h-3 !bg-white !border-2 !border-current opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: nodeColor }}
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        className="!w-3 !h-3 !bg-white !border-2 !border-current opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: nodeColor }}
      />
      
      <div className="p-4" style={contentStyle}>
        {isEditing ? (
          <div className="space-y-2" onClick={(e) => e.stopPropagation()}>
            <Input
              ref={inputRef}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) handleSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              className="h-8 text-sm bg-white/95 text-gray-900 border-0"
              placeholder="Título do nó"
            />
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="text-xs bg-white/95 text-gray-900 border-0 resize-none"
              placeholder="Descrição (opcional)"
              rows={2}
            />
            <div className="flex gap-1">
              <Button
                size="sm"
                onClick={handleSave}
                className="h-7 flex-1 bg-white/90 hover:bg-white text-gray-900"
              >
                <Check className="h-3 w-3 mr-1" />
                Salvar
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setIsEditing(false)}
                className="h-7 bg-white/50 hover:bg-white/70 text-gray-900"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            <div
              className={`text-white font-semibold cursor-pointer ${getFontSize()} break-words max-w-[200px]`}
              onDoubleClick={() => setIsEditing(true)}
            >
              {label}
            </div>
            {hasDescription && (
              <div className="text-white/80 text-xs break-words max-w-[200px] line-clamp-2">
                {description}
              </div>
            )}
          </div>
        )}

        {/* Toolbar - appears on hover */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 bg-gray-900/95 rounded-lg p-1 opacity-0 group-hover:opacity-100 transition-all shadow-xl">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-7 w-7 p-0 hover:bg-white/20 text-white"
            title="Editar (Enter)"
          >
            <Edit2 className="h-3.5 w-3.5" />
          </Button>
          
          <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
            <PopoverTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0 hover:bg-white/20"
                title="Mudar cor"
              >
                <div 
                  className="w-4 h-4 rounded-full border-2 border-white" 
                  style={{ backgroundColor: nodeColor }}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" align="center">
              <div className="grid grid-cols-5 gap-1">
                {COLORS.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorChange(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform hover:scale-110 ${
                      nodeColor === color ? 'border-gray-900 scale-110' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleDelete}
            className="h-7 w-7 p-0 hover:bg-red-500/50 text-white"
            title="Excluir (Delete)"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className="!w-3 !h-3 !bg-white !border-2 !border-current opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: nodeColor }}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className="!w-3 !h-3 !bg-white !border-2 !border-current opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ borderColor: nodeColor }}
      />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
