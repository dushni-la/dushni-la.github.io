import EpisodeCoverPlayer from "@/components/EpisodeCoverPlayer";
import { Episode } from "@/components/types";
import NextLink from "next/link";
import { readdir, readFile } from "node:fs/promises";
import path from "path";
import React from "react";
import EpisodeMetadataHeader from "./[id]/EpisodeMetadataHeader";

async function getEpisode(id: string): Promise<Episode> {
  const filePath = path.join(process.cwd(), "output", `${id}.json`);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
}

const EpisodeItem: React.FC<{ data: Episode }> = async ({ data }) => {
  return (
    <div className="divider-y">
      <div className="flex flex-row gap-6 group">
        <EpisodeCoverPlayer episode={data} size={100} />
        <div className="flex flex-col flex-1 gap-2">
          <EpisodeMetadataHeader episode={data} />
          <NextLink
            href={`/episodes/${data.guid}`}
            className="text-foreground hover:text-primary-700"
          >
            <p className="text-xl font-[hkGrotesque]">
              #{data.episode}: {data.title}
            </p>
          </NextLink>
          <p className="overflow-hidden text-foreground">
            {data.summary.split("Support the show")[0]}
          </p>
        </div>
      </div>
    </div>
  );
};

const EpisodesPage: React.FC = async () => {
  const folder = await readdir(path.join(process.cwd(), "output"));

  const episodes = await Promise.all(
    folder.map(async (id) => await getEpisode(id.split(".")[0])),
  );

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
