import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.manoj-kumar.me';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      priority: 1,
      images: [`${baseUrl}/og-image.png`],
    },
  ];
}
