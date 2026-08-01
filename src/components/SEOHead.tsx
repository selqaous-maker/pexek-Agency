import React, { useEffect } from 'react';
import { seoDataMap, PageSeoConfig } from '../data/seoData';
import { SITE_CONFIG } from '../config/siteConfig';

interface SEOHeadProps {
  path: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ path }) => {
  useEffect(() => {
    // Normalize hash route (e.g. '/' or '/about')
    const cleanPath = path || '/';
    const config: PageSeoConfig = seoDataMap[cleanPath] || seoDataMap['/'];

    // 1. Update Document Title
    document.title = config.title;

    // Helper to set or update meta tags
    const setMetaTag = (selector: string, key: string, value: string, attrName: string = 'name') => {
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, key);
        document.head.appendChild(element);
      }
      element.setAttribute('content', value);
    };

    // Helper to set or update link tags
    const setLinkTag = (rel: string, href: string) => {
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // 2. Core Meta Tags
    setMetaTag('meta[name="description"]', 'description', config.description);
    setMetaTag('meta[name="keywords"]', 'keywords', config.keywords);
    setMetaTag('meta[name="author"]', 'author', SITE_CONFIG.author);
    setMetaTag('meta[name="application-name"]', 'application-name', SITE_CONFIG.fullName);
    setMetaTag('meta[name="apple-mobile-web-app-title"]', 'apple-mobile-web-app-title', SITE_CONFIG.name);
    setMetaTag('meta[name="robots"]', 'robots', 'index, follow, max-image-preview:large');
    setMetaTag('meta[name="theme-color"]', 'theme-color', SITE_CONFIG.themeColor);

    // 3. Canonical Link
    setLinkTag('canonical', config.canonical);

    // 4. OpenGraph Meta Tags
    setMetaTag('meta[property="og:title"]', 'og:title', config.ogTitle || config.title, 'property');
    setMetaTag('meta[property="og:description"]', 'og:description', config.ogDescription || config.description, 'property');
    setMetaTag('meta[property="og:url"]', 'og:url', config.canonical, 'property');
    setMetaTag('meta[property="og:type"]', 'og:type', config.ogType || 'website', 'property');
    setMetaTag('meta[property="og:locale"]', 'og:locale', 'en_US', 'property');
    setMetaTag('meta[property="og:site_name"]', 'og:site_name', SITE_CONFIG.fullName, 'property');
    setMetaTag('meta[property="og:image"]', 'og:image', `${SITE_CONFIG.domain}/pexek-og.png`, 'property');
    setMetaTag('meta[property="og:image:width"]', 'og:image:width', '1200', 'property');
    setMetaTag('meta[property="og:image:height"]', 'og:image:height', '630', 'property');

    // 5. Twitter Card Meta Tags
    setMetaTag('meta[name="twitter:card"]', 'twitter:card', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'twitter:title', config.ogTitle || config.title);
    setMetaTag('meta[name="twitter:description"]', 'twitter:description', config.ogDescription || config.description);
    setMetaTag('meta[name="twitter:image"]', 'twitter:image', `${SITE_CONFIG.domain}/pexek-og.png`);

    // 6. JSON-LD Structured Data Management
    const existingScripts = document.querySelectorAll('script[data-pexek-seo="true"]');
    existingScripts.forEach((script) => script.remove());

    const activeJsonLd = (config.jsonLd && config.jsonLd.length > 0) ? config.jsonLd : [
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: config.title,
        description: config.description,
        url: config.canonical,
        publisher: {
          '@type': 'Organization',
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.domain,
          logo: `${SITE_CONFIG.domain}/pexek-logo.png`
        }
      }
    ];

    activeJsonLd.forEach((schemaObj) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-pexek-seo', 'true');
      script.textContent = JSON.stringify(schemaObj);
      document.head.appendChild(script);
    });

  }, [path]);

  return null;
};
