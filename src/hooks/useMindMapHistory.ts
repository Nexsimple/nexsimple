import { useState, useCallback } from 'react';
import { Node, Edge } from 'reactflow';

interface HistoryState {
  nodes: Node[];
  edges: Edge[];
}

const MAX_HISTORY = 50;

export const useMindMapHistory = (initialNodes: Node[] = [], initialEdges: Edge[] = []) => {
  const [history, setHistory] = useState<HistoryState[]>([{ nodes: initialNodes, edges: initialEdges }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const pushState = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory((prev) => {
      // Remove any states after current index (for new branch after undo)
      const newHistory = prev.slice(0, currentIndex + 1);
      
      // Add new state
      newHistory.push({ nodes: [...nodes], edges: [...edges] });
      
      // Keep only last MAX_HISTORY states
      if (newHistory.length > MAX_HISTORY) {
        newHistory.shift();
        return newHistory;
      }
      
      return newHistory;
    });
    
    setCurrentIndex((prev) => Math.min(prev + 1, MAX_HISTORY - 1));
  }, [currentIndex]);

  const undo = useCallback((): HistoryState | null => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      return history[newIndex];
    }
    return null;
  }, [currentIndex, history]);

  const redo = useCallback((): HistoryState | null => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      return history[newIndex];
    }
    return null;
  }, [currentIndex, history]);

  const reset = useCallback((nodes: Node[], edges: Edge[]) => {
    setHistory([{ nodes, edges }]);
    setCurrentIndex(0);
  }, []);

  return {
    pushState,
    undo,
    redo,
    reset,
    canUndo: currentIndex > 0,
    canRedo: currentIndex < history.length - 1,
  };
};
