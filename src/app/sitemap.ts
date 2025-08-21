import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://timerwithmusic.com'; // Replace with your actual domain
  
  // Common timer durations for static generation
  const timerMinutes = [1, 2, 5, 10, 15, 20, 25, 30, 45, 60, 90, 120];
  
  // Base pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pomodoro`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timer/custom`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/help`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // Timer pages
  const timerPages: MetadataRoute.Sitemap = timerMinutes.map((minutes) => ({
    url: `${baseUrl}/timer/${minutes}-minutes-music`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: minutes === 25 ? 0.9 : minutes === 10 || minutes === 15 || minutes === 30 ? 0.8 : 0.7,
  }));

  return [...staticPages, ...timerPages];
}