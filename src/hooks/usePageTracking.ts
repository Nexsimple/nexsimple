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

export const usePageTracking = () => {
  useEffect(() => {
    const trackPageView = async () => {
      try {
        const visitorId = getOrCreateVisitorId();
        const pagePath = window.location.pathname;
        const referrer = document.referrer || null;
        const userAgent = navigator.userAgent;

        await supabase.from('analytics').insert({
          visitor_id: visitorId,
          page_path: pagePath,
          referrer: referrer,
          user_agent: userAgent,
        });
      } catch (error) {
        console.error('Error tracking page view:', error);
      }
    };

    trackPageView();
  }, []);
};
