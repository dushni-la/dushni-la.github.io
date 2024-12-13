import React from "react";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodes } from "./utils";
import Section from "@/components/Section";

const EpisodesPage: React.FC = async () => {
  const episodes = await getEpisodes();

  const sortedEpisodes = episodes.sort((a, b) => {
    return new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime();
  });

  const latest = sortedEpisodes[0];
  const rest = sortedEpisodes.slice(1);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-row gap-4">
        <div className="p-4 md:p-10 rounded-[1rem] shadow-lg bg-gradient-to-b from-cyan-500 dark:from-default-100 to-blue-900 dark:to-blue-900 text-white mt-5">
          <Section
            title="Свіжий випуск"
            subtitle={`Найсвіжіше, чим можна похизуватись.`}
          >
            <div className="flex flex-col gap-[4rem] md:w-[50rem] items-center">
              <EpisodeItem data={latest} />
            </div>
          </Section>
        </div>
      </div>
      <Section
        title="Попередні епізоди"
        subtitle={`Всі ${episodes.length} епізоди.`}
      >
        <div className="flex flex-1 flex-col gap-8 md:gap-[4rem] md:w-[40rem] self-center items-center">
          {rest.map((episode) => (
            <EpisodeItem key={episode.guid} data={episode} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default EpisodesPage;
