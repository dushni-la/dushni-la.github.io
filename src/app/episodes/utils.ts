import { Episode } from "@/components/types";
import { readdir, readFile } from "node:fs/promises";
import path from "path";

let cache: Episode[] = [];
const cacheMap: Record<string, number> = {};

async function readEpisodeFromJson(id: string): Promise<Episode> {
  const filePath = path.join(process.cwd(), "output", `${id}.json`);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data) as Episode;
}

export function getEpisodeFromCache(id: string): Episode | undefined {
  return cache[cacheMap[id]];
}

export async function getEpisode(id: string): Promise<Episode> {
  if (cacheMap[id]) {
    return cache[cacheMap[id]];
  }

  await getEpisodes();
  return cache[cacheMap[id]];
}

export async function getEpisodes(): Promise<Episode[]> {
  if (cache.length > 0) {
    return cache;
  }

  const folder = await readdir(path.join(process.cwd(), "output"));

  const episodes = (
    await Promise.all(
      folder.map(async (id) => await readEpisodeFromJson(id.split(".")[0])),
    )
  ).sort((a, b) => {
    return new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime();
  });

  episodes[0].latest = true;

  cache = episodes;

  // Store order
  episodes.map((e, idx) => {
    cacheMap[e.guid] = idx;
  });

  return episodes;
}

getEpisodes();
