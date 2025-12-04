import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ArrowRight } from 'lucide-react';
import { Node } from 'reactflow';

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nodes: Node[];
  onSelectNode: (nodeId: string) => void;
}

const SearchDialog = ({ open, onOpenChange, nodes, onSelectNode }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Node[]>([]);

  useEffect(() => {
    if (query.trim()) {
      const filtered = nodes.filter(node => 
        node.data.label?.toLowerCase().includes(query.toLowerCase()) ||
        node.data.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [query, nodes]);

  const handleSelect = (nodeId: string) => {
    onSelectNode(nodeId);
    onOpenChange(false);
    setQuery('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Buscar Nós
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite para buscar..."
            autoFocus
          />

          {query && (
            <div className="max-h-60 overflow-y-auto space-y-1">
              {results.length > 0 ? (
                results.map((node) => (
                  <button
                    key={node.id}
                    onClick={() => handleSelect(node.id)}
                    className="w-full flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
                  >
                    <div>
                      <div className="font-medium text-sm">{node.data.label}</div>
                      {node.data.description && (
                        <div className="text-xs text-muted-foreground line-clamp-1">
                          {node.data.description}
                        </div>
                      )}
                    </div>
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: node.data.color || '#3b82f6' }}
                    />
                  </button>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  Nenhum nó encontrado
                </div>
              )}
            </div>
          )}

          {!query && (
            <div className="text-center text-muted-foreground py-8 text-sm">
              Digite para buscar nós por título ou descrição
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
