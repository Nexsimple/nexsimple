import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export const SectionsManager = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<Record<string, any>>({});

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { data } = await supabase.from('site_settings').select('*');
    if (data) {
      const settingsObj = data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
      }, {} as Record<string, any>);
      setSettings(settingsObj);
    }
  };

  const updateSetting = async (key: string, value: any) => {
    setLoading(true);
    const { error } = await supabase
      .from('site_settings')
      .upsert({ key, value, category: 'content' });

    if (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível salvar as alterações.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Sucesso!',
        description: 'Configurações atualizadas.'
      });
      await loadSettings();
    }
    setLoading(false);
  };

  const sections = [
    {
      title: 'Hero',
      description: 'Seção principal do topo',
      fields: [
        { key: 'hero_title', label: 'Título Principal', type: 'text', defaultValue: 'Sua Empresa Pode Economizar 40 Horas Semanais' },
        { key: 'hero_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Descubra a tecnologia que grandes empresas usam para automatizar operações e multiplicar resultados.' },
        { key: 'hero_cta_primary', label: 'Texto do Botão Principal', type: 'text', defaultValue: 'Agendar Análise Gratuita 🔥' },
        { key: 'hero_badge_text', label: 'Texto do Badge', type: 'text', defaultValue: 'Inovação Comprovada em Automação e IA' },
        { key: 'hero_video_id', label: 'ID do Vídeo Explicativo (YouTube)', type: 'text', defaultValue: '' },
      ]
    },
    {
      title: 'Problemas',
      description: 'Seção de problemas que você resolve',
      fields: [
        { key: 'problem_title', label: 'Título', type: 'text', defaultValue: 'Desafios Comuns que Estão Custando Caro à Sua Empresa' },
        { key: 'problem_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Identifique os gargalos que impedem sua equipe de alcançar o máximo potencial e geram perdas financeiras.' },
        { key: 'problem_1_title', label: 'Problema 1 Título', type: 'text', defaultValue: 'Perda de Tempo e Dinheiro com Tarefas Manuais' },
        { key: 'problem_1_desc', label: 'Problema 1 Descrição', type: 'textarea', defaultValue: 'Sua equipe gasta até 40 horas semanais em tarefas repetitivas, custando milhares de reais e atrasando o crescimento.' },
        { key: 'problem_2_title', label: 'Problema 2 Título', type: 'text', defaultValue: 'Oportunidades de Venda Perdidas Diariamente' },
        { key: 'problem_2_desc', label: 'Problema 2 Descrição', type: 'textarea', defaultValue: 'A demora no atendimento e follow-up de leads resulta em 30% menos conversões e clientes insatisfeitos.' },
        { key: 'problem_3_title', label: 'Problema 3 Título', type: 'text', defaultValue: 'Decisões Lentas e Custosas por Falta de Dados' },
        { key: 'problem_3_desc', label: 'Problema 3 Descrição', type: 'textarea', defaultValue: 'Informações desorganizadas impedem decisões rápidas, gerando prejuízos de até 15% no faturamento anual.' },
      ]
    },
    {
      title: 'Soluções',
      description: 'Como você resolve os problemas',
      fields: [
        { key: 'solutions_title', label: 'Título', type: 'text', defaultValue: 'Nossas Soluções: O Caminho para a Eficiência e o Crescimento' },
        { key: 'solutions_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Tecnologia de ponta e expertise para transformar seus desafios em resultados tangíveis.' },
        { key: 'solution_1_title', label: 'Solução 1 Título', type: 'text', defaultValue: 'Automação Inteligente de Processos' },
        { key: 'solution_1_desc', label: 'Solução 1 Descrição', type: 'textarea', defaultValue: 'Elimine tarefas manuais, reduza erros e libere sua equipe para focar em atividades estratégicas que geram valor real.' },
        { key: 'solution_2_title', label: 'Solução 2 Título', type: 'text', defaultValue: 'Gestão de Leads 24/7' },
        { key: 'solution_2_desc', label: 'Solução 2 Descrição', type: 'textarea', defaultValue: 'Capture, qualifique e responda a leads instantaneamente, aumentando sua taxa de conversão e garantindo que nenhuma oportunidade seja perdida.' },
        { key: 'solution_3_title', label: 'Solução 3 Título', type: 'text', defaultValue: 'Dashboards com Dados em Tempo Real' },
        { key: 'solution_3_desc', label: 'Solução 3 Descrição', type: 'textarea', defaultValue: 'Tenha acesso a informações cruciais do seu negócio em tempo real para tomar decisões mais rápidas, inteligentes e lucrativas.' },
        { key: 'solution_4_title', label: 'Solução 4 Título', type: 'text', defaultValue: 'Assistentes de IA Personalizados' },
        { key: 'solution_4_desc', label: 'Solução 4 Descrição', type: 'textarea', defaultValue: 'Crie assistentes virtuais treinados para o seu negócio, capazes de realizar atendimento, vendas e suporte de forma autônoma.' },
        { key: 'solution_5_title', label: 'Solução 5 Título', type: 'text', defaultValue: 'Integração Total de Sistemas' },
        { key: 'solution_5_desc', label: 'Solução 5 Descrição', type: 'textarea', defaultValue: 'Conecte todas as suas ferramentas (CRM, ERP, etc.) em um fluxo de trabalho unificado, eliminando silos de informação.' },
        { key: 'solution_6_title', label: 'Solução 6 Título', type: 'text', defaultValue: 'Segurança e Confiabilidade' },
        { key: 'solution_6_desc', label: 'Solução 6 Descrição', type: 'textarea', defaultValue: 'Nossa infraestrutura garante 99.9% de uptime e segurança de nível empresarial para proteger seus dados e operações.' },
      ]
    },
    {
      title: 'Prova Social (Técnica)',
      description: 'Prova social baseada em capacidade técnica',
      fields: [
        { key: 'social_proof_title', label: 'Título', type: 'text', defaultValue: 'Tecnologia Testada e Aprovada' },
        { key: 'social_proof_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Nossa infraestrutura é construída para performance, escalabilidade e confiança.' },
        { key: 'tech_proof_1_metric', label: 'Métrica 1', type: 'text', defaultValue: '1000+' },
        { key: 'tech_proof_1_label', label: 'Rótulo 1', type: 'text', defaultValue: 'Interações Simultâneas Processadas por IA' },
        { key: 'tech_proof_2_metric', label: 'Métrica 2', type: 'text', defaultValue: '< 2s' },
        { key: 'tech_proof_2_label', label: 'Rótulo 2', type: 'text', defaultValue: 'Tempo Médio de Resposta da Automação' },
        { key: 'tech_proof_3_metric', label: 'Métrica 3', type: 'text', defaultValue: '99.9%' },
        { key: 'tech_proof_3_label', label: 'Rótulo 3', type: 'text', defaultValue: 'Uptime Garantido em Contrato' },
        { key: 'tech_proof_4_metric', label: 'Métrica 4', type: 'text', defaultValue: '+50' },
        { key: 'tech_proof_4_label', label: 'Rótulo 4', type: 'text', defaultValue: 'Plataformas Nativas para Integração' },
      ]
    },
    {
      title: 'Calculadora de ROI',
      description: 'Configurações para a calculadora de ROI',
      fields: [
        { key: 'roi_calculator_title', label: 'Título da Calculadora', type: 'text', defaultValue: 'Quanto Dinheiro Você Está Perdendo?' },
        { key: 'roi_calculator_subtitle', label: 'Subtítulo da Calculadora', type: 'textarea', defaultValue: 'Calcule em 30 segundos o prejuízo do trabalho manual e o potencial de economia com a automação.' },
        { key: 'roi_cta_text', label: 'Texto do Botão CTA', type: 'text', defaultValue: 'Quero Reverter Esse Prejuízo!' },
        { key: 'roi_cta_link', label: 'Link do Botão CTA', type: 'text', defaultValue: 'https://wa.me/556492698259' },
      ]
    },
    {
      title: 'FAQ',
      description: 'Seção de Perguntas Frequentes',
      fields: [
        { key: 'faq_title', label: 'Título', type: 'text', defaultValue: 'Suas Perguntas, Nossas Respostas' },
        { key: 'faq_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Esclareça suas dúvidas e veja como a Nexsimple pode resolver seus desafios mais urgentes.' },
        { key: 'faq_q1', label: 'Pergunta 1', type: 'text', defaultValue: 'Quanto tempo leva para ver os resultados?' },
        { key: 'faq_a1', label: 'Resposta 1', type: 'textarea', defaultValue: 'Nossa metodologia ágil permite a implementação da primeira fase em poucas semanas. Você começará a ver o retorno sobre o investimento, como economia de tempo e redução de erros, em menos de 30 dias.' },
        { key: 'faq_q2', label: 'Pergunta 2', type: 'text', defaultValue: 'Isso é muito caro para minha empresa?' },
        { key: 'faq_a2', label: 'Resposta 2', type: 'textarea', defaultValue: 'O investimento na automação é significativamente menor do que o custo da ineficiência. Nossos planos são flexíveis e o foco é sempre no ROI. A economia gerada pela automação paga o investimento em poucos meses.' },
        { key: 'faq_q3', label: 'Pergunta 3', type: 'text', defaultValue: 'Preciso de conhecimento técnico para usar a solução?' },
        { key: 'faq_a3', label: 'Resposta 3', type: 'textarea', defaultValue: 'Absolutamente não. Nós cuidamos de toda a complexidade técnica, desde o planejamento e desenvolvimento até a implementação e o suporte. Sua equipe só precisa se preocupar em usar a nova eficiência para crescer.' },
        { key: 'faq_q4', label: 'Pergunta 4', type: 'text', defaultValue: 'Meu processo é muito específico. A automação pode ser personalizada?' },
        { key: 'faq_a4', label: 'Resposta 4', type: 'textarea', defaultValue: 'Sim. Nossa especialidade é criar soluções de automação e IA 100% personalizadas. Analisamos seus processos em detalhes para construir uma solução que se encaixa perfeitamente nas suas necessidades.' },
        { key: 'faq_q5', label: 'Pergunta 5', type: 'text', defaultValue: 'A automação é segura para os dados da minha empresa?' },
        { key: 'faq_a5', label: 'Resposta 5', type: 'textarea', defaultValue: 'A segurança é nossa prioridade máxima. Utilizamos as melhores práticas de segurança do mercado, criptografia de ponta a ponta e seguimos rigorosos protocolos para garantir que seus dados estejam sempre protegidos.' },
      ]
    },
    {
      title: 'CTA Final',
      description: 'Chamada para ação no final da página',
      fields: [
        { key: 'final_cta_badge', label: 'Texto do Badge', type: 'text', defaultValue: 'Sua Próxima Grande Decisão' },
        { key: 'final_cta_title', label: 'Título Principal', type: 'text', defaultValue: 'Pronto para Transformar Sua Empresa?' },
        { key: 'final_cta_subtitle', label: 'Subtítulo', type: 'textarea', defaultValue: 'Não deixe a concorrência ditar o ritmo. A automação não é mais o futuro, é o presente. O momento de agir é agora.' },
        { key: 'final_cta_button_1', label: 'Texto do Botão 1', type: 'text', defaultValue: 'Sim! Quero Minha Análise Gratuita!' },
        { key: 'final_cta_guarantee_1', label: 'Garantia 1', type: 'text', defaultValue: 'Análise de Risco Zero e 100% Confidencial' },
      ]
    },
  ];

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <Card key={section.title}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
            <CardDescription>{section.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.fields.map((field) => (
              <div key={field.key} className="space-y-2">
                <Label htmlFor={field.key}>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea
                    id={field.key}
                    value={settings[field.key] ?? field.defaultValue ?? ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                    rows={3}
                  />
                ) : (
                  <Input
                    id={field.key}
                    value={settings[field.key] ?? field.defaultValue ?? ''}
                    onChange={(e) => setSettings({ ...settings, [field.key]: e.target.value })}
                  />
                )}
              </div>
            ))}
            <Button 
              onClick={() => {
                section.fields.forEach(field => {
                  updateSetting(field.key, settings[field.key] ?? field.defaultValue);
                });
              }}
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar {section.title}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};