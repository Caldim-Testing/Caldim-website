import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://caldimproducts.com';

  const routes = [
    '',
    '/about',
    '/services',
    '/products',
    '/contact',
    '/industries',
    '/privacy',
    '/terms',
    '/products/caltims',
    '/products/calrims',
    '/products/calbuy',
    '/products/caltrack',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));
}
