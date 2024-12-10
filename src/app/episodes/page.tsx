import { Episode } from "@/components/types";
import { readdir, readFile } from "node:fs/promises";
import path from "path";
import React from "react";
import EpisodeItem from "@/components/EpisodeItem";

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

const EpisodesPage: React.FC = async () => {
  const episodes = await getEpisodes();

  return (
    <div className="flex flex-col gap-[4rem] w-[40rem]">
      {episodes
        .sort((a, b) => {
          return (
            new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime()
          );
        })
        .map((episode) => (
          <EpisodeItem key={episode.guid} data={episode} />
        ))}
    </div>
  );
};

export default EpisodesPage;
