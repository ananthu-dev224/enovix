import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://enovixtech.in';
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
      images: [
        `${baseUrl}/enovix_logo.png`,
        `${baseUrl}/banner-1-latest.png`,
        `${baseUrl}/dms.png`,
        `${baseUrl}/medrecq.jpg`,
        `${baseUrl}/medrecq_ios.jpg`,
        `${baseUrl}/desktop-app-2.png`,
      ],
    },
  ];
}
