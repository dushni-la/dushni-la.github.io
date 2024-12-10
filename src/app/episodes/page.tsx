import React from "react";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodes } from "./utils";

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
