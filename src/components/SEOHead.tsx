import { useEffect } from 'react';
import { useSiteSettings } from '@/hooks/useSiteSettings';

const SEOHead = () => {
  const settings = useSiteSettings();

  useEffect(() => {
    if (!settings.isLoading) {
      // Update document title
      document.title = settings.seo_title || 'Nexsimple | Automação Inteligente e IA para Empresas';

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
      updateMetaTag('description', settings.seo_description || 'Transforme sua empresa com soluções de automação inteligente e inteligência artificial da Nexsimple. Otimize processos, aumente vendas e reduza custos.');
      updateMetaTag('keywords', settings.seo_keywords || 'automação, inteligência artificial, IA, n8n, automação de processos, integração de sistemas, eficiência empresarial, crescimento, consultoria em automação');
      updateMetaTag('author', settings.seo_author || 'Nexsimple');
      updateMetaTag('robots', settings.seo_robots || 'index, follow');

      // Open Graph
      updateMetaTag('og:title', settings.og_title || settings.seo_title || 'Nexsimple | Automação Inteligente e IA para Empresas', true);
      updateMetaTag('og:description', settings.og_description || settings.seo_description || 'Transforme sua empresa com soluções de automação inteligente e inteligência artificial da Nexsimple. Otimize processos, aumente vendas e reduza custos.', true);
      updateMetaTag('og:type', 'website', true);
      updateMetaTag('og:url', settings.seo_canonical_url || 'https://nexsimple.com', true);
      if (settings.og_image) {
        updateMetaTag('og:image', settings.og_image, true);
      }
      updateMetaTag('og:locale', settings.seo_locale || 'pt_BR', true);

      // Twitter Cards
      updateMetaTag('twitter:card', settings.seo_twitter_card || 'summary_large_image');
      updateMetaTag('twitter:title', settings.seo_title || 'Nexsimple | Automação Inteligente e IA para Empresas');
      updateMetaTag('twitter:description', settings.seo_description || 'Transforme sua empresa com soluções de automação inteligente e inteligência artificial da Nexsimple. Otimize processos, aumente vendas e reduza custos.');
      if (settings.seo_twitter_site) {
        updateMetaTag('twitter:site', settings.seo_twitter_site);
      }
      if (settings.og_image) {
        updateMetaTag('twitter:image', settings.og_image);
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
        "description": settings.schema_org_description || "Empresa especializada em automação inteligente e inteligência artificial para otimização de processos e crescimento empresarial.",
        "url": settings.company_url || "https://nexsimple.com",
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

      // Facebook Pixel
      if (settings.facebook_pixel_id) {
        const pixelId = settings.facebook_pixel_id;
        
        // Inject Facebook Pixel base code
        let fbScript = document.getElementById('fb-pixel-script') as HTMLScriptElement | null;
        if (!fbScript) {
          fbScript = document.createElement('script');
          fbScript.id = 'fb-pixel-script';
          fbScript.innerHTML = `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${pixelId}');
            fbq('track', 'PageView');
          `;
          document.head.appendChild(fbScript);

          // Add noscript pixel
          let fbNoscript = document.getElementById('fb-pixel-noscript') as HTMLElement | null;
          if (!fbNoscript) {
            fbNoscript = document.createElement('noscript');
            fbNoscript.id = 'fb-pixel-noscript';
            fbNoscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1" />`;
            document.body.insertBefore(fbNoscript, document.body.firstChild);
          }
        }
      }

      // Google Ads Conversion
      if (settings.google_ads_conversion_id) {
        let gtagScript = document.getElementById('gtag-script') as HTMLScriptElement | null;
        if (!gtagScript) {
          const gtagSrc = document.createElement('script');
          gtagSrc.async = true;
          gtagSrc.src = `https://www.googletagmanager.com/gtag/js?id=${settings.google_ads_conversion_id}`;
          document.head.appendChild(gtagSrc);

          gtagScript = document.createElement('script');
          gtagScript.id = 'gtag-script';
          gtagScript.innerHTML = `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${settings.google_ads_conversion_id}');
          `;
          document.head.appendChild(gtagScript);
        }
      }
    }
  }, [settings]);

  return null;
};

export default SEOHead;