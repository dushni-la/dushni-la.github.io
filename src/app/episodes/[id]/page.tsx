import path from "path";
import { readdir } from "node:fs/promises";
import { Metadata } from "next";

import EpisodeCoverPlayer from "@/components/EpisodeCoverPlayer";
import EpisodeMetadataHeader from "@/components/EpisodeMetadataHeader";
import TelegramComments from "./TelegramComments";
import { getEpisode } from "../utils";

export async function generateStaticParams() {
  const folder = await readdir(path.join(process.cwd(), "output"));
  const episodes = folder.map((id) => ({ id: id.split(".")[0] }));

  return episodes;
}

// SEO Metadata for the episode
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisode(id);
  return {
    title: episode.title,
    description: episode.summary,
    openGraph: {
      title: episode.title,
      description: episode.summary,
      type: "article",
      url: `/episodes/${id}`,
      images: [
        {
          url: episode.image || "logo.png",
        },
      ],
    },
    twitter: {
      card: "summary",
      title: episode.title,
      description: episode.summary,
    },
  };
}

const Divider = () => (
  <hr className="my-4 md:my-8 lg:my-12 border-default-500" />
);

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const episode = await getEpisode(id);

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-10 pt-8">
      <div className="flex flex-col md:flex-row gap-8">
        <EpisodeCoverPlayer episode={episode} size="lg" />
        <div className="flex flex-1 flex-col gap-2">
          <EpisodeMetadataHeader episode={episode} />
          <h1 className="dark:text-default-700 text-2xl md:text-4xl">
            {episode.title}
          </h1>
          <p className="text-justify">
            {episode.summary.split("Support the show")[0]}
          </p>
        </div>
      </div>
      {episode.youtube_id && (
        <>
          <Divider />
          <h2 className="text-xl mb-3">Відео</h2>
          <div className="relative overflow-hidden w-full pt-[56.25%] rounded-xl shadow-lg self-center">
            <iframe
              className="absolute top-0 left-0 right-0 bottom-0 w-full h-full"
              src={`https://www.youtube-nocookie.com/embed/${episode.youtube_id}?si=Nw1vG-lpTNaOUmiM`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </>
      )}
      <Divider />
      <h2 className="text-xl">Примітки</h2>
      <div
        className="text-lg leading-[2rem]"
        dangerouslySetInnerHTML={{
          __html: episode.description.split(
            `<a rel="payment" href="https://www.patreon.com/dushnila">Support the show`,
          )[0],
        }}
      />
      {episode.telegram_message_id && (
        <>
          <Divider />
          <h2 className="text-xl">Обговорення</h2>
          <TelegramComments id={episode.telegram_message_id} />
        </>
      )}
    </div>
  );
}
