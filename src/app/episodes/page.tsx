import React from "react";
import EpisodeItem from "@/components/EpisodeItem";
import { getEpisodes } from "./utils";
import Section from "@/components/Section";
import { Image } from "@nextui-org/react";

const EpisodesPage: React.FC = async () => {
  const episodes = await getEpisodes();

  const sortedEpisodes = episodes.sort((a, b) => {
    return new Date(b.pub_date).getTime() - new Date(a.pub_date).getTime();
  });

  const latest = sortedEpisodes[0];
  const rest = sortedEpisodes.slice(1);

  return (
    <div className="flex flex-col gap-8 md:gap-16 w-full">
      <div className="relative p-2 pt-6 md:p-4 lg:p-10 rounded-[1rem] shadow-lg bg-gradient-to-b from-cyan-500 dark:from-default-100 to-blue-900 dark:to-blue-900 text-white mt-4 self-center w-full md:w-[40rem] lg:w-[61rem]">
        <Section
          title="Свіжий випуск"
          subtitle={`Найсвіжіше, чим можна похизуватись.`}
        >
          <div className="flex flex-col gap-[4rem] items-center">
            <EpisodeItem data={latest} />
          </div>
        </Section>
        <Image
          alt=""
          src="/column_0.png"
          classNames={{
            wrapper:
              "hidden md:block absolute right-[-30px] bottom-[-30px] rotate-[10deg] w-[160px]",
          }}
        />
        <Image
          alt=""
          src="/column_1.png"
          classNames={{
            wrapper:
              "hidden md:block absolute left-[-100px] top-[30px] rotate-[-10deg] w-[200px]",
          }}
        />
      </div>
      <Section
        title="Попередні епізоди"
        subtitle={`Всі ${episodes.length} епізоди.`}
      >
        <div className="p-2 md:p-4 lg:p-10 flex flex-1 flex-col gap-4 md:gap-[4rem] w-full md:w-[50rem] self-center items-center">
          {rest.map((episode) => (
            <EpisodeItem key={episode.guid} data={episode} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default EpisodesPage;
