import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://otaku-realm.com";

  // Create entries for static pages
  const staticPages = [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/trending`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/upcoming`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ] as const;

  // Fetch latest anime
  let animeEntries: MetadataRoute.Sitemap = [];
  try {
    animeEntries = [];
  } catch (error) {
    console.error("Error fetching anime for sitemap:", error);
  }

  return [...staticPages, ...animeEntries];
}
