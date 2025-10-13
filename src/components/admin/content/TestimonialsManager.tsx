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

interface Testimonial {
  id: string;
  client_name: string;
  client_company: string;
  client_role: string;
  testimonial: string;
  rating: number;
  active: boolean;
  order_index: number;
}

export const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_company: '',
    client_role: '',
    testimonial: '',
    rating: 5,
    order_index: 0
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .order('order_index');
    if (data) setTestimonials(data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      const { error } = await supabase
        .from('testimonials')
        .update(formData)
        .eq('id', editingId);
      
      if (!error) {
        toast({ title: 'Depoimento atualizado!' });
      }
    } else {
      const { error } = await supabase
        .from('testimonials')
        .insert({ ...formData, active: true });
      
      if (!error) {
        toast({ title: 'Depoimento criado!' });
      }
    }

    setIsOpen(false);
    resetForm();
    loadTestimonials();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este depoimento?')) {
      await supabase.from('testimonials').delete().eq('id', id);
      toast({ title: 'Depoimento excluído!' });
      loadTestimonials();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('testimonials').update({ active }).eq('id', id);
    loadTestimonials();
  };

  const resetForm = () => {
    setFormData({
      client_name: '',
      client_company: '',
      client_role: '',
      testimonial: '',
      rating: 5,
      order_index: 0
    });
    setEditingId(null);
  };

  const startEdit = (testimonial: Testimonial) => {
    setFormData({
      client_name: testimonial.client_name,
      client_company: testimonial.client_company,
      client_role: testimonial.client_role,
      testimonial: testimonial.testimonial,
      rating: testimonial.rating,
      order_index: testimonial.order_index
    });
    setEditingId(testimonial.id);
    setIsOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Depoimentos</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Depoimento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar' : 'Novo'} Depoimento</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nome do Cliente</Label>
                <Input
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                />
              </div>
              <div>
                <Label>Empresa</Label>
                <Input
                  value={formData.client_company}
                  onChange={(e) => setFormData({ ...formData, client_company: e.target.value })}
                />
              </div>
              <div>
                <Label>Cargo</Label>
                <Input
                  value={formData.client_role}
                  onChange={(e) => setFormData({ ...formData, client_role: e.target.value })}
                />
              </div>
              <div>
                <Label>Depoimento</Label>
                <Textarea
                  value={formData.testimonial}
                  onChange={(e) => setFormData({ ...formData, testimonial: e.target.value })}
                  rows={4}
                />
              </div>
              <div>
                <Label>Avaliação (1-5)</Label>
                <Input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
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
              <TableHead>Cliente</TableHead>
              <TableHead>Empresa</TableHead>
              <TableHead>Avaliação</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {testimonials.map((testimonial) => (
              <TableRow key={testimonial.id}>
                <TableCell>{testimonial.client_name}</TableCell>
                <TableCell>{testimonial.client_company}</TableCell>
                <TableCell>{'⭐'.repeat(testimonial.rating)}</TableCell>
                <TableCell>
                  <Switch
                    checked={testimonial.active}
                    onCheckedChange={(checked) => toggleActive(testimonial.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(testimonial)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(testimonial.id)}>
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
