-- Popular configurações completas do site
INSERT INTO site_settings (key, value, category, description) VALUES
-- EMPRESA
('company_name', '"Nexsimple"', 'company', 'Nome da empresa'),
('company_email', '"contato@nexsimple.com"', 'company', 'Email principal'),
('company_phone', '"+55 64 9 2698-8259"', 'company', 'Telefone de contato'),
('company_address', '"Goiânia, Goiás"', 'company', 'Endereço da empresa'),

-- HERO SECTION (adicionar mais configs)
('hero_badge_text', '"Líderes em Automação com IA"', 'hero', 'Texto do badge superior'),
('hero_cta_primary', '"Falar com Especialista 🔥"', 'hero', 'Texto botão primário'),
('hero_cta_secondary', '"Agendar Demo Gratuita"', 'hero', 'Texto botão secundário'),
('hero_stat_1_number', '"+500"', 'hero', 'Número estatística 1'),
('hero_stat_1_label', '"Automações Implementadas"', 'hero', 'Label estatística 1'),
('hero_stat_2_number', '"+1M"', 'hero', 'Número estatística 2'),
('hero_stat_2_label', '"Processos Otimizados"', 'hero', 'Label estatística 2'),
('hero_stat_3_number', '"+100"', 'hero', 'Número estatística 3'),
('hero_stat_3_label', '"Empresas Transformadas"', 'hero', 'Label estatística 3'),

-- REDES SOCIAIS
('social_instagram', '""', 'social', 'Link Instagram'),
('social_linkedin', '""', 'social', 'Link LinkedIn'),
('social_youtube', '""', 'social', 'Link YouTube'),

-- SEO
('seo_title', '"Nexsimple - Automação com IA"', 'seo', 'Título da página'),
('seo_description', '"Transforme seu negócio com automação inteligente"', 'seo', 'Meta descrição'),
('seo_keywords', '"automação, ia, chatbot, erp"', 'seo', 'Palavras-chave')
ON CONFLICT (key) DO NOTHING;