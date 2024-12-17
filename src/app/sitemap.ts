import type { MetadataRoute } from "next";
import { getEpisodes } from "./episodes/utils";

const BASE_URL = "https://dushni.la";

export const dynamic = "force-static"; // ⚠️ This ensures static generation
export const revalidate = false; // 🚫 No revalidation because of static export

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/episodes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const episodes = await getEpisodes();
  const episodeRoutes: MetadataRoute.Sitemap = episodes.map((episode) => ({
    url: `${BASE_URL}/episodes/${episode.guid}`,
    priority: 0.8,
    lastModified: new Date(episode.pub_date).toISOString(),
    changeFrequency: "weekly",
    images: episode.image ? [episode.image] : undefined,
  }));

  return [...routes, ...episodeRoutes];
}
