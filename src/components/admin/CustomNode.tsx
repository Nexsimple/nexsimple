import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Trash2, Edit2, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CustomNode = memo(({ data, id }: NodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [label, setLabel] = useState(data.label || 'Novo Nó');

  const handleSave = () => {
    if (data.onLabelChange) {
      data.onLabelChange(id, label);
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (data.onDelete) {
      data.onDelete(id);
    }
  };

  const handleColorChange = (color: string) => {
    if (data.onColorChange) {
      data.onColorChange(id, color);
    }
  };

  const nodeColor = data.color || '#3b82f6';

  return (
    <div
      className="px-4 py-3 rounded-lg border-2 shadow-lg min-w-[150px] max-w-[250px]"
      style={{
        backgroundColor: nodeColor,
        borderColor: nodeColor,
        filter: 'brightness(0.95)',
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="space-y-2">
        {isEditing ? (
          <div className="flex gap-2 items-center">
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') setIsEditing(false);
              }}
              className="h-8 text-sm bg-white/90"
              autoFocus
            />
            <Button
              size="sm"
              variant="ghost"
              onClick={handleSave}
              className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            >
              <Check className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="text-white font-medium cursor-pointer"
            onDoubleClick={() => setIsEditing(true)}
          >
            {label}
          </div>
        )}

        <div className="flex gap-1 justify-between items-center">
          <div className="flex gap-1">
            {['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'].map((color) => (
              <button
                key={color}
                onClick={() => handleColorChange(color)}
                className="w-5 h-5 rounded-full border-2 border-white/50 hover:border-white transition-all"
                style={{ backgroundColor: color }}
                title={`Mudar para ${color}`}
              />
            ))}
          </div>
          
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="h-6 w-6 p-0 bg-white/20 hover:bg-white/30"
            >
              <Edit2 className="h-3 w-3 text-white" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              className="h-6 w-6 p-0 bg-white/20 hover:bg-red-500/50"
            >
              <Trash2 className="h-3 w-3 text-white" />
            </Button>
          </div>
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
