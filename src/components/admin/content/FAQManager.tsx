import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  order_index: number;
}

export const FAQManager = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
    order_index: 0
  });

  useEffect(() => {
    loadFAQs();
  }, []);

  const loadFAQs = async () => {
    const { data } = await supabase
      .from('faqs')
      .select('*')
      .order('order_index');
    if (data) setFaqs(data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      const { error } = await supabase
        .from('faqs')
        .update(formData)
        .eq('id', editingId);
      
      if (!error) {
        toast({ title: 'FAQ atualizada!' });
      }
    } else {
      const { error } = await supabase
        .from('faqs')
        .insert({ ...formData, active: true });
      
      if (!error) {
        toast({ title: 'FAQ criada!' });
      }
    }

    setIsOpen(false);
    resetForm();
    loadFAQs();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir esta FAQ?')) {
      await supabase.from('faqs').delete().eq('id', id);
      toast({ title: 'FAQ excluída!' });
      loadFAQs();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('faqs').update({ active }).eq('id', id);
    loadFAQs();
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
      order_index: 0
    });
    setEditingId(null);
  };

  const startEdit = (faq: FAQ) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      order_index: faq.order_index
    });
    setEditingId(faq.id);
    setIsOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Perguntas Frequentes</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nova FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar' : 'Nova'} FAQ</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Pergunta</Label>
                <Input
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                />
              </div>
              <div>
                <Label>Resposta</Label>
                <Textarea
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Ordem</Label>
                <Input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) })}
                />
              </div>
              <Button onClick={handleSubmit} className="w-full">Salvar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Pergunta</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {faqs.map((faq) => (
              <TableRow key={faq.id}>
                <TableCell className="max-w-md truncate">{faq.question}</TableCell>
                <TableCell>
                  <Switch
                    checked={faq.active}
                    onCheckedChange={(checked) => toggleActive(faq.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(faq)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
