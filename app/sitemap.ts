import { MetadataRoute } from 'next';
import { fetchAnime, fetchPopularAnime } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://otaku-realm.com';

  // Create entries for static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upcoming`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ] as const;

  // Fetch latest anime
  let animeEntries: MetadataRoute.Sitemap = [];
  try {
    const latestAnimeData = await fetchAnime(1, '');
    const popularAnimeData = await fetchPopularAnime(1);
    
    // Process latest anime
    if (latestAnimeData?.data) {
      const latestAnimeEntries = latestAnimeData.data.map((anime) => ({
        url: `${baseUrl}/anime/${anime.mal_id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }));
      animeEntries = [...animeEntries, ...latestAnimeEntries];
    }
    
    // Process popular anime
    if (popularAnimeData?.data) {
      const popularAnimeEntries = popularAnimeData.data.map((anime) => ({
        url: `${baseUrl}/anime/${anime.mal_id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
      
      // Filter out duplicates
      const existingIds = new Set(animeEntries.map(entry => {
        const segments = entry.url.split('/');
        return segments[segments.length - 1];
      }));
      
      const uniquePopularEntries = popularAnimeEntries.filter(entry => {
        const segments = entry.url.split('/');
        const id = segments[segments.length - 1];
        return !existingIds.has(id);
      });
      
      animeEntries = [...animeEntries, ...uniquePopularEntries];
    }
  } catch (error) {
    console.error('Error fetching anime for sitemap:', error);
  }

  return [...staticPages, ...animeEntries];
} 