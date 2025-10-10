import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const SEOHead = () => {
  const { getSetting, isLoading } = useSiteSettings();

  useEffect(() => {
    if (!isLoading) {
      // Update document title
      document.title = getSetting('seo_title', 'Nexsimple - Automação com IA');

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string) => {
        let meta = document.querySelector(`meta[name="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute('name', name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      updateMetaTag('description', getSetting('seo_description', 'Transforme seu negócio com automação inteligente'));
      updateMetaTag('keywords', getSetting('seo_keywords', 'automação, ia, chatbot, erp'));

      // Open Graph tags
      updateMetaTag('og:title', getSetting('seo_title', 'Nexsimple - Automação com IA'));
      updateMetaTag('og:description', getSetting('seo_description', 'Transforme seu negócio com automação inteligente'));
    }
  }, [isLoading, getSetting]);

  return null;
};

export default SEOHead;
