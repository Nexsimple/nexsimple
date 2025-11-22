-- ====================================
-- MIGRATION: Sistema de Afiliados + Mapa Mental
-- ====================================

-- ====================================
-- PARTE 1: Sistema de Rastreamento de Afiliados
-- ====================================

-- Criar tabela de afiliados
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
  commission_rate DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Adicionar colunas UTM em analytics
ALTER TABLE public.analytics 
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_id TEXT,
  ADD COLUMN IF NOT EXISTS utm_term TEXT,
  ADD COLUMN IF NOT EXISTS utm_content TEXT;

-- Adicionar colunas UTM e affiliate_id em leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS utm_source TEXT,
  ADD COLUMN IF NOT EXISTS utm_medium TEXT,
  ADD COLUMN IF NOT EXISTS utm_campaign TEXT,
  ADD COLUMN IF NOT EXISTS utm_id TEXT,
  ADD COLUMN IF NOT EXISTS affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE SET NULL;

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_analytics_utm_id ON public.analytics(utm_id);
CREATE INDEX IF NOT EXISTS idx_leads_affiliate_id ON public.leads(affiliate_id);
CREATE INDEX IF NOT EXISTS idx_leads_utm_id ON public.leads(utm_id);
CREATE INDEX IF NOT EXISTS idx_affiliates_code ON public.affiliates(affiliate_code);

-- Habilitar RLS na tabela affiliates
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;

-- RLS Policies para affiliates
CREATE POLICY "Affiliates viewable by admins"
  ON public.affiliates FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Affiliates insertable by admins"
  ON public.affiliates FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Affiliates updatable by admins"
  ON public.affiliates FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Affiliates deletable by admins"
  ON public.affiliates FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at em affiliates
CREATE TRIGGER update_affiliates_updated_at
  BEFORE UPDATE ON public.affiliates
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ====================================
-- PARTE 2: Sistema de Mapa Mental
-- ====================================

-- Criar tabela de mapas mentais
CREATE TABLE IF NOT EXISTS public.mind_maps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  nodes JSONB NOT NULL DEFAULT '[]'::jsonb,
  edges JSONB NOT NULL DEFAULT '[]'::jsonb,
  thumbnail_url TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_mind_maps_user_id ON public.mind_maps(user_id);
CREATE INDEX IF NOT EXISTS idx_mind_maps_is_public ON public.mind_maps(is_public);

-- Habilitar RLS na tabela mind_maps
ALTER TABLE public.mind_maps ENABLE ROW LEVEL SECURITY;

-- RLS Policies para mind_maps
CREATE POLICY "Users can view own maps or public maps"
  ON public.mind_maps FOR SELECT
  USING (user_id = auth.uid() OR is_public = true OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can insert own maps"
  ON public.mind_maps FOR INSERT
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own maps"
  ON public.mind_maps FOR UPDATE
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can delete own maps"
  ON public.mind_maps FOR DELETE
  USING (user_id = auth.uid() OR has_role(auth.uid(), 'admin'::app_role));

-- Trigger para atualizar updated_at em mind_maps
CREATE TRIGGER update_mind_maps_updated_at
  BEFORE UPDATE ON public.mind_maps
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();