import { Post } from "@/components/types";
import { readdir, readFile } from "node:fs/promises";
import { join } from "path";
import { getEpisode } from "../episodes/utils";

let cache: Post[] = [];
const cacheMap: Record<string, number> = {};

const DIR = "posts";

async function readPostFromJson(slug: string): Promise<Post> {
  const filePath = join(process.cwd(), DIR, `${slug}.json`);
  const data = await readFile(filePath, "utf-8");
  const post: Post = JSON.parse(data);
  const relatedEpisodes = await getRelatedEpisodes(post);
  post.related_episodes = relatedEpisodes;
  return post;
}

const getPublishDate = (post: Post) =>
  new Date(post.properties["Дата публікації"].date.start || 0);

export function getPostFromCache(slug: string): Post | undefined {
  return cache[cacheMap[slug]];
}

export async function getPost(slug: string): Promise<Post> {
  if (cacheMap[slug]) {
    return cache[cacheMap[slug]];
  }

  await getPosts();
  return cache[cacheMap[slug]];
}

const getRelatedEpisodes = async (p: Post) => {
  const episodeIds =
    p.properties["Повʼязані випуски"]?.rich_text?.[0]?.plain_text
      .split(",")
      .map((id) => id.trim()) || [];
  const relatedEpisodes = await Promise.all(episodeIds.map(getEpisode));
  return relatedEpisodes;
};

export async function getPosts(): Promise<Post[]> {
  if (cache.length > 0) {
    return cache;
  }

  const folder = await readdir(join(process.cwd(), DIR));

  const posts = (
    await Promise.all(
      folder.map(
        async (filename) => await readPostFromJson(filename.split(".")[0]),
      ),
    )
  ).sort((a, b) => {
    return getPublishDate(b).getTime() - getPublishDate(a).getTime();
  });

  cache = posts;

  // Store order
  posts.map((e, idx) => {
    cacheMap[e.slug] = idx;
  });

  return posts;
}
