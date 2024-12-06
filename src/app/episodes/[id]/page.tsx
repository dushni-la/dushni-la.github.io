import path from "path";
import { readdir, readFile } from "node:fs/promises";
import { Metadata } from "next";
import { semanticColors } from "@nextui-org/theme";

import { Episode } from "@/components/types";
import EpisodeCoverPlayer from "@/components/EpisodeCoverPlayer";

export async function generateStaticParams() {
  const folder = await readdir(path.join(process.cwd(), "output"));
  const episodes = folder.map((id) => ({ id: id.split(".")[0] }));

  return episodes;
}

async function getEpisode(id: string): Promise<Episode> {
  const filePath = path.join(process.cwd(), "output", `${id}.json`);
  const data = await readFile(filePath, "utf-8");
  return JSON.parse(data);
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

export default async function EpisodePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const episode = await getEpisode(id);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-8">
        <EpisodeCoverPlayer episode={episode} size={200} />
        <div className="flex flex-1 flex-col gap-2">
          <p className="order-first font-mono text-sm text-default-700">
            {new Date(episode.pub_date).toLocaleDateString(["uk-ua"])}
          </p>
          <h1 className="text-4xl">{episode.title}</h1>
          <p>{episode.summary.split("Support the show")[0]}</p>
        </div>
      </div>
      <hr className="my-12 border-default-500" />
      <iframe
        width="560"
        height="315"
        className="w-full rounded-xl"
        src={`https://www.youtube-nocookie.com/embed/${episode.youtube_id}?si=Nw1vG-lpTNaOUmiM`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div
        className="text-[1.25rem] leading-[2rem]"
        dangerouslySetInnerHTML={{ __html: episode.description }}
      ></div>
      <audio controls>
        <source src={episode.audio_url} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <h3 className="text-xl">Обговорення</h3>
      <iframe
        id="telegram-discussion"
        src={`https://t.me/dushnila_podcast/${episode.telegram_message_id}?embed=1&discussion=1&comments_limit=5&color=${semanticColors.dark.default}&colorful=1`}
        width="100%"
        height="0"
        frameBorder="0"
        scrolling="no"
        style={{
          overflow: "hidden",
          colorScheme: "light dark",
          border: "none",
          minWidth: 320,
          height: 500,
        }}
      />
    </div>
  );
}
