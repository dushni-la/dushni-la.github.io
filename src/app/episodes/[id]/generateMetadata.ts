import { Metadata } from "next";
import { getEpisode } from "../utils";
import { getSlug } from "@/components/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const episode = await getEpisode(id);
  return {
    title: `${episode.title} — Душніла: філософія, психологія, самоаналіз`,
    description: episode.summary,
    alternates: {
      canonical: `https://dushni.la/episodes/${id}/${getSlug(episode.title)}`,
    },
    openGraph: {
      title: `${episode.title} — Душніла: філософія, психологія, самоаналіз`,
      description: episode.summary,
      type: "video.episode",
      url: `https://dushni.la/episodes/${id}`,
      images: [
        {
          url: episode.image || "https://dushni.la/og_image.png",
          alt: `Обкладинка епізоду ${episode.title}`,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${episode.title} — Душніла: філософія, психологія, самоаналіз`,
      description: episode.summary,
      images: [
        {
          url: episode.image || "https://dushni.la/og_image.png",
          alt: `Обкладинка епізоду ${episode.title}`,
        },
      ],
    },
  };
}
