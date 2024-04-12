import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://Korkbo.com',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // -------- Does discover need to be logged in?
    // {
    //   url: 'https://Korkbo.com/discover',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.8,
    // },
    // {
    //   url: 'https://acme.com/dashboard',
    //   lastModified: new Date(),
    //   changeFrequency: 'weekly',
    //   priority: 0.5,
    // },
  ]
}