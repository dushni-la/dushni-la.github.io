import type { MetadataRoute } from "next";
import { getEpisodes } from "./episodes/utils";
import { getSlug } from "@/components/utils";
import { getPosts } from "./blog/utils";
import { BASE_URL } from "@/constants";

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
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const episodes = await getEpisodes();
  const episodeRoutes: MetadataRoute.Sitemap[] = episodes.map((episode) => [
    {
      url: `${BASE_URL}/episodes/${episode.guid}`,
      priority: 0.8,
      lastModified: new Date(episode.pub_date).toISOString(),
      changeFrequency: "weekly",
      images: episode.image ? [episode.image] : undefined,
    },
    {
      url: `${BASE_URL}/episodes/${episode.guid}/${getSlug(episode.title)}`,
      priority: 0.8,
      lastModified: new Date(episode.pub_date).toISOString(),
      changeFrequency: "weekly",
      images: episode.image ? [episode.image] : undefined,
    },
  ]);

  const posts = await getPosts();
  const postRoutes: MetadataRoute.Sitemap[] = posts.map((post) => [
    {
      url: `${BASE_URL}/blog/${post.slug}`,
      priority: 0.8,
      lastModified: new Date(post.last_edited_time).toISOString(),
      changeFrequency: "weekly",
      images: post.cover
        ? [post.cover.startsWith("/") ? `${BASE_URL}${post.cover}` : post.cover]
        : undefined,
    },
  ]);

  return [...routes, ...episodeRoutes, ...postRoutes].flat();
}
