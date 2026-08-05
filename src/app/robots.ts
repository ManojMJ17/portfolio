import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.manoj-kumar.me/sitemap.xml',
    host: 'https://www.manoj-kumar.me',
  };
}
