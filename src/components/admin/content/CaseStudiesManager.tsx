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

interface CaseStudy {
  id: string;
  company_name: string;
  industry: string;
  challenge: string;
  solution: string;
  result_1_metric: string;
  result_1_label: string;
  result_2_metric: string;
  result_2_label: string;
  result_3_metric: string;
  result_3_label: string;
  active: boolean;
  order_index: number;
}

export const CaseStudiesManager = () => {
  const [cases, setCases] = useState<CaseStudy[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    company_name: '',
    industry: '',
    challenge: '',
    solution: '',
    result_1_metric: '',
    result_1_label: '',
    result_2_metric: '',
    result_2_label: '',
    result_3_metric: '',
    result_3_label: '',
    order_index: 0
  });

  useEffect(() => {
    loadCases();
  }, []);

  const loadCases = async () => {
    const { data } = await supabase
      .from('case_studies')
      .select('*')
      .order('order_index');
    if (data) setCases(data);
  };

  const handleSubmit = async () => {
    if (editingId) {
      const { error } = await supabase
        .from('case_studies')
        .update(formData)
        .eq('id', editingId);
      
      if (!error) {
        toast({ title: 'Case atualizado!' });
      }
    } else {
      const { error } = await supabase
        .from('case_studies')
        .insert({ ...formData, active: true });
      
      if (!error) {
        toast({ title: 'Case criado!' });
      }
    }

    setIsOpen(false);
    resetForm();
    loadCases();
  };

  const handleDelete = async (id: string) => {
    if (confirm('Deseja realmente excluir este case?')) {
      await supabase.from('case_studies').delete().eq('id', id);
      toast({ title: 'Case excluído!' });
      loadCases();
    }
  };

  const toggleActive = async (id: string, active: boolean) => {
    await supabase.from('case_studies').update({ active }).eq('id', id);
    loadCases();
  };

  const resetForm = () => {
    setFormData({
      company_name: '',
      industry: '',
      challenge: '',
      solution: '',
      result_1_metric: '',
      result_1_label: '',
      result_2_metric: '',
      result_2_label: '',
      result_3_metric: '',
      result_3_label: '',
      order_index: 0
    });
    setEditingId(null);
  };

  const startEdit = (caseStudy: CaseStudy) => {
    setFormData({
      company_name: caseStudy.company_name,
      industry: caseStudy.industry,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      result_1_metric: caseStudy.result_1_metric,
      result_1_label: caseStudy.result_1_label,
      result_2_metric: caseStudy.result_2_metric,
      result_2_label: caseStudy.result_2_label,
      result_3_metric: caseStudy.result_3_metric,
      result_3_label: caseStudy.result_3_label,
      order_index: caseStudy.order_index
    });
    setEditingId(caseStudy.id);
    setIsOpen(true);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Cases de Sucesso</CardTitle>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Case
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Editar' : 'Novo'} Case</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Nome da Empresa</Label>
                  <Input
                    value={formData.company_name}
                    onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Setor</Label>
                  <Input
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label>Desafio</Label>
                <Textarea
                  value={formData.challenge}
                  onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label>Solução</Label>
                <Textarea
                  value={formData.solution}
                  onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold">Resultados</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Métrica 1</Label>
                    <Input
                      placeholder="ex: +300%"
                      value={formData.result_1_metric}
                      onChange={(e) => setFormData({ ...formData, result_1_metric: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Descrição 1</Label>
                    <Input
                      placeholder="ex: Aumento em vendas"
                      value={formData.result_1_label}
                      onChange={(e) => setFormData({ ...formData, result_1_label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Métrica 2</Label>
                    <Input
                      placeholder="ex: 40%"
                      value={formData.result_2_metric}
                      onChange={(e) => setFormData({ ...formData, result_2_metric: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Descrição 2</Label>
                    <Input
                      placeholder="ex: Redução de custos"
                      value={formData.result_2_label}
                      onChange={(e) => setFormData({ ...formData, result_2_label: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Métrica 3</Label>
                    <Input
                      placeholder="ex: 6 meses"
                      value={formData.result_3_metric}
                      onChange={(e) => setFormData({ ...formData, result_3_metric: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Descrição 3</Label>
                    <Input
                      placeholder="ex: ROI alcançado"
                      value={formData.result_3_label}
                      onChange={(e) => setFormData({ ...formData, result_3_label: e.target.value })}
                    />
                  </div>
                </div>
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
              <TableHead>Empresa</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Ativo</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseStudy) => (
              <TableRow key={caseStudy.id}>
                <TableCell>{caseStudy.company_name}</TableCell>
                <TableCell>{caseStudy.industry}</TableCell>
                <TableCell>
                  <Switch
                    checked={caseStudy.active}
                    onCheckedChange={(checked) => toggleActive(caseStudy.id, checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => startEdit(caseStudy)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(caseStudy.id)}>
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
