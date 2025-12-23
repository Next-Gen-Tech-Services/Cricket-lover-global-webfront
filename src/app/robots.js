import { siteConfig } from './configs/seo.config';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/', '/(protected)/'],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
