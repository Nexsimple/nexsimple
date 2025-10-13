import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const SEOHead = () => {
  const settings = useSiteSettings();

  useEffect(() => {
    if (!settings.isLoading) {
      // Update document title
      document.title = settings.seo_title || 'Nexsimple - Automação com IA';

      // Update or create meta tags
      const updateMetaTag = (name: string, content: string, isProperty = false) => {
        const attribute = isProperty ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attribute}="${name}"]`);
        if (!meta) {
          meta = document.createElement('meta');
          meta.setAttribute(attribute, name);
          document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
      };

      // Basic SEO
      updateMetaTag('description', settings.seo_description || 'Transforme seu negócio com automação inteligente');
      updateMetaTag('keywords', settings.seo_keywords || 'automação, ia, chatbot, erp');
      updateMetaTag('author', settings.seo_author || 'Nexsimple');
      updateMetaTag('robots', settings.seo_robots || 'index, follow');

      // Open Graph
      updateMetaTag('og:title', settings.seo_title || 'Nexsimple - Automação com IA', true);
      updateMetaTag('og:description', settings.seo_description || 'Transforme seu negócio com automação inteligente', true);
      updateMetaTag('og:type', 'website', true);
      updateMetaTag('og:url', settings.seo_canonical_url || 'https://nexsimple.com', true);
      if (settings.seo_og_image) {
        updateMetaTag('og:image', settings.seo_og_image, true);
      }
      updateMetaTag('og:locale', settings.seo_locale || 'pt_BR', true);

      // Twitter Cards
      updateMetaTag('twitter:card', settings.seo_twitter_card || 'summary_large_image');
      updateMetaTag('twitter:title', settings.seo_title || 'Nexsimple - Automação com IA');
      updateMetaTag('twitter:description', settings.seo_description || 'Transforme seu negócio com automação inteligente');
      if (settings.seo_twitter_site) {
        updateMetaTag('twitter:site', settings.seo_twitter_site);
      }
      if (settings.seo_og_image) {
        updateMetaTag('twitter:image', settings.seo_og_image);
      }

      // Canonical URL
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', settings.seo_canonical_url || 'https://nexsimple.com');

      // Schema.org JSON-LD
      const schemaData = {
        "@context": "https://schema.org",
        "@type": settings.schema_org_type || "Organization",
        "name": settings.schema_org_name || "Nexsimple",
        "description": settings.schema_org_description || "Automação inteligente para empresas",
        "url": settings.seo_canonical_url || "https://nexsimple.com",
        "logo": settings.schema_org_logo || settings.site_logo_url,
        "telephone": settings.schema_org_contact_phone,
        "email": settings.schema_org_contact_email,
        "address": settings.schema_org_address_street ? {
          "@type": "PostalAddress",
          "streetAddress": settings.schema_org_address_street,
          "addressLocality": settings.schema_org_address_city,
          "addressRegion": settings.schema_org_address_state,
          "postalCode": settings.schema_org_address_postal_code,
          "addressCountry": "BR"
        } : undefined,
        "sameAs": [
          settings.schema_org_social_instagram,
          settings.schema_org_social_facebook,
        ].filter(Boolean)
      };

      let schemaScript = document.getElementById('schema-org') as HTMLScriptElement | null;
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'schema-org';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }
      schemaScript.textContent = JSON.stringify(schemaData);
    }
  }, [settings]);

  return null;
};

export default SEOHead;
