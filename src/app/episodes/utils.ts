import { Episode } from "@/components/types";
import { readdir, readFile } from "node:fs/promises";
import path from "path";

export async function getEpisode(id: string): Promise<Episode> {
  const filePath = path.join(process.cwd(), "output", `${id}.json`);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}

export async function getEpisodes(): Promise<Episode[]> {
  const folder = await readdir(path.join(process.cwd(), "output"));

  const episodes = await Promise.all(
    folder.map(async (id) => await getEpisode(id.split(".")[0])),
  );

  return episodes;
}
