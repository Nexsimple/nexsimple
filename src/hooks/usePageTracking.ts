import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const getOrCreateVisitorId = () => {
  let visitorId = localStorage.getItem('visitor_id');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitor_id', visitorId);
  }
  return visitorId;
};

const getUTMParams = () => {
  try {
    const stored = localStorage.getItem('utm_params');
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

const captureUTMFromURL = () => {
  const urlParams = new URLSearchParams(window.location.search);
  
  const utmParams: any = {};
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content'];
  
  utmKeys.forEach(key => {
    const value = urlParams.get(key);
    if (value) utmParams[key] = value;
  });

  if (Object.keys(utmParams).length > 0) {
    localStorage.setItem('utm_params', JSON.stringify(utmParams));
  }
};

export const usePageTracking = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        // Capturar UTM da URL primeiro
        captureUTMFromURL();
        
        const visitorId = getOrCreateVisitorId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer || null;
        const userAgent = navigator.userAgent;
        const utmParams = getUTMParams();

        await supabase.from('analytics').insert({
          visitor_id: visitorId,
          page_path: pagePath,
          referrer: referrer,
          user_agent: userAgent,
          ...utmParams,
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);
};
