import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_id?: string;
  utm_term?: string;
  utm_content?: string;
}

const UTM_STORAGE_KEY = 'utm_params';

export const useUTMTracking = () => {
  useEffect(() => {
    captureUTMParams();
  }, []);

  const captureUTMParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    const utmParams: UTMParams = {
      utm_source: urlParams.get('utm_source') || undefined,
      utm_medium: urlParams.get('utm_medium') || undefined,
      utm_campaign: urlParams.get('utm_campaign') || undefined,
      utm_id: urlParams.get('utm_id') || undefined,
      utm_term: urlParams.get('utm_term') || undefined,
      utm_content: urlParams.get('utm_content') || undefined,
    };

    // Verificar se há pelo menos um parâmetro UTM
    const hasUTMParams = Object.values(utmParams).some(value => value !== undefined);
    
    if (hasUTMParams) {
      // Salvar no localStorage para persistir entre páginas
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
    }
  };

  const getStoredUTMParams = (): UTMParams => {
    try {
      const stored = localStorage.getItem(UTM_STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  };

  const clearUTMParams = () => {
    localStorage.removeItem(UTM_STORAGE_KEY);
  };

  const trackUTMWithAnalytics = async (visitorId: string, pagePath: string, referrer: string | null, userAgent: string) => {
    const utmParams = getStoredUTMParams();
    
    try {
      await supabase.from('analytics').insert({
        visitor_id: visitorId,
        page_path: pagePath,
        referrer: referrer,
        user_agent: userAgent,
        ...utmParams,
      });
    } catch (error) {
      console.error('Error tracking UTM with analytics:', error);
    }
  };

  return {
    captureUTMParams,
    getStoredUTMParams,
    clearUTMParams,
    trackUTMWithAnalytics,
  };
};
