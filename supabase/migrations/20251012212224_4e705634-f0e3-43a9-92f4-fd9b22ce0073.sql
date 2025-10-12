-- STORAGE BUCKET para imagens
INSERT INTO storage.buckets (id, name, public) 
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de storage
CREATE POLICY "Admins can upload site assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-assets' AND
  has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update site assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete site assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'site-assets' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Site assets are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'site-assets');

-- Expandir site_settings com TODAS as configurações
INSERT INTO site_settings (key, value, category, description) VALUES
-- Logo e Identidade Visual
('site_logo_url', '""', 'identity', 'URL da logo principal do site'),
('site_favicon_url', '""', 'identity', 'URL do favicon'),

-- SEÇÃO PROBLEMA
('problem_title', '"Esses Problemas Estão Sugando Seu Dinheiro"', 'problem', 'Título da seção de problemas'),
('problem_subtitle', '"Veja quanto você perde todo mês"', 'problem', 'Subtítulo da seção'),
('problem_1_title', '"Perda de Tempo = Perda de Dinheiro"', 'problem', 'Título problema 1'),
('problem_1_desc', '"Sua equipe passa 20h/semana fazendo trabalho chato. Isso custa R$ 5.000/mês desperdiçados"', 'problem', 'Descrição problema 1'),
('problem_2_title', '"Clientes Desistindo"', 'problem', 'Título problema 2'),
('problem_2_desc', '"Demora no atendimento? Cliente vai embora. Você perde R$ 15.000/mês em vendas"', 'problem', 'Descrição problema 2'),
('problem_3_title', '"Vendas Escorrendo Pelos Dedos"', 'problem', 'Título problema 3'),
('problem_3_desc', '"Sem follow-up automático, 70% dos interessados somem. Prejuízo: R$ 30.000/mês"', 'problem', 'Descrição problema 3'),
('problem_4_title', '"Informação Bagunçada"', 'problem', 'Título problema 4'),
('problem_4_desc', '"Dados espalhados = decisões erradas = dinheiro perdido"', 'problem', 'Descrição problema 4'),

-- SEÇÃO SOLUÇÕES
('solutions_title', '"Como a Nexsimple Multiplica Seus Lucros"', 'solutions', 'Título da seção de soluções'),
('solutions_subtitle', '"Tecnologia que faz seu dinheiro trabalhar por você"', 'solutions', 'Subtítulo da seção'),
('solution_1_title', '"Robô que Trabalha 24h por Você"', 'solutions', 'Título solução 1'),
('solution_1_desc', '"IA responde clientes automaticamente, vende enquanto você dorme"', 'solutions', 'Descrição solução 1'),
('solution_2_title', '"Atendente Digital Incansável"', 'solutions', 'Título solução 2'),
('solution_2_desc', '"Seu time de vendas nunca mais perde um lead. Resposta em 3 segundos"', 'solutions', 'Descrição solução 2'),
('solution_3_title', '"Redes Sociais no Piloto Automático"', 'solutions', 'Título solução 3'),
('solution_3_desc', '"Poste, responda e venda automaticamente. Sem contratar social media"', 'solutions', 'Descrição solução 3'),
('solution_4_title', '"Painel do Dinheiro em Tempo Real"', 'solutions', 'Título solução 4'),
('solution_4_desc', '"Veja exatamente de onde vem cada centavo. Decisões rápidas = mais lucro"', 'solutions', 'Descrição solução 4'),
('solution_5_title', '"Cérebro Digital da Empresa"', 'solutions', 'Título solução 5'),
('solution_5_desc', '"Todas as informações em um só lugar. Zero tempo perdido procurando"', 'solutions', 'Descrição solução 5'),
('solution_6_title', '"Tudo Conectado, Zero Trabalho Manual"', 'solutions', 'Título solução 6'),
('solution_6_desc', '"Seus sistemas conversam sozinhos. Você só conta o dinheiro entrando"', 'solutions', 'Descrição solução 6'),

-- SEÇÃO BENEFÍCIOS
('benefits_title', '"Resultados Que Você Vai Ver em 30 Dias"', 'benefits', 'Título da seção de benefícios'),
('benefits_subtitle', '"Clientes reais economizaram MUITO dinheiro"', 'benefits', 'Subtítulo da seção'),
('benefit_1_metric', '"90"', 'benefits', 'Métrica benefício 1'),
('benefit_1_suffix', '"%"', 'benefits', 'Sufixo métrica 1'),
('benefit_1_label', '"Menos Trabalho Chato"', 'benefits', 'Label benefício 1'),
('benefit_1_desc', '"Sua equipe para de perder tempo e foca em VENDER. Resultado: +R$ 40.000/mês"', 'benefits', 'Descrição benefício 1'),
('benefit_2_metric', '"3"', 'benefits', 'Métrica benefício 2'),
('benefit_2_suffix', '"x"', 'benefits', 'Sufixo métrica 2'),
('benefit_2_label', '"Mais Vendas"', 'benefits', 'Label benefício 2'),
('benefit_2_desc', '"Resposta instantânea + follow-up automático = cliente compra na hora"', 'benefits', 'Descrição benefício 2'),
('benefit_3_metric', '"24"', 'benefits', 'Métrica benefício 3'),
('benefit_3_suffix', '"/7"', 'benefits', 'Sufixo métrica 3'),
('benefit_3_label', '"Nunca Perde Cliente"', 'benefits', 'Label benefício 3'),
('benefit_3_desc', '"Atendimento 24h sem pagar hora extra. Cliente feliz, carteira cheia"', 'benefits', 'Descrição benefício 3'),
('benefit_4_metric', '"20"', 'benefits', 'Métrica benefício 4'),
('benefit_4_suffix', '"k"', 'benefits', 'Sufixo métrica 4'),
('benefit_4_label', '"Economia Por Mês"', 'benefits', 'Label benefício 4'),
('benefit_4_desc', '"Menos funcionários, zero erro, processos rápidos. Dinheiro no bolso"', 'benefits', 'Descrição benefício 4'),

-- SEÇÃO SOBRE
('about_title', '"Por Que Empresários Escolhem a Nexsimple?"', 'about', 'Título da seção sobre'),
('about_subtitle', '"Não vendemos tecnologia. Vendemos LUCRO"', 'about', 'Subtítulo da seção'),
('about_text_1', '"Sabe aquele dinheiro que você perde todo mês com processos lentos, clientes que somem e trabalho manual? A gente ELIMINA isso"', 'about', 'Texto 1 sobre'),
('about_text_2', '"Usamos robôs inteligentes que trabalham 24h, respondem clientes na hora e organizam tudo automaticamente. Você só vê o resultado: MAIS DINHEIRO"', 'about', 'Texto 2 sobre'),
('about_stat_1_number', '"+50"', 'about', 'Estatística 1 número'),
('about_stat_1_label', '"Empresas Lucrando Mais"', 'about', 'Estatística 1 label'),
('about_stat_2_number', '"+100k"', 'about', 'Estatística 2 número'),
('about_stat_2_label', '"Processos Rodando Sozinhos"', 'about', 'Estatística 2 label'),
('about_stat_3_number', '"+R$ 2M"', 'about', 'Estatística 3 número'),
('about_stat_3_label', '"Economizados Pelos Clientes"', 'about', 'Estatística 3 label'),
('about_stat_4_number', '"100%"', 'about', 'Estatística 4 número'),
('about_stat_4_label', '"Garantia de Resultado"', 'about', 'Estatística 4 label'),

-- SEÇÃO DEMO
('demo_title', '"Veja Como Funciona (É Super Simples)"', 'demo', 'Título da seção demo'),
('demo_subtitle', '"Mesmo sem entender nada de tecnologia, você vai entender isso"', 'demo', 'Subtítulo da seção'),
('demo_feature_1_title', '"Atendente Digital"', 'demo', 'Feature 1 título'),
('demo_feature_1_desc', '"Responde clientes sozinho, qualquer hora"', 'demo', 'Feature 1 descrição'),
('demo_feature_2_title', '"Painel do Dinheiro"', 'demo', 'Feature 2 título'),
('demo_feature_2_desc', '"Veja suas vendas e lucros ao vivo"', 'demo', 'Feature 2 descrição'),
('demo_feature_3_title', '"Automação Mágica"', 'demo', 'Feature 3 título'),
('demo_feature_3_desc', '"Tudo acontece sozinho, você só aproveita"', 'demo', 'Feature 3 descrição'),
('demo_button_text', '"Quero Ver Funcionando na Minha Empresa"', 'demo', 'Texto do botão demo'),

-- SEÇÃO FAQ
('faq_title', '"Perguntas Que Todo Empresário Faz"', 'faq', 'Título da seção FAQ'),
('faq_subtitle', '"Respostas diretas, sem enrolação"', 'faq', 'Subtítulo da seção'),

-- SEÇÃO CTA FINAL
('final_cta_badge', '"147 empresários consultando agora"', 'cta', 'Badge CTA final'),
('final_cta_title', '"Quer Ganhar Mais Dinheiro com Menos Trabalho?"', 'cta', 'Título CTA final'),
('final_cta_subtitle', '"Mais de 500 empresas já estão faturando MUITO mais. Você quer ficar para trás?"', 'cta', 'Subtítulo CTA final'),
('final_cta_button_1', '"Sim! Quero Ganhar Mais 🔥"', 'cta', 'Botão 1 CTA final'),
('final_cta_button_2', '"Agendar Conversa Rápida (15 min)"', 'cta', 'Botão 2 CTA final'),
('final_cta_urgency', '"⏰ Só 3 vagas para consultoria grátis este mês"', 'cta', 'Mensagem de urgência'),
('final_cta_guarantee_1', '"Garantia de 30 dias"', 'cta', 'Garantia 1'),
('final_cta_guarantee_2', '"Suporte sempre que precisar"', 'cta', 'Garantia 2'),
('final_cta_guarantee_3', '"Time só para você"', 'cta', 'Garantia 3'),

-- SEO AVANÇADO
('seo_og_image', '""', 'seo', 'URL da imagem Open Graph (1200x630)'),
('seo_twitter_site', '"@nexsimple"', 'seo', 'Twitter handle'),
('seo_canonical_url', '"https://nexsimple.com"', 'seo', 'URL canônica do site'),
('schema_org_phone', '"+55 64 9 2698-8259"', 'seo', 'Telefone para Schema.org'),
('schema_org_email', '"contato@nexsimple.com"', 'seo', 'Email para Schema.org'),

-- CONVERSÃO
('whatsapp_number', '"5564926988259"', 'conversion', 'Número do WhatsApp (com código do país)'),
('whatsapp_message', '"Olá! Quero saber mais sobre automação"', 'conversion', 'Mensagem padrão WhatsApp'),
('exit_popup_enabled', 'true', 'conversion', 'Ativar pop-up de saída'),
('exit_popup_title', '"Espere! Não Vá Embora de Mãos Vazias"', 'conversion', 'Título pop-up saída'),
('exit_popup_offer', '"E-book Grátis: 10 Formas de Economizar R$ 50k/ano"', 'conversion', 'Oferta pop-up')

ON CONFLICT (key) DO NOTHING;

-- TABELA FAQs
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "FAQs viewable by everyone"
ON faqs FOR SELECT
USING (active = true);

CREATE POLICY "FAQs manageable by admins"
ON faqs FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- TABELA TESTIMONIALS
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_company TEXT,
  client_role TEXT,
  client_photo_url TEXT,
  testimonial TEXT NOT NULL,
  result_metric TEXT,
  rating INTEGER DEFAULT 5,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Testimonials viewable by everyone"
ON testimonials FOR SELECT
USING (active = true);

CREATE POLICY "Testimonials manageable by admins"
ON testimonials FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- TABELA CASE STUDIES
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  industry TEXT,
  challenge TEXT NOT NULL,
  solution TEXT NOT NULL,
  result_1_metric TEXT,
  result_1_label TEXT,
  result_2_metric TEXT,
  result_2_label TEXT,
  result_3_metric TEXT,
  result_3_label TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Case studies viewable by everyone"
ON case_studies FOR SELECT
USING (active = true);

CREATE POLICY "Case studies manageable by admins"
ON case_studies FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Inserir FAQs iniciais
INSERT INTO faqs (question, answer, order_index) VALUES
('Quanto tempo leva para ver resultados?', 'Em média, nossos clientes começam a ver economia de tempo em 7 dias e aumento de vendas em 30 dias. É rápido porque a automação começa a trabalhar imediatamente.', 1),
('Preciso entender de tecnologia?', 'Não! É tudo simples. Se você sabe usar WhatsApp, vai saber usar nosso sistema. Nosso time cuida de toda a parte técnica.', 2),
('Quanto custa?', 'O investimento varia conforme o tamanho da sua empresa e o que você precisa automatizar. Mas garantimos: você vai economizar MAIS do que paga. Agende uma conversa para calcularmos seu ROI.', 3),
('Funciona para o meu tipo de negócio?', 'Sim! Já atendemos e-commerce, indústrias, consultorias, lojas físicas e muito mais. Cada automação é personalizada para o seu negócio específico.', 4),
('E se eu não gostar?', 'Garantia de 30 dias. Se não estiver economizando dinheiro ou vendendo mais, devolvemos 100% do seu investimento. Sem perguntas.', 5);

-- Inserir Depoimentos iniciais
INSERT INTO testimonials (client_name, client_company, client_role, testimonial, result_metric, rating, order_index) VALUES
('Carlos Silva', 'Silva Comércio', 'Proprietário', 'Antes eu perdia vendas porque não conseguia responder todo mundo. Agora o robô responde na hora e minhas vendas TRIPLICARAM!', '+R$ 45.000/mês', 5, 1),
('Ana Paula', 'Boutique Fashion', 'CEO', 'Minha equipe parou de fazer trabalho chato e começou a focar em atendimento VIP. Resultado: clientes mais felizes e muito mais dinheiro no caixa!', '90% economia de tempo', 5, 2),
('Roberto Costa', 'Costa Indústria', 'Diretor', 'Achei que era complicado, mas foi super fácil. Em 2 semanas já estava funcionando e economizando R$ 20 mil por mês. Melhor investimento que já fiz!', '+R$ 20.000/mês economizados', 5, 3);

-- Inserir Cases iniciais
INSERT INTO case_studies (company_name, industry, challenge, solution, result_1_metric, result_1_label, result_2_metric, result_2_label, result_3_metric, result_3_label, order_index) VALUES
('E-commerce ModaFit', 'E-commerce', 'Perdia 70% dos leads porque não conseguia responder rápido o suficiente', 'Instalamos chatbot inteligente com follow-up automático e painel de vendas em tempo real', '3x', 'Aumento nas vendas', '90%', 'Leads convertidos', 'R$ 80k', 'Faturamento extra/mês', 1),
('Indústria TechPro', 'Indústria', 'Processos manuais custavam R$ 50.000/mês em retrabalho e erros', 'Automatizamos 100% dos processos repetitivos e integramos todos os sistemas', 'R$ 50k', 'Economia mensal', '95%', 'Redução de erros', '20h', 'Economizadas por semana', 2);