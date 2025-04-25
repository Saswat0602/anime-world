import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/']
    },
    sitemap: 'https://otaku-realm.com/sitemap.xml',
    host: 'https://otaku-realm.com',
  };
} 